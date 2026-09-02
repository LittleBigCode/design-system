// Shared helpers for the visual and a11y suites.
//
// Both suites walk the same routes and need the page in the same settled state,
// so the enumeration and the settling live here rather than being duplicated
// (and drifting) between the two specs.

import type { Page } from "@playwright/test"

import { COMPONENTS } from "../src/registry/registry"

export type Route = { name: string; path: string }

/**
 * Vite's `base`. `vite preview` serves the SPA under the same project subpath
 * GitHub Pages does, so every route the suites drive carries it. Centralised
 * here so a base change is one edit rather than one per spec.
 */
export const BASE = "/design-system/react-workbench"

/** A router path, prefixed with the deployed base. */
export function routePath(path: string) {
  return `${BASE}${path}`
}

/**
 * Every documented component route, derived from the registry rather than a
 * hand-kept list — a component added to the registry is covered by the gates on
 * its next run, with no test edit.
 */
export const COMPONENT_ROUTES: Route[] = COMPONENTS.map((c) => ({
  name: c.slug,
  path: routePath(`/docs/${c.slug}`),
}))

export const PAGE_ROUTES: Route[] = [{ name: "overview", path: routePath("/") }]

export const ALL_ROUTES: Route[] = [...PAGE_ROUTES, ...COMPONENT_ROUTES]

export type Theme = "light" | "dark"

export const THEMES: Theme[] = ["light", "dark"]

/**
 * Pin the theme before any app code runs. ThemeProvider reads this key on its
 * first render and writes the resolved class onto <html>, so setting it in an
 * init script avoids a light-then-dark flash that would race a screenshot.
 */
export async function pinTheme(page: Page, theme: Theme) {
  await page.addInitScript((value) => {
    window.localStorage.setItem("theme", value)
  }, theme)
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

/**
 * Assert the theme actually applied. Without this a broken ThemeProvider would
 * silently turn the dark half of both suites into a duplicate of the light half,
 * and the gates would still pass.
 */
export async function expectTheme(page: Page, theme: Theme) {
  const isDark = await page.evaluate(() =>
    document.documentElement.classList.contains("dark")
  )
  if (isDark !== (theme === "dark")) {
    throw new Error(
      `Theme did not apply: expected ${theme}, <html> dark class is ${isDark}`
    )
  }
}
