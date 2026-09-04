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
  // Batch 5. Every one of these composes the same container, so the sizing
  // failure this file exists to catch is the same failure — and three of them
  // resolve their height through a `--ds-chart-height` default declared on
  // their own root rather than on `--plot`, which is the part a rewrite breaks.
  { slug: "radar-chart", mark: ".recharts-radar-polygon" },
  { slug: "combo-chart", mark: ".recharts-bar-rectangle" },
  { slug: "funnel-chart", mark: ".recharts-trapezoid" },
  { slug: "scatter-chart", mark: ".recharts-symbols" },
  // The treemap's tiles come from this package's own `content` renderer, so
  // they carry no recharts class — they are bare <rect> on the plot surface,
  // and the treemap draws nothing else there.
  { slug: "treemap", mark: ".recharts-surface rect" },
  { slug: "waterfall-chart", mark: ".recharts-bar-rectangle" },
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

  test("a heatmap draws named cells and a step legend", async ({ page }) => {
    await page.goto(routePath("/docs/heatmap"))
    await settle(page)

    const heatmap = page.locator(".ds-heatmap").first()
    // Colour is the only encoding, so every cell has to carry its own name.
    const cells = heatmap.locator(".ds-heatmap-tile")
    expect(await cells.count()).toBeGreaterThan(0)
    await expect(cells.first()).toHaveAttribute("role", "img")
    await expect(cells.first()).toHaveAttribute("aria-label", /.+/)
    await expect(heatmap.locator(".ds-heatmap-legend-swatch")).toHaveCount(5)
  })

  test("a bullet chart measures a meter and speaks its target", async ({
    page,
  }) => {
    await page.goto(routePath("/docs/bullet-chart"))
    await settle(page)

    const track = page.locator(".ds-bullet-chart-track").first()
    await expect(track).toHaveAttribute("role", "meter")
    // The target is the point of the chart and is geometry only, so the spoken
    // value is the one place a screen reader can find it.
    await expect(track).toHaveAttribute("aria-valuetext", /target/)
    const measure = await track
      .locator(".ds-bullet-chart-measure")
      .boundingBox()
    expect(measure!.width).toBeGreaterThan(0)
  })
})

// The funnel's labels are drawn through `LabelList`, and recharts gates them
// behind `showLabels = !isAnimating`. The source's own comment claims its
// animation id is rebuilt every render, so the animation restarts forever and
// the labels never arrive — and then never turns the animation off. Against the
// recharts this package pins they do arrive, which is what this asserts. It
// lives here rather than beside the sizing tests because animation on is the
// only condition under which the claim is falsifiable, and this file is the one
// gate that opts back out of reduced motion.
test("a funnel prints its stage labels with animation on", async ({ page }) => {
  await page.goto(routePath("/docs/funnel-chart"))
  await settle(page)

  const labels = page.locator(".ds-funnel-chart-stage-label")
  await expect(labels.first()).toBeVisible()
  expect(await labels.count()).toBeGreaterThan(1)
  await expect(
    page.locator(".ds-funnel-chart-share-label").first()
  ).toBeVisible()
})
