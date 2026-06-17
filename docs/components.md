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
