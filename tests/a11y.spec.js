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
const PAGES = [
  { name: "index", path: "/examples/index.html" },
  { name: "kitchen-sink", path: "/examples/kitchen-sink.html" },
  { name: "components-buttons", path: "/examples/components/buttons.html" },
  { name: "components-forms", path: "/examples/components/forms.html" },
];

// Settle a page the same way the visual suite does before measuring it.
async function settle(page) {
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
    await page.goto(path);
    await settle(page);
    await expectNoSeriousViolations(page, name);
  });
}

// The demo is a live React console behind a login screen. Sign in (click the
// "Sign in" button, not the heading of the same text), wait for the console
// shell (.ds-console) to mount, then audit the signed-in app chrome.
test("a11y: demo (signed-in console)", async ({ page }) => {
  await page.goto("/examples/demo.html");
  await settle(page);

  await page.getByRole("button", { name: "Sign in" }).click();
  await page.locator(".ds-console").waitFor({ state: "visible" });
  await settle(page);

  await expectNoSeriousViolations(page, "demo");
});
