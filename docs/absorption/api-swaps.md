# 1.0.0 API swaps — incumbent exports replaced by incoming's

Companion to [`direction.md`](./direction.md) decision 3, which makes incoming's
120 components the React layer. This file is the consumer-facing consequence:
**28 incumbent exports are replaced.** The install does not change
(`npm i @diametral/design-system`), the import path does not change
(`@diametral/design-system/react`) — the components behind them do.

Two true additives have no counterpart and are unaffected: `AppShell` and
`ConsoleLayout`. So is `icons.tsx`, the icon catalogue (distinct from `Icon`,
which is replaced).

Measured 2026-09-04 against `feat/css-conversion` @ `b97c651`. Export lists are
exact; prop lists are extracted from `interface *Props` and destructured
parameters, so treat them as a guide and let `tsc` be the authority.

## Two systematic changes behind most rows

**1. Config props become composition.** The incumbents take data as a prop; the
incoming components take children. This is the single biggest source of breakage
and it is not mechanical — every call site is rewritten by hand.

```jsx
// v0.11 — data in, one component
<Accordion items={[{ id: "a", label: "First", content: <p>…</p> }]} multiple />

// 1.0.0 — composed
<Accordion type="multiple">
  <AccordionItem value="a">
    <AccordionTrigger>First</AccordionTrigger>
    <AccordionContent><p>…</p></AccordionContent>
  </AccordionItem>
</Accordion>
```

The props that disappear this way: `items` (Accordion), `nodes` (Tree),
`options` (Combobox), `events` (Calendar), `trigger`/`title` (Popover),
`label`/`value`/`delta` (StatCard), `code`/`filename`/`language` (CodeBlock),
`icon`/`children` (Alert).

**2. `onChange` becomes `onValueChange`.** Incoming uses `onValueChange` in 9
components; this repo uses `onChange` as a public prop in 19 files. **This is the
dangerous one** — the component name and most props are unchanged, so a JS
consumer gets a control that silently stops reporting. TypeScript catches it;
plain JS does not. Affects `MultiSelect`, `Rating`, `TimePicker`,
`DateRangePicker`, and every control absorbed under decision 3.

## The table

| v0.11 export | 1.0.0 export | subpath | change |
| --- | --- | --- | --- |
| `Accordion` | `Accordion`, `AccordionContent`, `AccordionItem`, `AccordionTrigger` | `react/accordion` | decomposed |
| `Alert` | `Alert` + 4 parts | `react/alert` | decomposed |
| `SplitButton` | `SplitButton` | `react/split-button` | props changed |
| `Calendar` | `Calendar`, `CalendarDayButton` | `react/calendar` | decomposed |
| `CodeBlock, CodeBlockCopyButton` | `CodeBlock` + 4 parts | `react/code-block` | decomposed |
| `BRAND_SWATCHES, ColorPicker` | `BRAND_SWATCHES`, `ColorPicker` | `react/color-picker` | compatible |
| `Combobox` | `Combobox` + 14 parts | `react/combobox` | decomposed |
| `CommandPalette` | `Command` + 8 parts | `react/command` | **renamed + decomposed** |
| `DataGrid` | `DataTable`, `DataTableColumnHeader` | `react/data-table` | **renamed + decomposed** |
| `DatePicker` | `DatePicker`, `DatePickerContent`, `DatePickerTrigger` | `react/date-picker` | decomposed |
| `DateRangePicker` | `DateRangePicker` | `react/date-range-picker` | props changed |
| `DateTimePicker` | `DateTimePicker` | `react/date-time-picker` | compatible |
| `Dropdown, MenuDivider, MenuHeader, MenuItem` | `DropdownMenu` + 14 parts | `react/dropdown-menu` | **renamed + decomposed** |
| `FileUpload` | `FileUpload`, `FileUploadDescription`, `FileUploadIcon`, `FileUploadTitle` | `react/file-upload` | decomposed |
| `FormField` | `Field` + 9 parts | `react/field` | **renamed + decomposed** |
| `Icon` | `Icon` | `react/icon` | props changed |
| `MultiSelect` | `MultiSelect` | `react/multi-select` | props changed |
| `NumberInput` | `NumberField` + 5 parts | `react/number-field` | **renamed + decomposed** |
| `Popover` | `Popover` + 5 parts | `react/popover` | decomposed |
| `Radio, RadioGroup` | `RadioGroup`, `RadioGroupItem` | `react/radio-group` | **renamed** |
| `Rating` | `Rating` | `react/rating` | props changed |
| `StatCard` | `StatCard` + 4 parts | `react/stat-card` | decomposed |
| `TagInput` | `TagsInput` | `react/tags-input` | **renamed** |
| `TimePicker` | `TimePicker` | `react/time-picker` | props changed |
| `Toast, ToastProvider` | `Toast` + 9 parts | `react/toast` | decomposed |
| `Tree` | `Tree` + 4 parts | `react/tree` | decomposed |
| `VerticalNav` | `Sidebar` + 22 parts | `react/sidebar` | **renamed + decomposed** |
| `Wizard` | `Wizard` | `react/wizard` | compatible |


`renamed` means existing imports fail loudly at build time — the good case.
`decomposed` and `props changed` mean they resolve and then behave differently.

## Same name, different component — audit these first

These keep their export name, so nothing warns you. Ranked by how quietly they
break:

| Export | Silent failure |
| --- | --- |
| `MultiSelect` | only `onChange` → `onValueChange` differs; everything else is compatible, so it renders correctly and stops reporting selection |
| `Rating` | `onChange` → `onValueChange`; gains `shape`, `disabled` |
| `TimePicker` | `onChange` → `onValueChange`; loses `name`, `placeholder`, `step`; gains `picker`, `showSeconds` |
| `DateRangePicker` | `onChange` → `onValueChange`, `format` → `dateFormat`; loses `range`, `iso`, `min`, `max` |
| `ColorPicker` | fully compatible — only gains `className`. The one safe row here. |
| `DateTimePicker` | compatible; gains `datePlaceholder` |
| `Wizard` | compatible; gains `label`, `nextLabel`, `backLabel`, `finishLabel` |
| `FileUpload` | loses `hint`, `name`, `value`; now takes `children` |
| `Icon` | loses `size`, `strokeWidth`, `title` — sizing moves to CSS |
| `ToastProvider` | keeps its name but loses `duration` and `children`; toasts now render through `Toaster` + `ToastViewport` |

## Renames that fail loudly (safe)

| v0.11 | 1.0.0 |
| --- | --- |
| `DataGrid` | `DataTable`, `DataTableColumnHeader` |
| `CommandPalette` | `Command` + 8 parts |
| `NumberInput` | `NumberField` + 5 parts |
| `TagInput` | `TagsInput` |
| `FormField` | `Field` + 9 parts |
| `VerticalNav` | `Sidebar` + 22 parts |
| `Dropdown`, `MenuItem`, `MenuHeader`, `MenuDivider` | `DropdownMenu` + 14 parts |
| `Radio` | `RadioGroupItem` (`RadioGroup` keeps its name) |

## Scale note

Three replacements are near-total rewrites of the call site, not swaps:
`VerticalNav` 80L → `Sidebar` 674L (23 exports), `DataGrid` 427L → `DataTable`
784L, `FormField` 58L → `Field` 194L (10 exports). Budget these separately from
the other 25.
