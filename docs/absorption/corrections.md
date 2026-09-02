# Corrections found during execution

Not a derived artifact. The four files beside this one are **copies** carrying a
provenance header, and correcting a measurement in a copy diverges it from the
source silently. This file is where a batch records what it found instead: a
source defect it fixed forward, or a measurement in the plan that execution
proved wrong.

The rule it serves is [`batch-plan.md`](./batch-plan.md) §"The source ref":
nothing unfreezes the pin, so a defect is fixed forward in the target, inside
the batch that hits it, and recorded here as one line. The accepted cost is that
source and target diverge with no trace outside this file.

One row per finding. `batch` is the batch that found it, not the one that owns
the surface.

| batch | kind | finding |
| --- | --- | --- |
| 4 | source defect, fixed forward | `sparkline.tsx` drew a flat series along the floor of its box rather than through the middle: every point equal makes the range zero, and the normalisation divided by it. Fixed in the absorbed component. |
| 4 | source defect, fixed forward | A focus ring that drew nothing — `outline: 2px solid transparent`, Tailwind's `outline-hidden` idiom — was bound to `:focus-visible` with the charte's real 2px outline. |
| 5 | plan measurement wrong | The dedupe-exception table gives batch 5 **5** exceptions across `funnel-chart`, `radar-chart`, `scatter-chart`, `treemap` and `waterfall-chart`. `bullet-chart.css` carries a sixth, in the same form and for the same reason (`[--bullet-label:7rem]` / `[--bullet-value:4rem]` kept literal so `tailwind-merge` could dedupe `in-table.tsx`'s override). The real count is **6**, and the plan's 36-owed total is **37**. All six are resolved in beta.5 — the rule is that an exception is never carried across, and the count is not what decides that. |
| 5 | source comment wrong, no fix needed | `funnel-chart.tsx` carries a comment saying recharts gates a funnel's labels behind `showLabels = !isAnimating`, that the animation therefore restarts forever, and that "with the animation off they render on the first paint" — and then sets no `isAnimationActive` anywhere in the source. Against the recharts this package pins, the labels render with animation on, so the component is absorbed unchanged and `site/tests/chart-marks.spec.ts` asserts the labels are present under animation, which is the one gate that opts back out of reduced motion. |
