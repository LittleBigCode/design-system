# Components

Every component is a framework-agnostic `.ds-*` class set; some have an optional light-DOM Web
Component on top (see [`../components/README.md`](../components/README.md)). All markup below is
copied from the live showcase — class and modifier names are exact. Each section links to its
showcase page.

## Status panel

**The signature component.** A result / status / scoring panel: a solid colored head whose
background switches with the semantic status, an optional key (legend) strip, metric rows, and
a note footer. De-domained from the source app's "verdict" card.

```html
<div class="ds-status ds-status--success">
  <div class="ds-status__head">
    <div class="ds-status__kicker">Approval level</div>
    <div class="ds-status__title">Full delegation</div>
    <div class="ds-status__subtitle">Approve without arbitration</div>
  </div>
  <div class="ds-status__key">
    <span class="is-success is-on">Full</span>
    <span class="is-warning">Manager</span>
    <span class="is-danger">Director</span>
    <span class="is-critical">Blocked</span>
  </div>
  <div class="ds-status__body">
    <div class="ds-metric ds-metric--hero"><span class="ds-metric__k">Margin</span><span class="ds-metric__v is-pos">38.0&nbsp;%</span></div>
    <div class="ds-metric"><span class="ds-metric__k">Margin / day</span><span class="ds-metric__v">€342</span></div>
    <div class="ds-metric"><span class="ds-metric__k">Day rate</span><span class="ds-metric__v">€900</span></div>
    <div class="ds-metric ds-metric--sub"><span class="ds-metric__k">Salary cost</span><span class="ds-metric__v">€420</span></div>
  </div>
  <div class="ds-status__note">Thresholds: ≥ 35 % full · 20–35 % manager · 0–20 % director · &lt; 0 % blocked.</div>
</div>
```

**Anatomy**

- **`.ds-status`** — the bordered container (squared, 1px ink border).
- **`.ds-status__head`** — the solid colored head; carries `.ds-status__kicker` (eyebrow),
  `.ds-status__title` (Ufficio), and `.ds-status__subtitle`. Text stays white (`--ds-on-status`).
- **`.ds-status__key`** — an optional 4-up legend strip with colored top borders.
- **`.ds-status__body`** — holds `.ds-metric` rows.
- **`.ds-status__note`** — a footer note above a soft rule.

**Head variants** (set the head background): `--success`, `--warning`, `--danger`,
`--critical`, `--neutral` (default), `--info`.

```html
<div class="ds-status ds-status--warning">
  <div class="ds-status__head">
    <div class="ds-status__kicker">Status</div>
    <div class="ds-status__title">Warning</div>
  </div>
</div>
<!-- swap --warning for --success / --danger / --critical / --neutral / --info -->
```

**Key strip** — each `<span>` takes a `.is-success` / `.is-warning` / `.is-danger` /
`.is-critical` class for its colored top border, and `.is-on` highlights the active step.

**Metric rows** — `.ds-metric` pairs a `.ds-metric__k` label with a tabular `.ds-metric__v`
value:

- `.ds-metric--hero` — the headline figure (large Ufficio value).
- `.ds-metric--sub` — an indented, quieter secondary line.
- `.is-pos` / `.is-neg` on `.ds-metric__v` — color the value success-green / danger-red.

**Web Component** — `<ds-status>` builds the head from attributes; the body stays in light DOM.
Attributes: `status`, `kicker`, `heading`, `subtitle`.

```html
<ds-status status="warning" kicker="Approval level" heading="Manager review" subtitle="Needs sign-off">
  <div class="ds-status__body">
    <div class="ds-metric ds-metric--hero"><span class="ds-metric__k">Margin</span><span class="ds-metric__v">28 %</span></div>
  </div>
</ds-status>
```

Live: [../examples/components/status-panel.html](../examples/components/status-panel.html)

## Buttons

Flat, sharp buttons with a 1px border and no radius.

```html
<button class="ds-button">Settings</button>
<button class="ds-button ds-button--primary">Save</button>
<button class="ds-button ds-button--danger">Reset</button>
```

**Variants:** ghost (default `.ds-button`), `--primary` (ink fill), `--danger` (danger
outline). **States:** hover, `:focus-visible` ring, and `disabled` / `[disabled]` /
`[aria-disabled="true"]`.

**Web Component** — `<ds-button>` renders a real `<button>`. Attributes: `variant="primary|danger"`,
`type`, `disabled`.

```html
<ds-button>Settings</ds-button>
<ds-button variant="primary">Save</ds-button>
<ds-button variant="danger" disabled>Reset</ds-button>
```

Live: [../examples/components/buttons.html](../examples/components/buttons.html)

## Toggle switch

A sharp, flat on/off switch built from a real checkbox, so it stays keyboard-accessible and
form-bound.

```html
<label class="ds-switch"><input type="checkbox"><span class="ds-switch__track"></span><span>Detail mode</span></label>
```

**Parts:** `.ds-switch` (label wrapper), the hidden `input`, `.ds-switch__track` (the squared
track + sliding knob). **States:** add `checked` on the input for on, `disabled` to lock it.

**Web Component** — `<ds-switch>` builds the checkbox, track, and label. Attributes: `checked`,
`disabled`, `name`. Reflects `checked` and emits `change`.

```html
<ds-switch checked>Detail mode</ds-switch>
```

Live: [../examples/components/toggle.html](../examples/components/toggle.html)

## Badges

Small bordered, uppercase pills for roles, tags, and statuses.

```html
<span class="ds-badge">Director</span>
<span class="ds-badge ds-badge--solid">Admin</span>
<span class="ds-badge ds-badge--accent">New</span>
```

**Variants:** bordered (default), `--solid` (ink fill), `--accent` (accent outline).

**Web Component** — `<ds-badge>` self-classes from a `variant` attribute (`solid|accent`); the
label is the element's text.

```html
<ds-badge>Director</ds-badge>
<ds-badge variant="solid">Admin</ds-badge>
```

Live: [../examples/components/badges.html](../examples/components/badges.html)

## Tabs

Title-voiced tabs with an accent underline on the active tab and an optional sublabel.

```html
<div class="ds-tabs">
  <button class="ds-tabs__tab is-active">Check a margin<small class="ds-tabs__sublabel">rate + salary known</small></button>
  <button class="ds-tabs__tab">Target rate<small class="ds-tabs__sublabel">from a salary</small></button>
  <button class="ds-tabs__tab">Max salary<small class="ds-tabs__sublabel">from a rate</small></button>
</div>
```

**Parts / state:** `.ds-tabs` (row), `.ds-tabs__tab` (mark active with `.is-active` or
`[aria-selected="true"]`), `.ds-tabs__sublabel` (one-line hint). Panes are `.ds-tabpane`, shown
with `.is-active` / `[aria-hidden="false"]`.

**Web Component** — `<ds-tabs>` wires `.ds-tabs__tab[data-pane]` ↔ `.ds-tabpane[data-pane]` and
ARIA; emits `change`.

