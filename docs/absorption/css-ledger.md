<!--
Derived artifact. Copied from diamorval/design-system-diametral,
branch research/inventory, commit 6aeed040c0a682790c38f7edea2a091c2d60a6dd, path docs/migration/css-ledger.md.
Copied 2026-09-01. Do not edit here to correct a measurement — correct it at
the source and re-copy, or the two diverge silently.
-->

# CSS ledger: the frozen set and the wholesale-replacement list

Resolution artifact for [The CSS ledger: frozen set and wholesale-replacement list](https://github.com/diamorval/design-system-diametral/issues/165), a ticket on [Absorb @diametral/ui into the official Diametral design system](https://github.com/diamorval/design-system-diametral/issues/151). Sibling of [`inventory.md`](./inventory.md) and [`react-ledger.md`](./react-ledger.md).

Measured 2026-08-30 against source `packages/ui` @ `feat/css-conversion` (9182a91) and target `/Users/augustinmorval/code/design-system` @ `feat/components-migration` (23a0198, v0.11.0).

[#166](https://github.com/diamorval/design-system-diametral/issues/166) closed while this ticket was in progress, so the React verdicts it produced are joined here directly and **no row is left pending**. One of its rows is contested on measurement (§6.1).

## Headline

| | #156 said | measured here |
| --- | --- | --- |
| target CSS files (`css/components/`) | 68 | **68** ✓ |
| consumer-coupled, contract **frozen** | 30 | **16** |
| **replaced wholesale** from the source | 38 | **20** |
| **incumbent holds** — pinned by a held React component | — | **31** |
| **split** — one file, mixed verdicts | — | **1** |

16 + 20 + 31 + 1 = 68.

**Both of #156's CSS numbers are overcounts.** The frozen set is 16, not 30 — it was estimated by hand and is here computed. The wholesale set is 20, not 38 — a 47% overcount, not the "drops five" [#164](https://github.com/diamorval/design-system-diametral/issues/164) predicted. Two corrections compound: the freeze reaches half as far as assumed, and A2's pin — a held incumbent keeps its stylesheet — reaches 31 files.

The CSS side of the migration is therefore **much smaller than the map has been assuming**. 48 of the target's 68 stylesheets are not replaced at all. What grows instead is the *addition* side: **38 net-new source stylesheets, ~2,890 LOC**, now the dominant CSS workload. That is the same shape #164 found on React arriving on the CSS layer — cheaper, not poorer.

---

## 1. The frozen set, computed

[#157](https://github.com/diamorval/design-system-diametral/issues/157) required this be the union of what external surfaces **actually read**, computed mechanically. Measured exhaustively over `keycloak/`, `emails/`, `components/`, `starters/`, `configs/` — plus two published surfaces that list omits and should not have (§6).

### What each surface reads

| surface | tokens (`--ds-*`) | component classes |
| --- | --- | --- |
| `keycloak/` | **11**: `accent` `accent-ink` `bg` `faint` `ink` `rule` `rule-soft` `sans` `serif` `soft` `surface` | **zero** |
| `emails/` | **zero** | **zero** |
| `components/` (11 web components) | zero | **17 literal + 4 dynamic families** |
| `starters/` | 1 (`--ds-ink-faint`) | **zero** |
| `configs/` | 2 (`--ds-maxw-content`, `--ds-rule`) | `ds-frame`, in a VS Code snippet only |
| `dist/tailwind-preset.cjs` | tokens only | **zero** |
| `docs/streamlit.md` (published) | — | **6**: `ds-card` `ds-statgrid` `ds-tag` `ds-tag--success` `ds-title` `ds-title--xl` |

**#157's blast-radius finding is confirmed exactly**: Keycloak reads 11 Tier-2 tokens and zero component classes; emails read neither. Both are safe from every verdict in this ledger.

**The Tailwind preset freezes nothing.** It emits tokens; it reads no component class. #157's three-way definition of the frozen set is really two-way.

### The 17 web-component classes

`ds-badge` `ds-button` `ds-callout` `ds-close` `ds-icon` `ds-input-row` `ds-modal` `ds-open` `ds-overlay` `ds-panel` `ds-panel--rows` `ds-section-heading` `ds-segmented` `ds-status` `ds-switch` `ds-tabpane` `ds-tabs`

Matching [#159](https://github.com/diamorval/design-system-diametral/issues/159)'s count. **#157's "12 web components read 39 classes across 30 of 68 files" was an overcount on all three numbers** — there are 11 web components, they read 17 classes, defined in 16 files.

**Four families are dynamic and freeze more than the literal name.** The modifier is a pass-through attribute, so the whole family is frozen:

```js
ds-badge.js:9     this.className = "ds-badge" + (v ? ` ds-badge--${v}` : "");
ds-button.js:24   this._btn.className = "ds-button" + (v ? ` ds-button--${v}` : "");
ds-callout.js:10  this.className = "ds-callout" + (type ? ` ds-callout--${type}` : "");
ds-status.js:28   this.className = "ds-status ds-status--" + status;
```

| family | frozen modifiers |
| --- | --- |
| `ds-badge--` | `accent` `solid` |
| `ds-button--` | `block` `icon` `lg` `loading` `primary` `sm` |
| `ds-callout--` | `danger` `info` `success` `warning` |
| `ds-status--` | `critical` `danger` `info` `neutral` `success` `warning` |

**`ds-open` and `ds-close` are styled nowhere.** `ds-modal.js` sets both; no rule in `css/` matches either. Dead classes in a frozen surface — they freeze nothing and are a defect (§6.7).

### The 16 frozen files

A file is frozen when it **defines** a frozen class as a rule head. Hits that turned out to be prose in comments (`number-input.css`, `command-palette.css`, `stat-card.css`, `multi-select.css`) or hyphen bleed (`.ds-tag` matching inside `.ds-tag-input`) are excluded — they were false positives of a naive `\b` boundary and are **not** frozen.

| file | frozen classes | external reader |
| --- | --- | --- |
| `badge.css` | `ds-badge` + 2 modifiers | `<ds-badge>` |
| `button.css` | `ds-button` | `<ds-button>`, `<ds-modal>` |
| `button-extras.css` | `ds-button--` × 6 | `<ds-button variant>` |
| `callout.css` | `ds-callout` + 4 modifiers | `<ds-callout>` |
| `card.css` | `ds-card` | Streamlit consumers |
| `field.css` | `ds-input-row` | `<ds-panel>` |
| `grid.css` | `ds-statgrid`, `ds-gridlabel` | Streamlit consumers |
| `icon.css` | `ds-icon` | `<ds-icon>` |
| `modal.css` | `ds-modal`, `ds-overlay` | `<ds-modal>` |
| `panel.css` | `ds-panel`, `ds-panel--rows` | `<ds-panel>` |
| `section-heading.css` | `ds-section-heading` | `<ds-section-heading>` |
| `segmented.css` | `ds-segmented` | `<ds-segmented>` |
| `status-panel.css` | `ds-status` + 6 modifiers | `<ds-status>` |
| `switch.css` | `ds-switch` | `<ds-switch>` |
| `tabs.css` | `ds-tabs`, `ds-tabpane` | `<ds-tabs>` |
| `tag.css` | `ds-tag`, `ds-tag--success` | Streamlit consumers |

Outside `css/components/`, two more files hold frozen classes: `css/base/typography.css` (`ds-title`, `ds-title--xl`, `ds-kicker` — Streamlit) and `css/compat/legacy-aliases.css` (maps `.btn` → `.ds-button`).

Frozen does not mean untouched: rule 1 absorbs the source's CSS *into* the existing contract. Class names and structure are fixed; everything else about the file is fair game. Nine of the sixteen have a source component whose React verdict is *source wins* (`badge`, `button`, `callout`, `card`, `field`, `grid`, `icon`, `status`, `tag`), so their source stylesheets do land — renamed into the frozen grammar.

---

## 2. The verdict rule

A2 as restated by #164, with the pin made mechanical:

> A CSS file is **replaced wholesale** from the source when it is **(i)** not read by an external surface and **(ii)** its React verdict is *source wins*, or it has no React component.

The operative test for (ii) is **not the file's own component but whether any *held* React component renders its classes**. A held component pins every stylesheet it reads, not just the one sharing its name — it goes on emitting class names the replacement would not define.

This is the generalisation #164 gestured at, and it reaches two files nothing else would have caught:

- **`skeleton.css`** — `skeleton`'s own React goes to the source, but `DataGrid` (held) renders `.ds-skeleton--text` for its loading rows.
- **`stepper.css`** — `stepper`'s React goes to the source, but `Wizard` (held) renders the entire `.ds-stepper__marker` / `__label` / `__step` block.

Both would have been replaced under a naive reading of A2 and would have silently unstyled a held component.

### A third freeze category

The freeze therefore has two sources, not one:

1. **External freeze** (16 files) — a surface outside the package reads the class. The contract can never be renamed.
2. **Internal pin** (31 files) — a held React component inside the package reads the class. The contract is renameable *in principle*, but only in lockstep with rewriting the held component, which is out of scope. Treat as frozen for this migration.

`skeleton.css` and `stepper.css` are pinned across component boundaries, which is why they are the interesting cases: the pin does not follow the file's name.

---

## 3. The ledger — 68 target CSS files

React verdicts are [#166](https://github.com/diamorval/design-system-diametral/issues/166)'s, joined on the inventory's source→target mapping.

### Frozen — 16

See §1's table. Source CSS is absorbed into the existing contract; class names and structure are fixed.

### Replaced wholesale from the source — 20

Not externally read, and no held React component renders their classes.

| file | source file(s) | source LOC | why |
| --- | --- | --- | --- |
| `agenda.css` | `agenda.css` | 138 | source wins ⚠ contested, §6.2 |
| `avatar.css` | `avatar.css` | 140 | source wins — applier incumbent |
| `banner.css` | `banner.css` | 66 | source wins — applier incumbent |
| `bar-chart.css` | `chart.css` † | 178 | source wins — applier incumbent |
| `breadcrumb.css` | `breadcrumb.css` | 61 | source wins |
| `charts.css` | `chart.css` † | 178 | source wins — six chart appliers |
| `description-list.css` | `description-list.css` | 35 | source wins |
| `drawer.css` | `drawer.css` + `sheet.css` ‡ | 362 + 160 | **source wins — #166 defect swap** |
| `empty-state.css` | `empty.css` | 89 | source wins |
| `kanban.css` | `kanban.css` | 122 | source wins — #164, settled |
| `kbd.css` | `kbd.css` | 51 | source wins |
| `page-header.css` | `page-header.css` | 55 | source wins |
| `pagination.css` | `pagination.css` | 174 | source wins |
| `progress.css` | `progress.css` | 60 | source wins |
| `sparkline.css` | `sparkline.css` | 42 | source wins |
| `spinner.css` | `spinner.css` | 13 | source wins |
| `table.css` | `table.css` | 86 | **no React component either side** |
| `timeline.css` | `timeline.css` | 115 | source wins |
| `toolbar.css` | `toolbar.css` | 76 | source wins |
| `tooltip.css` | `tooltip.css` | 132 | **source wins — #166 defect swap** |

**Two rows are merges, not replacements, and each must land whole in one batch:**

† **`bar-chart.css` + `charts.css` ← one source `chart.css`.** The source has a single chart stylesheet; the target splits bar charts out. Either fold two target files into one or split the source's — a decision for #167.

‡ **`drawer.css` ← source `drawer.css` + `sheet.css`.** Two source components over the target's one `Drawer` symbol. #166 gave both to the source on the same swap (no focus trap, no portal in the incumbent).

### Incumbent holds — 31

Not externally read, but a held React component renders their classes (A2), or there is no source counterpart at all.

| file | pinned by | why that component holds |
| --- | --- | --- |
| `accordion.css` | `Accordion` | #156 — arrows optional, no defect |
| `alert.css` | `Alert` | #156 — clears its pattern |
| `app-bar.css` | **`ConsoleLayout`** | target-only composer, no source counterpart |
| `app-shell.css` | `AppShell` | #164 A3 — incumbent shape wins |
| `calendar-view.css` | `Calendar` | #164 (a-bis) — ~30-line in-place fix |
| `chip.css` | `Chip` | target-only, no source counterpart |
| `code-block.css` | `CodeBlock` | #156 — clears its pattern |
| `color-picker.css` | `ColorPicker` | **#166** — source has the same defect |
| `combobox.css` | `Combobox`, `Dropdown` | #156 — implements the keyboard model |
| `command-palette.css` | `CommandPalette` | #156 — would cost `cmdk` for no gain |
| `console-layout.css` | `ConsoleLayout` | target-only |
| `datagrid.css` | `DataGrid` | #164 — source had the same defect |
| `date-picker.css` | `DatePicker`, `DateRangePicker` | #156 — source is a `Popover` re-export |
| `date-range.css` | `DateRangePicker` | #156 — richer incumbent |
| `date-time.css` | `DateTimePicker` | **#166** — ARIA lives in the children |
| `file-upload.css` | `FileUpload` | #156 — clears its pattern |
| `menu.css` | `Dropdown` | #156 — incumbent holds |
| `motion.css` | `ConsoleLayout`, `Sparkline` | pinned by `ConsoleLayout` |
| `multi-select.css` | `MultiSelect` | #156 — 205 vs 109 LOC, richer |
| `number-input.css` | `NumberInput` | **#166** — native `<input type=number>` |
| `popover.css` | `Popover` | #156 — incumbent holds |
| `rating.css` | `Rating` | #156 — incumbent holds |
| `skeleton.css` | **`DataGrid`** | cross-boundary pin — `.ds-skeleton--text` |
| `stat-card.css` | `StatCard` | **contested, §6.1** — incumbent has a RAF counter |
| `stepper.css` | **`Wizard`** | cross-boundary pin — the whole `.ds-stepper__*` block |
| `tag-input.css` | `TagInput` | #156 — clears its pattern |
| `time-picker.css` | `TimePicker` | #164 — test (b) fails |
| `toast.css` | `ToastProvider` | #156 — incumbent holds |
| `tree.css` | `Tree` | **#166** — source has the same defect, less ARIA |
| `vertical-nav.css` | `VerticalNav`, `ConsoleLayout` | #164 A3 |
| `wizard.css` | `Wizard` | #156 — clears its pattern |

**Nine files beyond #164's five.** #164 predicted `calendar-view`, `datagrid`, `time-picker`, `app-shell`, `vertical-nav` would drop out. Also dropping out, found here: **`app-bar.css`** (pinned by a target-only composer), **`skeleton.css`** and **`stepper.css`** (cross-boundary pins), plus `motion.css`, `chip.css`, `console-layout.css` (target-only). And #166 added four more by holding `color-picker`, `date-time`, `number-input` and `tree`.

### Split — 1

**`form-controls.css` is the only file whose readers disagree.** Seven React components read it, against seven separate source stylesheets:

| reader | source component | #166 verdict |
| --- | --- | --- |
| `Checkbox` | `checkbox` | source wins |
| `FieldHint` / `InputGroup` | `input-group` | source wins |
| `Range` | `slider` | source wins |
| `Select` | `select` | source wins |
| `Textarea` | `textarea` | source wins |
| **`Radio` / `RadioGroup`** | **`radio-group`** | **incumbent holds** |

Six of seven go to the source; one holds. So the file can be neither replaced wholesale nor held: **the radio block stays and the other six are replaced from `checkbox.css`, `checkbox-group.css`, `input.css`, `input-group.css`, `select.css`, `slider.css`, `textarea.css`.** Whether the result stays one file or becomes seven is a #167 decision. It is the only structural decision this ledger leaves open, and it is a packaging question, not a verdict.

`radio-group` also carries a 2-line in-place fix from #166 (`name` must default to `React.useId()`, or the native arrow keys silently stop working).

---

## 4. Source CSS with no target counterpart — 38 additions

Added, not reconciled. This is now the largest single block of CSS work in the migration, at **~2,890 LOC**.

**Net-new (rule 7), 29 files:** `aspect-ratio` 6L · `attachment` 232L · `bubble` 193L · `bullet-chart` 76L · `carousel` 77L\* · `editable` 27L · `field-array` 33L · `funnel-chart` 20L · `heatmap` 96L · `input-otp` 94L\* · `item` 182L · `marker` 75L · `masonry` 10L · `message` 71L · `message-scroller` 88L\* · `navigation-menu` 275L · `phone-input` 30L · `qr-code` 18L · `radar-chart` 11L · `relative-time` 5L · `resizable` 60L\* · `scatter-chart` 9L · `scroll-area` 43L · `snippet` 39L · `speed-dial` 97L · `theme-switcher` 59L · `toc` 55L · `treemap` 18L · `waterfall-chart` 36L

\* The four **admit-CSS-only** components (rule 6) — `carousel`, `input-otp`, `message-scroller`, `resizable`. Their stylesheets ship; their React bindings do not.

**Newly net-new by #166's A4 alias withdrawals, 5 files:** `menubar` 110L · `meter` 60L · `form` 8L · `toggle` 99L · `context-menu` 274L

Independently confirmed here: `ds-menubar`, `ds-meter`, `ds-form`, `ds-toggle` and `ds-context-menu` each match **zero** selectors anywhere in the target's `css/`. All five land in clean namespace with no CSS contest.

**Partials that admit outright, 4 files:** `autocomplete` 167L · `hover-card` 78L · `label` 40L · `separator` 16L

`combo-chart`, `direction` and `collapsible` have no source stylesheet.

`navigation-menu.css` (275L) and `context-menu.css` (274L) are the two largest additions in the set, and both arrived through an alias correction rather than the original inventory.

---

## 5. Mechanical checklist for the migrating set

#157 owed three per-file operations. Measured against the real files, only one scales with the migration.

### 5.1 `@layer utilities` strip — 82 files

All 111 source stylesheets are wrapped in `@layer utilities` (222 markers). Every source file whose component lands — the 20 wholesale, the 38 additions, the 7 in the `form-controls` split, and the source files absorbed into frozen contracts — needs the wrapper stripped so the target's flat cascade applies.

**82 source CSS files.** (83 by #166's verdicts, minus `stat-card` per §6.1.) This is the one item that scales, and it is CI-enforceable per #157's C-series.

**Amended 2026-09-01 (#171, via #174).** 82 is the *landing subset*; it is not the scope of the work. The strip is applied to **all 111 files at once, upstream** — on `migration-source-stripped`, tagged `migration-source-v1`, which every batch reads. Stripping the 29 files that never land costs nothing and removes a per-file judgement call from every batch. The 222 markers are 113 real blocks in 111 files (`label.css` carries a genuine second `@layer components` block; `separator.css`'s second match is inside a comment), so the transform must key on the `@layer` line rather than line 1 — `label.css`, `textarea.css` and `kbd.css` open with a preamble comment. The CI check survives in batch 0.1 as an invariant guard, not as an enforcement mechanism.

### 5.2 `z-index: 50` remap — 18 rules, not 28

The 28 hard-coded rules sit in 15 source files. **Ten of them are on stylesheets that are never imported**, because their target component holds:

| where the 28 land | count | status |
| --- | --- | --- |
| migrating — `drawer` 3, `sheet` 2, `tooltip` 4, `context-menu` 2, `select` 2, `hover-card` 2, `autocomplete` 1, `navigation-menu` 1, `speed-dial` 1 | **18** | **real work** |
| target holds, source file not imported — `alert-dialog` 2, `dialog` 2, `dropdown-menu` 2, `popover` 2, `combobox` 1, `toast` 1 | **10** | **evaporates** |

**#167 should carry 18 rules, not 28.** Fourteen of the eighteen are concentrated in the overlay family (`drawer`, `sheet`, `tooltip`, `context-menu`, `hover-card`), so the remap is nearly one batch's worth of work rather than a cross-cutting sweep.

### 5.3 Tailwind utility literals — 2 files, not 33

#157 recorded "~180 literals across 33 TSX files". Measured on `main` the true starting figure was **40 TSX files**; measured on `feat/css-conversion` @ 9182a91 it is **2**: `phone-input.tsx` and `sidebar.tsx`.

The `feat/css-conversion` branch *is* this work item, and has absorbed ~95% of it since #157 measured. `sidebar` is the component #164 ruled incumbent-holds-plus-cherry-pick, so only its cherry-picked parts matter.

**#167 should carry "finish `phone-input.tsx`, plus whatever of `sidebar.tsx` is cherry-picked" — not "~180 literals across 33 files".**

The **56 documented dedupe exceptions across 43 files** stand as #157 described them: a defect checklist, not nuance. 41 are in CSS, 15 in TSX.

---

## 6. Corrections to the record

### 6.1 `stat-card` — #166's premise is measurably wrong

#166 rules `stat-card` **source wins**, on the stated reason *"incumbent is a class-applier"*. It is not:

```js
StatCard.js:16   const [shown, setShown] = useState(value);
StatCard.js:17   useEffect(() => { ... requestAnimationFrame ... });
StatCard.js:33   return () => cancelAnimationFrame(raf);
```

`StatCard.js` (61 LOC) runs a count-up tween on `value`. The source's `stat-card.tsx` (88 LOC) has **zero hooks and no animation**.

Rule 3's premise fails (the incumbent is not an applier) and rule 4's fails too (the source demonstrates no defect and is not a superset — it is a regression on this component). Under the rubric as written, **`stat-card` is incumbent holds**, and `stat-card.css` is held.

This ledger records it as **held**, the conservative reading, and flags the disagreement rather than silently overruling a closed ticket. It is a one-line confirmation for #167, not a new ticket.

### 6.2 `agenda` and `pagination` — same premise, weaker case

Both are also recorded by #166 as *"incumbent is a class-applier"*. Both have zero state but real derived logic — `Agenda` groups and sorts through a `useMemo`, `Pagination` computes page windows through `range()`/`go()`. Whether the source (138L / 174L) is a strict superset of the incumbent (89L / 83L) "needs reading, not measuring" — the same situation #164 hit on `time-picker`, which resolved to *incumbent holds*.

Unlike `stat-card` the evidence is genuinely ambiguous, so this ledger **follows #166** and marks both wholesale. Worth one look during their batch.

### 6.3 The ticket's five-directory freeze scan is the wrong set

`starters/` is **not in `package.json`'s `files` allowlist** — it is unpublished, so like `examples/` it is edited alongside a batch and freezes nothing. Two published surfaces the list omits do matter: `dist/` (tokens only, freezes no class) and **`docs/`**.

### 6.4 The Streamlit freeze survives, but moves

#165 is right that `examples/` does not freeze — but the Streamlit contract does not live in `examples/streamlit/app.py`. It lives in **`docs/streamlit.md`, which is published**: external Python hand-writes `ds-card`, `ds-statgrid`, `ds-tag`, `ds-title` into its own app. That preserves #157's intent (Streamlit freezes) under #165's correction (examples are editable). `app.py` additionally uses `ds-callout--info/--warning` and `ds-kicker`, which the doc does not teach — in-repo, not frozen.

### 6.5 The rest of `docs/` does not freeze

152 distinct `ds-*` names appear across published docs, but `docs/components.md` is generated from `registry.ts` (#163 V2) — a derived surface that follows each batch. Hand-written pages (`recipes.md`, `installation.md`, `for-claude.md`) teach class names but are editable in-repo. Each wholesale replacement owes them a rewrite line-item: a task, not a freeze.

### 6.6 `.ds-input` is defined in four files

`field.css` (canonical, frozen), plus `color-picker.css`, `combobox.css` and `time-picker.css`. Three redefinitions of a frozen class resolved silently by load order — a real duplication defect, and the source of several spurious pins in the first pass of this measurement. Owed a cleanup in whichever batch takes `field.css`. All four files are frozen or held, so it is safe to defer.

### 6.7 `ds-open` and `ds-close` are dead

Set by `ds-modal.js`, matched by no rule in `css/`. Either implement them or delete them from the web component.

### 6.8 #157's web-component measurement was an overcount

11 web components (not 12) read 17 classes (not 39) defined in 16 files (not 30). #159's figure of 17 was right.

### 6.9 #164's negative finding is confirmed

No external reader exists for `ds-kanban`, `ds-monthview`, `ds-calendar`, `ds-timepicker`, `ds-datagrid`, `ds-shell` or `ds-vnav` across any published surface.

---

## 7. Handed to [#167](https://github.com/diamorval/design-system-diametral/issues/167)

**Sizing.** The CSS workload has inverted. Replacements are 20 files; **additions are 38 files and ~2,890 LOC**, and they carry no reconciliation risk — a batch of additions is far cheaper per file than a batch of replacements. Component count is an even worse batch proxy than #167 already suspected.

**Clusters that cannot be split across batches:**
- `bar-chart.css` + `charts.css` ← one source `chart.css` (a merge)
- `drawer.css` ← source `drawer.css` + `sheet.css` (a merge, and a #166 defect swap)
- `form-controls.css` ← seven source files, six replaced and one held (a split)
- `skeleton.css` with `DataGrid`, `stepper.css` with `Wizard` — the cross-boundary pins: whoever touches the stylesheet must verify the held component still renders

**Decisions owed:**
1. Does `form-controls.css` stay one file or become seven?
2. Does the chart merge fold two target files into one, or split the source's `chart.css`?
3. Confirm §6.1 — `stat-card` held, against #166's source-wins.

**Corrected task sizes:** `@layer utilities` strip **82 files** (the one item that scales); `z-index: 50` remap **18 rules, not 28**, and 14 of them concentrated in the overlay family; Tailwind literals **2 files, not 33**.

**Per-batch obligations:** every wholesale replacement owes a rewrite pass over the hand-written docs pages teaching its classes; `field.css`'s batch owes the `.ds-input` four-way dedupe; `modal.css`'s batch owes the `ds-open`/`ds-close` decision; `radio-group`'s batch owes the 2-line `useId()` fix from #166.

**No new tickets.** Every row resolves; the only open items are the two packaging decisions above, which belong to the batch plan.
