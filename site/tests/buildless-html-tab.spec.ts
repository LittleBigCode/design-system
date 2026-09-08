// Batch 16 (#49)'s headline claim: a copied HTML tab renders correctly
// against `css/diametral.css` alone — no Tailwind, no JS, no build. This is
// the test that claim owes rather than an assertion in a doc comment.
//
// Every entry in `demo-markup.json` (scraped + codemodded onto `.ds-*` by
// scripts/build-demo-markup.mjs) is dropped into a page whose only stylesheet
// is the real, hand-authored `css/diametral.css` at the repo root — loaded via
// `file://`, not through Vite, so nothing here can be secretly leaning on a
// dev-server convenience. No `<script>` tag exists on the page at all: if a
// demo's rendered markup depended on JS to *look* right (not just to behave),
// this is where that would show up as a genuinely empty or zero-size box.

import path from "node:path"
import fs from "node:fs/promises"
import { fileURLToPath } from "node:url"

import { test, expect } from "@playwright/test"

const REPO_ROOT = path.resolve(fileURLToPath(import.meta.url), "../../..")
const DIAMETRAL_CSS = path.join(REPO_ROOT, "css/diametral.css")
const MANIFEST = path.join(REPO_ROOT, "site/src/registry/demo-markup.json")

function pageFor(markup: string) {
  // file:// href, not a relative one — this page has no base document a
  // relative path could resolve against once it's handed to `setContent`.
  return `<!doctype html>
<html>
<head><link rel="stylesheet" href="file://${DIAMETRAL_CSS}"></head>
<body>${markup}</body>
</html>`
}

test.describe("the HTML tab, buildless", () => {
  let manifest: Record<string, string>

  test.beforeAll(async () => {
    manifest = JSON.parse(await fs.readFile(MANIFEST, "utf8"))
  })

  test("every scraped demo renders a non-empty box with no console error, css/diametral.css alone", async ({
    page,
  }) => {
    const errors: string[] = []
    page.on("console", (msg) => {
      if (msg.type() === "error") errors.push(msg.text())
    })
    page.on("pageerror", (err) => errors.push(err.message))

    // One real navigation establishes a file:// document to set content on;
    // every demo after that is `setContent`, not a fresh `goto` — 451 of
    // those would make this test itself the thing needing a settle timeout.
    await page.goto(`file://${DIAMETRAL_CSS}`).catch(() => {})

    const empty: string[] = []
    for (const [key, markup] of Object.entries(manifest)) {
      await page.setContent(pageFor(markup), { waitUntil: "load" })
      // Not `body > *` bare: several demos' real markup leads with a
      // `<noscript>` (the `input-otp` package's own SSR fallback) or similar
      // zero-box element that isn't the demo itself.
      const box = await page
        .locator("body > *:not(noscript):not(style):not(script)")
        .first()
        .boundingBox()
      if (!box || box.width === 0 || box.height === 0) empty.push(key)
    }

    expect(errors, `console/page errors while rendering buildless demos:\n${errors.join("\n")}`).toHaveLength(0)
    expect(empty, `rendered with zero size (collapsed, likely JS-dependent to even look right):\n${empty.join("\n")}`).toHaveLength(0)
  })
})

/**
 * A handful of demos spot-checked for real, specific styling — not just "took
 * up space" — chosen to cover this codemod's different resolution paths:
 * a plain `.ds-*` component class, a `utility-mapping.md` table hit, and a
 * class resolved through Tailwind's own compiler into an inline `style=`.
 */
const SPOT_CHECKS: Array<{
  key: string
  selector: string
  assert: (locator: ReturnType<import("@playwright/test").Page["locator"]>) => Promise<void>
}> = [
  {
    key: "accordion/basic",
    selector: ".ds-accordion-trigger",
    assert: async (el) => {
      await expect(el).toHaveCSS("display", "flex")
    },
  },
  {
    key: "button/variants",
    selector: ".ds-button",
    assert: async (el) => {
      // Not a strict "inline-flex": this demo's own wrapper is `.ds-flex`, so
      // the button is a flex item and its `inline-flex` blockifies to `flex`
      // per the CSS Display spec — real, correct browser behavior, not the
      // codemod dropping a modifier.
      await expect(el).toHaveCSS("display", /flex/)
    },
  },
  {
    key: "accordion/controlled",
    selector: ".ds-w-full",
    assert: async (el) => {
      // A resolved-through-Tailwind inline style, not the mapped .ds-* class —
      // utility-mapping.md's table only covers w-full itself, so max-w-sm
      // (this demo's own wrapper) has to have made it to a real style=.
      await expect(el).toHaveAttribute("style", /max-width/)
    },
  },
]

test.describe("the HTML tab, buildless — spot checks", () => {
  test.beforeAll(async () => {
    await fs.access(MANIFEST)
  })

  for (const { key, selector, assert } of SPOT_CHECKS) {
    test(key, async ({ page }) => {
      const manifest = JSON.parse(await fs.readFile(MANIFEST, "utf8"))
      const markup = manifest[key]
      expect(markup, `${key} missing from demo-markup.json`).toBeTruthy()
      await page.goto(`file://${DIAMETRAL_CSS}`).catch(() => {})
      await page.setContent(pageFor(markup), { waitUntil: "load" })
      await assert(page.locator(selector).first())
    })
  }
})