```html
<ds-tabs>
  <div class="ds-tabs">
    <button class="ds-tabs__tab" data-pane="margin">Check a margin</button>
    <button class="ds-tabs__tab" data-pane="rate">Target rate</button>
    <button class="ds-tabs__tab" data-pane="salary">Max salary</button>
  </div>
  <div class="ds-tabpane" data-pane="margin">Margin from a known rate and salary.</div>
  <div class="ds-tabpane" data-pane="rate">Target rate from a salary.</div>
  <div class="ds-tabpane" data-pane="salary">Maximum salary from a rate.</div>
</ds-tabs>
```

Live: [../examples/components/tabs.html](../examples/components/tabs.html)

## Form fields

Flat, bordered inputs with uppercase labels and tabular numerics. Wrap a control in
`.ds-field` to style it by descent, or apply `.ds-input` directly.

```html
<div class="ds-field">
  <label>Entity</label>
  <select class="ds-input"><option>LBC_FR</option><option>LBC_US</option></select>
</div>
<div class="ds-field">
  <label>Day rate</label>
  <input class="ds-input ds-input--number" type="number" value="900">
</div>
```

**Pieces:**

- **`.ds-field`** — stacks an uppercase label over a control.
- **`.ds-input`** — the bordered control (also styles `select`, `textarea`, and text-like
  inputs inside `.ds-field`). `.ds-input--number` is compact and right-aligned.
- **`.ds-context-bar`** — a bottom-aligned row of fields above the content they scope, with a
  rule beneath.
- **`.ds-input-row`** — a label on the left, a control/value on the right, separated by a soft
  rule; `.ds-input-row__unit` adds a trailing unit.

```html
<div class="ds-input-row">
  <label>Day rate <span class="ds-input-row__unit">€</span></label>
  <input class="ds-input ds-input--number" type="number" value="900">
</div>
```

Live: [../examples/components/forms.html](../examples/components/forms.html)

## Chips

Compact labeled pills for read-only facts and parameters.

```html
<div class="ds-chips">
  <span class="ds-chip">Overhead <b>18 %</b></span>
  <span class="ds-chip">Days <b>218</b></span>
  <span class="ds-chip ds-chip--warn">Incomplete setup</span>
</div>
```

**Parts / variants:** `.ds-chips` (wrapper), `.ds-chip` (pill; wrap the value in `<b>` to
emphasize it), `.ds-chip--warn` (warning tone for an incomplete/invalid state).

Live: [../examples/components/chips.html](../examples/components/chips.html)

## Banner

A full-width, fixed-identity notice. It stays pale yellow with dark ink in **every** theme,
making it the right home for a persistent, machine-level message.

```html
<div class="ds-banner">Settings <b>modified locally</b> on this machine — values differ from the shared reference. Use Settings → Reset to restore.</div>
```

**Variants / state:** single `.ds-banner`; emphasize words with `<b>`; add the `hidden`
attribute to dismiss it.

Live: [../examples/components/banner.html](../examples/components/banner.html)

## Callout

A bordered alert box for inline messages. The **default tone is warning**.

```html
<div class="ds-callout">Default (warning tone). Incomplete configuration for this entity.</div>
<div class="ds-callout ds-callout--info"><div class="ds-callout__title">Heads up</div>This is an informational callout.</div>
<div class="ds-callout ds-callout--success">Saved successfully.</div>
<div class="ds-callout ds-callout--danger">This action cannot be undone.</div>
```

**Variants:** default (warning), `--info`, `--success`, `--danger`. Add an optional
`.ds-callout__title` heading.

**Web Component** — `<ds-callout>` self-classes from a `type` attribute (`info|success|warning|danger`,
default warning) and prepends a `.ds-callout__title` from `heading`.

```html
<ds-callout type="info" heading="Heads up">This is an informational callout.</ds-callout>
```

Live: [../examples/components/callout.html](../examples/components/callout.html)

## Panel

A sunken content panel on the whitesmoke surface with an uppercase title.

```html
<div class="ds-panel">
  <div class="ds-panel__title">Notes</div>
  <p>Arbitrary content…</p>
</div>
```

**Variants:** `--rows` tightens the bottom padding when the panel hosts `.ds-input-row` items
(which carry their own spacing).

```html
<div class="ds-panel ds-panel--rows">
  <div class="ds-panel__title">Sale</div>
  <div class="ds-input-row"><label>Day rate <span class="ds-input-row__unit">€</span></label><input class="ds-input ds-input--number" type="number" value="900"></div>
  <div class="ds-input-row"><label>Rebilled expenses <span class="ds-input-row__unit">€</span></label><input class="ds-input ds-input--number" type="number" value="0"></div>
</div>
```

**Web Component** — `<ds-panel>`. Attributes: `title`, `rows`.

Live: [../examples/components/panel.html](../examples/components/panel.html)

## Segmented

A row of square filter pills for selecting between a small set of options. The active item
fills with ink.

```html
<div class="ds-segmented">
  <button class="ds-segmented__item is-active">LBC_FR</button>
  <button class="ds-segmented__item"><span class="ds-segmented__dot ds-segmented__dot--ok"></span>LBC_BE</button>
  <button class="ds-segmented__item"><span class="ds-segmented__dot ds-segmented__dot--ko"></span>LBC_US</button>
</div>
```

**Parts / state:** `.ds-segmented` (wrapper), `.ds-segmented__item` (mark active with
`.is-active`, `[aria-pressed="true"]`, or `[aria-selected="true"]`), and an optional
`.ds-segmented__dot` prefix with `--ok` (success) or `--ko` (warning).

**Web Component** — `<ds-segmented>` toggles its `.ds-segmented__item`s and emits `change`.
Attribute: `mode="single|multi"`.

```html
<ds-segmented>
  <button class="ds-segmented__item is-active">LBC_FR</button>
  <button class="ds-segmented__item">LBC_BE</button>
  <button class="ds-segmented__item">LBC_US</button>
</ds-segmented>
```

Live: [../examples/components/segmented.html](../examples/components/segmented.html)

## Metrics

