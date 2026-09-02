// The spec playwright.config.ts has cited since batch 0.1 and that did not
// exist until batch 4 landed the charts it is about.
//
// The config sets `reducedMotion: "reduce"` for every other suite, because
// recharts animates in JavaScript: the `animation: none` CSS the visual suite
// injects cannot stop it, so a screenshot would land on an arbitrary frame.
// Reduced motion is the switch recharts itself reads, and it settles a chart on
// its final frame. This file is the one gate that opts back out, so the
// animated path runs for real — and it is also where the batch-4 merge is
// checked end to end: that every chart draws marks at all.
//
// "Draws marks at all" is not a tautology here. The absorbed charts size
// themselves through `.ds-chart-container`'s aspect-ratio and the `--plot` /
// `--square` modifiers, where the source used literal Tailwind classes and
// tailwind-merge. Recharts measures its box and renders nothing at all when a
// container resolves to zero on either axis, silently — no error, no warning,
// an empty SVG. That failure is invisible to a typecheck and to the class
// resolution check, and it is exactly what a sizing rewrite can cause.

import { expect, test } from "@playwright/test"

import { routePath, settle } from "./harness"

// Animation on, against the config's reduce default. Through `contextOptions`,
// the way the config spells it — this Playwright build has no top-level
// `reducedMotion` fixture.
test.use({ contextOptions: { reducedMotion: "no-preference" } })

/** Each recharts-bound chart route, with the mark its plot has to contain. */
const CHARTS = [
  { slug: "line-chart", mark: ".recharts-line-curve" },
  { slug: "area-chart", mark: ".recharts-area-area" },
  { slug: "bar-chart", mark: ".recharts-bar-rectangle" },
  { slug: "stacked-bar", mark: ".recharts-bar-rectangle" },
  { slug: "pie-chart", mark: ".recharts-pie-sector" },
  { slug: "donut-chart", mark: ".recharts-pie-sector" },
  { slug: "chart", mark: ".recharts-bar-rectangle" },
]

for (const { slug, mark } of CHARTS) {
  test.describe(slug, () => {
    test.beforeEach(async ({ page }) => {
      await page.goto(routePath(`/docs/${slug}`))
      await settle(page)
    })

    test("the container measures more than zero on both axes", async ({
      page,
    }) => {
      const box = await page
        .locator(".ds-chart-container")
        .first()
        .boundingBox()

      expect(box).not.toBeNull()
      expect(box!.width).toBeGreaterThan(0)
      expect(box!.height).toBeGreaterThan(0)
    })

    test("marks are drawn, and they animate to their final geometry", async ({
      page,
    }) => {
      const marks = page.locator(`.ds-chart-container ${mark}`)
      await expect(marks.first()).toBeVisible()

      // With animation on, the final frame is what has to be reached — and a
      // mark is genuinely zero-area on its first frame, since recharts grows it
      // from nothing over ~1.5s. So this polls rather than sampling once: a
      // single read right after `settle` measures whatever frame it lands on,
      // which is how this assertion flaked on the pie before it polled.
      await expect
        .poll(
          () =>
            marks.evaluateAll((els) =>
              Math.max(
                0,
                ...els.map((el) => {
                  const { width, height } = (
                    el as SVGGraphicsElement
                  ).getBoundingClientRect()
                  return width * height
                })
              )
            ),
          { timeout: 10_000 }
        )
        .toBeGreaterThan(0)
    })
  })
}

// The two library-free charts have no recharts box to measure, so they are
// checked for what their own SVG has to carry.
test.describe("library-free charts", () => {
  test("a sparkline draws its polyline and reports a value count", async ({
    page,
  }) => {
    await page.goto(routePath("/docs/sparkline"))
    await settle(page)

    const spark = page.locator(".ds-sparkline").first()
    await expect(spark).toHaveAttribute("role", "img")
    await expect(spark).toHaveAttribute("aria-label", /.+/)
    await expect(spark.locator(".ds-sparkline-line")).toHaveCount(1)
  })

  test("a gauge draws both arcs and names its value", async ({ page }) => {
    await page.goto(routePath("/docs/gauge"))
    await settle(page)

    const gauge = page.locator(".ds-gauge").first()
    // The track and the value arc: the value arc's length is a dasharray, so
    // both paths are always present and only the dasharray changes.
    await expect(gauge.locator("path")).toHaveCount(2)
    await expect(gauge).toHaveAttribute("aria-label", /\d+ of \d+/)
  })
})
