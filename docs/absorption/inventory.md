<!--
Derived artifact. Copied from diamorval/design-system-diametral,
branch research/inventory, commit b5f492d862fafbab2861e970a8f45d94f818ea7e, path docs/migration/inventory.md.
Copied 2026-09-01. Do not edit here to correct a measurement — correct it at
the source and re-copy, or the two diverge silently.
-->

# Inventory: `@diametral/ui` → `@diametral/design-system`

Resolution artifact for [Inventory both systems, component by component](https://github.com/diamorval/design-system-diametral/issues/152), a ticket on [Absorb @diametral/ui into the official Diametral design system](https://github.com/diamorval/design-system-diametral/issues/151).

**Fact-gathering only.** No verdicts on which implementation wins — that is the curation rubric's job. Where the two systems disagree, this document records *that* they disagree and on what.

Measured 2026-08-28 against source `packages/ui` @ `feat/css-conversion` and target `/Users/augustinmorval/code/design-system` @ v0.11.0.

## Headline counts

| | count |
| --- | --- |
| source components (`.tsx`) | 119 |
| source CSS files | 111 of 119 components have one |
| → **overlap** (a same-or-aliased target component exists) | **83** |
| → **net-new** (no target counterpart) | **30** |
| → **partial** (functionally covered under a different name) | **6** |
| target React export symbols | 93 (in ~50 files — exports ≠ files) |
| target CSS component files | 68, **all 68** imported by `css/diametral.css` |
| target-only React symbols | 4: `Callout`, `Chip`, `ConsoleLayout`, `SectionHeading` |
| target-only CSS files | 5: `callout`, `chip`, `console-layout`, `motion`, `section-heading` |

## Component-by-component

Columns follow the ticket. `target CSS` names the file in `css/components/`; `target React` names symbols exported from `react/`.

| source | → target React | → target CSS | status | runtime deps | src CSS root class | src CSS size | target surfaces touched |
| --- | --- | --- | --- | --- | --- | --- | --- |
| `accordion` | `Accordion` | `accordion` | overlap | `@base-ui/react`, `@phosphor-icons/react` | `ds-accordion` | 96L / 9 cls | — |
| `agenda` | `Agenda` | `agenda` | overlap | — | `ds-agenda` | 67L / 10 cls | — |
| `alert` | `Alert` | `alert` | overlap | `@phosphor-icons/react`, `class-variance-authority` | `ds-alert` | 121L / 13 cls | — |
| `alert-dialog` | `Modal` | `modal` | overlap | `@base-ui/react` | `ds-alert-dialog` | 171L / 7 cls | tailwind-preset, web-components |
| `area-chart` | `AreaChart` | `charts` | overlap | `recharts` | — | none | tailwind-preset |
| `aspect-ratio` | — | — | net-new | — | `ds-aspect-ratio` | 6L / 1 cls | — |
| `attachment` | — | — | net-new | `@base-ui/react`, `class-variance-authority` | `ds-attachment` | 232L / 8 cls | — |
| `autocomplete` | — | — | partial | `@base-ui/react`, `@phosphor-icons/react` | `ds-autocomplete` | 167L / 9 cls | — |
| `avatar` | `Avatar`, `AvatarGroup` | `avatar` | overlap | `@base-ui/react` | `ds-avatar` | 140L / 6 cls | — |
| `badge` | `Badge` | `badge` | overlap | `@base-ui/react`, `class-variance-authority` | `ds-badge` | 102L / 7 cls | web-components |
| `banner` | `Banner` | `banner` | overlap | `class-variance-authority` | `ds-banner` | 66L / 10 cls | — |
| `bar-chart` | `BarChart` | `bar-chart` | overlap | `recharts` | — | none | — |
| `breadcrumb` | `Breadcrumb` | `breadcrumb` | overlap | `@base-ui/react`, `@phosphor-icons/react` | `ds-breadcrumb` | 61L / 7 cls | — |
| `bubble` | — | — | net-new | `@base-ui/react`, `class-variance-authority` | `ds-bubble` | 193L / 4 cls | — |
| `bullet-chart` | — | — | net-new | — | `ds-bullet-chart` | 76L / 9 cls | — |
| `button` | `Button` | `button` | overlap | `@base-ui/react`, `class-variance-authority` | `ds-button` | 240L / 23 cls | web-components |
| `button-group` | `ButtonGroup` | `button-extras` | overlap | `@base-ui/react`, `class-variance-authority` | `ds-button-group` | 74L / 3 cls | web-components |
| `calendar` | `Calendar` | `calendar-view` | overlap | `@phosphor-icons/react`, `react-day-picker` | `ds-*` | 313L / 34 cls | — |
| `card` | `Card` | `card` | overlap | — | `ds-card` | 87L / 7 cls | streamlit |
| `carousel` | — | — | net-new | `@phosphor-icons/react`, `embla-carousel-react` | `ds-carousel` | 77L / 6 cls | — |
| `chart` | — | `charts` | overlap | `recharts` | `ds-chart` | 178L / 13 cls | tailwind-preset |
| `checkbox` | `Checkbox` | `form-controls` | overlap | `@base-ui/react`, `@phosphor-icons/react` | `ds-checkbox` | 65L / 2 cls | web-components |
| `checkbox-group` | — | `form-controls` | overlap | `@base-ui/react` | `ds-checkbox-group` | 14L / 1 cls | web-components |
| `code-block` | `CodeBlock` | `code-block` | overlap | — | `ds-code-block` | 87L / 10 cls | web-components |
| `collapsible` | — | — | partial | `@base-ui/react` | — | none | — |
| `color-picker` | `ColorPicker` | `color-picker` | overlap | — | `ds-color-picker` | 60L / 5 cls | web-components |
| `combo-chart` | — | — | net-new | `recharts` | — | none | — |
| `combobox` | `Combobox` | `combobox` | overlap | `@base-ui/react`, `@phosphor-icons/react` | `ds-combobox` | 287L / 17 cls | web-components |
| `command` | `CommandPalette` | `command-palette` | overlap | `@phosphor-icons/react`, `cmdk` | `ds-command` | 150L / 12 cls | tailwind-preset, web-components |
| `context-menu` | `Dropdown`, `MenuItem` | `menu` | overlap | `@base-ui/react`, `@phosphor-icons/react` | `ds-context-menu` | 274L / 13 cls | — |
| `data-table` | `DataGrid` | `datagrid` | overlap | `@dnd-kit/core`, `@dnd-kit/sortable`, `@dnd-kit/utilities`, `@phosphor-icons/react`, `@tanstack/react-table` | `ds-data-table` | 145L / 22 cls | — |
| `date-picker` | `DatePicker` | `date-picker` | overlap | `@phosphor-icons/react`, `date-fns` | `ds-date-picker` | 26L / 4 cls | web-components |
| `date-range-picker` | `DateRangePicker` | `date-range` | overlap | `@phosphor-icons/react`, `date-fns` | `ds-date-range-picker` | 45L / 7 cls | web-components |
| `date-time-picker` | `DateTimePicker` | `date-time` | overlap | — | `ds-date-time-picker` | 8L / 1 cls | — |
| `description-list` | `DescriptionList` | `description-list` | overlap | — | `ds-description` | 35L / 3 cls | — |
| `dialog` | `Modal` | `modal` | overlap | `@base-ui/react`, `@phosphor-icons/react` | `ds-dialog` | 129L / 7 cls | tailwind-preset, web-components |
| `direction` | — | — | net-new | `@base-ui/react` | — | none | — |
| `donut-chart` | `DonutChart` | `charts` | overlap | `recharts` | `ds-donut-chart` | 25L / 3 cls | tailwind-preset |
| `drawer` | `Drawer` | `drawer` | overlap | `@base-ui/react` | `ds-drawer` | 362L / 9 cls | — |
| `dropdown-menu` | `Dropdown`, `MenuItem`, `MenuHeader`, `MenuDivider` | `menu` | overlap | `@base-ui/react`, `@phosphor-icons/react` | `ds-dropdown-menu` | 279L / 11 cls | — |
| `editable` | — | — | net-new | `@phosphor-icons/react` | `ds-*` | 27L / 3 cls | — |
| `empty` | `EmptyState` | `empty-state` | overlap | `class-variance-authority` | `ds-empty` | 89L / 8 cls | — |
| `field` | `Field`, `FieldHint` | `field` | overlap | — | `ds-field` | 231L / 13 cls | web-components |
| `field-array` | — | — | net-new | `@phosphor-icons/react` | `ds-field-array` | 33L / 4 cls | — |
| `file-upload` | `FileUpload` | `file-upload` | overlap | `@phosphor-icons/react` | `ds-file-upload` | 69L / 4 cls | — |
| `form` | `FormField` | `field` | overlap | `@base-ui/react` | `ds-form` | 8L / 1 cls | web-components |
| `funnel-chart` | — | — | net-new | `recharts` | `ds-funnel-chart-s` | 20L / 2 cls | — |
| `gauge` | `GaugeChart` | `charts` | overlap | — | `ds-gauge` | 29L / 5 cls | tailwind-preset |
| `heatmap` | — | — | net-new | — | `ds-heatmap` | 96L / 15 cls | — |
| `hover-card` | — | — | partial | `@base-ui/react` | `ds-hover-card` | 78L / 2 cls | — |
| `icon` | `Icon` | `icon` | overlap | `@phosphor-icons/react` | `ds-icon` | 8L / 1 cls | web-components |
| `icon-button` | `IconButton` | `button-extras` | overlap | — | — | none | web-components |
| `input` | `Input` | `field`, `form-controls` | overlap | `@base-ui/react` | `ds-input` | 48L / 1 cls | web-components |
| `input-group` | `InputGroup` | `field` | overlap | `class-variance-authority` | `ds-input-group` | 211L / 6 cls | web-components |
| `input-otp` | — | — | net-new | `@phosphor-icons/react`, `input-otp` | `ds-input-otp` | 94L / 7 cls | — |
| `item` | — | — | net-new | `@base-ui/react`, `class-variance-authority` | `ds-item` | 182L / 19 cls | — |
| `kanban` | `Kanban` | `kanban` | overlap | `@dnd-kit/core`, `@dnd-kit/sortable`, `@dnd-kit/utilities`, `@phosphor-icons/react` | `ds-kanban` | 122L / 10 cls | — |
| `kbd` | `Kbd` | `kbd` | overlap | — | `ds-kbd` | 51L / 2 cls | — |
| `label` | — | — | partial | — | `ds-label` | 40L / 1 cls | — |
| `line-chart` | `LineChart` | `charts` | overlap | `recharts` | — | none | tailwind-preset |
| `marker` | — | — | net-new | `@base-ui/react`, `class-variance-authority` | `ds-marker` | 75L / 3 cls | — |
| `masonry` | — | — | net-new | — | `ds-masonry` | 10L / 1 cls | — |
| `menubar` | `MenuItem` | `menu` | overlap | `@base-ui/react`, `@phosphor-icons/react` | `ds-menubar` | 110L / 8 cls | — |
| `message` | — | — | net-new | — | `ds-message` | 71L / 6 cls | — |
| `message-scroller` | — | — | net-new | `@phosphor-icons/react`, `@shadcn/react` | `ds-message-scroller` | 88L / 5 cls | — |
| `meter` | `Metric` | `status-panel` | overlap | `@base-ui/react`, `class-variance-authority` | `ds-meter` | 60L / 11 cls | web-components |
| `multi-select` | `MultiSelect` | `multi-select` | overlap | — | — | none | streamlit, web-components |
| `navigation-menu` | — | — | partial | `@base-ui/react`, `@phosphor-icons/react`, `class-variance-authority` | `ds-navigation-menu` | 275L / 12 cls | — |
| `number-field` | `NumberInput` | `number-input` | overlap | `@base-ui/react`, `@phosphor-icons/react` | `ds-number-field` | 87L / 7 cls | web-components |
| `page-header` | `PageHeader` | `page-header` | overlap | — | `ds-page-header` | 55L / 6 cls | — |
| `pagination` | `Pagination` | `pagination` | overlap | `@phosphor-icons/react` | `ds-pagination` | 49L / 7 cls | — |
| `panel` | `Panel` | `panel` | overlap | — | `ds-panel` | 63L / 6 cls | web-components |
| `phone-input` | — | — | net-new | — | `ds-phone-input` | 30L / 1 cls | — |
| `pie-chart` | `PieChart` | `charts` | overlap | `recharts` | `ds-pie-chart-root` | 10L / 1 cls | tailwind-preset |
| `popover` | `Popover` | `popover` | overlap | `@base-ui/react` | `ds-popover` | 104L / 5 cls | — |
| `progress` | `Progress` | `progress` | overlap | `@base-ui/react`, `class-variance-authority` | `ds-progress` | 60L / 11 cls | — |
| `qr-code` | — | — | net-new | — | `ds-qr-code` | 18L / 2 cls | — |
| `radar-chart` | — | — | net-new | `recharts` | `ds-radar-chart-root` | 11L / 1 cls | — |
| `radio-group` | `RadioGroup`, `Radio` | `form-controls` | overlap | `@base-ui/react` | `ds-radio-group` | 77L / 4 cls | web-components |
| `rating` | `Rating` | `rating` | overlap | `@base-ui/react`, `@phosphor-icons/react` | `ds-rating` | 65L / 9 cls | — |
| `relative-time` | — | — | net-new | — | `ds-relative-time` | 5L / 1 cls | — |
| `resizable` | — | — | net-new | `react-resizable-panels` | `ds-resizable` | 60L / 3 cls | — |
| `scatter-chart` | — | — | net-new | `recharts` | `ds-scatter-chart-root` | 9L / 1 cls | — |
| `scroll-area` | — | — | net-new | `@base-ui/react` | `ds-scroll-area` | 43L / 4 cls | — |
| `select` | `Select` | `form-controls` | overlap | `@base-ui/react`, `@phosphor-icons/react` | `ds-select` | 244L / 12 cls | web-components |
| `separator` | — | — | partial | `@base-ui/react` | `ds-separator` | 16L / 1 cls | — |
| `sheet` | `Drawer` | `drawer` | overlap | `@base-ui/react`, `@phosphor-icons/react` | `ds-sheet` | 160L / 7 cls | — |
| `sidebar` | `VerticalNav`, `AppShell` | `vertical-nav`, `app-shell` | overlap | `@base-ui/react`, `@phosphor-icons/react`, `class-variance-authority` | `ds-sidebar` | 670L / 33 cls | — |
| `skeleton` | `Skeleton` | `skeleton` | overlap | — | `ds-skeleton` | 12L / 1 cls | — |
| `slider` | `Range` | `form-controls` | overlap | `@base-ui/react` | `ds-slider` | 79L / 5 cls | web-components |
| `snippet` | — | — | net-new | — | `ds-snippet` | 39L / 3 cls | — |
| `sparkline` | `Sparkline` | `sparkline` | overlap | — | `ds-sparkline` | 42L / 6 cls | — |
| `speed-dial` | — | — | net-new | `@base-ui/react`, `@phosphor-icons/react` | `ds-speed-dial` | 97L / 7 cls | — |
| `spinner` | `Spinner` | `spinner` | overlap | `@phosphor-icons/react` | `ds-spinner` | 13L / 1 cls | — |
| `split-button` | `SplitButton` | `button-extras` | overlap | `@phosphor-icons/react` | `ds-split-button-caret` | 12L / 2 cls | web-components |
| `stacked-bar` | `StackedBar` | `charts` | overlap | `recharts` | `ds-stacked-bar-root` | 9L / 1 cls | tailwind-preset |
| `stat-card` | `StatCard` | `stat-card`, `grid` | overlap | `class-variance-authority` | `ds-stat-card` | 52L / 7 cls | streamlit, web-components |
| `status` | `Status` | `status-panel` | overlap | `class-variance-authority` | `ds-status` | 59L / 10 cls | web-components |
| `stepper` | `Stepper` | `stepper` | overlap | `@phosphor-icons/react` | `ds-stepper` | 110L / 9 cls | — |
| `switch` | `Switch` | `switch` | overlap | `@base-ui/react` | `ds-switch` | 89L / 2 cls | web-components |
| `table` | — | `table` | overlap | — | `ds-table` | 86L / 9 cls | — |
| `tabs` | `Tabs` | `tabs` | overlap | `@base-ui/react`, `class-variance-authority` | `ds-tabs` | 155L / 6 cls | web-components |
| `tag` | `Tag` | `tag` | overlap | `class-variance-authority` | `ds-tag` | 42L / 7 cls | streamlit |
| `tags-input` | `TagInput` | `tag-input` | overlap | `@phosphor-icons/react` | `ds-*` | 74L / 5 cls | streamlit, web-components |
| `textarea` | `Textarea` | `form-controls` | overlap | — | `ds-textarea` | 50L / 1 cls | web-components |
| `theme-switcher` | — | — | net-new | `@phosphor-icons/react` | `ds-theme-switcher` | 59L / 5 cls | — |
| `time-picker` | `TimePicker` | `time-picker` | overlap | `@phosphor-icons/react` | `ds-time-picker` | 237L / 21 cls | web-components |
| `timeline` | `Timeline` | `timeline` | overlap | `class-variance-authority` | `ds-timeline` | 115L / 13 cls | — |
| `toast` | `Toast`, `ToastProvider` | `toast` | overlap | `@base-ui/react`, `@phosphor-icons/react` | `ds-toast` | 190L / 11 cls | — |
| `toc` | — | — | net-new | `@base-ui/react` | `ds-toc` | 55L / 4 cls | — |
| `toggle` | `Segmented` | `segmented` | overlap | `@base-ui/react`, `class-variance-authority` | `ds-toggle` | 99L / 6 cls | web-components |
| `toggle-group` | `Segmented` | `segmented` | overlap | `@base-ui/react`, `class-variance-authority` | `ds-toggle-group` | 71L / 2 cls | web-components |
| `toolbar` | `Toolbar`, `ToolbarGroup`, `ToolbarSpacer` | `toolbar` | overlap | `@base-ui/react`, `class-variance-authority` | `ds-toolbar` | 76L / 6 cls | web-components |
| `tooltip` | `Tooltip` | `tooltip` | overlap | `@base-ui/react` | `ds-tooltip` | 132L / 3 cls | — |
| `tree` | `Tree` | `tree` | overlap | `@base-ui/react`, `@phosphor-icons/react` | `ds-tree` | 111L / 8 cls | — |
| `treemap` | — | — | net-new | `recharts` | `ds-treemap-tile` | 18L / 2 cls | — |
| `waterfall-chart` | — | — | net-new | `recharts` | `ds-waterfall-chart-tooltip` | 36L / 5 cls | — |
| `wizard` | `Wizard` | `wizard` | overlap | — | `ds-wizard` | 15L / 2 cls | — |
| `wordmark` | `Wordmark` | `app-bar` | overlap | `class-variance-authority` | `ds-wordmark` | 13L / 1 cls | — |

### Notes on the `partial` rows

- **`autocomplete`** — functionally covered by target `Combobox` (which source `combobox` also maps to)
- **`collapsible`** — functionally covered by target `Accordion` internals
- **`hover-card`** — functionally covered by target `Popover` / `Tooltip`
- **`label`** — target `.ds-label` exists in css/base/typography.css (base layer, no React component)
- **`navigation-menu`** — target `VerticalNav` is a sidebar nav, not a horizontal menu — adjacent, not equivalent
- **`separator`** — target `.ds-rule-x`, `.ds-ruled` exist in grid.css (utility classes, no React component)

## Runtime dependencies, by blast radius

The target ships **zero runtime dependencies** today. Every dependency below is a new one for it. Counted by how many source components would drag it in.

| dependency | components | which |
| --- | --- | --- |
| `@base-ui/react` | 48 | `accordion`, `alert-dialog`, `attachment`, `autocomplete`, `avatar`, `badge`, `breadcrumb`, `bubble`, `button`, `button-group`, `checkbox`, `checkbox-group`, +36 more |
| `@phosphor-icons/react` | 39 | `accordion`, `alert`, `autocomplete`, `breadcrumb`, `calendar`, `carousel`, `checkbox`, `combobox`, `command`, `context-menu`, `data-table`, `date-picker`, +27 more |
| `class-variance-authority` | 24 | `alert`, `attachment`, `badge`, `banner`, `bubble`, `button`, `button-group`, `empty`, `input-group`, `item`, `marker`, `meter`, +12 more |
| `recharts` | 13 | `area-chart`, `bar-chart`, `chart`, `combo-chart`, `donut-chart`, `funnel-chart`, `line-chart`, `pie-chart`, `radar-chart`, `scatter-chart`, `stacked-bar`, `treemap`, +1 more |
| `@dnd-kit/core` | 2 | `data-table`, `kanban` |
| `@dnd-kit/sortable` | 2 | `data-table`, `kanban` |
| `@dnd-kit/utilities` | 2 | `data-table`, `kanban` |
| `date-fns` | 2 | `date-picker`, `date-range-picker` |
| `react-day-picker` | 1 | `calendar` |
| `embla-carousel-react` | 1 | `carousel` |
| `cmdk` | 1 | `command` |
| `@tanstack/react-table` | 1 | `data-table` |
| `input-otp` | 1 | `input-otp` |
| `@shadcn/react` | 1 | `message-scroller` |
| `react-resizable-panels` | 1 | `resizable` |

| | |
| --- | --- |
| distinct deps reached from a component | **15** |
| declared in `packages/ui/package.json` | **21** |
| source components with zero deps | 28 |

The 6 declared deps no component imports directly:

| dependency | reached via |
| --- | --- |
| `clsx`, `tailwind-merge` | `src/lib/utils.ts` (the `cn()` helper) — so effectively every component |
| `@fontsource-variable/geist`, `@fontsource-variable/geist-mono` | font loading, not component code. The target loads Ufficio + Geist from `assets/fonts/` instead. |
| `tw-animate-css` | referenced from `globals.css`, part of the Tailwind v4 build |
| `shadcn` | the CLI, a build-time tool mis-declared as a runtime dependency |

Two rows deserve flagging as facts, not verdicts:

- **`@shadcn/react` is a whole package pulled in for exactly one component.** `message-scroller.tsx:7` imports from `@shadcn/react/message-scroller`; nothing else in the source touches it.
- **`@base-ui/react` reaches 48 components and `@phosphor-icons/react` reaches 39.** Between them they cover most of the source. Together with the 84 Base UI positioner variables the source CSS reads (see below), Base UI is not a per-component dependency that curation can trim away component by component — it is the substrate the source is built on.

## Target-side surfaces

Which consumers of the target read which layer. Measured by grepping each surface for the `ds-*` classes each CSS file defines.

| surface | couples to | evidence |
| --- | --- | --- |
| `components/ds-*.js` (11 web components) | **component classes** | 30 of 68 target CSS files have a class used by a web component |
| `dist/tailwind-preset.cjs` | **component classes** (a few) | `charts`, `command-palette`, `modal` |
| `examples/streamlit/app.py` | **component classes** | `callout`, `card`, `grid`, `multi-select`, `stat-card`, `tag-input`, `tag` |
| `keycloak/` theme | **tokens only** | uses `ds-accent`, `ds-bg`, `ds-ink`, `ds-rule`, `ds-sans`, `ds-serif`, `ds-surface`, `ds-soft`, `ds-faint` — no component classes |
| `emails/diametral-email.js` | **tokens only** | one incidental `ds-up` hit; no component classes |
| `scripts/build-figma.mjs` | **tokens only** | reads `tokens/`, not `css/components/` |

<details><summary>Per-file surface coupling (30 files)</summary>

| target CSS | surfaces |
| --- | --- |
| `badge` | web-components |
| `button` | web-components |
| `button-extras` | web-components |
| `callout` | web-components, streamlit |
| `card` | streamlit |
| `charts` | tailwind-preset |
| `code-block` | web-components |
| `color-picker` | web-components |
| `combobox` | web-components |
| `command-palette` | web-components, tailwind-preset |
| `date-picker` | web-components |
| `date-range` | web-components |
| `field` | web-components |
| `form-controls` | web-components |
| `grid` | streamlit |
| `icon` | web-components |
| `modal` | web-components, tailwind-preset |
| `multi-select` | web-components, streamlit |
| `number-input` | web-components |
| `panel` | web-components |
| `section-heading` | web-components |
| `segmented` | web-components |
| `stat-card` | web-components, streamlit |
| `status-panel` | web-components |
| `switch` | web-components |
| `tabs` | web-components |
| `tag` | streamlit |
| `tag-input` | web-components, streamlit |
| `time-picker` | web-components |
| `toolbar` | web-components |

</details>

## Structural facts the per-component table cannot show

These are the collisions that live *between* components. All are observations; none prejudge the rubric.

### 1. Both systems own the `ds-*` class namespace, and 55 selectors are identical

| | source | target |
| --- | --- | --- |
| distinct `.ds-*` classes | **752** (in 111 files) | **203** (in 68 files) |
| identical selectors defined by both | **55** | |

The colliding 55:

```
ds-accordion ds-agenda ds-alert ds-avatar ds-avatar-group ds-badge ds-banner
ds-button ds-button-group ds-calendar ds-card ds-checkbox ds-drawer-overlay
ds-empty ds-field ds-file-upload ds-gauge ds-icon ds-input ds-input-group
ds-kanban ds-kbd ds-label ds-page-header ds-pagination ds-panel ds-progress
ds-radio-group ds-rating ds-skeleton ds-sparkline ds-spinner ds-status
ds-status--critical ds-status--danger ds-status--info ds-status--neutral
ds-status--success ds-status--warning ds-stepper ds-switch ds-table ds-tabs
ds-tag ds-tag--danger ds-tag--info ds-tag--success ds-tag--warning ds-textarea
ds-timeline ds-toast ds-toolbar ds-tree ds-wizard ds-wordmark
```

So reconciliation is not a rename exercise — it is two competing definitions of the same selector. The 752-vs-203 ratio is the other half of the story: the source vocabulary is fine-grained (an element-level class per part), the target's is coarse (a block class plus `--modifier`s).

`.ds-badge` is representative — same selector, incompatible intent:

| | source | target |
| --- | --- | --- |
| border | `border-width: 0` | `1px solid var(--ds-rule)` |
| background | `transparent` | `--ds-ink` on `--solid` |
| padding | `0` | `6px 10px` |
| font-size | `0.625rem` (raw) | `var(--ds-text-2xs)` (token) |

### 2. Source CSS is layered; target CSS is not — the target silently wins every collision

All **111** source CSS files are wrapped in `@layer utilities` (one also uses `@layer components`). **Zero** of the 68 target files use `@layer` at all.

Per the cascade, an unlayered rule beats *any* layered rule regardless of specificity. If both stylesheets load into the same document, all 55 colliding selectors resolve to the target's definition, with no specificity conflict a diff or linter would flag. Any migration that ships source CSS as-is alongside `css/diametral.css` will look like the source styles were silently dropped.

### 3. The two token vocabularies barely intersect

| | |
| --- | --- |
| target token references | **1360**, all `--ds-*` |
| source token references | mixed: `--muted` (172), `--ds-*` (105), `--foreground` (98), `--destructive` (77), `--border` (67), `--ring` (64), `--sidebar-*` (54), `--primary` (45) |
| target tokens defined (`css/tokens.css` + themes) | 101 |
| distinct tokens source CSS references | 139 |
| **referenced by source, undefined by target** | **124** — of which **40** are real global tokens and 84 are component-local vars |

The source carries a shadcn-style unprefixed token set. The 40 real gaps:

```
accent accent-foreground background border card card-foreground color-border
destructive ds-action ds-black ds-blue ds-brown ds-critical-ink ds-green-brand
ds-grey-brand ds-khaki ds-neutral-ink ds-on-action ds-red-brand ds-yellow-vivid
font-heading font-mono font-sans foreground input muted muted-foreground popover
popover-foreground primary primary-foreground ring secondary secondary-foreground
sidebar sidebar-accent sidebar-accent-foreground sidebar-border sidebar-foreground
sidebar-ring
```

The remaining 84 are Base UI positioner vars (`--anchor-width`, `--available-height`, `--positioner-*`) and drawer/toast animation state (`--drawer-swipe-*`, `--toast-index`, `--stack-*`) that components set inline. Those are not a token gap — but they *are* a Base UI coupling, since the source CSS reads variables only Base UI produces.

### 4. The two packages expose fundamentally different entry shapes

| | source | target |
| --- | --- | --- |
| React entry | **no barrel** — per-file subpath: `./components/*` → `src/components/*.tsx` | **barrel**: `./react` → `react/index.js` |
| ships | TypeScript source (`.tsx`) via `exports`, `dist/` on publish | prebuilt `.js` + hand-written `.d.ts` |
| CSS entry | `./globals.css` (Tailwind v4 `@import`, needs a build) | `./css/diametral.css` (buildless, plain CSS) |
| peer deps | `react>=19`, `react-dom>=19`, **`tailwindcss^4`** | `react>=18`, `react-dom>=18` (both optional) |
| runtime deps | 22 | **0** |

The target's `tailwindcss` situation matters: it has no Tailwind peer dep and ships buildless CSS, while every source component depends on Tailwind v4 being present to compile `@layer utilities` and the `globals.css` `@theme` block.

### 5. All 68 target CSS files ship in one global stylesheet

`css/diametral.css` imports all 68 component files plus `tokens.css`, `base/reset.css`, `base/typography.css`, and the `dark`/`sepia` themes. There are no orphaned component CSS files, and there is no per-component CSS entry point.

Consequence: anything absorbed into `css/components/` lands in the global cascade for every consumer of the package — the web components, the Streamlit example, the Keycloak theme, and the gh-pages docs — whether or not that consumer uses the component.

### 6. Keycloak and emails couple to tokens only, not components

Measured by grepping each surface for the `ds-*` classes the CSS files define:

- **Keycloak theme** uses exactly `ds-accent`, `ds-accent-ink`, `ds-bg`, `ds-faint`, `ds-ink`, `ds-rule`, `ds-rule-soft`, `ds-sans`, `ds-serif`, `ds-soft`, `ds-surface` — all tokens, zero component classes.
- **`emails/diametral-email.js`** yields one incidental `ds-up` hit and no component classes.
- **`scripts/build-figma.mjs`** reads `tokens/`, not `css/components/`.

So the blast radius of *component* CSS changes is the 11 web components, the tailwind preset, the Streamlit example, and the docs — not the email or Keycloak surfaces. Token changes, however, reach everything.

### 7. `.design-sync/` is not empty scaffolding — a prior review pass already graded the target

The map records these directories as empty. They are not:

- `.design-sync/.cache/review/` holds **178 files covering 89 distinct component names** — pairs of `<Name>.json` (shot manifest, `pendingGrade`, `gradeKey`/`sourceKey` hashes) and `<Name>.grade.json` (per-demo-cell `verdict` + `note`).
- `.ds-sync/` holds `lib/`, `storybook/`, and its own `node_modules/` (ts-morph, esbuild, playwright, react).

Sample grade, `Wordmark.grade.json`:

```json
{"cells": {"Default": {"verdict": "good", "note": "Diametral logo mark + wordmark in Ufficio, clean DS brand lockup"},
           "WithSub": {"verdict": "good", "note": "Logo + Diametral | PRICING ENGINE — sub text in small caps, correct vertical separator"},
           "CustomName": {"verdict": "good", "note": "LBC logo mark + LBC | LITTLE BIG CODE — custom name renders correctly"}}}
```

The 89 graded names are the **target's** export symbols (they include target-only names like `VerticalNav`, `ConsoleLayout`, `Metric`, `MenuItem`), so this is a visual review of the target as it stands, not of a migration. It is nonetheless a working per-component visual-grading harness aimed at exactly the components this map has to reconcile, and it predates this effort.

Two other facts worth carrying forward: the target's React surface is **93 exported symbols across ~50 files** (so counting files understates it by half), and a `DesignSync` tool is registered in this session's toolset — the likely producer of `.ds-sync/`.