Stat rows pairing a label with a tabular value, separated by hairlines. The same `.ds-metric`
rows live inside the [status panel](#status-panel) body.

```html
<div class="ds-metric ds-metric--hero"><span class="ds-metric__k">Margin</span><span class="ds-metric__v is-pos">38 %</span></div>
<div class="ds-metric"><span class="ds-metric__k">Margin / day</span><span class="ds-metric__v">€342</span></div>
<div class="ds-metric ds-metric--sub"><span class="ds-metric__k">Salary cost</span><span class="ds-metric__v">€420</span></div>
<div class="ds-metric"><span class="ds-metric__k">Loss</span><span class="ds-metric__v is-neg">−4 %</span></div>
```

**Parts / variants:** `.ds-metric` (row) with `.ds-metric__k` (label) and `.ds-metric__v`
(value); `--hero` for the headline figure, `--sub` for an indented secondary line, and
`.is-pos` / `.is-neg` to color the value.

Live: [../examples/components/metrics.html](../examples/components/metrics.html)

## Modal

A centered dialog over a dimmed overlay: a bordered head with a title and close button, a
scrollable body, and a footer of actions.

```html
<div class="ds-modal">
  <div class="ds-modal__head">
    <h2 class="ds-modal__title">Reference settings</h2>
    <button class="ds-button ds-modal__close">Close</button>
  </div>
  <div class="ds-modal__body"><p>Body content…</p></div>
  <div class="ds-modal__foot">
    <button class="ds-button">Export</button>
    <span class="ds-modal__spacer"></span>
    <button class="ds-button ds-button--danger">Reset</button>
    <button class="ds-button ds-button--primary">Save</button>
  </div>
</div>
```

**Parts:** `.ds-overlay` (fixed backdrop scrim; opened with `.is-open` or `[data-open="true"]`)
wraps `.ds-modal` (the dialog). The dialog has `.ds-modal__head` (`.ds-modal__title` +
`.ds-modal__close`), `.ds-modal__body` (scrollable), and `.ds-modal__foot`; `.ds-modal__spacer`
pushes trailing actions to the right.

**Web Component** — `<ds-modal>` builds the overlay + dialog; footer actions go in a
`data-foot` slot, and a `[data-open="#id"]` trigger calls its `.open()`. Attributes: `open`,
`heading`. Methods `.open()` / `.close()`; emits `ds-open` / `ds-close`.

```html
<button class="ds-button ds-button--primary" data-open="#demoModal">Open modal</button>
<ds-modal id="demoModal" heading="Reference settings">
  <p>Body…</p>
  <div data-foot>
    <button class="ds-button">Cancel</button>
    <span class="ds-modal__spacer"></span>
    <button class="ds-button ds-button--primary">Save</button>
  </div>
</ds-modal>
```

Live: [../examples/components/modal.html](../examples/components/modal.html)

## Table

A flat data table: uppercase headers over a 1px rule, hairline row separators, and tabular
numerals.

```html
<table class="ds-table ds-table--hover">
  <thead>
    <tr><th>Grade</th><th class="ds-table__num">Overhead</th><th class="ds-table__num">Days</th><th></th></tr>
  </thead>
  <tbody>
    <tr><td class="ds-table__name">Consultant</td><td class="ds-table__num">18 %</td><td class="ds-table__num">218</td><td><button class="ds-table__row-action" aria-label="Delete">✕</button></td></tr>
    <tr><td class="ds-table__name">Senior</td><td class="ds-table__num">16 %</td><td class="ds-table__num">216</td><td><button class="ds-table__row-action" aria-label="Delete">✕</button></td></tr>
    <tr><td class="ds-table__name">Manager</td><td class="ds-table__num">14 %</td><td class="ds-table__num">214</td><td><button class="ds-table__row-action" aria-label="Delete">✕</button></td></tr>
  </tbody>
</table>
```

**Variants / parts:** `--hover` adds a row highlight; `.ds-table__num` right-aligns figures,
`.ds-table__name` is the row label, and `.ds-table__row-action` is a per-row control button.
Editable `<input>`s inside cells are styled to match.

Live: [../examples/components/table.html](../examples/components/table.html)

## Dividers

An uppercase `.ds-section-heading` with a trailing hairline that runs to the edge — the
system's way of separating regions of a page.

```html
<div class="ds-section">
  <h3 class="ds-section-heading">Delegation thresholds</h3>
  <p>Margin bands that set who may approve a deal without arbitration.</p>
</div>
<div class="ds-section">
  <h3 class="ds-section-heading">Reference data</h3>
  <p>Day rates, overheads and salary costs used across the model.</p>
</div>
```

**Parts:** `.ds-section-heading` (label + 1px trailing rule); wrap content in `.ds-section` for
consistent vertical rhythm between groups.

**Web Component** — `<ds-section-heading>` renders the uppercase label + hairline.

Live: [../examples/components/dividers.html](../examples/components/dividers.html)

---

# Data

The components above were de-domained from the source app; the ones below round the
system out into a general-purpose kit. Each ships a `.ds-*` class set, a React component
(`@diametral/design-system/react`), and a showcase page. They are flat and sharp by the same
parti pris: 1px borders, no radius (the radio dot, spinner, and progress motion are the only
sanctioned exceptions), separation by rule rather than shadow.

## Data grid

**The headline component.** A full data grid: sortable columns, per-column filters, row
selection, expandable detail rows, column show/hide, and **lazy server-side loading** in either
paginated or infinite ("load more") mode.

```html
<div class="ds-datagrid">
  <div class="ds-datagrid__toolbar">
    <div class="ds-datagrid__title">Missions</div>
    <div class="ds-datagrid__spacer"></div>
    <div class="ds-datagrid__cols">
      <button class="ds-button ds-button--sm" aria-expanded="false">Columns</button>
    </div>
  </div>
  <div class="ds-datagrid__scroll">
    <table class="ds-datagrid__table">
      <thead>
        <tr>
          <th class="ds-datagrid__expandcell"></th>
          <th class="ds-datagrid__select"><input type="checkbox" aria-label="Select all"></th>
          <th class="ds-datagrid__th is-sorted">
            <button class="ds-datagrid__sort">Mission<span class="ds-datagrid__sort-ind">▲</span></button>
          </th>
          <th class="ds-datagrid__th--num">Margin %</th>
        </tr>
        <tr class="ds-datagrid__filters">
          <th></th><th></th>
          <th><input class="ds-datagrid__filter-input" type="text" placeholder="Filter…"></th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        <tr class="ds-datagrid__row is-selected is-expanded">
          <td class="ds-datagrid__expandcell">
            <button class="ds-datagrid__expand" aria-expanded="true" aria-label="Toggle row"><span class="ds-datagrid__chevron">▶</span></button>
          </td>
          <td class="ds-datagrid__select"><input type="checkbox" checked aria-label="Select row"></td>
          <td>Mission 001</td>
          <td class="ds-datagrid__td--num">38.0 %</td>
        </tr>
        <tr class="ds-datagrid__detail"><td colspan="4">Full detail for Mission 001…</td></tr>
      </tbody>
    </table>
  </div>
  <div class="ds-datagrid__footer">
    <span class="ds-datagrid__count">1–8 of 137</span>
    <div class="ds-datagrid__pager">
      <button class="ds-datagrid__pagebtn" aria-label="First" disabled>«</button>
      <button class="ds-datagrid__pagebtn" aria-label="Previous" disabled>‹</button>
      <span>Page 1 / 18</span>
      <button class="ds-datagrid__pagebtn" aria-label="Next">›</button>
      <button class="ds-datagrid__pagebtn" aria-label="Last">»</button>
    </div>
  </div>
</div>
```

**Anatomy / parts**

- **`.ds-datagrid`** — the bordered container.
- **`.ds-datagrid__toolbar`** — title (`.ds-datagrid__title`), a `.ds-datagrid__spacer`, optional
  custom toolbar nodes, and the column-toggle menu (`.ds-datagrid__cols` → `.ds-datagrid__cols-menu`
  with `.ds-datagrid__cols-item` rows).
- **`.ds-datagrid__scroll`** wraps `.ds-datagrid__table`. Header cells use `.ds-datagrid__th`
  (`.is-sorted` when active), the sort affordance is `.ds-datagrid__sort` + `.ds-datagrid__sort-ind`,
  and the per-column filter row is `.ds-datagrid__filters` with `.ds-datagrid__filter-input` inputs.
  Numeric columns add `.ds-datagrid__th--num` / `.ds-datagrid__td--num`.
- **Rows** are `.ds-datagrid__row` (`.is-selected`, `.is-expanded`); the select cell is
  `.ds-datagrid__select`, the expand cell `.ds-datagrid__expandcell` with a `.ds-datagrid__expand`
  button and rotating `.ds-datagrid__chevron`; the detail row is `.ds-datagrid__detail`.
- **Loading / empty:** loading rows reuse `.ds-skeleton`; `.ds-datagrid__empty` is the no-data cell;
  `.ds-datagrid__loadbar` the inline loader.
- **Footer:** `.ds-datagrid__footer` holds a `.ds-datagrid__count` and a `.ds-datagrid__pager` of
  `.ds-datagrid__pagebtn`s (`.is-active` / `:disabled`); in infinite mode the pager hosts a
  "Load more" `.ds-button`.

**Data modes** — pass `rows` for **client mode** (in-memory sort/filter/page), or `loadPage` for
**lazy / server mode** (called on mount and on every page/sort/filter change). Lazy supports
`lazyMode="pagination"` (page controls) or `"infinite"` ("Load more", rows append).

```ts
// lazy/server mode: called on mount and whenever page/sort/filters change
loadPage: (args: {
  page: number;
  pageSize: number;
  sort: { key: string; dir: "asc" | "desc" } | null;
  filters: Record<string, string>;
}) => Promise<{ rows: Row[]; total: number }> | { rows: Row[]; total: number }
```

**React** — `<DataGrid>`. Key props: `columns` (a `DataGridColumn[]` of `{ key, header, sortable?,
filterable?, align?, width?, hidden?, render? }`), `rows` (client mode) **or** `loadPage` +
`lazyMode` (lazy mode), `pageSize`, `selectable` / `selectedKeys` / `defaultSelectedKeys` /
`onSelectionChange`, `expandable` (`boolean` or `(row) => node`) + `renderDetail`, `defaultSort` /
`onSortChange`, `filterable`, `rowKey`, `columnToggle`, `title`, `toolbar`, `emptyMessage`.
Per-column `sortable` / `filterable` enable sorting and the filter input on that column, and
`hidden` (with the columns menu) drives show/hide.

```jsx
import { DataGrid } from "@diametral/design-system/react";

const columns = [
  { key: "id", header: "ID", sortable: true, align: "right", width: "64px" },
  { key: "name", header: "Mission", sortable: true, filterable: true },
  { key: "entity", header: "Entity", sortable: true, filterable: true },
  { key: "margin", header: "Margin %", sortable: true, align: "right",
    render: (r) => <span className="ds-numeric">{r.margin} %</span> },
];

<DataGrid
  title="Missions"
  columns={columns}
  loadPage={loadPage}
  lazyMode="pagination"   // or "infinite"
  pageSize={8}
  selectable filterable
  expandable
  renderDetail={(r) => <div>Full detail for {r.name}</div>}
  onSelectionChange={(keys) => console.log(keys)}
/>

// Client mode: pass `rows` instead of `loadPage` for in-memory sort/filter/page.
```

Live: [../examples/components/datagrid.html](../examples/components/datagrid.html)

## Card

A flat bordered surface with no shadow: an optional full-bleed media image, a title-voiced header,
a body, and a footer set off by a top rule on the alt background.

```html
<div class="ds-card">
  <img class="ds-card__media" src="walnut.png" alt="">
  <div class="ds-card__header"><h3 class="ds-card__title">Senior consultant</h3></div>
  <div class="ds-card__body">Day rate and margin for a confirmed mission.</div>
  <div class="ds-card__footer">Updated 2 hours ago</div>
</div>
```

**Parts / variants:** `.ds-card` (container), `.ds-card__media` (full-bleed image, also `img.ds-card__media`),
`.ds-card__header` + `.ds-card__title`, `.ds-card__body`, `.ds-card__footer`. Stack divided regions
with `.ds-card__block` (separated by a soft rule). `--clickable` turns the whole card into a
focusable, hover-highlighted affordance.

**React** — `<Card>`. Props: `title`, `media` (an image `src` string or any node), `footer`,
`clickable`; forwards a ref and all `<div>` attributes (e.g. `onClick`).

```jsx
<Card title="Senior consultant" media="/walnut.png" footer="Updated 2 hours ago" clickable onClick={openMission}>
  Day rate and margin for a confirmed mission.
</Card>
```

Live: [../examples/components/card.html](../examples/components/card.html)

## Description list

A `<dl>` laid out as a two-column grid — an auto-width uppercase term column and a 1fr value
column — for key/value detail readouts. Each pair is a row separated by a soft rule.

```html
<dl class="ds-dl">
  <dt class="ds-dl__term">Entity</dt><dd class="ds-dl__desc">LBC_FR</dd>
  <dt class="ds-dl__term">Day rate</dt><dd class="ds-dl__desc">€900</dd>
  <dt class="ds-dl__term">Margin</dt><dd class="ds-dl__desc">38.0 %</dd>
</dl>
```

**Parts:** `.ds-dl` (the grid), `.ds-dl__term` (uppercase label `<dt>`), `.ds-dl__desc` (tabular
value `<dd>`). The first row drops its leading rule.

**React** — `<DescriptionList>`. Prop: `items` (a `{ term, desc }[]`); forwards a ref and `<dl>`
attributes.

```jsx
<DescriptionList items={[
  { term: "Entity", desc: "LBC_FR" },
  { term: "Day rate", desc: "€900" },
]} />
```

Live: [../examples/components/description-list.html](../examples/components/description-list.html)

## Avatar

A flat, sharp square showing uppercase initials or a cover-fit image clipped to a 1px bordered
tile, plus an overlapping group with a "+N" overflow count.

```html
<span class="ds-avatar ds-avatar--sm">VD</span>
<span class="ds-avatar">VD</span>
<span class="ds-avatar ds-avatar--lg"><img class="ds-avatar__img" src="…" alt="Leo Marsh"></span>

<div class="ds-avatar-group">
  <span class="ds-avatar"><img class="ds-avatar__img" src="…" alt="Maria Vance"></span>
  <span class="ds-avatar">JL</span>
  <span class="ds-avatar ds-avatar--count" aria-label="3 more">+3</span>
</div>
```

**Parts / variants:** `.ds-avatar` (tile) with an optional `.ds-avatar__img`; sizes `--sm` / `--lg`
(default 36px, no modifier). `.ds-avatar-group` overlaps avatars (`--sm` / `--lg` tune the overlap);
`.ds-avatar--count` styles the trailing "+N" tile.

**React** — `<Avatar>` (props: `src`, `alt`, `initials`, `size` `"sm" | "lg"`) and `<AvatarGroup>`
(prop: `max` — caps visible avatars, the rest collapse into a "+N" tile).

```jsx
<Avatar initials="VD" size="lg" />
<Avatar src="https://i.pravatar.cc/96?img=32" alt="Leo Marsh" />
<AvatarGroup max={3}>
  <Avatar src="…" alt="Maria Vance" /><Avatar initials="JL" /><Avatar initials="AO" />
</AvatarGroup>
```

Live: [../examples/components/avatar.html](../examples/components/avatar.html)

## Tag

Small inline uppercase labels with a 1px border and no radius — a neutral default, four status
families, and an optional × button for removable tags.

```html
<span class="ds-tag">Draft</span>
<span class="ds-tag ds-tag--info">In review</span>
<span class="ds-tag ds-tag--success">Approved</span>
<span class="ds-tag ds-tag--removable">Marketing
  <button class="ds-tag__remove" type="button" aria-label="Remove">×</button></span>
```

**Variants / parts:** default (neutral) plus `--info`, `--success`, `--warning`, `--danger`
(colored border + matching text + tinted background). `--removable` makes room for the trailing
`.ds-tag__remove` button.

**React** — `<Tag>`. Props: `status` (`"info" | "success" | "warning" | "danger"`), `onRemove`
(renders the × and fires on click); forwards a ref and `<span>` attributes.

```jsx
<Tag>Draft</Tag>
<Tag status="success">Approved</Tag>
<Tag status="info" onRemove={() => remove("eu")}>Region: EU</Tag>
```

Live: [../examples/components/tag.html](../examples/components/tag.html)

## Timeline

A vertical event list: a 1px rule runs down the left as a rail, each item hangs a small square dot
on it, and stacks a faint timestamp, a title, and supporting body text.

```html
<ol class="ds-timeline">
  <li class="ds-timeline__item">
    <span class="ds-timeline__dot is-success"></span>
    <div class="ds-timeline__time">09:42</div>
    <div class="ds-timeline__title">Matrix published</div>
    <div class="ds-timeline__body">All 1,204 rates synced to production.</div>
  </li>
  <li class="ds-timeline__item">
    <span class="ds-timeline__dot"></span>
    <div class="ds-timeline__time">Yesterday</div>
    <div class="ds-timeline__title">Draft created</div>
  </li>
</ol>
```

**Parts / variants:** `.ds-timeline` (`<ol>` rail), `.ds-timeline__item`, `.ds-timeline__dot`,
`.ds-timeline__time`, `.ds-timeline__title`, `.ds-timeline__body`. The dot recolors via `is-success`
/ `is-warning` / `is-danger` / `is-info` / `is-neutral` (default is the neutral rule color).

**React** — `<Timeline>`. Prop: `items` (a `{ time?, title?, body?, status? }[]`; `status` maps to
the dot's `is-*` class).

```jsx
<Timeline items={[
  { time: "09:42", title: "Matrix published", body: "All 1,204 rates synced.", status: "success" },
  { time: "Yesterday", title: "Draft created", body: "Imported from the Q3 template." },
]} />
```

Live: [../examples/components/timeline.html](../examples/components/timeline.html)

## Tree view

A nested disclosure list for hierarchies — folders, taxonomies, navigation. A chevron rotates on
expand, a faint guide rule reads the nesting, and an accent left border marks the selected row.

```html
<ul class="ds-tree" role="tree">
  <li class="ds-tree__item" role="treeitem" aria-expanded="true">
    <div class="ds-tree__row">
      <button class="ds-tree__toggle" type="button" aria-expanded="true" aria-label="Toggle">&rsaquo;</button>
      <span class="ds-tree__label">Pricing</span>
    </div>
    <ul class="ds-tree__children" role="group">
      <li class="ds-tree__item" role="treeitem" aria-selected="true">
        <div class="ds-tree__row">
          <span class="ds-tree__toggle ds-tree__toggle--leaf" aria-hidden="true"></span>
          <span class="ds-tree__label is-selected">Standard</span>
        </div>
      </li>
    </ul>
  </li>
</ul>
```

**Parts / state:** `.ds-tree` (`<ul role="tree">`), `.ds-tree__item` (`role="treeitem"`),
`.ds-tree__row` (toggle + label), `.ds-tree__toggle` (chevron button; `[aria-expanded="true"]`
rotates it) with `--leaf` for a non-interactive spacer, `.ds-tree__label` (selectable; `.is-selected`
or `[aria-selected="true"]` on the item), and `.ds-tree__children` (nested `<ul role="group">`;
collapse with the `hidden` attribute or `.is-collapsed`).

**React** — `<Tree>`. Props: `nodes` (a `{ id, label, children? }[]`), `defaultExpanded` (ids
expanded initially; expansion is uncontrolled), `onSelect` (fires with the chosen node).

```jsx
<Tree
  nodes={nodes}
  defaultExpanded={["pricing", "matrices"]}
  onSelect={(node) => console.log("selected", node.id)}
/>
```

Live: [../examples/components/tree.html](../examples/components/tree.html)

---

# Forms

## Form controls

The rest of the form kit — checkboxes, radios, a custom-chevron select, textarea, range slider,
input groups, and field validation. Each is flat and sharp with a 1px border and no radius (only
the radio dot is round), built from real form elements so they stay keyboard-accessible and
form-bound. Companion to the [Form fields](#form-fields) section above.

**Checkbox** — `.ds-checkbox` hides the native input and draws a rotated-border check on a
`.ds-checkbox__box`.

```html
<label class="ds-checkbox"><input type="checkbox" checked><span class="ds-checkbox__box"></span><span>Round to nearest €10</span></label>
```

React: `<Checkbox>` — `checked` / `defaultChecked`, `onChange(checked, event)`, `disabled`, `name`.

**Radio + RadioGroup** — `.ds-radio` draws an inner dot on a `.ds-radio__dot` (the one rounded
control); stack a set in `.ds-radio-group`.

```html
<div class="ds-radio-group">
  <label class="ds-radio"><input type="radio" name="rounding" checked><span class="ds-radio__dot"></span><span>No rounding</span></label>
  <label class="ds-radio"><input type="radio" name="rounding"><span class="ds-radio__dot"></span><span>Nearest €1</span></label>
</div>
```

React: `<Radio>` (`checked` / `defaultChecked`, `value`, `name`, `onChange(value, event)`,
`disabled`) and `<RadioGroup>` (`options` a `{ value, label, disabled? }[]`, `value` /
`defaultValue`, `name`, `onChange(value, event)`).

**Select** — `.ds-select` wraps a native `<select>` for the flat `.ds-input` look + a custom
chevron; `--block` makes it full-width.

```html
<div class="ds-select ds-select--block">
  <select><option>Standard rate card</option><option>Strategic accounts</option></select>
</div>
```

React: `<Select>` — `options` (a `{ value, label, disabled? }[]`, in place of children), `block`;
forwards a ref and `<select>` attributes.

**Textarea** — `.ds-textarea` shares the input border/padding, with a comfortable min-height and
vertical-only resize.

```html
<textarea class="ds-textarea" placeholder="Explain the override…"></textarea>
```

React: `<Textarea>` — forwards a ref and all `<textarea>` attributes (e.g. `rows`).

**Range** — `.ds-range` styles `input[type=range]` with a 4px flat track and a 14px square ink thumb
(WebKit + Firefox).

```html
<input class="ds-range" type="range" min="0" max="100" value="35">
```

React: `<Range>` — `value` / `defaultValue`, `min`, `max`, `step`, `onChange(value, event)`.

**Input group** — `.ds-input-group` glues `.ds-input-group__addon`s to a control so they share
borders and read as one unit.

```html
<div class="ds-input-group">
  <span class="ds-input-group__addon">€</span>
  <input class="ds-input ds-input--number" type="number" value="900">
</div>
```

React: `<InputGroup>` — `before` / `after` addon nodes wrap the control child.

**Validation / FieldHint** — add `.ds-field--error` or `.ds-field--success` to a [field](#form-fields)
to color its control's border, and `.ds-field__hint` (with `--error` / `--success`) below it for
helper text.

```html
<div class="ds-field ds-field--error">
  <label>Day rate</label>
  <input class="ds-input ds-input--number" type="number" value="0">
  <span class="ds-field__hint ds-field__hint--error">Day rate must be greater than zero.</span>
</div>
```

React: `<FieldHint>` — `status` (`"error" | "success"`); pair it with the `.ds-field--error` /
`--success` wrapper.

Live: [../examples/components/form-controls.html](../examples/components/form-controls.html)

---

# Feedback

## Alert

An inline alert: a 1px-bordered, status-tinted surface with a 3px accent bar on the left, holding
an icon, content, optional actions, and a dismiss button.

```html
<div class="ds-alert ds-alert--success">
  <span class="ds-alert__icon"><svg>…</svg></span>
  <div class="ds-alert__content">
    <div class="ds-alert__title">Saved</div>
    Your pricing matrix has been published.
    <div class="ds-alert__actions"><button class="ds-button ds-button--sm">Undo</button></div>
  </div>
  <button class="ds-alert__close" type="button" aria-label="Dismiss">×</button>
</div>
```

**Parts / variants:** `.ds-alert` with `.ds-alert__icon`, `.ds-alert__content` (+ optional
`.ds-alert__title`), `.ds-alert__actions`, and a borderless `.ds-alert__close`. Status modifiers
`--info` (default), `--success`, `--warning`, `--danger`. `--app` makes it a full-width, solid-status
banner with white text for page-top messages.

**React** — `<Alert>`. Props: `type` (`"info" | "success" | "warning" | "danger"`, default `info`),
`dismissible` + `onDismiss`, `icon`, `app`; forwards a ref and `<div>` attributes.

```jsx
<Alert type="success" dismissible onDismiss={hide} icon={<CheckIcon />}>
  Your pricing matrix has been published.
</Alert>
```

Live: [../examples/components/alert.html](../examples/components/alert.html)

## Spinner

A circular loading indicator: a 2px ruled ring whose top segment is the accent color, rotating
continuously (`border-radius:50%` is a sanctioned exception; honors `prefers-reduced-motion`).

```html
<span class="ds-spinner ds-spinner--sm"></span>
<span class="ds-spinner"></span>
<span class="ds-spinner ds-spinner--lg"></span>
```

**Variants:** sizes `--sm` / `--lg` (default 20px); `--inline` aligns it to the text baseline beside
a label.

**React** — `<Spinner>`. Props: `size` (`"sm" | "lg"`), `inline`, `label` (accessible name via
`aria-label`, default `"Loading"`).

```jsx
<Spinner size="lg" />
<Spinner inline label="Saving" />
```

Live: [../examples/components/spinner.html](../examples/components/spinner.html)

## Progress

A flat progress bar: a thin track holding a filled bar whose width is set inline as a percent.
Status modifiers recolor the bar; `--indeterminate` animates a sliding segment.

```html
<div>
  <div class="ds-progress__label"><span>Uploading</span><span class="ds-progress__value">62%</span></div>
  <div class="ds-progress"><div class="ds-progress__bar" style="width:62%"></div></div>
</div>
<div class="ds-progress ds-progress--indeterminate"><div class="ds-progress__bar"></div></div>
```

**Parts / variants:** `.ds-progress` (track) + `.ds-progress__bar` (fill). Status modifiers
`--success`, `--warning`, `--danger`; `--indeterminate` for the sliding segment. An optional
`.ds-progress__label` row (with `.ds-progress__value`) sits above.

**React** — `<Progress>`. Props: `value` (default 0), `max` (default 100), `status` (`"success" |
"warning" | "danger"`), `indeterminate`, `label` (caption row, shown with the percentage).

```jsx
<Progress value={62} label="Uploading" />
<Progress indeterminate />
```

Live: [../examples/components/progress.html](../examples/components/progress.html)

## Toast

A transient, floating notification: a bordered surface card with a 3px status bar on the left — like
an alert, but it sits on its own surface and stacks in a fixed top-right viewport (`.ds-toasts`).

```html
<div class="ds-toasts">
  <div class="ds-toast ds-toast--success" role="status">
    <div class="ds-toast__content">
      <div class="ds-toast__title">Saved</div>
      <div class="ds-toast__message">Your pricing matrix has been published.</div>
    </div>
    <button class="ds-toast__close" type="button" aria-label="Dismiss">×</button>
  </div>
</div>
```

**Parts / variants:** `.ds-toasts` (fixed viewport that stacks cards) holds `.ds-toast` cards with
`.ds-toast__content` (+ `.ds-toast__title`, `.ds-toast__message`) and a borderless
`.ds-toast__close`. Status modifiers `--info` (default), `--success`, `--warning`, `--danger` recolor
the left bar.

**React** — wrap the app in `<ToastProvider>` (it portals a fixed viewport to `<body>`; prop:
`duration`, default 4000ms), then call `show()` from the `useToast()` hook (`{ show, dismiss }`).
`show(opts)` takes `{ title?, message?, type?, duration? }` and returns an id. A presentational
`<Toast>` card (props `type`, `title`, `message`, `onClose`) is also exported.

```jsx
import { ToastProvider, useToast } from "@diametral/design-system/react";

function App() { return <ToastProvider><Toolbar /></ToastProvider>; }

function Toolbar() {
  const { show } = useToast();
  return <button className="ds-button"
    onClick={() => show({ type: "success", title: "Saved", message: "Published.", duration: 4000 })}>
    Publish
  </button>;
}
```

Live: [../examples/components/toast.html](../examples/components/toast.html)

---

# Navigation

## Breadcrumb

A compact path trail rendered as an ordered list. Links are soft ink, a faint `/` separates the
items, and the current page sits in full ink.

```html
<nav aria-label="Breadcrumb">
  <ol class="ds-breadcrumb">
    <li class="ds-breadcrumb__item"><a class="ds-breadcrumb__link" href="#">Home</a></li>
    <li class="ds-breadcrumb__item"><a class="ds-breadcrumb__link" href="#">Pricing</a></li>
    <li class="ds-breadcrumb__item" aria-current="page">Matrix</li>
  </ol>
</nav>
```

**Parts:** `.ds-breadcrumb` (`<ol>`), `.ds-breadcrumb__item` (the separator is drawn with `::after`
and hidden on the last item), `.ds-breadcrumb__link` for intermediate steps; mark the last item
`aria-current="page"`.

**React** — `<Breadcrumb>`. Prop: `items` (a `{ label, href? }[]`; the last item — or any without an
`href` — renders as plain text); forwards a ref and `<nav>` attributes.

```jsx
<Breadcrumb items={[
  { label: "Home", href: "/" },
  { label: "Pricing", href: "/pricing" },
  { label: "Matrix" },
]} />
```

Live: [../examples/components/breadcrumb.html](../examples/components/breadcrumb.html)

## Pagination

A flat strip of square, 1px-bordered page buttons with prev/next controls and an ellipsis where the
run is collapsed. The active page fills with ink; nav buttons dim when there is nowhere to go.

```html
<nav class="ds-pagination" aria-label="Pagination">
  <button class="ds-pagination__nav" aria-label="Previous page" disabled>Prev</button>
  <button class="ds-pagination__item is-active" aria-current="page">1</button>
  <button class="ds-pagination__item">2</button>
  <span class="ds-pagination__ellipsis" aria-hidden="true">…</span>
  <button class="ds-pagination__item">24</button>
  <button class="ds-pagination__nav" aria-label="Next page">Next</button>
</nav>
```

**Parts / state:** `.ds-pagination` (row), `.ds-pagination__item` (page button; active with
`.is-active` or `[aria-current="page"]`), `.ds-pagination__nav` (prev/next; `disabled` at the ends),
`.ds-pagination__ellipsis` (non-interactive gap marker).

**React** — `<Pagination>`. Props: `page` (1-based), `pageCount`, `onChange(page)`, `siblingCount`
(pages shown each side of the current, default 1). The component computes the window + ellipses.

```jsx
<Pagination page={page} pageCount={24} siblingCount={1} onChange={setPage} />
```

Live: [../examples/components/pagination.html](../examples/components/pagination.html)

## Vertical nav

A stacked sidebar navigation column. Items hover to an alt background; the active item carries an
accent left bar and full-ink text. Group links under uppercase labels, or nest a collapsible group.

```html
<nav class="ds-vnav" aria-label="Sidebar">
  <div class="ds-vnav__group">
    <span class="ds-vnav__label">Pricing</span>
    <a class="ds-vnav__item is-active" href="#" aria-current="page">Matrix</a>
    <a class="ds-vnav__item" href="#">Profiles</a>
  </div>
  <button class="ds-vnav__item ds-vnav__item--collapsible" aria-expanded="true">
    <span>Reports</span><span class="ds-vnav__caret" aria-hidden="true">›</span>
  </button>
  <div class="ds-vnav__children">
    <a class="ds-vnav__item" href="#">Margins</a>
  </div>
</nav>
```

**Parts / state:** `.ds-vnav` (column), `.ds-vnav__group` + `.ds-vnav__label`, `.ds-vnav__item`
(active with `.is-active` or `[aria-current="page"]`). A `.ds-vnav__item--collapsible` button toggles
`aria-expanded` to reveal an indented `.ds-vnav__children` list; `.ds-vnav__caret` rotates when open.

**React** — `<VerticalNav>`. Prop: `items` (a `{ label, href?, active?, children? }[]`; an item with
`children` renders a collapsible group, open by default when it holds the active link).

```jsx
<VerticalNav items={[
  { label: "Overview", href: "/" },
  { label: "Reports", children: [
    { label: "Margins", href: "/reports/margins", active: true },
    { label: "Utilisation", href: "/reports/utilisation" },
  ] },
]} />
```

Live: [../examples/components/vertical-nav.html](../examples/components/vertical-nav.html)

## Stepper

A horizontal progress trail through ordered steps. A 1px connector runs between square markers;
completed steps fill with ink and show a check, and the active step's marker takes the accent.

```html
<ol class="ds-stepper">
  <li class="ds-stepper__step is-complete"><span class="ds-stepper__marker">1</span><span class="ds-stepper__label">Profile</span></li>
  <li class="ds-stepper__step is-active" aria-current="step"><span class="ds-stepper__marker">2</span><span class="ds-stepper__label">Rates</span></li>
  <li class="ds-stepper__step"><span class="ds-stepper__marker">3</span><span class="ds-stepper__label">Review</span></li>
</ol>
```

**Parts / state / variants:** `.ds-stepper` (row), `.ds-stepper__step` (`.is-complete` /
`.is-active`), `.ds-stepper__marker`, `.ds-stepper__label`, and an optional `.ds-stepper__desc`.
`--circle` rounds the markers.

**React** — `<Stepper>`. Props: `steps` (a `{ label, description? }[]`), `active` (current index;
every step before it is marked complete by default), `complete` (override — an index array or a
predicate), `circle`.

```jsx
<Stepper active={2} steps={[
  { label: "Account", description: "Signed in" },
  { label: "Entity", description: "Selected" },
  { label: "Pricing", description: "In progress" },
  { label: "Confirm", description: "Pending" },
]} />
```

Live: [../examples/components/stepper.html](../examples/components/stepper.html)

---

# Overlays

## Tooltip

A small dark label on an ink-filled box — flat, sharp, no radius. The `.ds-tooltip-host` wrapper
reveals a child `.ds-tooltip` on hover or keyboard focus, no JavaScript required.

```html
<span class="ds-tooltip-host">
  <button class="ds-button">Hover me</button>
  <span class="ds-tooltip ds-tooltip--top">Recalculates the full pricing matrix</span>
</span>
```

**Parts / variants:** `.ds-tooltip` (the dark box; usable bare inside a JS-positioned layer) and
`.ds-tooltip-host` (relative wrapper that shows it on `:hover` / `:focus-within`). Placement
modifiers on the tooltip: `--top` (default), `--bottom`, `--left`, `--right`.

**React** — `<Tooltip>`. Props: `label` (the text), `placement` (`"top" | "bottom" | "left" |
"right"`, default `top`), and the trigger as `children`.

```jsx
<Tooltip label="Recalculates the full pricing matrix" placement="top">
  <Button>Hover me</Button>
</Tooltip>
```

Live: [../examples/components/tooltip.html](../examples/components/tooltip.html)

## Dropdown menu

A flat, bordered list of actions anchored to a trigger. Full-width items shift to the alt surface on
hover; a danger modifier, 1px dividers, and uppercase headers organise longer menus. Position the
`.ds-menu` yourself (absolute / portal).

```html
<div class="ds-dropdown">
  <button class="ds-button" aria-haspopup="menu" aria-expanded="false">Actions</button>
  <div class="ds-menu" role="menu">
    <div class="ds-menu__header">Reference</div>
    <button class="ds-menu__item" role="menuitem">Edit grid</button>
    <a class="ds-menu__item" role="menuitem" href="#">Export CSV</a>
    <div class="ds-menu__divider" role="separator"></div>
    <button class="ds-menu__item ds-menu__item--danger" role="menuitem">Delete</button>
  </div>
</div>
```

**Parts / variants:** `.ds-dropdown` (anchors the menu to its trigger), `.ds-menu` (surface),
`.ds-menu__item` (button or link; `--danger` for destructive, `:disabled` / `[aria-disabled]` to
lock), `.ds-menu__divider`, `.ds-menu__header`.

**React** — `<Dropdown>` manages open state, closes on outside-click / Escape, and moves focus
between items with the arrow keys. Props: `trigger` (a render prop, a single element to clone props
onto, or any node), `align` (`"start" | "end"`, default `start`); render `<MenuItem>` (prop
`danger`, `as="a"` for a link), `<MenuDivider>`, `<MenuHeader>` children.

```jsx
<Dropdown align="start" trigger={<Button>Actions</Button>}>
  <MenuItem onClick={editGrid}>Edit grid</MenuItem>
  <MenuDivider />
  <MenuItem danger onClick={remove}>Delete</MenuItem>
</Dropdown>
```

Live: [../examples/components/menu.html](../examples/components/menu.html)

## Accordion

Stacked disclosure rows separated by 1px rules. Each header is a full-width button with a chevron
that rotates when the row is open. Works with native `<details>`/`<summary>` too.

```html
<div class="ds-accordion">
  <div class="ds-accordion__item">
    <button class="ds-accordion__header" type="button" aria-expanded="true" aria-controls="p-open">
      <span>How is the day rate computed?</span>
      <span class="ds-accordion__chevron" aria-hidden="true"></span>
    </button>
    <div class="ds-accordion__panel" id="p-open" role="region">Derived from the loaded salary…</div>
  </div>
</div>
```

**Parts / state:** `.ds-accordion` (container), `.ds-accordion__item`, `.ds-accordion__header`
(carries `aria-expanded`), `.ds-accordion__chevron` (rotates on expand), `.ds-accordion__panel`
(collapsed with the `hidden` attribute). Native `<details>`/`<summary>` styled as items demo the CSS
with no JavaScript.

**React** — `<Accordion>`. Props: `items` (a `{ id, title, content }[]`), `multiple` (allow several
open, default single-open), `defaultOpen` (uncontrolled) **or** `value` + `onChange` (controlled —
receives the open id, or the id array with `multiple`).

```jsx
<Accordion items={items} multiple defaultOpen={["rate"]} />
```

Live: [../examples/components/accordion.html](../examples/components/accordion.html)

## Popover

A flat, bordered signpost anchored to a trigger — a title over a body, separated from the page by a
1px border, no shadow. An optional rotated-square arrow points back at the trigger. Position the
`.ds-popover` yourself (absolute / portal).

```html
<div class="ds-popover ds-popover--bottom" role="dialog">
  <span class="ds-popover__arrow" aria-hidden="true"></span>
  <div class="ds-popover__title">Margin guard</div>
  <div class="ds-popover__body">This cell sits below the entity's target margin.</div>
</div>
```

**Parts / variants:** `.ds-popover` (box) with `.ds-popover__title`, `.ds-popover__body`, and an
optional `.ds-popover__arrow`. Placement modifiers `--top` / `--bottom` / `--left` / `--right`
position the arrow; `.ds-popover-host` is a relative anchor helper.

**React** — `<Popover>` toggles on trigger click and closes on outside-click / Escape. Props:
`trigger` (render prop, element, or node), `placement` (`"top" | "bottom" | "left" | "right"`,
default `bottom`), `open` / `defaultOpen` / `onOpenChange`, `title`, `arrow`, and the body as
`children`.

```jsx
<Popover placement="bottom" arrow title="Margin guard" trigger={<Button>Why flagged?</Button>}>
  This cell is below the target margin for the selected entity.
</Popover>
```

Live: [../examples/components/popover.html](../examples/components/popover.html)

---

# Actions

## Button variants

Sizes, full-width, icon-only, loading, button groups, and split buttons — all extending the base
[button](#buttons).

```html
<button class="ds-button ds-button--sm">Small</button>
<button class="ds-button ds-button--lg">Large</button>
<button class="ds-button ds-button--icon" aria-label="Add"><svg>…</svg></button>
<button class="ds-button ds-button--primary ds-button--loading">Saving</button>
<button class="ds-button ds-button--block">Block button</button>

<div class="ds-button-group">
  <button class="ds-button">Day</button>
  <button class="ds-button">Week</button>
  <button class="ds-button">Month</button>
</div>
```

**Modifiers:** sizes `--sm` / `--lg`; `--block` (full-width); `--icon` (square; pair with an
`aria-label`); `--loading` (hides the label and shows a centered spinner). `.ds-button-group` joins
buttons sharing borders; `.ds-split` joins a main action to a caret (`.ds-split__menu` holds its
dropdown).

**React** — the base `<Button>` takes `variant` (`"primary" | "danger"`), `size` (`"sm" | "lg"`),
`loading`, and `block`. Plus `<ButtonGroup>`, `<IconButton>` (props: `label` — accessible name +
title, `variant`, `size`), and `<SplitButton>` (props: `onMain`, `variant`, `size`, `menu`).

```jsx
import { Button, ButtonGroup, IconButton, SplitButton } from "@diametral/design-system/react";

<Button size="lg" loading>Saving</Button>
<IconButton label="Add" variant="primary"><PlusIcon /></IconButton>
<SplitButton variant="primary" onMain={save} menu={<div className="ds-menu">…</div>}>Save</SplitButton>
```

Live: [../examples/components/button-extras.html](../examples/components/button-extras.html)

---

# Misc

## Empty state

A centered placeholder for empty collections, zero-result searches, and first-run screens: a large
faint icon, a title-voiced heading, a soft constrained description, and an optional row of actions.

```html
<div class="ds-empty">
  <div class="ds-empty__icon" aria-hidden="true"><svg>…</svg></div>
  <p class="ds-empty__title">No missions yet</p>
  <p class="ds-empty__desc">Create your first mission to compute a day rate, margin, and target salary.</p>
  <div class="ds-empty__actions">
    <button class="ds-button ds-button--primary">New mission</button>
    <button class="ds-button">Import</button>
  </div>
</div>
```

**Parts:** `.ds-empty` (centered column), `.ds-empty__icon`, `.ds-empty__title`, `.ds-empty__desc`,
and an optional `.ds-empty__actions` row.

**React** — `<EmptyState>`. Props: `icon`, `title`, `description`, `actions`; forwards a ref and
`<div>` attributes.

```jsx
<EmptyState
  icon={<InboxIcon />}
  title="No missions yet"
  description="Create your first mission to compute a day rate, margin, and target salary."
  actions={<Button variant="primary">New mission</Button>}
/>
```

Live: [../examples/components/empty-state.html](../examples/components/empty-state.html)

## Skeleton

A shimmering placeholder for content that is still loading: a flat (no-radius) bar painted with a
grey gradient that sweeps across. Animation is suppressed under `prefers-reduced-motion`.

```html
<span class="ds-skeleton ds-skeleton--text" style="width:60%"></span>
<span class="ds-skeleton ds-skeleton--line"></span>
<span class="ds-skeleton ds-skeleton--circle"></span>
<span class="ds-skeleton ds-skeleton--block"></span>
```

**Variants:** `--text` (a short text-height line; the last in a stack is shortened to read like a
paragraph tail), `--line` (full-width bar), `--circle` (kept square per the no-radius parti pris),
`--block` (generic filling block).

**React** — `<Skeleton>`. Props: `variant` (`"text" | "line" | "circle" | "block"`, default `line`),
`width`, `height` (inline overrides), `count` (render N stacked lines).

```jsx
<Skeleton variant="circle" />
<Skeleton variant="line" width="60%" />
<Skeleton variant="text" count={3} />
```

Live: [../examples/components/skeleton.html](../examples/components/skeleton.html)
