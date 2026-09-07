// Accessibility tests for the Diametral Design System showcase.
//
// For each key showcase page we navigate, let the page settle (network idle +
// web fonts), then run axe-core against the rendered DOM and fail on any
// violation whose impact is "critical" or "serious". Less severe findings
// ("moderate"/"minor") are reported by axe but do not fail the suite, so the
// gate stays meaningful for the flat, low-chrome aesthetic.
//
// Pages are served by the same static server as the visual suite: the shared
// playwright.config.js starts `python3 -m http.server 8080` and sets
// baseURL=http://localhost:8080, so paths here are relative to it.
//
// Note: the demo page is a React app loaded from esm.sh at runtime, so network
// access is required for it to render (same caveat as visual.spec.js).

import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

// Severities that should fail the build. Moderate/minor are surfaced by axe but
// tolerated so the gate flags only genuinely blocking issues.
const FAIL_ON = ["critical", "serious"];

// Key static pages, addressed relative to baseURL (http://localhost:8080).
// Issue #31 moved the home page to the repo root and freed examples/components/
// for the generator, sending the hand-written pages to examples/css/. The `name`
// keys are what the reports are read by, so they kept their identity across the
// move.
const PAGES = [
  { name: "index", path: "/index.html" },
  { name: "kitchen-sink", path: "/examples/kitchen-sink.html" },
  { name: "components-buttons", path: "/examples/css/buttons.html" },
  { name: "components-forms", path: "/examples/css/forms.html" },
  // The only page that exercises the 11 web components; it was in neither suite.
  { name: "components-web-components", path: "/examples/css/web-components.html" },
];

// Navigate, assert the route actually served, then settle the same way the
// visual suite does before measuring.
//
// The status check is the point: axe on a 404 error page finds no violations,
// so a route that moved reads as a page that passed. Four of the five above
// 404'd from #31's move until issue #39 measured them, and this gate stayed
// green throughout. Same assertion, same reason, as visual.spec.js's.
async function goTo(page, path) {
  const response = await page.goto(path);
  expect(response?.status(), `${path} did not serve`).toBe(200);
  await page.waitForLoadState("networkidle");
  await page.evaluate(() => document.fonts.ready);
}

// Run axe and assert no critical/serious violations. On failure, build a
// message naming, per blocking violation, the rule id, the affected page, and
// a representative node selector so the report points straight at the problem.
async function expectNoSeriousViolations(page, pageName) {
  const { violations } = await new AxeBuilder({ page }).analyze();

  const blocking = violations.filter((v) => FAIL_ON.includes(v.impact));

  if (blocking.length > 0) {
    const details = blocking
      .map((v) => {
        const selector = v.nodes?.[0]?.target?.join(" ") ?? "(no node)";
        return `  [${v.impact}] ${v.id} on ${pageName} — node: ${selector}\n    ${v.help} (${v.helpUrl})`;
      })
      .join("\n");
    throw new Error(
      `axe found ${blocking.length} critical/serious accessibility violation(s) on ${pageName}:\n${details}`,
    );
  }

  // Surfaces the count for the assertion log even on success.
  expect(blocking, `no critical/serious axe violations on ${pageName}`).toEqual([]);
}

for (const { name, path } of PAGES) {
  test(`a11y: ${name}`, async ({ page }) => {
    await goTo(page, path);
    await expectNoSeriousViolations(page, name);
  });
}

// The demo is a live React console behind a login screen. Sign in (click the
// "Sign in" button, not the heading of the same text), wait for the console
// shell (.ds-console) to mount, then audit the signed-in app chrome.
test("a11y: demo (signed-in console)", async ({ page }) => {
  await goTo(page, "/examples/demo.html");

  await page.getByRole("button", { name: "Sign in" }).click();
  await page.locator(".ds-console").waitFor({ state: "visible" });
  await page.waitForLoadState("networkidle");

  await expectNoSeriousViolations(page, "demo");
});
