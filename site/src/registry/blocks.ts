/**
 * The block registry: one row per category, each holding its numbered variants.
 *
 * Shaped like `COMPONENTS` and read by everything downstream — the `/blocks`
 * routes, the sidebar, `tests/harness.ts`, and `scripts/build-agent-index.mjs`,
 * which parses this file for `docs/agent-index.json`'s `blocks` array. One list
 * means a variant cannot have a route but no nav row, or a nav row but no file.
 *
 * A variant's source is `blocks/<category>/<name>.tsx` at the repo root, a
 * default export taking no props, published in the package (ADR 0003). The
 * description answers "when do I pick this one over its siblings".
 */
export type BlockVariant = readonly [name: string, description: string]

export type BlockCategory = readonly [
  category: string,
  name: string,
  description: string,
  variants: readonly BlockVariant[],
]

export const BLOCKS = [
  ["activity", "Activity", "A record's event history as a status-coloured feed.", [
    ["activity-01", "Five typed events with an icon indicator, a time and a detail line."],
  ]],
  ["app-shell", "App shell", "The whole left edge plus content area of an application screen.", [
    ["app-shell-01", "Search header, badged menu with hover actions, account row in the footer."],
  ]],
  ["confirm", "Confirm", "A destructive action and the dialog that guards it.", [
    ["confirm-01", "A danger-zone card whose button opens a two-action confirmation."],
  ]],
  ["dashboard", "Dashboard", "A full application screen — nav, KPIs and a data panel.", [
    ["dashboard-01", "Sidebar nav, page header, three KPI cards and a sparkline table."],
  ]],
  ["detail", "Detail", "Reading one record: the body beside its metadata.", [
    ["detail-01", "A wide body card next to a 320px description-list sidebar."],
  ]],
  ["empty", "Empty state", "What a collection looks like before it has anything in it.", [
    ["empty-01", "Icon, title, explanation and a single primary action, inside a card."],
  ]],
  ["error", "Error", "A standalone error screen with no application chrome.", [
    ["error-01", "404 — the empty-state pattern scaled up and centred on the page."],
  ]],
  ["faceted-filter", "Faceted filter", "Refining a result list from a facet panel.", [
    ["faceted-filter-01", "Checkbox statuses and tag disciplines beside an item list."],
  ]],
  ["features", "Features", "The marketing section that explains what the product does.", [
    ["features-01", "Three ruled columns, each led by a ticked grid label."],
  ]],
  ["filter-bar", "Filter bar", "The active filters above a table or result list.", [
    ["filter-bar-01", "Removable tags and a result count on the left, selects and clear on the right."],
  ]],
  ["footer", "Footer", "The closing call to action and the site's link columns.", [
    ["footer-01", "A registration-marked CTA over an accent rule and four link columns."],
  ]],
  ["forgot-password", "Forgot password", "Starting a password reset.", [
    ["forgot-password-01", "One email field, a full-width send, and the way back to sign in."],
  ]],
  ["hero", "Hero", "The first band of a marketing page.", [
    ["hero-01", "A six-column gridlines band with a kicker, title, lede and two actions."],
  ]],
  ["login", "Login", "Signing an existing user in.", [
    ["login-01", "The card alone — drop it into a layout you already have."],
    ["login-02", "The whole screen: the same form centred on the brand background."],
    ["login-03", "The whole screen, split: a brand panel beside the form, stacking to a header band on mobile."],
  ]],
  ["otp", "One-time code", "The second factor of a sign-in.", [
    ["otp-01", "Six OTP slots with the verify action disabled until the code is complete."],
  ]],
  ["page-header", "Page header", "The title block at the top of an application view.", [
    ["page-header-01", "Breadcrumb, title with actions, and a tab strip flush to the rule."],
  ]],
  ["pricing", "Pricing", "The plan comparison on a marketing page.", [
    ["pricing-01", "Three columns with the middle one framed in accent and badged."],
  ]],
  ["sidebar", "Sidebar", "The navigation column of an application screen.", [
    ["sidebar-01", "Flat — four rows, no groups. Right up to about six destinations."],
    ["sidebar-02", "Grouped and labelled, with a per-group action and a rule between."],
    ["sidebar-03", "Nested: collapsible parents over sub-rows, plus a count badge."],
  ]],
  ["signup", "Sign up", "Creating an account.", [
    ["signup-01", "Name, email and password over a full-width create action."],
  ]],
  ["stat-band", "Stat band", "A row of headline figures on the grid.", [
    ["stat-band-01", "Bare — four cells sitting directly under application chrome."],
    ["stat-band-02", "The marketing version: the same grid, framed and led by a kicker."],
  ]],
  ["toolbar", "Toolbar", "The action strip above a table or editor.", [
    ["toolbar-01", "Search on the left, a separator, and three actions on the right."],
  ]],
] as const satisfies readonly BlockCategory[]
