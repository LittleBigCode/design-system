<!--
Derived artifact. Copied from diamorval/design-system-diametral,
branch research/inventory, commit b5f492d862fafbab2861e970a8f45d94f818ea7e, path docs/migration/react-ledger.md.
Copied 2026-09-01. Do not edit here to correct a measurement — correct it at
the source and re-copy, or the two diverge silently.
-->

# React ledger: `@diametral/ui` → `@diametral/design-system`

Resolution artifact for [The React ledger: re-check the defect-swaps and the aliases](https://github.com/diamorval/design-system-diametral/issues/166), a ticket on [Absorb @diametral/ui into the official Diametral design system](https://github.com/diamorval/design-system-diametral/issues/151). Sibling of [`inventory.md`](./inventory.md).

Measured 2026-08-30 against source `packages/ui` @ `feat/css-conversion` (119 `.tsx`) and target `/Users/augustinmorval/code/design-system` @ v0.11.0 (93 React export symbols).

**One verdict per component, for the React layer only.** The CSS verdict is [#165](https://github.com/diamorval/design-system-diametral/issues/165)'s; under [#164](https://github.com/diamorval/design-system-diametral/issues/164)'s amendment A2 it reads this file as an input, because a CSS file is replaced wholesale only when it is uncoupled **and** its React verdict here is *source wins*.

## Headline

| verdict | count | what it means |
| --- | --- | --- |
| **admit outright** | 40 | no target React symbol contests it (rule 7) |
| **source wins** | 46 | the incumbent is a class-applier (42), or the source earned the swap on a demonstrated defect (4) |
| **incumbent holds** | 29 | the target's React stays; the source's `.tsx` is not absorbed |
| **admit CSS-only** | 4 | net-new, but its narrow dependency buys nothing (#156) |
| | **119** | |

So **90 of 119** land their React from the source, and **the whole migration buys exactly three new npm dependencies beyond substrate**: `@dnd-kit/core`, `@dnd-kit/sortable`, `@dnd-kit/utilities`, all for `kanban`.

## Part 1 — the ten defect-swaps, re-checked

### Test (a-bis) is provably inert over this set

#164 added: *a demonstrated defect buys a narrow dependency only when the incumbent's defect is not cheaply fixable in place.* It is a **price test on a dependency**, so it can only fire on a row that carries one.

Exactly **ten of the 119 rows carry a narrow dependency** (anything outside the substrate tier — Base UI, Phosphor, CVA, recharts):

| row | narrow dep | already ruled |
| --- | --- | --- |
| `calendar` | `react-day-picker` | #164 — holds |
| `command` | `cmdk` | #156 — holds |
| `data-table` | `@dnd-kit` ×3, `@tanstack/react-table` | #164 — holds |
| `date-picker` | `date-fns` | #156 — holds |
| `date-range-picker` | `date-fns` | #156 — holds |
| `kanban` | `@dnd-kit` ×3 | #164 — wins |
| `carousel` | `embla-carousel-react` | #156 — CSS-only |
| `input-otp` | `input-otp` | #156 — CSS-only |
| `resizable` | `react-resizable-panels` | #156 — CSS-only |
| `message-scroller` | `@shadcn/react` | #156 — CSS-only |

**All ten were already decided, and none of them is among the eight this ticket re-checks.** Every one of the eight costs zero narrow dependencies:

| component | source imports | price |
| --- | --- | --- |
| `radio-group` | `@base-ui/react` | substrate |
| `tree` | `@base-ui/react`, `@phosphor-icons/react` | substrate |
| `number-field` | `@base-ui/react`, `@phosphor-icons/react` | substrate |
| `tooltip` | `@base-ui/react` | substrate |
| `drawer` | `@base-ui/react` | substrate |
| `color-picker` | *(none — own hook + `Input`)* | free |
| `date-time-picker` | *(none — composes `calendar` + `time-picker`)* | free |
| `data-table` | `@dnd-kit` ×3, `@tanstack/react-table` | ruled by #164 |

So a-bis shrinks nothing. **#156's seven free source wins still shrink to two — but on test (a), not a-bis: five of the seven defects do not survive re-measurement.**

### The five that collapse

| component | #156's defect | what measurement shows | verdict |
| --- | --- | --- | --- |
| `Radio` | no arrow keys | `Radio.js:10` is a real `<input type="radio">` and `RadioGroup.js:31` gives every option the same `name`. **The browser implements APG radio-group arrow keys natively.** There is nothing to fix and nothing to buy. | **holds** |
| `NumberInput` | no arrow keys | `NumberInput.js:73` is a real `<input type="number">` with `role=spinbutton` and `aria-valuenow/min/max`. **The browser supplies Up/Down stepping.** | **holds** |
| `Tree` | no arrow keys | True — but `tree.tsx` has **the same defect**: `role="tree"/"treeitem"/"group"` and no `onKeyDown`, no roving `tabIndex`, no `aria-expanded`. The incumbent (71 LOC) carries *more* ARIA than the source (77 LOC). Swapping buys a regression. | **holds** |
| `ColorPicker` | no arrow keys | True — and `color-picker.tsx` has **the same defect**: `aria-pressed` swatch buttons in a `role=group`, zero `onKeyDown`. The #164 `data-table` pattern exactly. | **holds** |
| `DateTimePicker` | zero ARIA | `DateTimePicker.js` is a 76-line wrapper `div` composing `DatePicker` + `TimePicker`; **the ARIA lives in the children**, and a composition wrapper owes none. Compounding it: the source's equivalent composes source `calendar` and `time-picker`, **both held by #164**, so the swap would drag two held components in. | **holds** |

### The two that stand

| component | measurement | verdict |
| --- | --- | --- |
| `Tooltip` | `Tooltip.js` (42 LOC) renders `role="tooltip"` as a **sibling span with no `id` and no `aria-describedby` on the trigger** — so a screen reader never announces it — and has no Escape dismissal. That is worse than #156 recorded. The source is Base UI's Provider/Root/Trigger/Positioner/Popup, substrate-only. | **source wins** |
| `Drawer` | `Drawer.js` (52 LOC) has Escape and `role=dialog`/`aria-modal` but **no focus trap and no portal**, and nothing in the target repo implements one to copy — `Modal` in `index.js` has the same gap. The source is Base UI's Drawer with `modal`, Portal and Backdrop. | **source wins** |

`sheet` rides the same swap: it is the source's second component over the target's one `Drawer` symbol.

### `DataGrid`, sized not decided

`DataGrid.js` is 287 LOC over a real `<table>`, with selection, filtering, expansion, column visibility, pagination and an edit-cell `onKeyDown` (`:217`). It has **no `role="grid"`, no row/gridcell roles and no arrow navigation**. The in-place fix touches the header row, the filter row, the skeleton row and the body row, and must not collide with the editing handler: **~70 LOC**, the largest of the in-place fixes and a batch item of its own.

### In-place fixes owed (for the batch plan)

| target file | fix | size |
| --- | --- | --- |
| `Calendar.js` | arrow-key navigation on the existing grid skeleton, then compose it from `DatePicker`/`DateRangePicker` (#164) | ~30 LOC + the two pickers |
| `DataGrid.js` | `role="grid"`/`row`/`gridcell` + roving cell focus | ~70 LOC |
| `Tree.js` | Up/Down/Left/Right/Home/End + roving `tabIndex` (it is `tabIndex: 0` on every item today, `Tree.js:55`) | ~35 LOC |
| `ColorPicker.js` | arrow keys across the swatch group | ~25 LOC (not an axe violation — schedule, don't gate) |
| `RadioGroup.js` | **new finding:** `name` is an optional prop with no default, and without it the radios are not one group, so the native arrow keys silently stop working. Default it to `React.useId()`. | 2 LOC |

Each of these is a `<component>-regress.spec.ts` under #163 V4, exactly like the swaps.

## Part 2 — the alias audit (amendment A4)

**Existence check: clean.** Every target React name the inventory cites resolves to a real export — 93 symbols extracted from `react/index.js` and `react/components/*.js`, and the set of names referenced by the inventory is a strict subset. `NavigationMenu`, #164's phantom, was already recorded as `—`. The eight symbols the inventory never cites are the target-only ones (`Callout`, `Chip`, `ConsoleLayout`, `SectionHeading`, plus `cx`, `icons`, `useToast`, `BRAND_SWATCHES`).

**Shape check: five withdrawals.** 27 rows carry an explicit alias (source name ≠ target name). Applying #164's test — *does the pairing put a container against an item, or two different interaction models?* — five fail:

| row | alias | why it is withdrawn |
| --- | --- | --- |
| `menubar` | `MenuItem` | a horizontal menu bar with submenus, checkbox and radio items (260 LOC) against **one row of a dropdown** (8 LOC). The `navigation-menu` error verbatim. |
| `meter` | `Metric` | a Base UI meter control (`Track`/`Indicator`/`Value`, `role=meter`) against a **label/value text pair** (`ds-metric__k`/`__v`) with a sign tone. Control vs display. |
| `form` | `FormField` | a Base UI form **root** (validation context, the `<form>` element) against a **labelled field row**. Container vs item — and the row is already covered, `field` → `Field`/`FieldHint`. |
| `toggle` | `Segmented` | one two-state button against a **group** of them. No target symbol renders a standalone toggle. |
| `context-menu` | `Dropdown` | `Dropdown` is click-invoked with no submenus, checkbox or radio items; `ContextMenu` is right-click-invoked and positions at the pointer. Keeping the alias would have decided *incumbent holds* and quietly dropped right-click menus from the system. |

All five admit outright under rule 7, and **all five land in a clean namespace**: `ds-menubar`, `ds-meter`, `ds-form`, `ds-toggle` and `ds-context-menu` have **zero matching selectors in the target's CSS** (`grep -rl` over `css/`), so there is no CSS contest either. That is an input to #165.

The other 22 aliases hold. `sidebar` → `VerticalNav`+`AppShell` was already re-decided by #164 under rule A3, and `slider` → `Range`, `toggle-group` → `Segmented`, `number-field` → `NumberInput`, `command` → `CommandPalette`, `empty` → `EmptyState`, `gauge` → `GaugeChart`, `tags-input` → `TagInput`, `data-table` → `DataGrid` are name changes over the same job. `dialog`/`alert-dialog` → `Modal` and `sheet`/`drawer` → `Drawer` are many-to-one, not mis-shaped.

**Genuine ties produced: none.** Every re-check collapses on measurement, so this ticket opens no new tickets on the map.

## Part 3 — composition conflicts

An *incumbent holds* verdict is a **re-wiring obligation** for every landing source component that imports it. Three exist (`date-time-picker` was the fourth, and it is why that row holds):

| landing component | imports (held) | obligation |
| --- | --- | --- |
| `menubar` | `dropdown-menu` | re-compose onto the target's `Dropdown`/`MenuItem` |
| `theme-switcher` | `dropdown-menu`, `toggle-group` | re-compose onto `Dropdown`/`MenuItem` and `Segmented` |
| `snippet` | `code-block` | re-compose onto the target's `CodeBlock` |

Each is a batch-plan task, not a decision.

## The ledger

Substrate deps (`@base-ui/react`, `@phosphor-icons/react`, `class-variance-authority`, `recharts`) are free once paid and are not listed as a cost. `~~strikethrough~~` in the target column marks a withdrawn alias.

| source | → target React | verdict | rule | narrow dep cost |
| --- | --- | --- | --- | --- |
| `accordion` | `Accordion` | **incumbent holds** | rule 4 — no demonstrated defect, no strict superset | — |
| `agenda` | `Agenda` | **source wins** | incumbent is a class-applier | — |
| `alert` | `Alert` | **incumbent holds** | rule 4 — no demonstrated defect, no strict superset | — |
| `alert-dialog` | `Modal` | **incumbent holds** | rule 4 — no demonstrated defect, no strict superset | — |
| `area-chart` | `AreaChart` | **source wins** | incumbent is a class-applier | — |
| `aspect-ratio` | — | **admit outright** | rule 7 — no target React symbol | — |
| `attachment` | — | **admit outright** | rule 7 — no target React symbol | — |
| `autocomplete` | — | **admit outright** | rule 7 — no target React symbol | — |
| `avatar` | `Avatar`, `AvatarGroup` | **source wins** | incumbent is a class-applier | — |
| `badge` | `Badge` | **source wins** | incumbent is a class-applier | — |
| `banner` | `Banner` | **source wins** | incumbent is a class-applier | — |
| `bar-chart` | `BarChart` | **source wins** | incumbent is a class-applier | — |
| `breadcrumb` | `Breadcrumb` | **source wins** | incumbent is a class-applier | — |
| `bubble` | — | **admit outright** | rule 7 — no target React symbol | — |
| `bullet-chart` | — | **admit outright** | rule 7 — no target React symbol | — |
| `button` | `Button` | **source wins** | incumbent is a class-applier | — |
| `button-group` | `ButtonGroup` | **source wins** | incumbent is a class-applier | — |
| `calendar` | `Calendar` | **incumbent holds** | #164 — in-place arrow keys (~30 LOC) fix three grids; `react-day-picker` fixes one | — |
| `card` | `Card` | **source wins** | incumbent is a class-applier | — |
| `carousel` | — | **admit CSS-only** | #156 — narrow dep buys nothing | — |
| `chart` | — | **admit outright** | rule 7 — no target React symbol | — |
| `checkbox` | `Checkbox` | **source wins** | incumbent is a class-applier | — |
| `checkbox-group` | — | **admit outright** | rule 7 — no target React symbol | — |
| `code-block` | `CodeBlock` | **incumbent holds** | rule 4 — no demonstrated defect, no strict superset | — |
| `collapsible` | — | **admit outright** | rule 7 — no target React symbol | — |
| `color-picker` | `ColorPicker` | **incumbent holds** | test (a) fails — the source has the same defect (`aria-pressed` buttons, no `onKeyDown`) | — |
| `combo-chart` | — | **admit outright** | rule 7 — no target React symbol | — |
| `combobox` | `Combobox` | **incumbent holds** | rule 4 — no demonstrated defect, no strict superset | — |
| `command` | `CommandPalette` | **incumbent holds** | rule 4 — no demonstrated defect, no strict superset | — |
| `context-menu` | ~~`Dropdown`, `MenuItem`~~ | **admit outright** | rule 7 (A4: alias withdrawn) | — |
| `data-table` | `DataGrid` | **incumbent holds** | #164 — source carries the same defect (784 LOC, zero `onKeyDown`/`role=grid`) | — |
| `date-picker` | `DatePicker` | **incumbent holds** | rule 4 — no demonstrated defect, no strict superset | — |
| `date-range-picker` | `DateRangePicker` | **incumbent holds** | rule 4 — no demonstrated defect, no strict superset | — |
| `date-time-picker` | `DateTimePicker` | **incumbent holds** | test (a) fails — a wrapper `div` over `DatePicker`+`TimePicker`, whose children carry the ARIA; and the source swap would drag `calendar` and `time-picker`, both held | — |
| `description-list` | `DescriptionList` | **source wins** | incumbent is a class-applier | — |
| `dialog` | `Modal` | **incumbent holds** | rule 4 — no demonstrated defect, no strict superset | — |
| `direction` | — | **admit outright** | rule 7 — no target React symbol | — |
| `donut-chart` | `DonutChart` | **source wins** | incumbent is a class-applier | — |
| `drawer` | `Drawer` | **source wins** | test (a) — 52 LOC, Escape only, no focus trap, no portal; a-bis inert, zero narrow deps | — |
| `dropdown-menu` | `Dropdown`, `MenuItem`, `MenuHeader`, `MenuDivider` | **incumbent holds** | rule 4 — no demonstrated defect, no strict superset | — |
| `editable` | — | **admit outright** | rule 7 — no target React symbol | — |
| `empty` | `EmptyState` | **source wins** | incumbent is a class-applier | — |
| `field` | `Field`, `FieldHint` | **source wins** | incumbent is a class-applier | — |
| `field-array` | — | **admit outright** | rule 7 — no target React symbol | — |
| `file-upload` | `FileUpload` | **incumbent holds** | rule 4 — no demonstrated defect, no strict superset | — |
| `form` | ~~`FormField`~~ | **admit outright** | rule 7 (A4: alias withdrawn) | — |
| `funnel-chart` | — | **admit outright** | rule 7 — no target React symbol | — |
| `gauge` | `GaugeChart` | **source wins** | incumbent is a class-applier | — |
| `heatmap` | — | **admit outright** | rule 7 — no target React symbol | — |
| `hover-card` | — | **admit outright** | rule 7 — no target React symbol | — |
| `icon` | `Icon` | **source wins** | incumbent is a class-applier | — |
| `icon-button` | `IconButton` | **source wins** | incumbent is a class-applier | — |
| `input` | `Input` | **source wins** | incumbent is a class-applier | — |
| `input-group` | `InputGroup` | **source wins** | incumbent is a class-applier | — |
| `input-otp` | — | **admit CSS-only** | #156 — narrow dep buys nothing | — |
| `item` | — | **admit outright** | rule 7 — no target React symbol | — |
| `kanban` | `Kanban` | **source wins** | #164 — zero ARIA, no keyboard path; `@dnd-kit` earned under a-bis | `@dnd-kit/core`, `@dnd-kit/sortable`, `@dnd-kit/utilities` |
| `kbd` | `Kbd` | **source wins** | incumbent is a class-applier | — |
| `label` | — | **admit outright** | rule 7 — no target React symbol | — |
| `line-chart` | `LineChart` | **source wins** | incumbent is a class-applier | — |
| `marker` | — | **admit outright** | rule 7 — no target React symbol | — |
| `masonry` | — | **admit outright** | rule 7 — no target React symbol | — |
| `menubar` | ~~`MenuItem`~~ | **admit outright** | rule 7 (A4: alias withdrawn) | — |
| `message` | — | **admit outright** | rule 7 — no target React symbol | — |
| `message-scroller` | — | **admit CSS-only** | #156 — narrow dep buys nothing | — |
| `meter` | ~~`Metric`~~ | **admit outright** | rule 7 (A4: alias withdrawn) | — |
| `multi-select` | `MultiSelect` | **incumbent holds** | rule 4 — no demonstrated defect, no strict superset | — |
| `navigation-menu` | — | **admit outright** | rule 7 — no target React symbol | — |
| `number-field` | `NumberInput` | **incumbent holds** | test (a) fails — incumbent is `<input type=number>`; the browser supplies Up/Down stepping | — |
| `page-header` | `PageHeader` | **source wins** | incumbent is a class-applier | — |
| `pagination` | `Pagination` | **source wins** | incumbent is a class-applier | — |
| `panel` | `Panel` | **source wins** | incumbent is a class-applier | — |
| `phone-input` | — | **admit outright** | rule 7 — no target React symbol | — |
| `pie-chart` | `PieChart` | **source wins** | incumbent is a class-applier | — |
| `popover` | `Popover` | **incumbent holds** | rule 4 — no demonstrated defect, no strict superset | — |
| `progress` | `Progress` | **source wins** | incumbent is a class-applier | — |
| `qr-code` | — | **admit outright** | rule 7 — no target React symbol | — |
| `radar-chart` | — | **admit outright** | rule 7 — no target React symbol | — |
| `radio-group` | `RadioGroup`, `Radio` | **incumbent holds** | test (a) fails — incumbent is `<input type=radio>` + shared `name`; the browser supplies APG arrow keys | — |
| `rating` | `Rating` | **incumbent holds** | rule 4 — no demonstrated defect, no strict superset | — |
| `relative-time` | — | **admit outright** | rule 7 — no target React symbol | — |
| `resizable` | — | **admit CSS-only** | #156 — narrow dep buys nothing | — |
| `scatter-chart` | — | **admit outright** | rule 7 — no target React symbol | — |
| `scroll-area` | — | **admit outright** | rule 7 — no target React symbol | — |
| `select` | `Select` | **source wins** | incumbent is a class-applier | — |
| `separator` | — | **admit outright** | rule 7 — no target React symbol | — |
| `sheet` | `Drawer` | **source wins** | rides the `drawer` swap — same target symbol | — |
| `sidebar` | `VerticalNav`, `AppShell` | **incumbent holds** | #164 — rule A3, same job / incompatible API; cookie-collapse and `Cmd+B` cherry-picked | — |
| `skeleton` | `Skeleton` | **source wins** | incumbent is a class-applier | — |
| `slider` | `Range` | **source wins** | incumbent is a class-applier | — |
| `snippet` | — | **admit outright** | rule 7 — no target React symbol | — |
| `sparkline` | `Sparkline` | **source wins** | incumbent is a class-applier | — |
| `speed-dial` | — | **admit outright** | rule 7 — no target React symbol | — |
| `spinner` | `Spinner` | **source wins** | incumbent is a class-applier | — |
| `split-button` | `SplitButton` | **incumbent holds** | rule 4 — no demonstrated defect, no strict superset | — |
| `stacked-bar` | `StackedBar` | **source wins** | incumbent is a class-applier | — |
| `stat-card` | `StatCard` | **source wins** | incumbent is a class-applier | — |
| `status` | `Status` | **source wins** | incumbent is a class-applier | — |
| `stepper` | `Stepper` | **source wins** | incumbent is a class-applier | — |
| `switch` | `Switch` | **source wins** | incumbent is a class-applier | — |
| `table` | — | **admit outright** | rule 7 — no target React symbol | — |
| `tabs` | `Tabs` | **incumbent holds** | rule 4 — no demonstrated defect, no strict superset | — |
| `tag` | `Tag` | **source wins** | incumbent is a class-applier | — |
| `tags-input` | `TagInput` | **incumbent holds** | rule 4 — no demonstrated defect, no strict superset | — |
| `textarea` | `Textarea` | **source wins** | incumbent is a class-applier | — |
| `theme-switcher` | — | **admit outright** | rule 7 — no target React symbol | — |
| `time-picker` | `TimePicker` | **incumbent holds** | #164 — test (b): a dial is a different interaction model, not a superset | — |
| `timeline` | `Timeline` | **source wins** | incumbent is a class-applier | — |
| `toast` | `Toast`, `ToastProvider` | **incumbent holds** | rule 4 — no demonstrated defect, no strict superset | — |
| `toc` | — | **admit outright** | rule 7 — no target React symbol | — |
| `toggle` | ~~`Segmented`~~ | **admit outright** | rule 7 (A4: alias withdrawn) | — |
| `toggle-group` | `Segmented` | **incumbent holds** | rule 4 — no demonstrated defect, no strict superset | — |
| `toolbar` | `Toolbar`, `ToolbarGroup`, `ToolbarSpacer` | **source wins** | incumbent is a class-applier | — |
| `tooltip` | `Tooltip` | **source wins** | test (a) — no `aria-describedby` and no Escape on the incumbent (worse than #156 recorded); a-bis inert, zero narrow deps | — |
| `tree` | `Tree` | **incumbent holds** | test (a) fails — the source has the same defect (roles only, zero keyboard) and less ARIA than the incumbent | — |
| `treemap` | — | **admit outright** | rule 7 — no target React symbol | — |
| `waterfall-chart` | — | **admit outright** | rule 7 — no target React symbol | — |
| `wizard` | `Wizard` | **incumbent holds** | rule 4 — no demonstrated defect, no strict superset | — |
| `wordmark` | `Wordmark` | **source wins** | incumbent is a class-applier | — |
## Method

- Target export symbols: every `export const|function` in `react/index.js` and `react/components/*.js` — 93, matching #152.
- **Behaviour-bearing vs class-applier** is mechanical: a symbol is behaviour-bearing if its body contains `useState`, `useEffect`, `useRef`, `onKeyDown`, `addEventListener` or `createPortal`. That gives **32** (#156 counted 31; the extra is `ConsoleLayout`, target-only) and **61** appliers, of which 42 are cited by an inventory row.
- Verdicts follow #156's rules in order: withdrawn alias or no counterpart → rule 7; counterpart is a class-applier → source wins; counterpart is behaviour-bearing → contest, resolved by tests (a)/(a-bis)/(b) with #164's and this ticket's overrides applied.
