# Changelog

All notable changes to the Diametral Design System are documented here.
The format follows [Keep a Changelog](https://keepachangelog.com/), and the project
adheres to [Semantic Versioning](https://semver.org/) — see [docs/versioning.md](docs/versioning.md).

## [1.0.0-beta.6] — 2026-09-02

Fifteen components, and the batch where **appliers become parts**. Thirteen 0.11
components that took an `items` array or a bag of content props are replaced by the
source's composable parts; `Table` arrives with no incumbent at all; `Banner` moves out
of the barrel into its own module and gains a tone axis. **This batch acquires no
dependency** — `Avatar`, `Progress` and `Toolbar` reach for Base UI, already installed.
Published on the `next` dist-tag; `latest` stays at 0.11.0 for the whole migration.

Every removed prop has a replacement or a recipe in
[`docs/migration/from-0.11.md`](docs/migration/from-0.11.md), generated from the 83 rows
this batch adds to `renames.json` — the largest rename set in the migration.

### Added
- **`Table`** — the composed data table 0.11 never had a binding for: it shipped
  `table.css` and nothing that rendered it. `Table` wraps itself in a scroll container
  and its parts are `TableHeader` / `TableBody` / `TableFooter` / `TableRow` /
  `TableHead` / `TableCell` / `TableCaption`. `DataGrid` is untouched and stays the
  stateful table — sorting, selection, editing, its own state.
- **`Banner`'s six-tone axis** — `BannerContent`, `BannerTitle`, `BannerDescription`
  and `BannerAction`, with `tone` over the same `--ds-<tone>-bg` family every other
  status surface reads. 0.11's fixed pale-yellow identity is now `tone="warning"`, and
  the default is `neutral`, because a banner that is always shouting is a banner nobody
  reads.
- **`KbdGroup`**, **`AvatarBadge`**, **`AvatarGroupCount`**, **`BreadcrumbPage`**,
  **`BreadcrumbSeparator`**, **`BreadcrumbEllipsis`**, **`EmptyMedia`**, **`EmptyHeader`**,
  **`TimelineDescription`**, **`ToolbarButton` / `ToolbarLink` / `ToolbarInput` /
  `ToolbarSeparator`**, **`ProgressTrack` / `ProgressIndicator` / `ProgressLabel` /
  `ProgressValue`** — parts that had no 0.11 counterpart.
- **`paginationRange({ page, pageCount, siblingCount })`** — 0.11's page-window logic,
  exported as a pure function rather than buried in a controlled component.
- **`--ds-timeline-gap`** — the row-spacing knob that replaced the source's `pb-8`
  Tailwind literal.

### Changed
- **Three components gain behaviour, not only shape.** `Avatar` is Base UI's, so the
  fallback appears only once the image has actually failed or is still loading, rather
  than sitting under a transparent `<img>` that never arrives. `Progress` is Base UI's,
  so `value={null}` is a real indeterminate state with the primitive's ARIA. `Toolbar`
  is Base UI's, so the whole strip is **one** tab stop with arrow-key navigation —
  0.11's flex row made every control in it its own stop.
- **`EmptyState` → `Empty`**, with `icon`/`title`/`description`/`actions` becoming
  `EmptyMedia` / `EmptyTitle` / `EmptyDescription` / `EmptyContent`.
- **`Pagination` is parts.** `page` / `pageCount` / `onChange` are gone; the window
  logic ships intact as `paginationRange()` and the recipe for rebuilding the
  controlled pager is ~10 lines in the migration guide. What the parts buy is a page
  that can be a real `<a href>` — crawlable and middle-clickable — which a button
  cannot be.
- **`Agenda`** keeps its `events` / `emptyMessage` API and gains `locale`, a `<section>`
  per day under a real `<h3>`, and the system's `Empty` for its empty state. 0.11
  hardcoded English weekday and month tables and emitted a flat run of divs.
- **`Stepper` renders 0.11's classes on purpose.** `stepper.css` is a cross-boundary
  pin — `Wizard` renders the whole `.ds-stepper__marker` / `__label` / `__step` block
  and does not move in this migration — so the parts API is the source's and the class
  grammar is the incumbent's. There is no `StepperSeparator`: the connector is a
  `::after` on the step.
- **`Toolbar` is boxed by default**, which is what `--bordered` used to opt into, and
  is `width: fit-content`. `.ds-toolbar-spacer` survives for a hand-written bar you
  widen yourself.
- **`Progress`'s tones** are `--tone-*` and six wide; `status="success"` becomes
  `tone="success"`.
- **`Timeline`'s tone** moves from the dot to the item, where the semantics are, and
  `data-state="completed" | "active"` fills or outlines the indicator with it.
- **`Avatar`'s size** moves from `--sm`/`--lg` classes to `data-size`, so a group can
  size its overflow count off its members with a `:has()` rule.
- **`Breadcrumb`'s separator** is its own presentational `<li>` holding a caret rather
  than a generated `::after`: an element can be flipped for RTL, and it stays out of
  the accessible name of the item beside it.

### Fixed
- **The `kbd` / `input-group` cascade inversion, one batch early.** The source layers
  `kbd.css` so `InputGroupAddon`'s Tailwind utility keeps outranking
  `background: var(--input)`. This package has no `@layer` and no Tailwind, so
  transcribing that would have inverted the cascade and shipped it inverted in beta.6
  *and* beta.7. `kbd.css` carries what the utility resolved to as a plain rule instead,
  and drops the losing declaration. Batch 7 has nothing to undo.
- **`Progress`'s indeterminate state.** The source draws nothing for it; the animation
  is kept and keyed off both Base UI's `data-indeterminate` and 0.11's modifier class.
- **`EmptyDescription`** rendered a `<div>` while typed as a `<p>`, and `EmptyMedia`
  emitted `data-slot="empty-icon"`. Both corrected.

### Fixed (theme tokens)
- **The dark theme had no status ink.** `css/themes/dark.css` overrode every
  `--ds-*-bg` tint but left the `--ds-*-ink` shades at their light-theme values,
  which are darker colours tuned to read on a *pale* tint. On dark that is dark
  text on a dark tint: `.ds-tag--success` and `.ds-banner--info` measured under
  2:1. The four ink tokens now have dark mirrors, each clearing 4.5:1 on its own
  tint, on `--ds-bg` and on `--ds-surface`. Fixed in the token layer rather than
  in `banner.css`, because `tag.css` and `chip.css` read the same family and
  `tag.css` is frozen.

### Preserved
Three 0.11 renderings survive their wholesale replacement, each because no React
component on either side would have re-classed their readers:
- **`table.css`'s element grammar** — `.ds-table th`/`td`, `--hover`, `__num`, `__name`,
  `__row-action` — read by four files under `examples/` plus `docs/`. It sits beside the
  new part grammar, kept apart by `:not(.ds-table-head)` / `:not(.ds-table-cell)` guards
  and a `.ds-table-container > .ds-table` rule that drops the frame for the composed
  component.
- **`.ds-spinner`'s drawn ring**, under `:not(svg)`. The React binding spins a Phosphor
  glyph; hand-written HTML has no glyph to spin, and without the ring every non-React
  consumer got an invisible rotating box.
- **`.ds-toolbar-spacer`**, for a hand-written full-width bar.

## [1.0.0-beta.5] — 2026-09-02

Eight net-new charts, all composing beta.4's substrate, all landing in clean
namespace. **This batch acquires no dependency**: `recharts` was already paid for,
and six of the eight are wrappers over `ChartContainer` / `ChartTooltip` /
`ChartLegend`. The other two are CSS grid and divs. Published on the `next`
dist-tag — `latest` stays at 0.11.0 for the whole migration.

### Added
- **`ComboChart`** — a volume series and a rate series on one x axis, with a
  second Y scale. The commonest business-dashboard shape, and the one `BarChart`
  and `LineChart` cannot cover between them because they cannot share an axis.
  `series` says which mark each config key draws as; marks are sorted back to
  front (area, bar, line) rather than drawn in declaration order, which is the
  difference between a visible line and one hidden under a bar.
- **`BulletChart`** — Stephen Few's bullet graph: one measure bar, one target
  tick across it, two or three qualitative bands behind both. `Meter`, `Gauge`
  and `Progress` all answer "where does this value sit in a range"; none of them
  can express a target, and that gap is why this exists. Library-free.
- **`FunnelChart`** — ordered stages with the drop-off derived from raw counts:
  `conversion="previous"` is the stage-over-stage drop, `"first"` is cumulative
  from the top. Both label columns are drawn in the chart's margins, not inside
  the trapezoids — the slice ramp runs the whole `--ds-chart-*` set and no single
  text colour clears AA against all six.
- **`WaterfallChart`** — signed deltas accumulating to a total, as two stacked
  bars per step: a transparent offset carrying the running base, and the delta
  floating on it. recharts has no waterfall primitive. `totalKeys` names the rows
  that *restate* the total rather than move it; without it the closing bar floats
  at roughly twice its true height.
- **`Treemap`** — a weighted hierarchy as nested areas, where a pie stops working
  and a bar chart runs out of room. Two levels is the ceiling on purpose. Tiles
  are a wash of their hue rather than a solid fill, which is what lets the label
  sit on something close to the page background and clear AA on every ramp slot
  in both themes. Not `Tree`, which is a navigation control.
- **`ScatterChart`** — quantity against quantity, with `sizeKey` adding a third
  variable as the mark's *area* (radius would double the apparent value). Both
  axes are pinned numeric and it is not a knob: recharts defaults its x axis to
  categories, which spaces the points evenly and quietly collapses a scatter into
  columns.
- **`RadarChart`** — a spider chart, two or three entities across many
  dimensions. Its `config`/`data` are transposed against every other wrapper
  here: rows are the spokes, config keys are the polygons.
- **`Heatmap`** — density across two axes as colour, in a `grid` form (sparse
  `{ x, y, value }`) or a `calendar` form (`{ date, value }`, week columns
  derived from the range). Library-free CSS grid; recharts has no heatmap
  primitive and the shape is a grid of coloured rectangles, which is what CSS
  grid already is. Every cell carries its own accessible name with both axes and
  its value — colour is the only encoding, so a grid of unlabelled divs would be
  a critical axe failure.
- **`--ds-heat-1` … `--ds-heat-5`** — a *sequential* ramp, one hue getting
  darker, derived from `--ds-chart-2`. Separate from the categorical
  `--ds-chart-*` ramp because reading a categorical ramp as a scale is the
  classic dataviz error. It is the one Tier-1 primitive `themes/dark.css`
  overrides, and it inverts there: a sequential ramp encodes magnitude, so "more"
  has to mean brighter on a dark page or the top of the scale sinks into it.
- **`--ds-bullet-label` / `--ds-bullet-value`** — the fixed label and figure
  column widths. Fixed rather than intrinsic because the primary use is a
  *stack*, and content-sized columns would leave every row starting at a
  different x. Set either on the chart or on a wrapper to retune one bullet or
  all of them.
- **Nine new assertions in `tests/chart-marks.spec.ts`** — the six recharts
  charts join the sizing and mark-geometry checks, `Heatmap` and `BulletChart`
  get the contract checks their library-free markup owes, and the funnel's stage
  labels are asserted under animation. See **Fixed**.

### Changed
- **`.ds-chart-container--plot` is not one height any more.**
  `.ds-funnel-chart-root`, `.ds-treemap-root` and `.ds-scatter-chart-root` each
  default `--ds-chart-height` to 16rem on their own element rather than taking
  `--plot`'s 14rem, because each needs vertical range the axis charts do not — a
  funnel is a stack of labelled bands, a treemap suppresses labels below a
  measured height, and a scatter needs range for the cloud to read as a cloud.
  A caller's inline `--ds-chart-height` lands on the same element and still wins.
- **`recharts` now backs twelve charts, not six** — `docs/react.md`'s install
  note names all twelve. Still an optional peer, still one copy resolved by the
  consumer.
- **`examples/components/charts.html`** gains a bullet-chart and a heatmap
  section with real markup, because both are library-free and their `.ds-*`
  classes are the whole contract for a non-React binding. The page is now linked
  from `examples/index.html`, which it was not.
- **The eight slugs are un-filtered in the docs registry** — 82 documented
  components, all eight now on the a11y and contract gates, with their demos and
  playgrounds moved out of `_pending/`.

### Fixed
- **Six dedupe exceptions resolved, not five.** The batch plan's table gives this
  batch five (`funnel-chart`, `radar-chart`, `scatter-chart`, `treemap`,
  `waterfall-chart`); `bullet-chart.css` carries a sixth in the same form and for
  the same reason. All six were one bargain — a Tailwind literal kept literal so
  `tailwind-merge` could dedupe a caller's override against it. With no Tailwind
  and no merge pass the literals became real declarations and the overrides
  became `--ds-chart-height`, `--ds-bullet-label` and `--ds-bullet-value`.
  Variables rather than competing classes on purpose: two height classes would be
  settled by stylesheet order, which is not a contract. Recorded in
  `docs/absorption/corrections.md`.
- **`FunnelChart`'s labels are asserted, not assumed.** The source comments that
  recharts gates a funnel's labels behind `showLabels = !isAnimating` and that
  the animation restarts forever, then never turns the animation off — on this or
  any component. Against the recharts this package pins, the labels do render
  with animation on, so the component is absorbed unchanged and the claim is now
  a test in the one gate that opts back out of reduced motion. A recharts bump
  that reintroduces the behaviour fails there rather than dropping the labels
  silently.

### Notes
- `renames.json` owes **no rows from removal** — all eight land in clean
  namespace and remove nothing. The two rows it does gain record the new knobs
  and the new ramp, which are consumer-visible without being renames.
- Three demos were re-wired onto incumbents that hold until a later batch:
  `bullet-chart/stack` onto the prop-driven `Card` (batch 7) and
  `bullet-chart/in-table` onto `DataGrid` (the source calls it `DataTable`).

## [1.0.0-beta.4] — 2026-09-02

The chart substrate and the six charts that replace hand-drawn marks. This is the
batch that buys `recharts` — as an *optional peer*, the way `react` is — and the
one where two of this package's stylesheets are deleted rather than added to.
Published on the `next` dist-tag — `latest` stays at 0.11.0 for the whole migration.

### Added
- **`Chart`, the substrate** — `ChartContainer`, `ChartTooltip(Content)`,
  `ChartLegend(Content)` and `ChartStyle`. It is what every chart in this batch
  and the next composes: a responsive plotting box, one place to name and colour
  a series (`config`), and the two pieces recharts leaves to a design system.
  It lands first even though its stylesheet is a replacement rather than an
  addition — dependency beats tier, because eight more charts import it in
  beta.5.
- **`Gauge`** — 0.11's `GaugeChart` under the source's shorter name, with every
  prop intact. Library-free, and now the only chart besides `Sparkline` that a
  non-React binding can render: two arc paths and two text nodes.
- **`react/lib/chart-series.ts`** — the six-colour ramp, the ident-safe
  `--color-<key>` naming and the per-slice colouring, as one module. 0.11 copied
  its `SERIES_COLORS` array into each of eight chart files.
- **`--ds-chart-height`** — the knob that replaced the source's Tailwind height
  literals. `.ds-chart-container` is 16/9; `--plot` swaps that for a fixed
  height and full width (the axis charts) and `--square` for a 1:1 box (pie,
  donut), both reading the variable.
- **`tests/chart-marks.spec.ts`**, in `site/` — the spec `playwright.config.ts`
  has cited since batch 0.1 and that did not exist. See **Fixed**.

### Changed
- **The chart merge: `charts.css` and `bar-chart.css` are deleted**, and the
  source's `chart.css` lands in their place, with `gauge.css`, `stacked-bar.css`,
  `pie-chart.css` and `donut-chart.css` beside it. The consequence is the batch's
  headline: **the marks are recharts nodes now, so line, area, bar, stacked bar,
  pie and donut are React-only.** There is no static markup that reproduces
  them and no class per mark. What the stylesheet owns is the frame — the box,
  the tooltip, the legend — plus the descendant rules that repaint recharts'
  hard-coded `#ccc` gridlines and `#fff` outlines onto `--ds-*` tokens in both
  themes. 0.11's `.ds-chart`, `.ds-linechart`, `.ds-areachart`, `.ds-donut`,
  `.ds-piechart`, `.ds-stackedbar` and `.ds-barchart` families are gone; every
  one is mapped in [migration/from-0.11.md](docs/migration/from-0.11.md).
- **Six charts replaced**, each an incumbent the react-ledger read as a
  class-applier: `LineChart`, `AreaChart`, `BarChart`, `StackedBar`, `PieChart`
  and `DonutChart`. All six now take a `config` plus rows of `data` instead of
  parallel arrays, because that object is already how this system names and
  colours a series and how the tooltip and legend find their labels. `AreaChart`
  gains `stacked`, `DonutChart` gains `centerCaption`, and `BarChart` keeps
  0.11's `max`, `horizontal` and status tones under its own prop names.
- **All six of 0.11's bar tones survive.** The source's `STATUS_COLORS` carried
  four; `critical` and `neutral` are added back, because the incumbent
  `.ds-barchart__bar.is-*` block defined all six and they are the system's status
  family. Reported rather than silently narrowed.
- **`Sparkline` keeps its `--ds-chart-1` default.** The source relied on
  inheritance, which would have let a themed `--ds-accent` repaint data; batch
  0.3 moved series off the accent on purpose, so the incumbent's `color`
  declaration stays. Its parts are flat kebab now (`__line` → `-line`), and
  `--animate` moved from the root onto the polyline — the element the keyframe
  actually draws. The keyframe stays in `components/motion.css`, where this
  system keeps every animation it can be asked to switch off.
- **Five dedupe exceptions resolved, not carried** — matching the plan's count,
  one of them in TSX (`pie-chart.tsx`) rather than CSS. All five were the same
  bargain: a Tailwind height or aspect literal kept literal so `tailwind-merge`
  could dedupe a caller's override against it. With no Tailwind and no merge
  pass, the literals became real declarations and the override became
  `--ds-chart-height` — deterministic, where two competing height *classes*
  would be decided by stylesheet order.
- **`examples/components/bar-chart.html` is deleted** and
  `examples/components/charts.html` rewritten: the gauge, the frame classes, and
  a pointer to the workbench for the six React charts. `kitchen-sink.html`'s bar
  chart section becomes a gauge section, and `templates/dashboard.html`'s chart
  panel becomes a `.ds-table` of figures with a sparkline per row — the pattern
  that stays plain markup, and in a dashboard it carries the value and the trend
  at once.
- The nine slugs are un-filtered in the docs-site registry, which is what puts
  them on the a11y and contract gates: **74 documented components**.

### Fixed
- **The phantom `tests/chart-marks.spec.ts`.** `playwright.config.ts` sets
  `reducedMotion: "reduce"` for every suite because recharts animates in
  JavaScript, and claimed one gate opted back out and ran the animation for
  real. That gate did not exist. It does now — and writing it immediately caught
  a defect nothing else could see: the `/docs/chart` demos import `Bar` and
  `XAxis` themselves and hand them to the package's `ChartContainer`, so the two
  recharts copies (the site's and the package's) put the children and the
  container on different contexts and **the plot rendered empty, with no error**.
  Fixed by deduping recharts in `site/vite.config.ts` and by declaring it a peer
  rather than a dependency, which is the same fix for a consumer.
- **A focus ring that drew nothing.** The source reserved
  `outline: 2px solid transparent` on the three nodes recharts' accessibility
  layer focuses — Tailwind's `outline-hidden` idiom. It is bound to
  `:focus-visible` with the charte's real 2px `--ds-focus-ring` outline instead.
- **A tooltip lifted off the page.** The source's tooltip carried a 10%-ink ring
  plus two shadow layers; the charte does not drop-shadow, so it is the same 1px
  solid ink surface `.ds-menu` and `.ds-hover-card-content` use.
- **Two unprefixed tokens on the tooltip swatch.** `--color-bg` / `--color-border`
  belonged to the shadcn tier batch 0.3 deleted; the swatch reads one
  `--ds-chart-indicator`, set inline by the binding that knows the series.
- **A flat sparkline drawn along the floor.** 0.11 divided by a `|| 1` span, so a
  series of equal values — or a single point — hugged the bottom of the box and
  read as a minimum it was not. It pins to the vertical middle.
- `--font-mono`, `--popover`, `--muted-foreground`, `--border` and the rest of
  the source's unprefixed vocabulary are remapped onto `--ds-*` throughout;
  mono type is the platform stack `.ds-kbd` and `.ds-snippet` spell out, since
  this system defines no mono token.

### Migration
- **`GaugeChart` is `Gauge`.** Every prop survives (`value`, `max`, `size`,
  `thickness`, `label`, `color`, `thresholds`, `format`), so a find-and-replace
  of the symbol is the whole migration. `GaugeChartProps` and
  `GaugeChartThreshold` become the inline props type and `GaugeThreshold`.
- **`recharts >= 3` is an optional peer dependency.** Install it to use the six
  charts; install nothing if you only consume the CSS. A peer rather than a
  dependency because a chart's children are written by the consumer, so there
  can only be one copy — see **Fixed**.
- Twenty-one rows in [docs/migration/renames.json](docs/migration/renames.json),
  the largest set before batch 6: eight export renames or signature changes,
  eleven class families, `--ds-chart-height`, and the file move. The class rows
  are honest about what has no replacement — a hand-written bar chart has none.
- Three forward cross-batch imports re-wired onto the incumbents, each to be
  paid again later: the `sparkline/stat-card` demo composes onto this package's
  prop-driven `StatCard` (batch 6 brings the compound parts), `sparkline/table`
  onto the `.ds-table` classes (batch 6), and `stacked-bar/inline` onto the
  prop-driven `Card` (batch 7).

## [1.0.0-beta.3] — 2026-09-02

Net-new form controls and primitives. Fifteen components, three of which replace a
symbol this package already exported, and two more that ship a stylesheet with no
React binding.
Published on the `next` dist-tag — `latest` stays at 0.11.0 for the whole migration.

### Added
- **Ten net-new components:** `Toggle`, `Meter` (5 parts), `RelativeTime`,
  `Editable`, `PhoneInput`, `FieldArray` (5 parts), `Label`, `Form`,
  `Collapsible` (3 parts) and `DirectionProvider`. `Toggle`, `Meter` and `Form`
  arrived through alias withdrawals: no incumbent renders a standalone
  two-state button, a `role="meter"` track, or a form root with a validation
  context.
- **Two stylesheet-only components:** `carousel` and `input-otp`. Their
  bindings wrapped `embla-carousel-react` and `input-otp`, and neither
  dependency is acquired — in both cases the dependency *is* the component
  (drag and snap; the hidden-input trick that makes a row of boxes behave like
  one field), so the `.ds-carousel-*` and `.ds-input-otp-*` classes are the
  whole contract. Same arrangement `resizable` and `message-scroller` landed
  under in beta.2: `exports: []`, no import line on the page, and one demo that
  is the markup a binding has to produce.
- `useControllableValue` — the controlled/uncontrolled pattern as one hook,
  which `Editable` and `PhoneInput` both need. `Rating` hand-rolled the same thing
  and is a held component, so it is left alone.
- `.ds-button--xs` and `.ds-button--icon.ds-button--xs` — the 24px square
  `IconButton`'s new `icon-xs` size needs, which `Editable` and `FieldArray`
  are what asked for.
- **Six modifier classes**, each one a resolved dedupe exception:
  `.ds-carousel-item--half` / `--third`, `.ds-field-array-item--stacked` /
  `--stretch`, `.ds-field-array-item-content--grid` and `.ds-wordmark--lg`.

### Changed
- **`ButtonGroup` is replaced.** Its four-rule block leaves `button-extras.css`
  for a `components/button-group.css` that adds a text cell, a separator and
  `[data-orientation="vertical"]`, and collapses the shared edge by *removing*
  the losing border rather than overlapping members with `margin-left: -1px` —
  identical in LTR, correct in RTL. The class name and the published markup are
  unchanged: every selector matches both the new parts' `data-slot` and this
  package's own `.ds-button`, `.ds-input` and `.ds-select`, so the hand-written
  groups in `examples/` and `docs/components.md` keep joining.
- **`Wordmark` gets the produced lockups.** 0.x drew the brand's three elements
  as primitives — a circle, a square and a diagonal line. What lands is the
  finished artwork: the typographic wordmark, and the monogram that sets it
  inside the symbol, both as `currentColor` paths, so ink colour recolours them
  and they invert with the theme for free. `assets/logo/diametral-mark.svg`
  still holds the geometric mark and has **not** been re-cut to match — the
  React binding and that file now draw different marks, which is a brand-asset
  decision rather than a code one. `name` and
  `sub` are the one part of the incumbent this does **not** replace; see
  **Migration**.
- **`IconButton` moves and gains sizes.** Out of `ButtonExtras.tsx` into its own
  `icon-button.tsx`, with the source's four square size spellings (`icon`,
  `icon-xs`, `icon-sm`, `icon-lg`) accepted alongside the bare `sm` and `lg`
  this package already shipped. The required `label` — which the source's own
  file calls "the whole component" — was already required on both sides; the
  react-ledger's "incumbent is a class-applier" premise does not hold here, in
  the same way batch-plan §1.1 found for `stat-card`. Reported rather than
  silently flipped.
- **`.ds-label` merges into an occupied namespace.** The class was already
  defined in `base/typography.css` as the charte's signature small-caps
  treatment, and the ledgers read `label` as a clean addition because they
  scanned `css/components/`. The incumbent's weight, tracking and colour are a
  published contract and stay exactly as they are; `components/label.css` adds
  only the flex row, `user-select: none` and the two state overrides.
- **Six dedupe exceptions are resolved, not carried** — matching the plan's
  count, and two of them in TSX rather than CSS. `field-array`'s two
  (`flex items-center`, `flex`), `carousel`'s `basis-full`, `wordmark`'s svg
  sizing, `phone-input`'s two-sided one, and `button-group.tsx`'s — which was
  already paid, since beta.2 landed `.ds-separator--auto` for exactly this when
  `separator` arrived early for `item`.
- `class-variance-authority` still is not acquired (ADR 0001). The five
  components that used it declare the same cva-shaped block through
  `react/lib/variants.ts`.
- `.ds-wordmark` and its `__mark` / `__name` / `__sub` parts move from
  `app-bar.css` to `components/wordmark.css`, verbatim and with no visual
  change.

### Fixed
- **A `@layer` bargain that no longer exists.** `label.css`'s opening comment
  explained why three of its declarations sat below Tailwind's
  `@layer utilities` so a call site could override the label's voice. With no
  Tailwind and no layers the block merges into source order — but the intent
  survives, because it was never about layers: the two overrides that mattered
  are real rules winning on specificity, as they always did.
- **Two selectors keyed to marker classes nothing applies.** `label.css` read
  Tailwind's `.peer` and `.group`, so both rules would have landed inert — the
  same defect beta.2 found in `item.css`. They read the real state instead:
  `:disabled` on the sibling control and the `data-slot` a checkbox, radio or
  switch carries.
- **`.dark`-only rules that never painted**, in `toggle.css` and
  `input-otp.css`: this system's dark theme also answers to
  `[data-theme="dark"]`, which is what the docs site sets. Both were softened
  alpha mixes of a colour the rule above already sets, so the solid 1px rule
  carries the state on both themes rather than the pair being duplicated.
- **Three more `svg:not([class*="size-"])` escape hatches** removed, from
  `toggle`, `button-group` and `input-otp`, plus `:not([class*="w-"])` on
  `button-group`'s select trigger. There is no Tailwind utility to escape, and
  each negation silently skipped any element whose class merely contained the
  fragment.
- **A meter bar reading a text token.** The source's six tone keys read the
  `--ds-*-ink` family — the shade tuned for small text on a tint — and only four
  of the six exist here. They read `--ds-*-solid`, the family tuned for fills,
  which is what a bar with nothing written on it wants and which has all six.
- Focus rings and invalid glows across `toggle` and `input-otp`: the charte
  focuses with a 2px `outline` on `--ds-focus-ring` and separates by a 1px rule,
  not a colour ring in `box-shadow`.
- `prefers-reduced-motion` branches for the OTP caret blink, the meter's value
  transition and the editable pencil's fade.

### Migration
- **`Wordmark`'s `name` and `sub` survive**, and are the only part of the
  incumbent this batch keeps: the source's Wordmark is the mark alone, while
  `ConsoleLayout`, the Vite starter and `docs/migration.md`'s 0.x class table
  all read them, and `.ds-wordmark__name` / `__sub` are a published contract.
  Dropping them would be a regression rather than an absorption. They no longer
  *default*, though — a bare `<Wordmark />` is now the lockup alone where it
  used to print the word "Diametral" — and a name beside the mark wants
  `variant="square"`, since the horizontal lockup already spells it.
  `ConsoleLayout`'s `brand={{ name, sub }}` does that for you.
- Four rows in [docs/migration/renames.json](docs/migration/renames.json), for
  the three replaced applier symbols plus the `wordmark.css` file move.
- Three re-wirings are recorded as notes rather than rows. `Editable`,
  `FieldArray` and `IconButton` compose onto this repo's `Button` and
  `IconButton` until batch 7 supplies the source's — which makes `Editable`'s
  three affordances carry a required accessible name they did not have.
  `PhoneInput`'s five-part Base UI select collapses onto the native `Select`,
  which is also what dissolves this batch's largest dedupe exception: with
  nothing literal on either side, the overrides win on specificity instead of
  through a merge pass.

## [1.0.0-beta.2] — 2026-09-02

The content and media family. Fifteen net-new components, all in a clean namespace, and
the first two that ship a stylesheet with no React binding at all.
Published on the `next` dist-tag — `latest` stays at 0.11.0 for the whole migration.

### Added
- **Thirteen net-new components with bindings:** `Attachment` (9 parts), `Item` (10),
  `Bubble` (4), `Message` (6), `Toc` (5), `ThemeSwitcher`, `Marker` (3), `ScrollArea` (2),
  `Separator`, `Snippet`, `QrCode`, `AspectRatio` and `Masonry`. Every `.ds-*` class is a
  new name — nothing in 0.11 is renamed or replaced.
- **Two stylesheet-only components:** `resizable` and `message-scroller`. Their bindings
  wrapped `react-resizable-panels` and `@shadcn/react`, and neither dependency is
  acquired, so the `.ds-resizable-*` and `.ds-message-scroller-*` classes are the whole
  contract. Their docs pages print no import line and say why.
- `CodeBlockCopyButton` — the copy affordance extracted out of `CodeBlock`, so `Snippet`
  composes it instead of duplicating the clipboard fallback. `CodeBlock`'s own props and
  markup are unchanged.
- `QrCode` brings a hand-rolled ISO/IEC 18004 byte-mode encoder (`react/lib/qr-encode.ts`)
  — versions 1–10, all four correction levels, no dependency, no network, no canvas.

### Changed
- **`class-variance-authority` still is not acquired** (ADR 0001, restated). The four
  absorbed components that used it declare the same cva-shaped block through
  `react/lib/variants.ts`, which the docs site's build-time playground extractor now reads
  as well as `cva()` — so no batch has to restate its variant axes in `playgrounds.ts`.
- `Segmented`, `IconButton`, `CodeBlock` and Base UI's `Menu` take over from four held or
  not-yet-landed source components. See **Migration** below.
- **Eight dedupe exceptions are resolved, not carried.** Each was a Tailwind literal left
  in place upstream so `tailwind-merge` could dedupe it against a consumer override; with
  no Tailwind here each becomes a real declaration plus a modifier for the override:
  `.ds-toc--static`, `.ds-toc-label--tight`, `.ds-toc-list--tight`,
  `.ds-toc-link--current`, `.ds-bubble-group--loose`,
  `.ds-message-scroller-content--tight`, `.ds-separator--auto`, and `resizable`'s
  `h-full w-full`, which become the group's own defaults.

### Fixed
- **Three Tailwind classes were shipping with nothing behind them.** `scroll-fade-b`,
  `scroll-fade-x` and `scrollbar-none` came from shadcn's Tailwind plugin and Tailwind's
  core; with no Tailwind in this package they were inert class names. The two scroll fades
  are real `mask-image` gradients now and the hidden scrollbar is real CSS.
- **A dead animation.** `attachment.css` ran `animation: shimmer …` on the title while a
  file uploads, and no `shimmer` keyframe exists anywhere in the source — the documented
  behaviour never happened. It is a real opacity pulse now, with a
  `prefers-reduced-motion` branch.
- **Six `svg:not([class*="size-"])` escape hatches** removed from `attachment`, `item` and
  `marker`: nothing to escape without Tailwind, and they silently skipped any icon whose
  class happened to contain `size-`.
- **`Bubble`'s ghost and destructive dark states** were keyed to `.dark` alone; this
  system's dark theme also answers to `[data-theme="dark"]`, which is what the docs site
  sets, so they never painted. Same defect batch 1 fixed in `navigation-menu`.
- **A selector that matched nothing.** `item.css` scoped a zero-padding rule to
  `[data-slot="dropdown-menu-content"]`, the source's own held popup; it reads `.ds-menu`,
  this repo's menu surface, instead.
- **A white-on-white bubble in dark mode.** `Bubble`'s default variant reads `--ds-bg` for
  its text rather than `--ds-on-accent`, which is pinned to white and is not flipped by
  the dark theme.
- Drop shadows on `.ds-bubble-reactions` and the source's `ring`-plus-glow focus styles
  across all fifteen stylesheets: the charte separates by 1px rule and focuses with a 2px
  `outline` on `--ds-focus-ring`.

### Migration
- **No renames.** Every class and export in this release is additive; see
  [docs/migration/from-0.11.md](docs/migration/from-0.11.md).
- Four re-wirings are recorded as notes rather than rows in
  `docs/migration/renames.json`. `AttachmentAction` and `ThemeSwitcher`'s `cycle` variant
  compose onto `IconButton` until batch 7 supplies the source's `Button` — `IconButton`
  requires `label`, so an icon-only action now carries an accessible name the source's own
  ghost button never had. `ThemeSwitcher`'s `segmented` variant is this repo's
  `Segmented`: its cells show a visible word beside the glyph, and the source's sliding
  indicator does not survive the toggle cells it was pitched against. Its `dropdown`
  variant is Base UI's `Menu` wearing `.ds-menu`, the same re-wiring batch 1's `menubar`
  made. `Snippet` composes `CodeBlockCopyButton`.
- `separator` ships here rather than in batch 3: `item.tsx` imports `Separator`, and this
  repo had no `Separator` and no `.ds-separator` rule to re-compose onto. Landing both
  together dissolves the import instead of re-wiring it twice.

## [1.0.0-beta.1] — 2026-09-02

The first absorption beta: `@diametral/ui`'s overlay and menu family enters the system.
Published on the `next` dist-tag — `latest` stays at 0.11.0 for the whole migration.

### Added
- **Six net-new components**, all in a clean namespace: `ContextMenu` (15 parts),
  `Menubar` (16), `Autocomplete` (12), `NavigationMenu` (9 + `navigationMenuTriggerStyle`),
  `HoverCard` (3) and `SpeedDial` (2). Each ships its `.ds-*` stylesheet, so any binding
  can render the look; the keyboard and focus contract is React-only, and each component's
  [binding tier](docs/components.md) says so.
- `--ds-*` classes for all six, bundled into `css/diametral.css`.

### Changed
- **`@base-ui/react` and `@phosphor-icons/react` are now runtime `dependencies` of the
  React layer** ([ADR 0001](docs/adr/0001-base-ui-as-a-substrate.md)). The
  zero-dependency promise is restated, not dropped: CSS, tokens and Web Components still
  import nothing, and a release-blocking `layer-purity` check keeps that true.
- **`/docs/context-menu` documents the real `ContextMenu`.** It previously documented
  `Dropdown` and the absence of a right-click menu. Nothing a consumer imports changed
  name — `Dropdown` is unmoved.
- The seven `z-index: 50` values the overlay family arrived with are `var(--ds-z-popover)`.

### Fixed
- **The absorbed popups no longer paint drop shadows.** They arrived with a 10%-ink ring
  plus two shadow layers; the charte separates by 1px rule, so each is a bordered flat
  surface, and their focus rings use this system's `outline` convention.
- **A submenu's border ring.** The source re-applied a `shadow-md` class on
  `ContextMenuSubContent` on top of the popup's own `box-shadow`; as a single-class
  override it *replaced* it, dropping the 1px ring. The class is deleted.
- **`NavigationMenu`'s destructive-row dark state.** It was keyed to `.dark` alone, and
  this system's dark theme also answers to `[data-theme="dark"]` — which is what the docs
  site uses, so the rule never painted.

### Migration
- No renames. Every class and export in this release is additive; see
  [docs/migration/from-0.11.md](docs/migration/from-0.11.md).
- Two re-wirings are recorded as notes rather than rows in
  `docs/migration/renames.json`: `SpeedDial` composes onto `IconButton` and
  `Autocomplete` onto `InputGroup` until batch 7 supplies the source symbols. `tone` on
  `SpeedDial` therefore takes `primary` or `danger`, not the source's eight tones.

## [0.11.0] — 2026-06-23

### Fixed
- **Light/Dark/Sepia theme switcher now works out of the box.** `css/diametral.css`
  bundles `css/themes/dark.css` + `css/themes/sepia.css` (scoped to
  `[data-theme="dark"|"sepia"]`, so they stay inert until a theme is activated).
  Previously `ConsoleLayout`'s switcher set `data-theme` on `<html>` but the
  bundle shipped no matching rules, so switching had no visible effect.

### Changed
- **Title voice / fonts.** The `vite-react` starter now loads **Fraunces** next to
  Geist, so headings render in the intended free serif instead of falling back to
  Georgia. The **Keycloak login theme** likewise loads Fraunces, and its
  `--ds-serif` now prefers `Ufficio → Fraunces → Georgia` — matching the app's
  heading font across login and app.

## [0.10.0] — 2026-06-22

### Added
- **Reference for Claude / AI assistants**: a single self-contained
  [`docs/for-claude.md`](docs/for-claude.md) (principles, tokens, every component as copy-paste
  HTML, the grid system, a full example, and don'ts) plus a root [`llms.txt`](llms.txt) index — for
  use with claude.ai's design-systems feature. Verified by having a fresh assistant build a screen
  from the doc alone: 33 classes used, all real, rendered on-brand.

### Changed
- **Keycloak login theme**: added CSS for the special pages (TOTP setup, select-authenticator,
  recovery codes, OAuth grant). All 41 login + 13 email templates are inherited from the `keycloak`
  parent and styled; login, reset, register, update-password and TOTP-setup verified on Keycloak 25.

## [0.9.0] — 2026-06-22

### Added
- **Keycloak theme** ([`keycloak/`](keycloak/)): a drop-in theme branding the **login** flow
  (sign-in, reset password, OTP, register, update password, verify email, error/info) via one
  stylesheet on the classic `keycloak` parent, and the **transactional emails** by overriding the
  shared HTML shell (`email/html/template.ftl`). Includes a `docker-compose.yml` to try it and a
  README covering install + realm selection. Ships in the npm package under `keycloak/`.

## [0.8.1] — 2026-06-19

### Fixed
- **Streamlit guide**: inject the **flattened `dist/diametral.css`** bundle (fetched + inlined),
  not `css/diametral.css` (whose relative `@import`s 404 once inlined) nor a bare `<link>` (Streamlit
  can strip it). Verified end-to-end in a Docker Streamlit app.

### Added
- A runnable **Streamlit example** at [`examples/streamlit/`](examples/streamlit/) (app +
  `.streamlit/config.toml` + Dockerfile).

## [0.8.0] — 2026-06-19

### Added
- More **email templates** — `inviteEmail`, `digestEmail`, `alertEmail` — plus a
  `kitchenSinkEmail` reference that exercises every block, and new email blocks
  `callout` / `list` / `statBand` / `quote` / `card`.
- A **Streamlit (Python) guide** ([`docs/streamlit.md`](docs/streamlit.md)): theme config + CSS
  injection + rendering `.ds-*` blocks via `st.markdown`, with caveats for native widgets, charts,
  the React components and emails.

## [0.7.0] — 2026-06-19

### Added
- **Email kit** (`@diametral/design-system/emails`): dependency-free, **email-safe** builders
  (table layout + inline styles + system-font fallbacks, flat / 1px / no-radius) for on-brand
  transactional emails — a shared `layout()` + block helpers (`button`, `heading`, `kicker`,
  `codeBox`, `row`…) and ready-made `welcomeEmail` / `passwordResetEmail` / `otpEmail` /
  `notificationEmail` / `invoiceEmail`. Live previews at `examples/components/email.html`; docs in
  [`docs/emails.md`](docs/emails.md).

## [0.6.0] — 2026-06-19

### Added
- **Motion** (restrained, honors `prefers-reduced-motion`): a thin indeterminate top **load bar**
  and a content **fade** on navigation in `<ConsoleLayout>` (new `loading` prop); a **`.ds-pulse`**
  "live" dot; a StatCard **count-up** (`animate`); and a Sparkline **draw-in** (`animate`).
- The demo now loads real data from a static-JSON **API** ([`examples/demo/api/`](examples/demo/api/)):
  the Overview chart via `useResource` (Skeleton → chart), and the Invoices table via a JSON-backed
  `loadPage` (skeleton rows → data). Documented in [`docs/data.md`](docs/data.md).

## [0.5.1] — 2026-06-19

### Fixed
- `Select` now accepts bare-string `options` (e.g. `["Director","Manager"]`), normalizing them to
  `{ value, label }` like `MultiSelect` — previously bare strings rendered empty `<option>`s.

### Changed
- The demo **Settings** page is now a forms showcase: regex validation (email / username),
  cross-field password confirmation, color picker, date picker and a multi-select dropdown — all
  built on `useForm` + `<FormField>`.

## [0.5.0] — 2026-06-19

### Added
- **Icons**: a Lucide-compatible line-icon set (~34 icons) with a React `<Icon name>`, a
  `<ds-icon>` web component, `.ds-icon` CSS, and a showcase page. Any 24×24 stroke-2 SVG (e.g.
  Lucide) drops in unchanged.
- **Figma tokens**: `scripts/build-figma.mjs` (wired into `npm run build`) emits
  `dist/figma-tokens.json` in Tokens Studio format for designer handoff. See `docs/figma.md`.
- **Accessibility tests**: `tests/a11y.spec.js` (axe via `@axe-core/playwright`) gates key pages on
  no critical/serious violations, with a `a11y.yml` CI workflow and a `test:a11y` script.

### Fixed
- Accessibility issues surfaced by the new axe gate: low-contrast nav labels, unlabeled form
  controls, and ARIA on the calendar grid, popover, command palette, progress bar and scrollable
  code blocks.

## [0.4.0] — 2026-06-18

App-acceleration kit — everything a team needs to stand up an app fast.

### Added
- **ConsoleLayout** (`<ConsoleLayout>` + `.ds-console`): turnkey app chrome — app bar, data-driven
  grouped sidebar nav, optional ⌘K command palette, and an optional Light/Dark/Sepia theme switcher
  around your page content. The demo app is rebuilt on it.
- **Form layer**: `useForm` hook (values/errors/touched/validation/submit) + `<FormField>` wired to
  the DS `Field`/`FieldHint`. See `docs/forms.md`.
- **Data layer**: `useResource(fetcher, deps)` for loading/empty/error/data state, and
  `restLoadPage(baseUrl)` — a `<DataGrid loadPage>` factory for REST endpoints. See `docs/data.md`.
- **Theme generator**: `scripts/make-theme.mjs --name --accent …` writes a `[data-theme]` override
  file; an example `css/themes/ocean.css` ships. See `docs/theme-generator.md`.
- **Vite + React + TS starter** (`starters/vite-react/`): clone-and-go app pre-wired with the DS +
  ConsoleLayout + routing + example pages (`npm run build` verified).
- **Shared DX configs** (`configs/`): flat ESLint, Prettier, base tsconfig, and VS Code snippets,
  consumable via `@diametral/design-system/configs/*`.
- **Recipes** (`docs/recipes.md`): end-to-end page patterns (app shell, CRUD, dashboard, auth,
  loading/empty/error) and a Console layout showcase page.
- A **theme switcher** in the demo app bar (Light / Dark / Sepia).

### Changed
- Exports add `./react/*` (deep imports) and `./configs/*`.

## [0.3.0] — 2026-06-18

### Added
- **PageHeader** component (`.ds-page-header` + React `<PageHeader>`): breadcrumb + title + actions
  + optional tabs row.
- **Blocks** — a new showcase area of composed, copy-paste sections: App chrome, Auth, Marketing
  (on the visible grid system), and Data & detail (`examples/blocks/`).

### Changed
- The live demo app (`examples/demo.html`) is refactored into ES modules (`examples/demo/`) and
  expanded to **14 views**: Overview, Projects (+ project detail with stepper, burn-down, risks),
  Board, Reports (funnel/trend/pie/gauge), Invoices, Candidates → CV, Team → profile, Training,
  Calendar, Knowledge base, Files, Inbox, Settings — with a ⌘K command palette and one consistent
  content width across every view.

## [0.2.1] — 2026-06-18

### Changed
- Published to the **public npm registry** as `@diametral/design-system` (scope renamed from
  `@littlebigcode`). Installs with no registry config and no token.
- The published package is lean and license-safe: ships the free font CSS + logo SVGs + docs, and
  **excludes** the commercial Ufficio font binary, the photography, and raster brand PNGs
  (~193 kB vs 7.3 MB). The GitHub Packages workflow was removed; CI publishes to public npm on a
  `v*` tag / GitHub Release via the `publish-npm.yml` workflow (NPM_TOKEN environment secret).
- Installation docs lead with the frictionless public-npm install.

## [0.2.0] — 2026-06-18

A major, Clarity-inspired component expansion with full React integration.

### Added
- **Data grid** (`DataGrid`, `.ds-datagrid`) — sortable columns, per-column filters, row
  selection, expandable detail rows, column show/hide, pagination, and **lazy server-side
  loading** in paginated or infinite (“load more”) mode, with skeleton loading rows.
- **New components** (CSS + React + showcase page each): Card, Description list, Empty state,
  Skeleton, Alert, Spinner, Progress, Toast (+ `ToastProvider`/`useToast`), Checkbox, Radio
  (+ `RadioGroup`), Select, Textarea, Range, Input group, field validation (`FieldHint`),
  Breadcrumb, Pagination, Vertical nav, Stepper, Tooltip, Dropdown menu, Accordion, Popover,
  Avatar (+ `AvatarGroup`), Tag, Timeline, Tree view, and Button variants (sizes, icon-only,
  loading, block, button group, split button).
- `Button` React component gained `size`, `loading`, and `block` props.
- New tokens: `--ds-z-popover`, `--ds-z-toast`.
- **More components**: Drawer (off-canvas), Command palette (⌘K), Sparkline, Bar chart, Stat
  card, Rating, Date range picker, Color picker, Code block, and Kbd.
- **Charts**: a dedicated categorical palette (`--ds-chart-1…6`, legible & well-spaced) now drives
  series colors (fixing the near-identical accent/warning clash); added Pie, Gauge, and Stacked-bar
  charts with `<title>` hover tooltips.
- **Visual regression tests**: a Playwright pipeline (`playwright.config.js`, `tests/visual.spec.js`,
  a GitHub Actions workflow) with `npm run test:visual` / `test:visual:update`.
- **Docs**: a full installation & integration guide (`docs/installation.md`) for npm/CDN, Vite,
  Next.js, CRA, Angular, Vue, Tailwind, and import-map prototyping — also as an in-showcase
  page (`examples/installation.html`).
- **Live React example apps** (shadcn-style, buildless) under `examples/demos/`: a Dashboard, an
  Inbox/mail app, a tabbed Forms/settings page, and a Login screen. The Charts showcase now mounts
  the real React chart components live (interactive hover tooltips); axis labels no longer upscale
  and point markers dropped the white halo.
- Showcase navigation reorganized into Actions / Forms / Data display / Feedback /
  Navigation / Overlays / Platform groups; new live React data-grid demo.

### Changed
- The React entry (`react/index.js`) now re-exports the full extended library from
  `react/components/*`.

[0.2.0]: #020--2026-06-18

## [0.1.0] — 2026-06-17

Initial extraction of the Diametral Design System from the `pricing_matrix` app and the
official brand charter.

### Added
- **Tokens** — three-tier `--ds-*` system in `css/tokens.css`, sourced from
  `tokens/tokens.json` (primitives → semantic → scale). Brand palette reconciled to the
  charter (accent = `#FF2A00`; the pre-charter `#ff5500` kept as `--ds-accent-legacy` /
  `--ds-warning`). The secondary green `--ds-vert` is sampled from the charter and flagged
  for confirmation.
- **CSS components** (`.ds-*`, framework-agnostic): button, switch, badge, tabs, field,
  chip, banner, callout, panel, status panel (signature), segmented, table, modal,
  section heading, app bar. De-domained from the source app.
- **Web Components** — light-DOM custom elements (`<ds-button>`, `<ds-badge>`,
  `<ds-callout>`, `<ds-panel>`, `<ds-section-heading>`, `<ds-status>`, `<ds-switch>`,
  `<ds-tabs>`, `<ds-segmented>`, `<ds-modal>`).
- **React components** — real, typed React components in `react/` (`Button`, `Input`,
  `Field`, `Badge`, `Chip`, `Banner`, `Callout`, `Panel`, `SectionHeading`, `Status`,
  `Metric`, `Switch`, `Tabs`, `Segmented`, `Modal`, `Wordmark`). Plain-JS ESM (no build),
  with `index.d.ts` types and optional `react`/`react-dom` peers. Live demo at
  `examples/react.html`.
- **Multi-stack artifacts** — `npm run build:tokens` generates `dist/tokens.css`,
  `dist/tokens.scss`, and `dist/tailwind-preset.cjs`.
- **Themes** — opt-in `css/themes/dark.css` (supports `[data-theme="dark"]`, `.dark`, and
  `:root.dark-theme`) and a `_brand-example.css`.
- **Showcase** — buildless multi-page documentation in `examples/` that dogfoods the system.
- **Docs** — English documentation in `docs/`, plus `README`, `CONTRIBUTING`, this changelog.
- **Compat** — opt-in `css/compat/legacy-aliases.css` for incremental migration off the
  original stylesheet.

[0.1.0]: #010--2026-06-17
