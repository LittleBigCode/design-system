// Shared helpers for the visual, a11y and regression suites.
//
// The 13 regress specs (plus chart-marks.spec.ts) were written against the
// retired React docs app and moved here unedited except for this import:
// they address components as `routePath("/docs/<slug>")` and call `settle()`
// before asserting, and that is all they need from this file.

import type { Page } from "@playwright/test"
import { readdirSync } from "node:fs"
import { dirname, join } from "node:path"
import { fileURLToPath } from "node:url"

const ROOT = dirname(dirname(fileURLToPath(import.meta.url)))
const COMPONENTS_DIR = join(ROOT, "examples/components")

export type Route = { name: string; path: string }

/**
 * The regress specs address components the way the retired React docs app's router did —
 * `/docs/<slug>`. Root has no router: `scripts/build-docs.mjs` writes one
 * static file per component to `examples/components/<slug>.html`, so a
 * `/docs/<slug>` request maps onto that file instead of a Vite dev route.
 */
export function routePath(path: string) {
  const slug = path.replace(/^\/docs\//, "")
  return `/examples/components/${slug}.html`
}

/**
 * Every generated component page, derived by reading the directory the
 * generator writes rather than hand-listed — a component added to the
 * registry is covered by the a11y sweep on its next run, with no test edit.
 */
export const COMPONENT_ROUTES: Route[] = readdirSync(COMPONENTS_DIR)
  .filter((f) => f.endsWith(".html"))
  .map((f) => f.slice(0, -".html".length))
  .sort()
  .map((slug) => ({ name: slug, path: `/examples/components/${slug}.html` }))

export type Theme = "light" | "dark"

export const THEMES: Theme[] = ["light", "dark"]

/**
 * Pin the theme before any page script runs. `examples/showcase.js` reads
 * this key from localStorage on load and sets `data-theme="dark"` on <html>
 * for it, so writing it in an init script avoids a light-then-dark flash
 * that would race a screenshot or an axe run.
 */
export async function pinTheme(page: Page, theme: Theme) {
  await page.addInitScript((value) => {
    window.localStorage.setItem("ds-theme", value)
  }, theme)
}

/**
 * Assert the theme actually applied. Without this a broken theme toggle would
 * silently turn the dark half of the sweep into a duplicate of the light half
 * and the gate would still pass.
 */
export async function expectTheme(page: Page, theme: Theme) {
  const isDark = await page.evaluate(() => document.documentElement.getAttribute("data-theme") === "dark")
  if (isDark !== (theme === "dark")) {
    throw new Error(`Theme did not apply: expected ${theme}, <html data-theme="dark"> is ${isDark}`)
  }
}

/**
 * Wait until the page has stopped moving: network quiet, webfonts applied, and
 * one extra beat for JS-driven animation that CSS neutralisation cannot reach
 * (Recharts animates via requestAnimationFrame, not transitions).
 */
export async function settle(page: Page) {
  await page.waitForLoadState("networkidle")
  await page.evaluate(() => document.fonts.ready)
  await page.waitForTimeout(400)
}
