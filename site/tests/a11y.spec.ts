// Accessibility gate for @diametral/ui.
//
// Walks every documented component route in both themes, runs axe-core against
// the rendered DOM, and fails on any violation whose impact is "critical" or
// "serious". Moderate/minor findings are reported but tolerated, so the gate
// flags genuinely blocking issues rather than aesthetic preferences.
//
// Both themes are covered on purpose. The .dark block overrides tier-2
// semantics only, which is exactly where a contrast regression can be
// introduced without touching a single component — a light-only suite would not
// see it.
//
// Base UI supplies accessible primitives, but this repo's value is in the
// compositions on top of them, and that is where keyboard traps, mislabelled
// triggers and orphaned form controls actually appear.

import AxeBuilder from "@axe-core/playwright"
import { expect, test, type Page } from "@playwright/test"

import { ALL_ROUTES, expectTheme, pinTheme, settle, THEMES } from "./harness"

// Severities that fail the build.
const FAIL_ON = ["critical", "serious"]

async function expectNoSeriousViolations(page: Page, label: string) {
  const { violations } = await new AxeBuilder({ page }).analyze()
  const blocking = violations.filter(
    (v) => v.impact && FAIL_ON.includes(v.impact)
  )

  if (blocking.length > 0) {
    // Name the rule, the route and a representative node so the CI log points
    // straight at the offending element instead of just a count.
    const details = blocking
      .map((v) => {
        const selector = v.nodes?.[0]?.target?.join(" ") ?? "(no node)"
        return `  [${v.impact}] ${v.id} on ${label} — node: ${selector}\n    ${v.help} (${v.helpUrl})`
      })
      .join("\n")
    throw new Error(
      `axe found ${blocking.length} critical/serious violation(s) on ${label}:\n${details}`
    )
  }

  expect(blocking, `no critical/serious axe violations on ${label}`).toEqual([])
}

for (const theme of THEMES) {
  test.describe(`a11y · ${theme}`, () => {
    for (const { name, path } of ALL_ROUTES) {
      test(`${name} (${theme})`, async ({ page }) => {
        await pinTheme(page, theme)
        await page.goto(path)
        await settle(page)
        await expectTheme(page, theme)
        await expectNoSeriousViolations(page, `${name} [${theme}]`)
      })
    }
  })
}
