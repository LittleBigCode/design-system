export type Example = {
  /** Key into the demo registry: `<slug>/<file-name>` without the extension. */
  demo: string
  title: string
  description?: string
}

export type ComponentDoc = {
  slug: string
  name: string
  description: string
  category: string
  examples?: Example[]
  /**
   * The barrel exports this page documents, in the order the import line shows
   * them. Required rather than derived: an incumbent's export name does not
   * follow from its slug — `data-table` documents `DataTable` — and the anatomy
   * extractor only finds parts in components that compose from children.
   *
   * An empty array means stylesheet-only — the component's `.ds-*` classes are
   * its whole contract and no binding ships, so the page prints no import line.
   * `resizable` and `message-scroller` are the two.
   */
  exports?: string[]
  /**
   * Notes keyed by part name, surfaced when that part is selected in the
   * anatomy tree. Deliberately sparse: the tree itself is derived, so this is
   * only for what a reader cannot infer from the nesting — write an entry when a
   * part has a gotcha and leave the rest silent.
   */
  parts?: Record<string, string>
  /**
   * Batch 16 (#49), direction.md decision 9: the HTML tab is markup, not
   * behaviour, so an interactive component's page carries one sentence on
   * what a from-scratch binding has to wire up itself — name the real event
   * (open/close, selection, drag) rather than "add JavaScript", and name the
   * matching `<ds-*>` web component when one of the 11 covers this concept
   * (`docs/absorption/corrections.md` — the plan's "12" was one over).
   * Unset for the ~50 purely presentational components: nothing to wire.
   */
  wiring?: string
}

/**
 * The registry is what generates the routes, so an entry here is the only way a
 * component becomes gate-covered. It is therefore **filtered to the components
 * this package actually ships** — seeded with the 30 the absorption leaves in
 * place, and grown one batch at a time.
 *
 * Un-filtering a slug is two moves, together: lift its entry out of `PENDING`
 * into `COMPONENTS`, and move `registry/_pending/demos/<slug>` up into
 * `registry/demos/`. Either one alone breaks the build — the eager glob in
 * `demos.ts` bundles whatever is under `demos/`, and a route with no demo
 * renders an empty page.
 */
export const COMPONENTS: ComponentDoc[] = [
  /* -- Actions ------------------------------------------------------------- */
  {
    slug: "speed-dial",
    name: "Speed Dial",
    category: "Actions",
    exports: ["SpeedDial", "SpeedDialAction"],
    description:
      "A floating button that fans out two to four actions when opened. Use it for the one main action of a view.",
    examples: [
      {
        demo: "speed-dial/basic",
        title: "Create actions",
        description:
          "Each action's visible label is its accessible name, so the glyph carries no `aria-label` of its own. The trigger's `icon` swaps for an X while open — that swap is CSS off `aria-expanded`, not a second state.",
      },
      {
        demo: "speed-dial/docked",
        title: "Docked to the top",
        description:
          '`side="bottom"` fans the column downwards for a dial that lives above its content. Alignment stays pinned to the trigger\'s end edge, which is what keeps the action boxes in a line under it.',
      },
      {
        demo: "speed-dial/tone",
        title: "Brand tone",
        description:
          "`tone` reaches the trigger only — the actions stay neutral so the dial reads as one accent rather than a stack of them. It is `primary` or `danger` here, the two the incumbent button has; the source's eight-tone scale arrives with batch 7. A `disabled` action greys out and refuses activation but stays arrow-reachable and `aria-disabled`, so a reader learns it exists instead of finding a gap.",
      },
    ],
    parts: {
      SpeedDial:
        "The trigger is the root, so `className` positions the dial. `.ds-speed-dial` is the default corner-fixed placement; add `.ds-speed-dial--docked` to scope it to a positioned ancestor instead, and `--docked-top` to flip which edge it sits on.",
      SpeedDialAction:
        "The whole row is the menu item — label chip and glyph box together — so the label is the accessible name and the box needs none.",
    },
    wiring:
      "The trigger's `aria-expanded` drives which glyph shows (`.ds-speed-dial-icon` vs `.ds-speed-dial-icon-close`) — nothing else marks open state — so a from-scratch binding must toggle it itself on click, plus close on Escape or an outside click and return focus to the trigger. It also needs arrow-key roving focus across `.ds-speed-dial-action` rows and to close the menu after an action fires, since these are Base UI Menu's semantics, not CSS.",
  },
  {
    slug: "split-button",
    name: "SplitButton",
    category: "Actions",
    exports: ["SplitButton"],
    description:
      "A main button with a caret beside it for its variants. Use it when there is a clear default action and a few alternatives.",
    examples: [
      {
        demo: "split-button/basic",
        title: "Deploy",
        description:
          "The default action on the left, three variants under the caret.",
      },
    ],
    wiring:
      "The caret half is a `DropdownMenu` — see its own wiring note for the popup's open/close, arrow-key travel and Escape/outside-click dismissal, none of which this component adds to. `onMain` is a plain click handler with no state of its own; a from-scratch binding only has the main button's click to wire.",
  },
  {
    slug: "toggle-group",
    name: "Segmented",
    category: "Actions",
    exports: ["Segmented", "type SegmentedProps", "type SegmentedItem"],
    description:
      "A short row of options where only one can be selected. Best for two to five choices that switch a view.",
    examples: [
      {
        demo: "toggle-group/basic",
        title: "Time window",
        description: "Four windows with `dot` on two of them.",
      },
    ],
  },
  {
    slug: "toggle-group-primitive",
    name: "ToggleGroup",
    category: "Actions",
    exports: ["ToggleGroup", "ToggleGroupItem"],
    description:
      "Base UI's toggle group, composed from parts. Use it when the row needs multi-select or a shape `Segmented` doesn't cover.",
    examples: [
      {
        demo: "toggle-group-primitive/single",
        title: "Single select",
        description: "`type=\"single\"` — the same shape `Segmented` covers, composed instead of configured.",
      },
      {
        demo: "toggle-group-primitive/multiple",
        title: "Multiple select",
        description: "`type=\"multiple\"` — more than one item pressed at once, which `Segmented` cannot do.",
      },
      {
        demo: "toggle-group-primitive/joined",
        title: "Joined",
        description: "Items sharing one visual edge rather than sitting apart.",
      },
    ],
    wiring:
      "A from-scratch binding owns the shared value: clicking (or Space/Enter on) an item toggles it into or out of the group's pressed-values array — by default only one item stays pressed at a time (picking a new one unpresses the last), unless the consumer wants `multiple`-style independent toggling — and updates each item's `aria-pressed` to match. The group also needs roving `tabindex` with arrow-key navigation (looping past the last item back to the first) along `data-orientation`.",
  },
  {
    slug: "wizard",
    name: "Wizard",
    category: "Actions",
    exports: ["Wizard", "type WizardStep"],
    description:
      "An ordered sequence of steps with the progress and navigation built in. Use it when a later step depends on an earlier one.",
    examples: [
      {
        demo: "wizard/basic",
        title: "Four steps",
        description:
          "`defaultActive={1}`, so the demo opens mid-sequence and the completed state is visible.",
      },
    ],
    wiring:
      "A from-scratch binding owns the current-step index: Back/Next move it by one, clamped to the first/last step, Finish fires only on the last, and Next disables whenever the active step's own `disableNext` is set — nothing in the markup enforces that gate on its own. `Stepper`'s parts (`StepperItem`'s `state`, `aria-current=\"step\"`) are presentational only; Wizard is what drives them.",
  },

  {
    slug: "button-group",
    name: "Button Group",
    category: "Actions",
    exports: [
      "ButtonGroup",
      "ButtonGroupSeparator",
      "ButtonGroupText",
      "buttonGroupVariants",
    ],
    description:
      "Joins related buttons into one segmented control with shared borders.",
    examples: [
      {
        demo: "button-group/basic",
        title: "Basic",
        description:
          "The group owns the seam — children stay ordinary `Button`s, so variants and tones keep working inside it.",
      },
      {
        demo: "button-group/split",
        title: "Split action",
        description:
          "The default action stays one click away and its variations move into a menu. The menu is this package's `Dropdown`/`MenuItem` — the source's `dropdown-menu` holds — and its trigger is an `IconButton`, which is what keeps the caret inside the seam rather than beside it.",
      },
      {
        demo: "button-group/with-text",
        title: "With text and inputs",
        description:
          "`ButtonGroupText` prefixes a fixed label, and an `Input` can sit in the group to build a composed field.",
      },
      {
        demo: "button-group/vertical",
        title: "Vertical",
        description:
          '`orientation="vertical"` stacks the seam; `ButtonGroupSeparator` then needs the opposite orientation to draw across it.',
      },
    ],
    parts: {
      ButtonGroup:
        "Collapses the borders of its children by matching either their `data-slot` or their `.ds-button` class, so a wrapper element carrying neither drops out of the seam and breaks the run.",
      ButtonGroupText:
        "A static label, not a control: no focus ring, no tab stop. Pass `render` to make it a `label` when it names the input beside it.",
      ButtonGroupSeparator:
        'A `Separator` defaulting to `vertical`, because it draws across the group rather than along it — a vertical group therefore needs `orientation="horizontal"`. It composes `.ds-separator--auto`, the modifier batch 2 landed for exactly this: the rule sizes itself to the group instead of filling the cross axis.',
    },
  },

  {
    slug: "icon-button",
    name: "Icon Button",
    category: "Actions",
    exports: ["IconButton"],
    description:
      "A square `Button` for a single icon. The `label` prop is required, since the icon carries no text.",
    examples: [
      {
        demo: "icon-button/toolbar",
        title: "Toolbar",
        description:
          "Inside a `ButtonGroup` the borders collapse into one seam, which is what makes a row of icons read as one control rather than four.",
      },
      {
        demo: "icon-button/row-actions",
        title: "Row actions",
        description:
          "Each label names its row — three identical `Delete` buttons are useless to anyone tabbing through a table. `icon-sm` is the 30px box that fits a table row.",
      },
      {
        demo: "icon-button/sizes",
        title: "Sizes",
        description:
          "`size` narrows to the square sizes; the text sizes would leave an icon floating in horizontal padding. `icon-xs` is 24px and shrinks the glyph with the box — it arrived with this component, and `editable` and `field-array` are what asked for it.",
      },
    ],
  },
  /* -- Forms ------------------------------------------------------------- */

  {
    slug: "toggle",
    name: "Toggle",
    category: "Actions",
    exports: ["Toggle", "toggleVariants"],
    description: "A button that stays pressed, for on/off controls like bold or mute. Use `Switch` or `Checkbox` for values a form submits.",
    examples: [
      {
        demo: "toggle/basic",
        title: "Basic",
        description:
          "`defaultPressed` starts the toggle on. The pressed state lands on `aria-pressed`, which is what the styling hooks into.",
      },
      {
        demo: "toggle/variants",
        title: "Variants and sizes",
        description:
          "Two variants and three sizes. `outline` is the right choice when the toggle sits alone rather than in a group.",
      },
      {
        demo: "toggle/controlled",
        title: "Controlled",
        description:
          "Pass `pressed` with `onPressedChange` when the toggle drives something else on the page.",
      },
      {
        demo: "toggle/row-action",
        title: "Row action",
        description:
          "One toggle per row, holding its own state. The icon carries no text, so each one needs an `aria-label` naming its row — the pressed fill is the only other cue.",
      },
    ],
    wiring:
      "One `aria-pressed` boolean, flipped by a click/Space/Enter handler on the button — `toggle.css` keys the pressed fill off `aria-pressed` itself, so that's the only state a from-scratch binding needs to maintain.",
  },
  /* -- Forms --------------------------------------------------------------- */
  {
    slug: "autocomplete",
    name: "Autocomplete",
    category: "Forms",
    exports: [
      "Autocomplete",
      "AutocompleteInput",
      "AutocompleteClear",
      "AutocompleteContent",
      "AutocompleteList",
      "AutocompleteItem",
      "AutocompleteGroup",
      "AutocompleteLabel",
      "AutocompleteCollection",
      "AutocompleteEmpty",
      "AutocompleteStatus",
      "AutocompleteSeparator",
    ],
    description:
      "A text input with suggestions, where the typed value doesn't have to come from the list. Use `Combobox` when it must.",
    examples: [
      {
        demo: "autocomplete/basic",
        title: "Basic",
        description:
          "Whatever is typed stays the value even when nothing matches — there is no selection to read back, only the string. Use Combobox when the value must come from the list.",
      },
      {
        demo: "autocomplete/grouped",
        title: "Grouped suggestions",
        description:
          "Groups come from the shape of `items`: entries carrying their own `items` array arrive at the list's function child as groups, and `AutocompleteCollection` renders the entries of the group it sits in.",
      },
      {
        demo: "autocomplete/inline",
        title: "Inline completion",
        description:
          '`mode="both"` filters the list and completes the highlighted entry inside the input, so a long value like a timezone is a few keystrokes rather than a scroll. It needs `autoHighlight` to have something to preview before the arrow keys are touched.',
      },
      {
        demo: "autocomplete/async",
        title: "Server-side search",
        description:
          "The page owns the results, so `filter={null}` stops Base UI filtering an already-filtered list. `AutocompleteStatus` is the polite live region for that request's state — it stays mounted and swaps its children, which is what lets a screen reader hear the count settle.",
      },
    ],
    parts: {
      AutocompleteInput:
        "An `InputGroup` rather than a bare input, with `showClear` as this system's own addition. There is no trigger part here, unlike Combobox: the popup opens from typing, or from `openOnInputClick`.",
      AutocompleteClear:
        "Unmounts while there is nothing to clear, so it is absent from an empty field rather than disabled. Base UI renders it `aria-hidden` and out of the tab order deliberately — it is a pointer shortcut, and a keyboard reader clears the field by selecting its text. Do not treat it as the only way to clear.",
      AutocompleteContent:
        "Portalled, and pinned to the anchor's width — unlike Combobox's popup it never grows past the input, so a long suggestion wraps instead of widening the field.",
      AutocompleteEmpty:
        "Shown by a `data-empty` attribute on the popup, not by conditional rendering, so it belongs inside `AutocompleteContent` and outside `AutocompleteList`. Swap its children rather than unmounting it — staying mounted is what lets it announce the empty result.",
      AutocompleteStatus:
        "A polite live region for the state of the list, not a heading: it announces changes to its children, so unmounting it or filling it with a fixed string wastes it. Loading and result counts are what it is for.",
      AutocompleteCollection:
        "Renders the items of the `AutocompleteGroup` above it, or the root's filtered items when there is no group — the same wrapper `AutocompleteList` applies implicitly to a function child.",
    },
    wiring:
      "A from-scratch binding filters (or not, per `mode`) the item list as the input's value changes, marks the highlighted item with `data-highlighted` as arrow keys move through it, and commits an item's text into the input on click or Enter. The popup's open state is `data-open`/`data-closed`, its empty state is a `data-empty` attribute rather than conditional rendering (so the empty message stays mounted and gets announced), and the clear button has to unmount itself — not just disable — whenever the input is empty.",
  },
  {
    slug: "calendar",
    name: "Calendar",
    category: "Forms",
    exports: ["Calendar", "CalendarDayButton"],
    description: "A month grid, built on react-day-picker. Use it when the reader needs to see the days; use `DatePicker` to just collect a date.",
    examples: [
      {
        demo: "calendar/basic",
        title: "A month with events",
        description:
          "A fixed month rather than `new Date()` — the visual suite diffs this screenshot, so a moving month would fail every month. Event dots come from a `DayButton` override, not a data prop.",
      },
    ],
    wiring:
      "The grid, month navigation and single/range/multiple selection are `react-day-picker`'s own logic, not CSS — a from-scratch binding needs that library (or an equivalent date-grid implementation), not just the markup. `data-selected-single`/`data-range-start`/`data-range-end`/`data-range-middle` on each day button are the library's own state, deciding which cells `.ds-calendar-day-button` and its siblings paint as picked.",
  },
  {
    slug: "color-picker",
    name: "ColorPicker",
    category: "Forms",
    exports: ["ColorPicker", "type ColorPickerProps"],
    description:
      "Swatches for the brand palette with a hex field beside them. Pass `swatches` to narrow the choices.",
    examples: [
      {
        demo: "color-picker/basic",
        title: "Basic",
        description: "Uncontrolled, defaulting to the brand red.",
      },
    ],
    wiring:
      "Four inputs converge on one value and a binding has to keep them synced: a swatch click sets `aria-pressed` on the matching `.ds-color-picker-swatch` and commits its color; the hex field validates every keystroke against a `#rgb`/`#rrggbb` pattern before committing, so `#16` mid-type doesn't commit; the native `<input type=\"color\">` commits immediately on change; and a hidden `input[name]` must mirror only the last *committed* color, never the hex field's in-progress draft.",
  },
  {
    slug: "combobox",
    name: "Combobox",
    category: "Forms",
    exports: [
      "Combobox",
      "ComboboxInput",
      "ComboboxContent",
      "ComboboxList",
      "ComboboxItem",
      "ComboboxGroup",
      "ComboboxLabel",
      "ComboboxCollection",
      "ComboboxEmpty",
      "ComboboxSeparator",
      "ComboboxChips",
      "ComboboxChip",
      "ComboboxChipsInput",
      "ComboboxTrigger",
      "ComboboxValue",
      "useComboboxAnchor",
    ],
    description:
      "A text field that filters a list as you type and settles on one value. Use `Select` under about seven options.",
    examples: [
      {
        demo: "combobox/basic",
        title: "Basic",
        description:
          "An items array of `{ value, label }`, so the code stores the id and the reader sees the name.",
      },
      {
        demo: "combobox/grouped",
        title: "Grouped",
        description:
          "Nested `items`, one `ComboboxGroup` per team with a `ComboboxLabel` heading and a `ComboboxSeparator` between them.",
      },
      {
        demo: "combobox/multiple",
        title: "Multiple, as chips",
        description:
          "`multiple` plus `ComboboxChips`/`ComboboxChip`/`ComboboxValue` — the same composition `MultiSelect` wraps.",
      },
    ],
    wiring:
      "A from-scratch binding needs the full listbox-combobox pattern: the input filtering `.ds-combobox-item` rows as it's typed, arrow keys moving `data-highlighted` without committing, Enter/click committing the value and closing the popup, and Escape/outside-click closing without committing. `multiple` mode additionally tracks an array of values, rendering one `.ds-combobox-chip` per entry with its own remove button, and anchors the popup to the chips row (`useComboboxAnchor`) rather than the root so it follows the row as chips wrap onto a second line.",
  },
  {
    slug: "date-picker",
    name: "DatePicker",
    category: "Forms",
    exports: ["DatePicker", "DatePickerTrigger", "DatePickerContent"],
    description: "A field with a calendar in a popover, for picking one date.",
    examples: [
      {
        demo: "date-picker/basic",
        title: "Bounded to a year",
        description:
          "`Calendar`'s `disabled` matchers keep the picker inside 2026.",
      },
    ],
    wiring:
      "Thin composition over `Popover` — see its own wiring note for open/close, positioning and outside-click/Escape dismissal — plus `Calendar`'s own selection state (see its note) for the day grid inside. A from-scratch binding wires the trigger's displayed label to the current selection and closes the popover once a day is picked.",
  },
  {
    slug: "date-range-picker",
    name: "DateRangePicker",
    category: "Forms",
    exports: ["DateRangePicker", "type DateRange"],
    description: "A start and end date picked in one calendar. The value is `{ from, to }`.",
    examples: [
      {
        demo: "date-range-picker/basic",
        title: "A picked range",
        description: "`defaultValue` as a `{ from, to }` pair of `Date`s.",
      },
    ],
    wiring:
      "Owns its own `{ from, to }` range state — unlike `DatePicker`, which leaves selection to the caller. A from-scratch binding needs `Calendar`'s range-select behavior (its own note) inside a `Popover` (ditto), plus, when `showTime` is on, keeping each bound's hours/minutes in sync with a `TimePicker` pair without disturbing the day already picked.",
  },
  {
    slug: "date-time-picker",
    name: "DateTimePicker",
    category: "Forms",
    exports: ["DateTimePicker"],
    description:
      "A calendar and a time picker combined into one `Date` value.",
    examples: [
      {
        demo: "date-time-picker/basic",
        title: "Quarter-hour steps",
        description:
          "`step={15}`, so a time picked off the clock snaps to `:00`, `:15`, `:30` or `:45`.",
      },
    ],
    wiring:
      "A binding has to wire two things: the date half's popover open/close (opening on trigger click, closing again the moment a day is picked) and the calendar's day-selection state (`aria-selected` on the picked cell, `aria-disabled` on days outside `min`/`max`). It then has to merge that picked day with the time sub-fields into one value and re-clamp on every change to `min`/`max`, since the bound applies to the combined date-time, not the date alone.",
  },
  {
    slug: "file-upload",
    name: "FileUpload",
    category: "Forms",
    exports: [
      "FileUpload",
      "FileUploadIcon",
      "FileUploadTitle",
      "FileUploadDescription",
    ],
    description:
      "A drop zone that also works as a file button. `accept` filters the picker but is not validation — check the files again on `onFiles`.",
    examples: [
      {
        demo: "file-upload/basic",
        title: "Multiple CSVs",
        description:
          "`accept` narrowing the picker, `multiple` allowing a set, and the size cap written into `hint`.",
      },
    ],
    wiring:
      "A binding needs to wire the drag lifecycle onto `data-dragging` (set on `dragover`, cleared on `dragleave`/`drop`), forward both a `drop`'s `dataTransfer.files` and the hidden input's own `change` `files` to the same handler, and reset the input's `value` after each change so re-selecting the identical file still fires a change event.",
  },
  {
    slug: "multi-select",
    name: "MultiSelect",
    category: "Forms",
    exports: ["MultiSelect", "type MultiSelectOption"],
    description: "Several values from a fixed list, shown as removable chips. Use checkboxes under about five options.",
    examples: [
      {
        demo: "multi-select/basic",
        title: "Scopes",
        description: "Two selected at mount, labelled via `aria-labelledby`.",
      },
    ],
    wiring:
      "A friendlier `options`/`value` wrapper over `Combobox`'s own `multiple` + chips wiring — see its note, nothing here is new behavior. `ComboboxChipsInput`'s own `aria-label`/`aria-labelledby` carries the accessible name, since a label on the root `Combobox` doesn't reach the actual form control.",
  },
  {
    slug: "number-field",
    name: "NumberField",
    category: "Forms",
    exports: [
      "NumberField",
      "NumberFieldGroup",
      "NumberFieldInput",
      "NumberFieldDecrement",
      "NumberFieldIncrement",
      "NumberFieldScrubArea",
    ],
    description:
      "A numeric field with stepper buttons. The value is `number | null`, so an empty field is never mistaken for zero.",
    examples: [
      {
        demo: "number-field/basic",
        title: "Bounded",
        description:
          "`min`, `max` and `step` set, so both the buttons and typing stay in range.",
      },
      {
        demo: "number-field/with-scrub",
        title: "With a scrub area",
        description:
          "`NumberFieldScrubArea` wraps the label — drag it to change the value, the way a design tool's number fields do.",
      },
    ],
    wiring:
      "A binding has to parse and clamp the input's typed value against `min`/`max`/`step`, format it back for display, and disable (`data-disabled`/`aria-disabled`) the increment/decrement buttons at those bounds. It also owns the scrub area: pointer-drag on it should adjust the value by drag delta rather than by click, hide the system cursor, and move the cursor element to track the pointer.",
  },
  {
    slug: "radio-group",
    name: "RadioGroup",
    category: "Forms",
    exports: ["RadioGroup", "RadioGroupItem"],
    description: "One choice from a few, over native radio inputs. Best for two to five options; past that use `Select`.",
    examples: [
      {
        demo: "radio-group/basic",
        title: "Frequency",
        description:
          "No `name` passed, so the group generates its own and the arrow keys work.",
      },
    ],
    wiring:
      "A binding has to implement roving `tabindex` across the group's radios (only the checked, or first, item is tab-stoppable), arrow-key navigation that moves both focus and selection between items, and toggling `aria-checked`/`data-checked` on the chosen item while clearing it on the rest. For use in a native form it also needs a hidden input synced to the selected item's value.",
  },
  {
    slug: "rating",
    name: "Rating",
    category: "Forms",
    exports: ["Rating"],
    description: "A star scale, as an input or, with `readOnly`, as a display.",
    examples: [
      {
        demo: "rating/basic",
        title: "Input and display",
        description:
          "One editable, one `readOnly` — the two states side by side.",
      },
    ],
    wiring:
      "Built on the same radio-group mechanics, plus a hover preview: mouse-enter on an item has to visually fill up to that rank without committing the value, mouse-leave clears the preview back to the committed selection, and a click (or arrow-key move) commits it. `readOnly`/`disabled` must suppress both the hover preview and the click handler.",
  },
  {
    slug: "tags-input",
    name: "TagsInput",
    category: "Forms",
    exports: ["TagsInput"],
    description:
      "Free-form labels typed one at a time and shown as removable chips. Use `MultiSelect` when the list is fixed.",
    examples: [
      {
        demo: "tags-input/basic",
        title: "Tags",
        description:
          "Three tags at mount, with a placeholder that says what the field takes.",
      },
    ],
    wiring:
      "A from-scratch binding owns all of the token logic: `Enter` or `,` on the input commits its current text as a new tag (skipping duplicates and anything past a configured max), `Backspace` on an empty input removes the last tag, and blurring the input also commits whatever's left in it. It also needs the container click-through behavior — a `mousedown` on the wrapper (not on a tag or its remove button) should focus the text input — and each tag's remove button removes just that tag from the collection.",
  },
  {
    slug: "time-picker",
    name: "TimePicker",
    category: "Forms",
    exports: ["TimePicker", "type TimeValue"],
    description: "A time of day, from segmented hour and minute fields plus a dial. The value is `{ hours, minutes, seconds? }`, with no date attached.",
    examples: [
      {
        demo: "time-picker/basic",
        title: "Basic",
        description: "A `defaultValue` of 14:30, with the dial popover.",
      },
    ],
    wiring:
      "The dial view is the heavy lift: a from-scratch binding must map a click's position on the circular face to an hour or minute (via angle), animate a hand that sweeps to it, switch from hour-picking to minute-picking mode after an hour is chosen, and close the popover a beat after a minute is picked (~220ms, so the hand visibly lands first). The list view instead needs each column to scroll itself to the current value on open and smooth-scroll to a new one on later changes; both views also keep three independent number fields (hours/minutes/seconds) in sync as one time value.",
  },

  {
    slug: "label",
    name: "Label",
    category: "Forms",
    exports: ["Label"],
    description:
      "An accessible label for a control, paired with `htmlFor`. Use it when the label and the control are separate elements.",
    examples: [
      {
        demo: "label/basic",
        title: "Basic",
        description:
          "Uppercase and tracked, which suits a field heading. A Label is a flex row, so a required badge or an `optional` aside can sit beside the words — and that aside is where the voice has to be overridable.",
      },
      {
        demo: "label/with-controls",
        title: "Checkbox and switch rows",
        description:
          "Which controls need a Label at all. This package's `Checkbox`, `Switch` and `Radio` each wrap their own text, so they take their words as children; a select, a range and a textarea are the ones that need a separate name pointed at them.",
      },
      {
        demo: "label/inline-hints",
        title: "Inline hints",
        description:
          "The root is `flex items-center gap-2`, so a badge or a hint sits inside the label with no extra wrapper. Plain text needs `normal-case font-normal tracking-normal` to opt out of the heading treatment it inherits.",
      },
      {
        demo: "label/disabled",
        title: "Disabled controls",
        description:
          'Two mechanisms, because the sibling selector only reaches a label that comes *after* the control: the first row fades from `:disabled ~ .ds-label`, and the second — label first — fades from an ancestor carrying `data-disabled="true"`, which is what a whole disabled field group wants.',
      },
    ],
  },

  {
    slug: "form",
    name: "Form",
    category: "Forms",
    exports: ["Form"],
    description:
      "The page-level `<form>` element and its vertical spacing. `Field` handles everything inside it.",
    examples: [
      {
        demo: "form/basic",
        title: "Basic",
        description:
          "`FormData` over `event.currentTarget` is the reliable read in this system — every control here is a native input with a `name`, so nothing else is needed.",
      },
      {
        demo: "form/validation",
        title: "Validation",
        description:
          "Wire errors yourself: state in, `FieldError` out, `aria-invalid` on the control. Nothing validates on submit until you do, since the form carries `noValidate`.",
      },
      {
        demo: "form/sections",
        title: "Sectioned form",
        description:
          "Form's own gap is what separates the sections — a plain `<fieldset>` and `<legend>` group them semantically, and the rows inside one space themselves.",
      },
      {
        demo: "form/pending",
        title: "Pending submit",
        description:
          "An async `onSubmit`: read the values before the first `await`, since `event.currentTarget` is null once the handler yields. The server's answer lands in the same error state a client check would use.",
      },
    ],
    wiring:
      "The behavior worth wiring is server-side error propagation: submit is intercepted, and whatever the submit handler returns as an errors map (field name to message) has to be distributed automatically to each field — setting `aria-invalid` and rendering the message next to the matching input — rather than a page hand-wiring each field's error display itself.",
  },

  /* -- Data display ------------------------------------------------------ */

  {
    slug: "field-array",
    name: "Field Array",
    category: "Forms",
    exports: [
      "FieldArray",
      "FieldArrayItem",
      "FieldArrayItemContent",
      "FieldArrayRemove",
      "FieldArrayAdd",
    ],
    description:
      "Repeated entries for an array of objects — one removable block each, with an add button under the stack.",
    examples: [
      {
        demo: "field-array/basic",
        title: "Basic",
        description:
          "One entry per diploma: an Input and a Select in the default content column, remove button beside them. Both carry an indexed `name`, so the section submits without any value state. Every control needs a name of its own — the entries are identical, so `Diploma 2 school` beats `School` for anyone hearing the form rather than seeing the block it sits in.",
      },
      {
        demo: "field-array/submit",
        title: "Any controls, one submit",
        description:
          "The part list is layout only, so an entry can hold anything: here a two-column grid of Input, Select and Checkbox through `--grid`, with the remove button moved into a header row through `--stacked` and `--stretch`. The output is the raw `FormData` the browser would post — an unchecked Checkbox contributes no entry, which is native behaviour rather than something the component decides.",
      },
      {
        demo: "field-array/limits",
        title: "Limits",
        description:
          "Neither bound is built in: `disabled` on `FieldArrayAdd` caps the stack, and rendering no `FieldArrayRemove` on a lone entry is what keeps one row mandatory.",
      },
    ],
    parts: {
      FieldArray:
        'A `role="group"` column on `gap-3` — the add button is just its last child, not a separate slot.',
      FieldArrayItem:
        "The bordered block, a centred flex row. Add `.ds-field-array-item--stacked` and `--stretch` when the entry wants stacked sections instead of content-beside-button — the two modifiers that replaced the source's literal `flex-col items-stretch` override.",
      FieldArrayItemContent:
        "The column the controls go in. `min-w-0` is load-bearing: without it a long value refuses to shrink below its content width and pushes the remove button out of the block. Override `className` for any other arrangement — `.ds-field-array-item-content--grid`, the two-column case, is the common one.",
      FieldArrayRemove:
        "An `IconButton` at `icon-sm` carrying the trash glyph; `label` is its accessible name and should identify the entry, since a stack of them all reading `Remove` tells a screen reader user nothing. Pass children to swap the glyph.",
      FieldArrayAdd:
        "A full-width `Button` with the plus already in it — pass only the label as children. It is the bordered default rather than the source's `outline`, which is the same button under this package's two-variant axis.",
    },
  },
  {
    slug: "input-otp",
    name: "Input OTP",
    category: "Forms",
    exports: ["InputOTP", "InputOTPGroup", "InputOTPSlot", "InputOTPSeparator"],
    description:
      "A one-time-code field with one slot per character. Use it when the code length is fixed.",
    examples: [
      {
        demo: "input-otp/basic",
        title: "Basic",
        description:
          "One real input carrying the value and the accessible name, two groups of `.ds-input-otp-slot` boxes split 3–3 with a `.ds-input-otp-separator` between them, and `data-active` on the box the caret is in — which is what draws the focused underline and the blinking line. The boxes are `aria-hidden`, because the input already announces the value.",
      },
      {
        demo: "input-otp/with-separator",
        title: "Custom grouping",
        description: "`InputOTPSeparator` placed wherever the code's own convention splits it.",
      },
      {
        demo: "input-otp/verify-form",
        title: "In a verification form",
        description: "Paired with `Field` for the label and the error, and a submit button gated on the code's length.",
      },
      {
        demo: "input-otp/auto-submit",
        title: "Auto-submit",
        description: "Submits itself once every slot is filled, no explicit action.",
      },
    ],
    wiring:
      "The `input-otp` package drives the actual field — one real, transparent `<input>` capturing every keystroke, paste and one-time-code suggestion, while each `InputOTPSlot` only *renders* the character and caret state it's handed via context. A from-scratch binding needs that library (or an equivalent single-input-many-boxes implementation), not just the markup — `data-active` alone won't move without it.",
  },

  {
    slug: "phone-input",
    name: "Phone Input",
    category: "Forms",
    exports: ["PhoneInput"],
    description:
      "A country dial-code select next to a national-number field, returning one string like `+33612345678`.",
    examples: [
      {
        demo: "phone-input/basic",
        title: "Basic",
        description:
          "The value is a single string (`+33612345678`) — the dial code and national number are split from it for editing, then rejoined on change.",
      },
      {
        demo: "phone-input/with-field",
        title: "In a field",
        description:
          "`defaultCountry` seeds the dial code before any digits are typed, which is what an empty controlled field needs — the split falls back to it whenever the value carries no recognised dial code.",
      },
      {
        demo: "phone-input/contact-form",
        title: "Contact form",
        description:
          "Beside plain fields in a form: one value goes to the server, dial code included, so there is no second country field to keep in sync.",
      },
    ],
    parts: {
      PhoneInput:
        "The two inner controls carry hardcoded `aria-label`s (`Country calling code`, `Phone number`) and accept no override, so a surrounding `Label` is a visual caption rather than a programmatic one. Typed characters are sanitised to digits and spaces, which is why the stored string is E.164-ish rather than strictly E.164.",
    },
    wiring:
      "Composes `Select` (its own wiring note) for the dial code and a plain `Input` for the national number, splitting and rejoining one `value` string between them on every change. A from-scratch binding needs that split/rejoin logic itself, not just the two controls side by side — otherwise picking a country stops updating the combined value correctly.",
  },

  {
    slug: "editable",
    name: "Editable",
    category: "Forms",
    exports: ["Editable"],
    description:
      "Click-to-edit text: a preview that swaps to a field, saved on Enter or blur and discarded on Escape.",
    examples: [
      {
        demo: "editable/basic",
        title: "Basic",
        description:
          "Uncontrolled, which is enough for most renames: the component holds the committed value itself. The pencil only appears on hover or focus, and Escape restores the previous value rather than committing the draft.",
      },
      {
        demo: "editable/rows",
        title: "Rows in a list",
        description:
          "One per row, each holding its own value, so nothing above them keeps state. The last row starts empty to show `placeholder`, which stands in for the value in muted text rather than sitting inside the field.",
      },
      {
        demo: "editable/explicit-commit",
        title: "Commit explicitly",
        description:
          "`submitOnBlur={false}` for a value a stray click must not rewrite: blur then runs `onCancel` rather than `onSubmit`, so the check button and Enter are the only ways to commit and a draft left behind is dropped.",
      },
      {
        demo: "editable/controlled",
        title: "Controlled",
        description:
          "`value` with `onSubmit` hands the commit to the page — and obliges it to write the value back, since a controlled Editable renders what it is given and would otherwise snap to the old text. `onValueChange` is the same moment, not the keystrokes: there is no callback for the draft.",
      },
    ],
    wiring:
      "The whole component is the edit-mode toggle: clicking the pencil swaps `data-editing=\"false\"` for `\"true\"` and swaps the preview `<span>` for an `<input>` plus save/cancel buttons. A binding must wire Enter to commit and Escape to cancel on the input's keydown, blur to either commit or cancel, and — since a button click blurs the input first — call `preventDefault` on the buttons' `mousedown` so their `click` still fires before the blur handler resolves the edit.",
  },
  /* -- Data display -------------------------------------------------------- */
  {
    slug: "code-block",
    name: "CodeBlock",
    category: "Data display",
    exports: [
      "CodeBlock",
      "CodeBlockHead",
      "CodeBlockFilename",
      "CodeBlockBody",
      "CodeBlockCopyButton",
    ],
    description: "A code snippet with a filename strip and a copy button.",
    examples: [
      {
        demo: "code-block/basic",
        title: "With a filename",
        description:
          "The strip names the file the snippet would live in, which is what makes a copied snippet placeable.",
      },
    ],
    wiring:
      "The copy button is the whole interactive surface: clicking it writes `value` to the clipboard and swaps its `aria-label` and icon between `Copy code` and `Copied` for about two seconds before reverting — the label/icon swap is the only signal, there's no CSS state to key off.",
  },
  {
    slug: "data-table",
    name: "DataTable",
    category: "Data display",
    exports: ["DataTable", "DataTableColumnHeader", "type ColumnDef"],
    description:
      "A table with sorting, selection, inline edit and paging, over `@tanstack/react-table`. Use `Table` when the rows only need displaying.",
    examples: [
      {
        demo: "data-table/basic",
        title: "Sortable and selectable",
        description:
          "In-memory `data` with a default sort. `rowKey` is what selection tracks — without it the index does, and a re-sort moves the ticks.",
      },
      {
        demo: "data-table/editable",
        title: "Inline edit",
        description:
          "`editable` on the table plus `meta: { editable: true }` on a column opens the cell on double-click or Enter; `onCellEdit` receives the row, the column key and the new value. The table does not mutate `data` itself.",
      },
    ],
    wiring:
      "This is the heaviest binding in the set: a sortable header button cycles none→asc→desc on click, a select-all checkbox derives checked/indeterminate from its rows' own checkbox state (and vice versa), and a per-row disclosure button toggles `aria-expanded` to show or hide a full-width detail row. Column headers can also be dragged — or arrow-keyed, for a keyboard equivalent — into a new order; inline edit opens a cell on double-click or Enter and commits on blur/Enter without touching the underlying data; and a server-driven table has to fetch and show a loading state on every sort, filter or page change.",
  },
  {
    slug: "tree",
    name: "Tree",
    category: "Data display",
    exports: ["Tree", "TreeItem", "TreeItemTrigger", "TreeItemContent", "TreeLeaf"],
    description:
      "A nested, expandable hierarchy for files, org units or categories. Use a list with headings when the nesting is only grouping.",
    examples: [
      {
        demo: "tree/basic",
        title: "A file tree",
        description: "Two levels open at mount via `defaultOpen`.",
      },
    ],
    wiring:
      "A from-scratch binding toggles `TreeItemTrigger`'s open state (its caret swaps `.ds-tree-item-trigger-caret-right`/`-down` off it) on click/Space/Enter, showing or hiding the matching `TreeItemContent` `<ul role=\"group\">`. Per `docs/absorption/corrections.md`'s batch-13 row this is deliberately as far as it goes — there's no roving tabindex or arrow-key expand/collapse to replicate; Tab visits every trigger and that's the accepted, shipped behavior.",
  },
  {
    slug: "item",
    name: "Item",
    category: "Data display",
    exports: [
      "Item",
      "ItemMedia",
      "ItemContent",
      "ItemActions",
      "ItemGroup",
      "ItemSeparator",
      "ItemTitle",
      "ItemDescription",
      "ItemHeader",
      "ItemFooter",
    ],
    description:
      "A list row with media, content and action slots. Lighter than a `Card` for rows that repeat.",
    examples: [
      {
        demo: "item/variants",
        title: "Variants",
        description:
          "Three surfaces: transparent, bordered and tinted. All three keep the same padding, so a list can mix them without jumping.",
      },
      {
        demo: "item/with-media",
        title: "Media and actions",
        description:
          "`ItemMedia` top-aligns itself once the row has a description, keeping icon and title on one line however long the description runs.",
      },
      {
        demo: "item/sizes",
        title: "Density, header and footer",
        description:
          "`ItemGroup` tightens its own gap when it contains `sm`/`xs` rows — density follows the items, with no matching prop on the group.",
      },
      {
        demo: "item/as-link",
        title: "Navigable rows",
        description:
          "`render` swaps the row's `div` for an anchor, which is what switches on the hover wash and the focus ring — both are keyed off the rendered element being an `a`, not off a prop.",
      },
    ],
    parts: {
      ItemGroup:
        'A generic container, not a `role="list"` — it cannot vouch for what its polymorphic children render, so the roles are yours to write. It does tighten its own gap when it holds `sm` or `xs` rows, so density follows the items with no matching prop here.',
      Item: "Polymorphic through `render`. The hover wash and the focus ring are keyed off the rendered element being an anchor, so a plain `div` row stays inert.",
      ItemMedia:
        "Top-aligns itself once the row has an `ItemDescription`, keeping icon and title on one line however long the description runs. The `image` variant is the one that sizes and crops.",
      ItemContent:
        "Takes the free space; a second `ItemContent` in the same row goes `flex-none`, which is how a trailing meta column keeps its natural width.",
      ItemTitle:
        "Uppercase and clamped to one line — a row label, not a heading, so a long name truncates instead of wrapping. Pass your own heading element when the level matters.",
      ItemHeader:
        "Full flex-basis, so it takes its own line inside the row's wrap — that is what lets one row carry a header above its content.",
      ItemFooter: "Mirrors the header: full flex-basis, contents pushed apart.",
      ItemSeparator:
        "For inside a row, between header and footer — a `Separator` with its own block margin. The space between rows comes from the gap on `ItemGroup` instead.",
    },
  },
  {
    slug: "marker",
    name: "Marker",
    category: "Data display",
    exports: ["Marker", "MarkerIcon", "MarkerContent", "markerVariants"],
    description: "A small label pairing an icon with text, for titling a group of rows.",
    examples: [
      {
        demo: "marker/variants",
        title: "Variants",
        description:
          "`separator` draws rules either side of the label with pseudo-elements; `border` underlines the row instead.",
      },
      {
        demo: "marker/with-icon",
        title: "With an icon",
        description:
          "`MarkerIcon` is `aria-hidden`, so the meaning has to be in `MarkerContent` — the glyph is decoration.",
      },
      {
        demo: "marker/section-labels",
        title: "Section labels",
        description:
          "The `border` variant as the title of a settings group: the rule spans the full row, so it reads as the section boundary and the group needs no `Separator` of its own.",
      },
      {
        demo: "marker/day-divider",
        title: "Dividing a feed",
        description:
          "The `separator` variant between groups of a feed. Its rules flex into whatever the label leaves, so one marker centres a short day and a long date alike.",
      },
    ],
    parts: {
      Marker:
        "Full width, and the owner of the pseudo-element rules the `separator` variant draws — the label only centres while the marker has its own line.",
      MarkerIcon:
        "`aria-hidden` and fixed at 1rem square: decoration. Whatever it means has to be in MarkerContent as well.",
      MarkerContent:
        "Stops flexing under the `separator` variant so the rules take the remaining width, and wraps rather than truncating.",
    },
  },
  {
    slug: "snippet",
    name: "Snippet",
    category: "Data display",
    exports: ["Snippet"],
    description:
      "A one-line copyable command or value. Use `Code Block` for multi-line samples.",
    examples: [
      {
        demo: "snippet/basic",
        title: "Basic",
        description:
          "With no `children`, `value` is both what shows and what copies — the common case for an install line.",
      },
      {
        demo: "snippet/in-context",
        title: "Obscured secret",
        description:
          "Where `children` earns its keep: the key renders masked in a record summary while `value` keeps the full string that reaches the clipboard.",
      },
    ],
  },
  {
    slug: "qr-code",
    name: "QR Code",
    category: "Data display",
    exports: ["QrCode", "type QrErrorCorrectionLevel"],
    description:
      "Renders a QR code as inline SVG. No dependency and no network — pass a `value`.",
    examples: [
      {
        demo: "qr-code/basic",
        title: "Basic",
        description:
          "`value` is effectively the whole API — the code is square, `size` is its rendered width in px, and the quiet zone is drawn inside that box.",
      },
      {
        demo: "qr-code/levels",
        title: "Correction levels",
        description:
          "Higher correction survives more damage — a logo overlay, a torn corner — but holds less data: L 271 bytes down to H 119.",
      },
      {
        demo: "qr-code/in-card",
        title: "Scan or type",
        description:
          "The two-factor shape: the same secret as a code and as a `Snippet`, since a reader on the device showing the code cannot scan their own screen. The quiet zone stays white on dark, which is what keeps it scannable.",
      },
    ],
  },

  {
    slug: "meter",
    name: "Meter",
    category: "Data display",
    exports: [
      "Meter",
      "MeterTrack",
      "MeterIndicator",
      "MeterLabel",
      "MeterValue",
      "meterVariants",
    ],
    description:
      "Shows how full something is within a known range, like disk or budget. Use `Progress` for work advancing towards done.",
    examples: [
      {
        demo: "meter/basic",
        title: "Basic",
        description:
          "`format` takes `Intl.NumberFormatOptions` and applies to `MeterValue`, which is what makes the second row read `128 GB` instead of the `50%` of its range it would print by default.",
      },
      {
        demo: "meter/thresholds",
        title: "Colour by threshold",
        description:
          "Because the indicator is internal, per-row colour is a descendant selector on the root rather than a prop.",
      },
      {
        demo: "meter/plan-usage",
        title: "In a panel",
        description:
          "Where capacity readouts usually live: a plan summary with the action under it. Both rows pass a function child to `MeterValue`, which receives the formatted string and the raw number — the way to write `34 of 50 used` where the default would read `68%`.",
      },
    ],
    parts: {
      Meter:
        "Renders the track and the indicator itself, after your children, and owns `format` — pass only a label and a value unless you want two bars.",
      MeterTrack:
        "Rendered for you. Restyle the bar through a descendant selector on the root rather than by adding a second track.",
      MeterIndicator:
        "Also internal, and Base UI sets its width inline, so colour is the one thing left to change from outside — which is why thresholds are a selector on the root.",
      MeterLabel:
        "Registers itself as the meter's accessible name, so a meter without one needs an `aria-label` on the root.",
      MeterValue:
        "`aria-hidden`: the root already announces the value through `aria-valuetext`, so this is the sighted readout only. A function child receives the formatted string and the raw number.",
    },
  },

  {
    slug: "relative-time",
    name: "Relative Time",
    category: "Data display",
    exports: ["RelativeTime", "formatRelativeTime"],
    description:
      "Renders \"3 hours ago\" from a date inside a `time` element, and keeps it updating. Past a week it shows the date instead.",
    examples: [
      {
        demo: "relative-time/basic",
        title: "Basic",
        description:
          "The thresholds in one list: seconds, minutes, hours and days stay relative, and anything past a week renders as an absolute date instead.",
      },
      {
        demo: "relative-time/static",
        title: "In a table",
        description:
          "Where relative stamps earn their keep: a column of them scans faster than absolute dates. `live={false}` stops the re-render timer, for a snapshot or a server-rendered page that has no need to keep advancing.",
      },
      {
        demo: "relative-time/inputs",
        title: "What a column can hand over",
        description:
          "One instant in the four shapes an API or a database actually returns, all reading identically — plus an unparseable value, which is printed as it arrived under `data-invalid` rather than taking the tree down.",
      },
      {
        demo: "relative-time/locales",
        title: "Other locales",
        description:
          "`locale` goes straight to `Intl.RelativeTimeFormat`, and an invalid tag falls back to the browser instead of throwing. Leaving it unset follows the browser, which is usually what an app wants.",
      },
    ],
    wiring:
      "A binding needs a self-rescheduling timer that recomputes the string via `Intl.RelativeTimeFormat` at a cadence derived from elapsed time — every second under a minute, every 30s under an hour, every minute under a day, hourly under a week — and stops ticking (falling back to an absolute date) past a week. Each tick updates the element's text, `dateTime`, and `title` (the full localized date/time) in place.",
  },
  /* -- Navigation ---------------------------------------------------------- */
  {
    slug: "command",
    name: "Command",
    category: "Navigation",
    exports: [
      "Command",
      "CommandDialog",
      "CommandInput",
      "CommandList",
      "CommandEmpty",
      "CommandGroup",
      "CommandItem",
      "CommandShortcut",
      "CommandSeparator",
    ],
    description:
      "The ⌘K palette: a filtered, grouped list of commands, built on `cmdk`.",
    examples: [
      {
        demo: "command/basic",
        title: "Basic",
        description:
          "Five commands across three groups, opened from a button rather than the key binding.",
      },
      {
        demo: "command/inline",
        title: "Inline",
        description:
          "`Command` composed directly on the page — no `CommandDialog` — with a `CommandSeparator` between groups.",
      },
    ],
    wiring:
      "`cmdk` drives the fuzzy filtering, keyboard navigation between `.ds-command-item` rows and the empty-state toggle — a from-scratch binding needs that library (or an equivalent command-palette filter/nav implementation), not just the markup. `CommandDialog` additionally needs the same open/close behavior as `Dialog` (its own wiring note) to mount the palette.",
  },
  {
    slug: "menubar",
    name: "Menubar",
    category: "Navigation",
    exports: [
      "Menubar",
      "MenubarMenu",
      "MenubarTrigger",
      "MenubarContent",
      "MenubarItem",
      "MenubarCheckboxItem",
      "MenubarRadioGroup",
      "MenubarRadioItem",
      "MenubarLabel",
      "MenubarSeparator",
      "MenubarShortcut",
      "MenubarGroup",
      "MenubarPortal",
      "MenubarSub",
      "MenubarSubTrigger",
      "MenubarSubContent",
    ],
    description:
      "A desktop-style application menu bar — File, Edit, View — with keyboard traversal.",
    examples: [
      {
        demo: "menubar/basic",
        title: "Basic",
        description:
          "One tab stop for the bar; arrow keys move between menus and an open menu stays open as you travel — the desktop convention.",
      },
      {
        demo: "menubar/sectioned",
        title: "A long menu, sectioned",
        description:
          "Once a menu passes half a dozen entries it needs headings. `MenubarLabel` is a group part — Base UI reads the group context above it, so it goes inside the `MenubarGroup` it names rather than beside it.",
      },
      {
        demo: "menubar/with-state",
        title: "Checkboxes, radios and submenus",
        description:
          "The item vocabulary matches Dropdown Menu, because `MenubarMenu` is that component underneath. Checkable items indent for their indicator, so a plain `MenubarItem` sharing the menu needs `inset` to line up.",
      },
      {
        demo: "menubar/app-frame",
        title: "In an app frame",
        description:
          "Where a menubar belongs: the top edge of a window, not a floating control. The root carries a full border, so a bar seated in a frame trades it for `border-0 border-b`.",
      },
    ],
    parts: {
      Menubar:
        "Base UI's menubar root: it owns the bar's one tab stop and the arrow-key traversal between menus. A `MenubarMenu` outside it still opens, but as an isolated dropdown with a tab stop of its own.",
      MenubarMenu:
        "A Base UI `Menu` root — `open`, `onOpenChange`, `modal`. This repo's incumbent `Dropdown` is click-toggled with no submenus and no checkable rows, which is why the menus here are built on the primitive rather than on it.",
      MenubarContent:
        "Mounts its own portal and positioner, so the tree stops at Menu → Trigger → Content. It is a `.ds-menu`, so it never narrows below that surface's 180px — which is what a short trigger like File actually reads from.",
      MenubarItem:
        "`inset` adds the indicator gutter. Pass it when a plain item shares a menu with checkbox or radio items, or its label sits left of theirs.",
      MenubarLabel:
        "A group part: it registers with the group above it, so a label outside a `MenubarGroup` or `MenubarRadioGroup` throws rather than rendering.",
      MenubarPortal:
        "Only for putting a popup somewhere other than the body — `MenubarContent` already portals, so most trees never name this.",
    },
    wiring:
      "Beyond each menu's own open/close and item navigation (the same surface as `DropdownMenu`), the bar adds roving focus across its top-level triggers: ArrowLeft/ArrowRight moves between menus, and if one menu is already open, moving to the next trigger has to open that one immediately rather than waiting for a fresh click.",
  },
  {
    slug: "navigation-menu",
    name: "Navigation Menu",
    category: "Navigation",
    exports: [
      "NavigationMenu",
      "NavigationMenuList",
      "NavigationMenuItem",
      "NavigationMenuTrigger",
      "NavigationMenuContent",
      "NavigationMenuPositioner",
      "NavigationMenuLink",
      "NavigationMenuIndicator",
      "navigationMenuTriggerStyle",
    ],
    description: "A horizontal site menu, with optional dropdown panels for richer links.",
    examples: [
      {
        demo: "navigation-menu/basic",
        title: "Basic",
        description:
          "One panel and one plain link. `navigationMenuTriggerStyle()` is what makes a link with no panel sit level with the triggers beside it.",
      },
      {
        demo: "navigation-menu/multiple",
        title: "Several menus",
        description:
          "Moving between triggers reuses one popup and slides it; the content reads `data-activation-direction` to animate away from where you came from.",
      },
      {
        demo: "navigation-menu/featured",
        title: "Featured panel",
        description:
          "A two-column panel with a promoted destination beside the list. The panel is your own markup — the component supplies the popup and the link styling, so the grid is yours to shape.",
      },
      {
        demo: "navigation-menu/in-header",
        title: "In a site header",
        description:
          "The placement it exists for, between a wordmark and an account action. The root is `max-w-max`, so it takes only the width of its list and the header's own flex layout keeps working around it.",
      },
    ],
    parts: {
      NavigationMenu:
        "Renders the portal, positioner, popup and viewport itself — `align` is a positioner prop passed through here, and NavigationMenuPositioner is not something you mount yourself.",
      NavigationMenuContent:
        "The panel's contents, not the panel: sizing, columns and grids are your markup inside it, and the popup animates to whatever size that comes out.",
      NavigationMenuLink:
        "Styled for inside a panel — a flex row with a 0.75rem inset. `.ds-navigation-menu-link--block` is the tighter block-flow variant for a stacked list of links. For a top-level link with no panel, add `navigationMenuTriggerStyle()` so it matches the triggers on the row.",
      NavigationMenuTrigger:
        "Appends its own caret after the children and rotates it while the panel is open, so a trigger needs no icon of its own.",
    },
    wiring:
      "A consumer has to implement hover-intent opening (mouse enter after a delay, not on first contact) alongside keyboard activation via Enter/Space and the arrow keys, reflecting the active submenu as `data-open`/`data-closed` on the popup and `aria-expanded` on its trigger; Escape has to close the open submenu and return focus to its trigger. It also owns sliding the indicator element under whichever trigger is active and swapping the viewport's rendered panel as the active item changes.",
  },
  {
    slug: "sidebar",
    name: "Sidebar",
    category: "Navigation",
    exports: [
      "SidebarProvider",
      "Sidebar",
      "SidebarContent",
      "SidebarHeader",
      "SidebarFooter",
      "SidebarGroup",
      "SidebarGroupAction",
      "SidebarGroupContent",
      "SidebarGroupLabel",
      "SidebarInput",
      "SidebarInset",
      "SidebarMenu",
      "SidebarMenuAction",
      "SidebarMenuBadge",
      "SidebarMenuButton",
      "SidebarMenuItem",
      "SidebarMenuSkeleton",
      "SidebarMenuSub",
      "SidebarMenuSubButton",
      "SidebarMenuSubItem",
      "SidebarRail",
      "SidebarSeparator",
      "SidebarTrigger",
      "useSidebar",
    ],
    description:
      "The app's navigation column, composed from parts and nestable to any depth.",
    examples: [
      {
        demo: "sidebar/basic",
        title: "Nested sections",
        description:
          "Two collapsible groups and one active row, beside an inset content area.",
      },
      {
        demo: "sidebar/shell",
        title: "A full app shell",
        description:
          "Header search, group actions, badges, a menu action, a loading skeleton row, and a footer account menu — the rest of the anatomy.",
      },
      {
        demo: "sidebar/collapsible-icon",
        title: "Collapsible to icons",
        description:
          "`collapsible=\"icon\"` plus `SidebarRail`/`SidebarTrigger` — either one collapses the sidebar to just its icons.",
      },
    ],
    wiring:
      "A binding owns a shared expanded/collapsed state reflected as `data-state` on the sidebar, toggled by the trigger button, the rail button, and a global Cmd/Ctrl+B keydown listener, and persisted across reloads via a cookie. Below the mobile breakpoint it has to swap to the sheet's dialog behavior entirely (focus trap, overlay, Escape-to-close) instead of the static collapse; each menu button's tooltip should only show while collapsed on desktop, never on mobile or while expanded.",
  },
  {
    slug: "tabs",
    name: "Tabs",
    category: "Navigation",
    exports: ["Tabs", "type TabsProps", "type TabItem"],
    description: "Sibling views of one subject, one visible at a time. Use `Wizard` for steps that have an order.",
    examples: [
      {
        demo: "tabs/basic",
        title: "Three views",
        description:
          "`sublabel` carrying row and column counts, so the tab says what is behind it.",
      },
    ],
  },
  {
    slug: "tabs-primitive",
    name: "Tabs (composed)",
    category: "Navigation",
    exports: ["Tabs", "TabsList", "TabsTrigger", "TabsContent"],
    description:
      "Base UI's tabs, composed from parts instead of configured with an `items` array.",
    examples: [
      {
        demo: "tabs-primitive/basic",
        title: "Basic",
        description: "List, trigger, content — the parts every composition needs.",
      },
      {
        demo: "tabs-primitive/line",
        title: "Line variant",
        description: "`variant=\"line\"` on `TabsList`.",
      },
      {
        demo: "tabs-primitive/vertical",
        title: "Vertical",
        description: "`orientation=\"vertical\"`, list beside its panels rather than above them.",
      },
      {
        demo: "tabs-primitive/in-card",
        title: "In a card",
        description: "Tabs as a card's own internal navigation, not a page-level one.",
      },
    ],
    wiring:
      "A from-scratch binding needs single-selection state on the trigger row: clicking a `TabsTrigger` sets its `aria-selected` to `true` (and every sibling's to `false`), swaps which `TabsContent` panel is shown, and moves roving `tabindex` (0 on the selected trigger, -1 elsewhere) so arrow keys — not Tab — move focus and change the selection along `data-orientation`. Note the collision named in `docs/absorption/corrections.md`'s batch-9 row: `<ds-tabs>` (`components/ds-tabs.js`) is a different, bare tab-button implementation (`.ds-tabs__tab`/`.ds-tabpane`) that happens to share this component's bare `.ds-tabs` root class with a conflicting `display`/`flex-direction` default — deliberately left unresolved, so `<ds-tabs>` does not cover `TabsPrimitive` and the two must not be mixed on the same root.",
  },
  {
    slug: "toc",
    name: "Toc",
    category: "Navigation",
    exports: ["Toc", "TocLabel", "TocList", "TocItem", "TocLink"],
    description:
      "A sticky list of the sections on the current page, for jumping around a long document.",
    examples: [
      {
        demo: "toc/basic",
        title: "Basic",
        description:
          'The root is a `<nav>` labelled "On this page", so it lands in the landmark list; `TocLabel` is the visible echo of that name. Each link pulls its own left border back one pixel over the list\'s rail, so hovering lights a segment instead of drawing a second line beside it.',
      },
      {
        demo: "toc/current-section",
        title: "Current section",
        description:
          'No scroll-spy is built in — the component holds no state. Pass `current` on the active link: it writes `aria-current="location"` and adds `.ds-toc-link--current`, which is the source\'s `border-foreground text-foreground` className override resolved into a class.',
      },
      {
        demo: "toc/nested",
        title: "Nested sections",
        description:
          "`level` is depth in the list, not heading rank — 1 is a section, 2 a subsection. It indents the link's text while leaving its border on the rail, so depth reads as one line with steps rather than a second, indented rail.",
      },
      {
        demo: "toc/page-rail",
        title: "Beside the article",
        description:
          "The placement the component is shaped for: a fixed-width rail next to the prose. This is the one example that keeps the root's default stickiness — the others add `.ds-toc--static`, since a preview that does not scroll has nothing to stick to.",
      },
    ],
    parts: {
      Toc: "A `<nav>` labelled “On this page”, so it reaches the landmark list without any markup of yours; `TocLabel` is the visible echo of that name, not its source. Sticky by default, which needs a scrolling ancestor to mean anything — add `.ds-toc--static` where there is none.",
      TocList:
        "Draws the rail itself — the continuous inline-start border belongs to the list, and each link only borrows the segment beside it. `.ds-toc-list--tight` is the closer spacing an inline table of contents wants.",
      TocItem:
        '`level` writes `data-level`, and toc.css indents the link from there (`[data-level="2"] .ds-toc-link`). Styling depth on the item instead would move the border off the rail.',
      TocLink:
        "Pulls its own border back one pixel over the list's, so hovering or marking a link lights that segment of the rail rather than drawing a second line beside it. `current` is the prop for the reader's own section — it carries both `aria-current` and the lit style.",
    },
  },
  /* -- Layout -------------------------------------------------------------- */
  {
    slug: "aspect-ratio",
    name: "Aspect Ratio",
    category: "Layout",
    exports: ["AspectRatio"],
    description: "Holds content at a fixed width-to-height ratio, so the height follows the width.",
    examples: [
      {
        demo: "aspect-ratio/basic",
        title: "Basic",
        description:
          "`ratio` takes the expression, not a string — `16 / 9` reaches the custom property as `1.7778`, so any number works.",
      },
      {
        demo: "aspect-ratio/ratios",
        title: "Common ratios",
        description:
          "The box owns the height, so children can be `size-full` and stop caring about it. Each tile takes its width from the grid, and the ratio does the rest.",
      },
      {
        demo: "aspect-ratio/card-cover",
        title: "Card cover",
        description:
          "The media shape at the top of a card: `object-cover` on a `size-full` image fills the box whatever the file's own dimensions are, and the text below never shifts while it loads. The card takes `pt-0` because the cover is wrapped rather than a direct `img` child.",
      },
      {
        demo: "aspect-ratio/overlay",
        title: "Overlaid caption",
        description:
          "The root is already `relative`, so a caption band is `absolute inset-x-0 bottom-0` and nothing else. The band is a solid surface rather than a faded one — text over media needs its own background to stay readable.",
      },
    ],
  },
  {
    slug: "separator",
    name: "Separator",
    category: "Layout",
    exports: ["Separator"],
    description:
      "A rule between content. Note Base UI's orientation semantics: a horizontal group takes vertical separators.",
    examples: [
      {
        demo: "separator/basic",
        title: "Basic",
        description:
          "Horizontal is the default: full width, one pixel tall. The `my-4` is on the separator here because nothing else in this block owns the gap.",
      },
      {
        demo: "separator/vertical",
        title: "Between inline items",
        description:
          "A vertical rule sizes itself with `self-stretch`, so the flex parent needs a height — `items-center` alone collapses it to zero and it reads as missing.",
      },
      {
        demo: "separator/labelled",
        title: "Labelled divider",
        description:
          "The `or` divider, without a second component: the rule is positioned `absolute top-1/2` inside a `relative` row and the label sits over it on a solid `bg-background`, which is what breaks the line rather than two half-width rules that never quite meet.",
      },
      {
        demo: "separator/in-a-card",
        title: "Card sections",
        description:
          "Edge-to-edge inside a padded container: the padding lives on CardHeader and CardContent, so a separator dropped between them as a direct Card child spans the full width with no negative margins.",
      },
    ],
  },
  {
    slug: "scroll-area",
    name: "Scroll Area",
    category: "Layout",
    exports: ["ScrollArea", "ScrollBar"],
    description: "A scrollable region with styled overlay scrollbars. The root needs a height to scroll inside.",
    examples: [
      {
        demo: "scroll-area/basic",
        title: "Basic",
        description:
          "The everyday shape: a height on the root, a padded wrapper inside it. The bar overlays the content rather than reserving a gutter, so the rows keep their full width.",
      },
      {
        demo: "scroll-area/with-headings",
        title: "Grouped content",
        description:
          "Sticky-free grouping for a long list of options. `ScrollArea` renders only a vertical scrollbar today — horizontal overflow still scrolls, but without a styled bar, so keep the content in one column.",
      },
      {
        demo: "scroll-area/in-a-dialog",
        title: "Dialog body",
        description:
          "Where the height comes from the surface around it: capping the body keeps the dialog's header and footer on screen while the terms scroll between them.",
      },
    ],
    parts: {
      ScrollArea:
        "Takes the height cap and the border. Its children land in an internal viewport, so padding goes on a wrapper inside rather than here — padding on the root would sit outside the scrolling box.",
      ScrollBar:
        "Rendered by ScrollArea itself, vertical only. It is exported for a custom bar, but the root does not accept one in its place today, so a second orientation means composing Base UI's primitive directly.",
    },
    wiring:
      "A binding has to size and position the scrollbar thumb from the viewport's `scrollTop`/`scrollHeight` ratio on every scroll event and make the thumb itself pointer-draggable to scroll the viewport. The viewport also needs a `tabindex` so it's a keyboard focus stop (arrow/page keys scrolling it) even when nothing inside it is focusable.",
  },
  {
    slug: "resizable",
    name: "Resizable",
    category: "Layout",
    exports: ["ResizablePanelGroup", "ResizablePanel", "ResizableHandle"],
    description:
      "Panels split by draggable handles, over `react-resizable-panels`.",
    examples: [
      {
        demo: "resizable/basic",
        title: "Basic",
        description:
          "A fixed split with one draggable handle. `withHandle` is the grip shown as its child.",
      },
      {
        demo: "resizable/collapsible",
        title: "Collapsible pane",
        description: "A pane that snaps shut past a minimum size, rather than shrinking forever.",
      },
      {
        demo: "resizable/nested",
        title: "Nested groups",
        description: "A horizontal split with a vertical one inside one of its panes.",
      },
    ],
    wiring:
      "`react-resizable-panels` drives the actual drag-resize, not CSS: dragging `.ds-resizable-handle` resizes the panels either side of it, respecting each `ResizablePanel`'s own min/max size — a from-scratch binding needs that library (or an equivalent), not just the markup, same shape as `carousel`'s note on `embla-carousel-react`.",
  },
  {
    slug: "masonry",
    name: "Masonry",
    category: "Layout",
    exports: ["Masonry"],
    description:
      "A multi-column layout that balances items of uneven height, using CSS columns.",
    examples: [
      {
        demo: "masonry/basic",
        title: "Basic",
        description:
          "Uneven blocks balancing into three columns. The numbering makes the column-first flow visible — item 2 sits below item 1, not beside it.",
      },
      {
        demo: "masonry/with-cards",
        title: "Card wall",
        description:
          "A wall of cards with bodies of different lengths — the case columns exist for, where a plain grid would leave ragged gaps under the short ones.",
      },
      {
        demo: "masonry/gallery",
        title: "Media gallery",
        description:
          "Mixed-ratio media tiles: each `AspectRatio` child sizes itself, so portrait and landscape frames interleave without a row grid forcing them to share a height.",
      },
    ],
    parts: {
      Masonry:
        "Spacing lives on the children, applied by masonry.css as `.ds-masonry > *` — a bottom margin plus `break-inside: avoid`. A child carrying its own margin fights that rhythm, and source order flows down columns, not across rows.",
    },
  },
  {
    slug: "theme-switcher",
    name: "Theme Switcher",
    category: "Layout",
    exports: ["ThemeSwitcher", "type ThemeSwitcherMode"],
    description:
      "A light, dark and system control in three forms. Fully controlled — the app owns the theme state.",
    examples: [
      {
        demo: "theme-switcher/basic",
        title: "Basic",
        description:
          "Fully controlled, so the demo holds its own state rather than touching the real app theme.",
      },
      {
        demo: "theme-switcher/cycle",
        title: "Compact cycle",
        description:
          "One 36px button for headers too tight for three cells. The icon shows the current mode; the `aria-label` announces the action, since a click advances to the next mode.",
      },
      {
        demo: "theme-switcher/dropdown",
        title: "Dropdown",
        description:
          "The discoverable compact form: an icon-and-caret trigger opening a radio menu on `.ds-menu`, so every mode is visible and one click away. The source built this on its own `dropdown-menu`, which is held — the rows are Base UI `Menu` radio items in this repo's menu vocabulary, the same re-wiring batch 1's menubar made.",
      },
      {
        demo: "theme-switcher/in-toolbar",
        title: "In a toolbar",
        description:
          "The typical chrome placement. The switcher sizes itself, so it sits flush beside a `sm` `IconButton` with no sizing props of its own.",
      },
      {
        demo: "theme-switcher/settings-row",
        title: "Settings row",
        description:
          'The settings-page placement: the switcher drops into a `Panel` row like any label-and-control pair. Its own group carries `aria-label="Theme"`, so the visible text needs no `htmlFor` wiring.',
      },
    ],
    parts: {
      ThemeSwitcher:
        "Built on `Segmented` for the default variant, `IconButton` for `cycle` and Base UI `Menu` for `dropdown` — the source's own toggle-group and dropdown-menu are both held. The segmented cells carry a visible word beside the glyph rather than an icon-only `aria-label`, since `Segmented` takes a label node; the source's sliding indicator goes with the toggle cells it was pitched against.",
    },
    wiring:
      "All three footprints are fully controlled (`value`/`onValueChange` required) and each wires a different real interaction: `segmented` is a `Segmented` group where clicking the already-active cell is a no-op; `cycle` is one button whose click advances to the *next* mode in the light → dark → system cycle, with the icon showing the current mode and the label announcing the next; `dropdown` opens a radio-style menu (`Menu.RadioGroup`) where picking a mode closes the menu (`closeOnClick`) and calls `onValueChange`. None of the three include the theme's actual storage or system-preference resolution — that stays app-side.",
  },

  {
    slug: "carousel",
    name: "Carousel",
    category: "Layout",
    exports: [
      "Carousel",
      "CarouselContent",
      "CarouselItem",
      "CarouselPrevious",
      "CarouselNext",
      "type CarouselApi",
    ],
    description:
      "A paged slide viewport with previous and next controls, over `embla-carousel-react`.",
    examples: [
      {
        demo: "carousel/basic",
        title: "Basic",
        description:
          "One slide per page, previous/next controls disabled at either end.",
      },
      {
        demo: "carousel/multiple",
        title: "Multiple per page",
        description:
          "`--third` and `--half` are the modifiers that replaced the source's literal `basis-1/3` override.",
      },
      {
        demo: "carousel/with-api",
        title: "Reading the API",
        description:
          "`setApi` hands back the embla instance so a page can drive or observe the carousel from outside — a slide counter here.",
      },
    ],
    wiring:
      "The motion here is real, not CSS: `embla-carousel-react` drives the drag, the snap-to-slide, and each control's disabled-at-either-end state, so a from-scratch binding needs its own scroll-snap or drag implementation, not just markup. It also has to disable `.ds-carousel-control` at either end, respond to ArrowLeft/ArrowRight on the viewport, and flip `data-orientation` on the track and each `.ds-carousel-item` for a vertical carousel.",
  },

  {
    slug: "wordmark",
    name: "Wordmark",
    category: "Layout",
    exports: ["Wordmark", "wordmarkVariants"],
    description:
      "The Diametral logo as inline JSX, so it recolours with the surrounding text. Two lockups: horizontal and square.",
    examples: [
      {
        demo: "wordmark/basic",
        title: "Basic",
        description:
          "The lockup is `currentColor`, so it recolours with the surrounding text — no separate light/dark SVG to swap.",
      },
      {
        demo: "wordmark/square",
        title: "Square",
        description:
          "The wordmark set inside the symbol, for avatar and app-icon-style placements.",
      },
      {
        demo: "wordmark/app-header",
        title: "Beside a text label",
        description:
          'When the mark sits next to text that already says "Diametral", pass `label=""` — the SVG drops out of the accessibility tree instead of announcing the name twice.',
      },
    ],
    parts: {
      Wordmark:
        '`label` is the accessible name. Pass `label=""` to make the mark decorative when adjacent text already names it — otherwise screen readers hear "Diametral" twice.',
    },
  },
  /* -- Disclosure ---------------------------------------------------------- */
  {
    slug: "accordion",
    name: "Accordion",
    category: "Disclosure",
    exports: ["Accordion", "AccordionItem", "AccordionTrigger", "AccordionContent"],
    description:
      "A stack of disclosure rows, one section per `AccordionItem`.",
    examples: [
      {
        demo: "accordion/basic",
        title: "Basic",
        description:
          "Three rows, one open at mount. `defaultValue` takes the item's `value`, not its index.",
      },
    ],
    wiring:
      "A from-scratch binding must toggle `aria-expanded` on `.ds-accordion-trigger` on click — the down/up chevron icons key off `[aria-expanded=\"true\"]` — and show or hide the matching `.ds-accordion-content` by swapping `data-open`/`data-closed` on it. Unless every item is allowed to stay open, the same click handler has to close any other item's panel, since only one accordion item opens at a time by default.",
  },

  {
    slug: "collapsible",
    name: "Collapsible",
    category: "Disclosure",
    exports: ["Collapsible", "CollapsibleTrigger", "CollapsibleContent"],
    description:
      "One region that shows and hides. Use `Accordion` for several titled sections that stack.",
    examples: [
      {
        demo: "collapsible/basic",
        title: "Basic",
        description:
          "The trigger renders as a Button via `render`. The caret rotates off `aria-expanded`, which sits on the trigger rather than the root.",
      },
      {
        demo: "collapsible/filter-group",
        title: "Filter group",
        description:
          "The sidebar facet: the trigger is the section header itself — a plain full-width row, not a Button — so the whole strip is the hit target and the count sits inside the panel it belongs to.",
      },
      {
        demo: "collapsible/optional-fields",
        title: "Optional fields",
        description:
          "A form's advanced half. `keepMounted` leaves the panel in the DOM when it closes, so half-typed values survive a collapse and native submission still sees the inputs.",
      },
      {
        demo: "collapsible/controlled",
        title: "Controlled",
        description:
          "Driving `open` yourself lets the toggle live outside the collapsible — here a show-more button beneath the list.",
      },
    ],
    parts: {
      Collapsible:
        "A grouping div with no styles of its own, so the gap between trigger and panel is yours to set — usually a margin on the panel.",
      CollapsibleTrigger:
        "The state lives here, not on the root: `aria-expanded` and `data-panel-open` are the trigger's, so caret rotation keys off the trigger's own group.",
      CollapsibleContent:
        "Unmounted while closed unless you pass `keepMounted` or `hiddenUntilFound`, and it publishes `--collapsible-panel-height` for height transitions.",
    },
    wiring:
      "A from-scratch binding puts `aria-expanded` and `data-panel-open` on the trigger — what a caret rotates off — and toggles `data-open`/`data-closed` on the panel for the show/hide itself. No stylesheet ships with this component, so the panel's height transition (`--collapsible-panel-height`) is also the binding's to compute and animate.",
  },
  /* -- Overlays ------------------------------------------------------------ */
  {
    slug: "alert-dialog",
    name: "Modal",
    category: "Overlays",
    exports: ["Modal", "type ModalProps"],
    description:
      "The destructive-confirmation form of `Modal`: a heading, the consequence, and two buttons. Label the confirm button with the verb.",
    examples: [
      {
        demo: "alert-dialog/basic",
        title: "Destructive confirmation",
        description:
          "The `danger` variant on the confirm button, and the consequence spelled out in the body.",
      },
    ],
  },
  {
    slug: "alert-dialog-primitive",
    name: "AlertDialog",
    category: "Overlays",
    exports: [
      "AlertDialog",
      "AlertDialogTrigger",
      "AlertDialogContent",
      "AlertDialogHeader",
      "AlertDialogFooter",
      "AlertDialogMedia",
      "AlertDialogTitle",
      "AlertDialogDescription",
      "AlertDialogAction",
      "AlertDialogCancel",
    ],
    description:
      "Base UI's alert dialog, composed from parts. `Modal` stays the default for a confirmation.",
    examples: [
      {
        demo: "alert-dialog-primitive/basic",
        title: "Basic",
        description: "Trigger, header, footer — the four parts every alert dialog composes.",
      },
      {
        demo: "alert-dialog-primitive/with-media",
        title: "With media",
        description: "`AlertDialogMedia` for an icon or illustration ahead of the title.",
      },
      {
        demo: "alert-dialog-primitive/pending",
        title: "Pending confirm",
        description: "The confirm action disabled and spinning until an async call resolves.",
      },
      {
        demo: "alert-dialog-primitive/type-to-confirm",
        title: "Type to confirm",
        description: "The confirm action gated on typing the resource's own name back.",
      },
    ],
    wiring:
      "A from-scratch binding opens the dialog on trigger click and closes it on Cancel/Action click or Escape, toggling `data-open`/`data-closed` on both `.ds-alert-dialog-overlay` and `.ds-alert-dialog-content` to run their enter/exit animations. Being a modal, it also has to trap focus inside the popup while open and return it to the trigger on close, and an async confirm additionally means disabling the action button and showing a spinner until the call resolves.",
  },
  {
    slug: "context-menu",
    name: "ContextMenu",
    category: "Overlays",
    exports: [
      "ContextMenu",
      "ContextMenuTrigger",
      "ContextMenuContent",
      "ContextMenuItem",
      "ContextMenuCheckboxItem",
      "ContextMenuRadioGroup",
      "ContextMenuRadioItem",
      "ContextMenuLabel",
      "ContextMenuSeparator",
      "ContextMenuShortcut",
      "ContextMenuGroup",
      "ContextMenuPortal",
      "ContextMenuSub",
      "ContextMenuSubTrigger",
      "ContextMenuSubContent",
    ],
    description: "A right-click menu that opens at the pointer, for actions belonging to the item clicked.",
    examples: [
      {
        demo: "context-menu/basic",
        title: "Rename, duplicate, delete",
        description:
          "The shape almost every context menu has: two safe actions, a divider, and the destructive one alone below it — far enough from the pointer's landing spot that a mis-aimed click cannot reach it.",
      },
      {
        demo: "context-menu/rows",
        title: "One menu per row",
        description:
          "A menu per row, each with its own subject. `ContextMenuLabel` names that subject at the top, which matters more here than in a dropdown: the menu is about whatever was clicked, and without the label it does not say which row it caught.",
      },
      {
        demo: "context-menu/view-options",
        title: "View options",
        description:
          "`ContextMenuRadioGroup` for a one-of-several setting — the canvas's own layout, read back in the trigger. Radio rows indent for their indicator, so a plain item sharing the menu needs `inset` to line its label up.",
      },
      {
        demo: "context-menu/with-submenu",
        title: "Checkbox and submenu",
        description:
          "A submenu keeps a long tail of destinations out of the first menu, and opens on hover or on ArrowRight. `ContextMenuCheckboxItem` is the state row: it stays open on activation, unlike a plain item.",
      },
    ],
    parts: {
      ContextMenuTrigger:
        "The region that answers the right-click, so the guarded markup goes *inside* it. Pass `render` to make it the real element — a table row, a list item, a canvas — rather than wrapping one in a div that changes the layout.",
      ContextMenuContent:
        "Mounts its own portal and positioner, and positions at the pointer rather than to an anchor: `side`/`align` shift it from there, they do not attach it to the trigger's edge.",
      ContextMenuLabel:
        "Names the menu's subject. A context menu's subject is whatever was clicked and nothing on screen says so once the menu covers it, which is why this earns its row here and not in a dropdown.",
      ContextMenuItem:
        '`variant="destructive"` colours the row; `inset` adds the indicator gutter, for when a plain item shares a menu with checkbox or radio rows.',
      ContextMenuShortcut:
        "The keyboard equivalent, on the row's end edge. It is a label, not a binding — the shortcut itself is the page's to register.",
    },
    wiring:
      "A from-scratch binding opens the menu on the `contextmenu` event rather than a click, positions it at the pointer instead of anchored to a trigger's edge, and closes it on Escape or an outside click by toggling `data-open`/`data-closed` on `.ds-context-menu-content`. Checkbox and radio rows keep their own checked state and stay open on activation (unlike a plain item, which closes the menu), and a submenu opens on hover or ArrowRight and closes on ArrowLeft or Escape.",
  },
  {
    slug: "dialog",
    name: "Modal",
    category: "Overlays",
    exports: ["Modal", "type ModalProps"],
    description:
      "A focused task on top of the page: heading, body, footer actions. Always controlled through `open` and `onClose`.",
    examples: [
      {
        demo: "dialog/basic",
        title: "A short form",
        description:
          "A `Field` and an `Input` in the body, with the actions in `footer` rather than the flow.",
      },
    ],
  },
  {
    slug: "dialog-primitive",
    name: "Dialog",
    category: "Overlays",
    exports: [
      "Dialog",
      "DialogTrigger",
      "DialogContent",
      "DialogHeader",
      "DialogFooter",
      "DialogTitle",
      "DialogDescription",
      "DialogClose",
    ],
    description:
      "Base UI's dialog, composed from parts. `Modal` stays the default for a focused task.",
    examples: [
      {
        demo: "dialog-primitive/basic",
        title: "Basic",
        description: "Trigger, header, footer — the parts every dialog composes.",
      },
      {
        demo: "dialog-primitive/with-form",
        title: "With a form",
        description: "A `Field` and an `Input` in the body, submitted from the footer.",
      },
      {
        demo: "dialog-primitive/controlled",
        title: "Controlled",
        description: "`open`/`onOpenChange` on `Dialog` itself, for a page that opens it from elsewhere.",
      },
      {
        demo: "dialog-primitive/long-content",
        title: "Long content",
        description: "A body long enough to scroll inside `DialogContent` rather than the page.",
      },
    ],
    wiring:
      "The interactive surface is open/close: a trigger toggling a boolean that mounts the overlay and popup (`role=\"dialog\"`, `aria-modal=\"true\"`), with the close button, Escape, and a backdrop click all resolving to the same close. A from-scratch binding must also trap focus inside the popup while open and restore it to the trigger on close — nothing in the real markup does that via CSS or attributes alone, it's pure behavior. (Not covered by `ds-modal`, which uses an unrelated `.ds-modal__*`/`.ds-overlay` class contract this component's markup never touches.)",
  },
  {
    slug: "dropdown-menu",
    name: "DropdownMenu",
    category: "Overlays",
    exports: [
      "DropdownMenu",
      "DropdownMenuPortal",
      "DropdownMenuTrigger",
      "DropdownMenuContent",
      "DropdownMenuGroup",
      "DropdownMenuLabel",
      "DropdownMenuItem",
      "DropdownMenuCheckboxItem",
      "DropdownMenuRadioGroup",
      "DropdownMenuRadioItem",
      "DropdownMenuSeparator",
      "DropdownMenuShortcut",
      "DropdownMenuSub",
      "DropdownMenuSubTrigger",
      "DropdownMenuSubContent",
    ],
    description: "A menu of actions hanging off a trigger.",
    examples: [
      {
        demo: "dropdown-menu/basic",
        title: "Actions and links",
        description:
          '`align="end"` on the content so the menu hangs back under a right-aligned trigger, with one `render={<a/>}` row.',
      },
      {
        demo: "dropdown-menu/complex",
        title: "Checkboxes, radios and a submenu",
        description:
          "A `DropdownMenuCheckboxItem`, a `DropdownMenuRadioGroup`, a `DropdownMenuShortcut` and a `DropdownMenuSub` — the rest of the anatomy.",
      },
    ],
    wiring:
      "A from-scratch binding needs the full menu interaction: the trigger toggling `aria-expanded` and opening the popup, arrow-key navigation between items, a `DropdownMenuSub` opening on hover or ArrowRight and closing on ArrowLeft/Escape, and `DropdownMenuCheckboxItem`/`DropdownMenuRadioItem` toggling their own `aria-checked` and reporting back into whatever owns the selection.",
  },
  {
    slug: "hover-card",
    name: "Hover Card",
    category: "Overlays",
    exports: ["HoverCard", "HoverCardTrigger", "HoverCardContent"],
    description: "A preview panel shown on hover, for links and mentions. Keep anything essential on the page, since touch users never hover.",
    examples: [
      {
        demo: "hover-card/basic",
        title: "On a link",
        description:
          "Built on Base UI's `PreviewCard`. It opens on hover and on keyboard focus, but is still supplementary — never put anything essential only in here.",
      },
      {
        demo: "hover-card/with-avatar",
        title: "Person preview",
        description:
          "The usual case: a mention that expands into a profile. The trigger is a Button through `render`, since the default element is an anchor and this one navigates nowhere.",
      },
      {
        demo: "hover-card/definition",
        title: "Metric definition",
        description:
          "A glossary card for a dashboard: the label explains how its number is computed, instead of a legend nobody reads. `delay` is set on the trigger — 600ms is too long a wait when the reader is scanning a row of figures.",
      },
    ],
    parts: {
      HoverCardTrigger:
        "Owns the timing: `delay` and `closeDelay` are trigger props, not root props, so two triggers can behave differently in one view. It renders an `a` by default — pass `render` when the trigger is really a button.",
      HoverCardContent:
        "Renders its own portal and positioner, so positioning props are accepted here. Opening does not move focus into the card, so anything interactive inside it is pointer-only — keep actions out.",
    },
    wiring:
      "Unlike a click-toggled popover, the trigger here is hover/focus: opening after a short delay and closing on a separate delay once the pointer leaves (or immediately on Escape/blur). A binding has to implement those open/close delay timers itself and toggle the panel's open state accordingly — a plain CSS `:hover` rule can't reproduce a panel that outlives the pointer leaving the trigger.",
  },
  {
    slug: "popover",
    name: "Popover",
    category: "Overlays",
    exports: [
      "Popover",
      "PopoverTrigger",
      "PopoverContent",
      "PopoverHeader",
      "PopoverTitle",
      "PopoverDescription",
    ],
    description:
      "A small panel anchored to a trigger. Use it when the content is interactive; use `Tooltip` for a plain label.",
    examples: [
      {
        demo: "popover/basic",
        title: "Anchored detail",
        description:
          '`side="bottom"` on `PopoverContent`, so the panel points at what it explains.',
      },
    ],
    wiring:
      "A from-scratch binding has to toggle `aria-expanded` on the trigger and an open/closed state (e.g. `data-open`) on the popup, position the popup relative to the trigger and re-anchor it on scroll/resize, and dismiss on outside click or Escape — returning focus to the trigger on close.",
  },
  /* -- Feedback ------------------------------------------------------------ */
  {
    slug: "alert",
    name: "Alert",
    category: "Feedback",
    exports: [
      "Alert",
      "AlertTitle",
      "AlertDescription",
      "AlertAction",
      "AlertDismiss",
    ],
    description:
      "An inline message about the content next to it. Use `Toast` for the result of an action.",
    examples: [
      {
        demo: "alert/basic",
        title: "The four tones",
        description:
          "`info`, `success`, `warning` and `danger`, with `AlertDismiss` on the last one.",
      },
    ],
  },
  {
    slug: "toast",
    name: "Toast",
    category: "Feedback",
    exports: [
      "Toaster",
      "toast",
      "useToastManager",
      "createToastManager",
      "Toast",
      "ToastProvider",
      "ToastPortal",
      "ToastViewport",
      "ToastContent",
      "ToastTitle",
      "ToastDescription",
      "ToastAction",
      "ToastClose",
    ],
    description:
      "A short confirmation that an action landed, raised from anywhere with `toast`. Mount `Toaster` once at the app root.",
    examples: [
      {
        demo: "toast/basic",
        title: "Success and failure",
        description: "Both raised through `toast.add` against the `Toaster` in `main.tsx`.",
      },
    ],
    wiring:
      "There's no toast markup to compose by hand at all — `toast.add()` (via `createToastManager`) is the only entry point, so a from-scratch binding needs its own imperative queue that mounts/unmounts toast elements, auto-dismiss timers per toast, a swipe-to-dismiss gesture, and pause-on-hover/focus so a reader has time to read before it times out. The close button and any action button just need to dismiss (or dismiss-and-invoke) and drop that toast from the queue; `ToastIcon`'s `type` (success/info/warning/error/loading) is a pure display mapping with nothing to wire.",
  },
  /* -- Conversation -------------------------------------------------------- */
  {
    slug: "bubble",
    name: "Bubble",
    category: "Conversation",
    exports: [
      "BubbleGroup",
      "Bubble",
      "BubbleContent",
      "BubbleReactions",
      "type BubbleVariant",
    ],
    description: "Chat bubbles grouped by author. Use `Message` when a turn also needs an avatar or a timestamp.",
    examples: [
      {
        demo: "bubble/variants",
        title: "Variants",
        description:
          "The variant lives on `Bubble` and styles `BubbleContent` through `*:data-[slot=bubble-content]`, so the content part takes no variant of its own.",
      },
      {
        demo: "bubble/conversation",
        title: "A conversation",
        description:
          '`align="end"` moves the bubble to the far side with `self-end` — the group stays a plain column, with no per-row wrapper.',
      },
      {
        demo: "bubble/with-reactions",
        title: "With reactions",
        description:
          "Reactions overhang the bubble edge and are ringed in the card colour, so they read as punched through it rather than stacked beside it.",
      },
      {
        demo: "bubble/quick-replies",
        title: "Quick replies",
        description:
          "Suggested answers as tappable bubbles. `BubbleContent` takes a `render` prop, so it becomes a real `button` — and each variant already declares the hover colour that goes with it.",
      },
    ],
    parts: {
      BubbleGroup:
        "A plain `gap-2` column: turns place themselves through their own `align`, so there is no per-row wrapper and nothing to justify here.",
      Bubble:
        "Owns the variant for the pair and styles `BubbleContent` through `*:data-[slot=bubble-content]` — a content part rendered outside a Bubble comes out unstyled. It also carries `max-w-[80%]`, which `ghost` lifts to full width. Inside a Message it follows the row's `align`, so it needs its own only when it stands outside one.",
      BubbleContent:
        "Pass `render` to make the bubble interactive: as a `button` or an `a` it picks up the hover colour its variant declares. Under `ghost` this part loses its padding and background, which is why an assistant-style answer needs no other override.",
      BubbleReactions:
        "Overhangs the bubble edge, ringed in `--card` so it reads as punched through it. On a surface that is not card-coloured, match the ring to that surface.",
    },
  },
  {
    slug: "message",
    name: "Message",
    category: "Conversation",
    exports: [
      "MessageGroup",
      "Message",
      "MessageAvatar",
      "MessageContent",
      "MessageHeader",
      "MessageFooter",
    ],
    description: "A conversation row with an avatar on one side and the content on the other, plus an optional header and footer.",
    examples: [
      {
        demo: "message/basic",
        title: "Basic",
        description:
          '`Message` reverses its own flex direction on `align="end"`, so the avatar moves to the trailing side without reordering the markup.',
      },
      {
        demo: "message/with-footer",
        title: "With a footer",
        description:
          "When a footer is present the avatar lifts by 2rem so it stays level with the bubble rather than the timestamp.",
      },
      {
        demo: "message/assistant",
        title: "Assistant reply",
        description:
          "The full-width answer shape: a `ghost` Bubble drops the balloon entirely, and the header and footer lose their `px-4` in step through `group-has-data-[variant=ghost]/message`, so the whole turn keeps one text edge.",
      },
      {
        demo: "message/attachments",
        title: "With attachments",
        description:
          '`MessageContent` is a column, so a bubble, an `AttachmentGroup` and a footer stack inside one turn — and on `align="end"` every slotted child is pushed across, the attachment row included.',
      },
    ],
    parts: {
      MessageAvatar:
        "`self-end` so it sits at the bottom of the turn, and it lifts by 2rem when the row contains a `MessageFooter` — it tracks the bubble, not the metadata line.",
      MessageContent:
        "The column the rest of the turn sits in. Its direct children that carry a `data-slot` follow the row's `align`, which is why bubbles and attachment rows need no alignment prop.",
      MessageHeader:
        "`px-4` lines the author up with the bubble's own text; a `ghost` bubble in the row zeroes it, since ghost content has no padding to match.",
      MessageFooter:
        "Mirrors the header, and its presence is what lifts `MessageAvatar` — a footer added late realigns the row rather than sitting under it.",
    },
  },
  {
    slug: "message-scroller",
    name: "Message Scroller",
    category: "Conversation",
    exports: [],
    description:
      "A transcript viewport that stays pinned to the newest message. Stylesheet only — the pinning needs your own binding.",
    examples: [
      {
        demo: "message-scroller/basic",
        title: "The class contract",
        description:
          "The markup a binding has to produce. The viewport really scrolls and really fades at the bottom — that fade replaces a `scroll-fade-b` Tailwind plugin class the source shipped with no plugin behind it. `--tight` on the content column is the `gap-2` several demos passed, resolved into a modifier rather than carried as a dedupe exception.",
      },
    ],
  },
  {
    slug: "attachment",
    name: "Attachment",
    category: "Conversation",
    exports: [
      "Attachment",
      "AttachmentGroup",
      "AttachmentMedia",
      "AttachmentContent",
      "AttachmentTitle",
      "AttachmentDescription",
      "AttachmentActions",
      "AttachmentAction",
      "AttachmentTrigger",
      "type AttachmentState",
    ],
    description:
      "A chip showing a file's thumbnail, name and metadata. Display only; use `File Upload` to pick files.",
    examples: [
      {
        demo: "attachment/basic",
        title: "Basic",
        description:
          "Padding comes from which slots are present (`has-data-[slot=…]`), so a media-only chip and a full row need no size prop between them.",
      },
      {
        demo: "attachment/states",
        title: "States and sizes",
        description:
          "`state` drives the border and media colour — `idle` goes dashed, `error` turns destructive — and nothing below needs to know which state it is in.",
      },
      {
        demo: "attachment/vertical",
        title: "Vertical cards",
        description:
          "`AttachmentGroup` is a snap-scrolling row with a faded edge, so a long list stays on one line instead of wrapping.",
      },
      {
        demo: "attachment/clickable",
        title: "Openable cards",
        description:
          "`AttachmentTrigger` is an `absolute inset-0` overlay, so the whole card is one hit target and `render` decides whether it is a link or a button. `AttachmentActions` sits a layer above it, which is how remove stays clickable inside a card that is itself a link.",
      },
    ],
    parts: {
      Attachment:
        "Owns `state`, `size` and `orientation` as data attributes; every part below reads them through `group-data-*`, so they are set here and nowhere else.",
      AttachmentMedia:
        '`variant="image"` expects an `img` child and dims it to 60% while the file is in flight — only `done` and `idle` show the thumbnail in full. The default `icon` variant sizes a bare `svg` for you.',
      AttachmentTitle:
        "Truncates to one line, and shimmers while the root is `uploading` or `processing` — progress needs no extra element.",
      AttachmentTrigger:
        "An overlay covering the card at `z-10`. `AttachmentActions` is `z-20` so its buttons stay above it; anything else clickable inside the card needs the same lift.",
      AttachmentGroup:
        "A snap-scrolling row with faded edges, and `tabIndex={0}` so the list can be scrolled from the keyboard rather than by pointer only.",
    },
  },

  /* -- Utilities ----------------------------------------------------------- */

  {
    slug: "direction",
    name: "Direction",
    category: "Utilities",
    exports: ["DirectionProvider", "useDirection"],
    description:
      "A provider that sets text direction (LTR or RTL) for every Base UI component beneath it. Mount it once at the app root.",
    examples: [
      {
        demo: "direction/rtl",
        title: "Side by side",
        description:
          "Components are written with logical properties throughout, so the same markup mirrors without a second stylesheet.",
      },
      {
        demo: "direction/switching",
        title: "Switching at runtime",
        description:
          "One piece of state drives the provider and the `dir` attribute together, which is all a runtime switch is. Components of your own read that value back with `useDirection` instead of threading a prop down.",
      },
      {
        demo: "direction/axis",
        title: "Controls with an axis",
        description:
          "Where the provider earns its keep: a range's track and thumb, and every composite's arrow-key order, take the direction from context — `dir` alone would mirror the paint and leave the keyboard running backwards. The segmented row is this package's `Segmented`, standing in for the source's `ToggleGroup`.",
      },
    ],
  },
  /* -- Data display — batch 4 charts -------------------------------------- */
  {
    slug: "chart",
    name: "Chart",
    category: "Data display",
    exports: [
      "ChartContainer",
      "ChartTooltip",
      "ChartTooltipContent",
      "ChartLegend",
      "ChartLegendContent",
      "ChartStyle",
    ],
    description:
      "A thin frame around Recharts: series colours come from a `ChartConfig` and resolve to brand tokens.",
    examples: [
      {
        demo: "chart/composed",
        title: "Two mark types",
        description:
          "What no single-form component draws: a `ComposedChart` whose children are a `Bar` and a `Line`. Both series read the same `YAxis`, which is what keeps the comparison honest — a bar and a line on separate scales say whatever their domains happen to make them say.",
      },
      {
        demo: "chart/theme",
        title: "A colour outside the ramp",
        description:
          "`theme` replaces `color` when one value cannot serve both themes — a partner's navy here, legible on white and lost on the dark page. The two are mutually exclusive in the type, and the emitted rule is per-chart, so this override reaches nothing else.",
      },
    ],
    parts: {
      ChartContainer:
        "Holds the config, the responsive box and the `--color-<key>` variables, so every other part has to be inside one — the tooltip and legend content read it from context and throw outside it. Its default box is 16/9; `.ds-chart-container--plot` swaps that for a fixed height and full width, `--square` for a 1:1 box, and `--ds-chart-height` retunes either.",
      ChartTooltip:
        "Recharts' own `Tooltip`, re-exported unchanged. It positions and toggles; what it renders is whatever you pass as `content`.",
      ChartTooltipContent:
        "Resolves each entry against `config`, so a series whose data key is not a config key needs `nameKey` or `labelKey` to redirect the lookup — the usual fix for a pie. Values print in tabular figures so the column of numbers stays aligned as the pointer moves.",
      ChartLegend:
        "Recharts' `Legend`, re-exported. Its `verticalAlign` is what the content part reads to decide which side its padding goes on.",
      ChartLegendContent:
        "Labels come from `config` alone, so a series with no config entry renders a swatch and no text.",
      ChartStyle:
        "The `style` element `ChartContainer` already renders for you — exported only for the case where you own the container. A config with no colours renders nothing at all.",
    },
  },

  {
    slug: "line-chart",
    name: "Line Chart",
    category: "Data display",
    exports: ["LineChart"],
    description:
      "A ready-made line chart — grid, axis, tooltip and legend wired from one `config`. Best for a value over time.",
    examples: [
      {
        demo: "line-chart/basic",
        title: "Single series",
        description:
          "The minimum: rows, one `config` entry, and `xAxisKey` naming the field the ticks read. The series takes `--ds-chart-1` because the config entry carries only a label.",
      },
      {
        demo: "line-chart/comparison",
        title: "Comparing series",
        description:
          "Every extra `config` key draws another line and the legend turns itself on past one series. All series share one y scale, so the lines are comparable rather than each filling the box.",
      },
      {
        demo: "line-chart/dense",
        title: "Dense sampling",
        description:
          "`dots={false}` at high point counts — the tooltip tracks the nearest x rather than a marker, so nothing becomes unreachable. `grid={false}` drops the rules when the trend matters more than the reading.",
      },
      {
        demo: "line-chart/target",
        title: "Annotated against a target",
        description:
          "Children are appended inside the recharts chart, which is the escape hatch for anything the props do not cover — here a `ReferenceLine` for the SLA the series is read against.",
      },
    ],
  },

  {
    slug: "area-chart",
    name: "Area Chart",
    category: "Data display",
    exports: ["AreaChart"],
    description:
      "`Line Chart` with a filled band under each series, for when the size of the quantity matters. Same props.",
    examples: [
      {
        demo: "area-chart/basic",
        title: "Single series",
        description:
          "One series, read as a volume. The band is the series colour at a low `fillOpacity` while the stroke stays at full strength, so the boundary survives on both themes.",
      },
      {
        demo: "area-chart/stacked",
        title: "Stacked composition",
        description:
          "`stacked` sums the series into one band, so the top edge is the total and each layer is its contribution. Only reach for it when the parts genuinely add up — stacked series are read against a moving baseline, which makes the upper ones hard to compare.",
      },
      {
        demo: "area-chart/overlaid",
        title: "Forecast against actual",
        description:
          "Two series overlaid rather than stacked, which is what you want when they measure the same thing twice. `dots` is off by default here and switched back on, because at seven points the markers say where the readings actually are.",
      },
    ],
  },

  {
    slug: "bar-chart",
    name: "Bar Chart",
    category: "Data display",
    exports: ["BarChart"],
    description:
      "Bars comparing discrete categories, like revenue by quarter. Use `Line Chart` when the x axis is time.",
    examples: [
      {
        demo: "bar-chart/basic",
        title: "Single series",
        description:
          '`max` fixes the ceiling at 300, so the bars read against a constant scale instead of against each other — the difference between "Q4 was big" and "Q4 was 263 of a possible 300".',
      },
      {
        demo: "bar-chart/status",
        title: "Tinted by status",
        description:
          "`statusKey` names the row field holding the tone. It rides along as recharts' own `fill`, so it colours the whole row — pair it with a single-series `config`, as v1's data rows did.",
      },
      {
        demo: "bar-chart/horizontal",
        title: "Rows for long labels",
        description:
          '`horizontal` lays the bars out as rows, which is the fix for category names that would otherwise be rotated or truncated. Recharts calls the same thing `layout="vertical"`; the prop keeps v1\'s name.',
      },
      {
        demo: "bar-chart/grouped",
        title: "Grouped series",
        description:
          "A second `config` key puts two bars side by side per category and turns the legend on. Pass `stacked` instead when the two are parts of one total rather than rivals.",
      },
    ],
  },

  {
    slug: "stacked-bar",
    name: "Stacked Bar",
    category: "Data display",
    exports: ["StackedBar"],
    description:
      "Bars normalised to their own total, so the eye compares splits rather than sizes.",
    examples: [
      {
        demo: "stacked-bar/basic",
        title: "One row",
        description:
          "The single-bar case: no `labelKey`, so no row label and the whole width is the split. A row that sums to zero stays at zero rather than dividing by it.",
      },
      {
        demo: "stacked-bar/by-team",
        title: "Comparing rows",
        description:
          "`labelKey` names each row down the left. Because every row is normalised separately, a team shipping 22 items and one shipping 11 produce the same bar length — the comparison is of mix, not of volume.",
      },
      {
        demo: "stacked-bar/inline",
        title: "Inline in a summary",
        description:
          "`showLegend={false}` and a shorter `--ds-chart-height` turn it into a one-line proportion strip, with the figures carried by the prose beside it instead of a legend.",
      },
    ],
  },

  {
    slug: "pie-chart",
    name: "Pie Chart",
    category: "Data display",
    exports: ["PieChart"],
    description:
      "A whole split into slices. Keep it to five or six; past that use `Bar Chart`.",
    examples: [
      {
        demo: "pie-chart/basic",
        title: "Share of traffic",
        description:
          "`valueKey` and `nameKey` are the two row fields the chart needs. The `config` entries carry only labels, so the slices take the `--ds-chart-*` ramp in row order.",
      },
      {
        demo: "pie-chart/branded",
        title: "Named colours",
        description:
          "A `config` entry that carries a colour wins over the ramp, and the legend swatch follows it — the colour is declared once and reaches the slice, the tooltip and the legend together.",
      },
      {
        demo: "pie-chart/compact",
        title: "With a figure list",
        description:
          "`legend={false}` when the numbers are already spelled out beside the chart. A pie is poor at conveying exact values, so pairing it with the list is usually better than making the pie carry both jobs.",
      },
    ],
  },

  {
    slug: "donut-chart",
    name: "Donut Chart",
    category: "Data display",
    exports: ["DonutChart"],
    description:
      "`Pie Chart` with the middle cut out, so a headline figure can sit in the hole.",
    examples: [
      {
        demo: "donut-chart/basic",
        title: "Total in the middle",
        description:
          "`centerLabel` and `centerCaption` are the reason to pick a donut over a pie. Neither is computed — the total is yours to pass, because the interesting figure is not always the sum.",
      },
      {
        demo: "donut-chart/thin",
        title: "Two-part ring",
        description:
          "A thin ring reads as a progress dial rather than a breakdown, which is what a used-against-free split wants. `legend={false}` because the centre already names both halves.",
      },
      {
        demo: "donut-chart/breakdown",
        title: "Cost breakdown",
        description:
          "Five segments is about the ceiling before the small slices stop being distinguishable. The ramp repeats past six entries, so a longer breakdown wants explicit colours or a different chart.",
      },
    ],
  },

  {
    slug: "gauge",
    name: "Gauge",
    category: "Data display",
    exports: ["Gauge", "type GaugeThreshold"],
    description:
      "A radial dial for one bounded value, with optional thresholds that recolour the arc.",
    examples: [
      {
        demo: "gauge/basic",
        title: "Basic",
        description:
          "`max` defaults to 100 but takes any ceiling — the second dial reads 128 of 256 and fills by fraction, not by percentage.",
      },
      {
        demo: "gauge/thresholds",
        title: "Thresholds",
        description:
          "The last threshold the value reaches wins, so list them ascending. `color` overrides them outright, which is why the two are not usually passed together.",
      },
      {
        demo: "gauge/formatted",
        title: "Units and density",
        description:
          "`format` decides the centre text only — the `aria-label` still reads the raw value against `max`. The figure scales with `size`, so keep the formatted string short; `thickness` retunes the ring without touching the geometry.",
      },
    ],
  },

  {
    slug: "sparkline",
    name: "Sparkline",
    category: "Data display",
    exports: ["Sparkline"],
    description:
      "A tiny inline line chart with no axes, small enough to sit in every row of a table.",
    examples: [
      {
        demo: "sparkline/basic",
        title: "Beside a figure",
        description:
          "The default shape: line only, no fill, no dot. Give it an `aria-label` — the fallback reads `Sparkline of 8 values`, which says nothing about what the values are.",
      },
      {
        demo: "sparkline/area",
        title: "Area and end dot",
        description:
          "`fill` adds the area under the line at a low opacity and `showDot` marks the last point, which is the one a reader looks for. `fill` takes `true` to reuse the line colour, or a colour of its own.",
      },
      {
        demo: "sparkline/table",
        title: "Trend column",
        description:
          "The use the component is sized for. Drop `width` and `height` to fit the row rather than scaling with CSS — `preserveAspectRatio` is `none`, so a stretched sparkline distorts its stroke.",
      },
      {
        demo: "sparkline/stat-card",
        title: "Inside a stat card",
        description:
          "`StatCardSpark` is the slot this was built for, and the one place to pass `aria-hidden` instead of a label — the figure above already carries the number, so a second reading of it is noise. `animate` draws the line in once on mount, and stops itself under `prefers-reduced-motion` with the line fully drawn rather than blank.",
      },
    ],
  },

  {
    slug: "radar-chart",
    name: "Radar Chart",
    category: "Data display",
    exports: ["RadarChart"],
    description:
      "A spider chart comparing two or three entities across many dimensions at once.",
    examples: [
      {
        demo: "radar-chart/basic",
        title: "One profile",
        description:
          "A single polygon across five capabilities. `domain` is pinned to 0–100 so the shape means the same thing on every render, not just relative to its own maximum.",
      },
      {
        demo: "radar-chart/overlaid",
        title: "Candidate against requirement",
        description:
          "Two polygons is where the form earns its keep — the gaps read as area. `radiusAxis` prints the radius ticks, which is worth the noise on a five-point scale where the exact level matters.",
      },
      {
        demo: "radar-chart/pinned",
        title: "Two regions compared",
        description:
          "The same `domain` on both charts is what makes them comparable. Without it each would fill its own box and Europe's 38% organic would look the same size as North America's 34% paid.",
      },
      {
        demo: "radar-chart/dense",
        title: "Dense dimensions",
        description:
          "Twelve spokes, where the form starts to break down: the outline still reads as a silhouette but no individual value is recoverable. `grid={false}` drops the rules that were only adding ink at this density.",
      },
    ],
  },

  {
    slug: "combo-chart",
    name: "Combo Chart",
    category: "Data display",
    exports: ["ComboChart", "type ComboSeries"],
    description:
      "Bars and a line on one x axis with a second Y scale — a volume series next to a rate.",
    examples: [
      {
        demo: "combo-chart/revenue-margin",
        title: "Revenue against margin",
        description:
          'The canonical case: euros as bars on the left scale, a percentage as a line on the right. `axis: "right"` is what binds the line to the second scale — half-specifying it would silently put both series back on one.',
      },
      {
        demo: "combo-chart/volume-rate",
        title: "Volume against rate",
        description:
          "An area for the volume rather than bars, which reads better when the series is continuous. `rightAxis.label` captions the second scale, and without it a reader has no way to know which axis the line belongs to.",
      },
      {
        demo: "combo-chart/same-scale",
        title: "Same scale",
        description:
          "No `rightAxis`, so no second axis renders and both series are measured on the left one. This is the right shape when the two are the same unit — booked days against delivered days — and a dual axis would imply a difference that is not there.",
      },
      {
        demo: "combo-chart/formatted-axis",
        title: "Formatted second axis",
        description:
          "`rightAxis.tickFormatter` reaches the second axis' ticks, here turning stored milliseconds into hours. The underlying values stay raw, so the tooltip and any sorting still work on numbers.",
      },
    ],
  },

  {
    slug: "funnel-chart",
    name: "Funnel Chart",
    category: "Data display",
    exports: ["FunnelChart", "type FunnelConversion"],
    description:
      "Ordered conversion stages, with the drop-off computed from raw counts.",
    examples: [
      {
        demo: "funnel-chart/signup",
        title: "Signup funnel",
        description:
          "Stage-over-stage drop, the default. Each percentage on the left is that stage against the one above it, so 26% is the visit-to-signup step rather than a share of the whole.",
      },
      {
        demo: "funnel-chart/pipeline",
        title: "Sales pipeline",
        description:
          '`conversion="first"` reads every stage against the top of the funnel instead, which is the number a pipeline is usually managed on. `config` is keyed by stage name, so one stage can be recoloured without touching the rest.',
      },
      {
        demo: "funnel-chart/long-labels",
        title: "Long stage names",
        description:
          "Labels are drawn in the right margin, so a wider `margin.right` is what makes room for them. They sit outside the trapezoids on purpose — no single text colour clears AA against every slice in the ramp.",
      },
      {
        demo: "funnel-chart/two-stage",
        title: "Two stages",
        description:
          "The degenerate case, which has to not look broken: two trapezoids and one percentage. A short `className` height keeps it proportionate instead of stretching two bands over a full chart.",
      },
    ],
  },

  {
    slug: "scatter-chart",
    name: "Scatter Chart",
    category: "Data display",
    exports: ["ScatterChart"],
    description:
      "One quantity plotted against another, with optional bubble sizing for a third.",
    examples: [
      {
        demo: "scatter-chart/correlation",
        title: "Correlation with a threshold",
        description:
          "One group, and `xLabel`/`yLabel` doing work a time series does not need — an unlabelled scatter is unreadable. The `ReferenceLine` child is the escape hatch for the alert level the points are read against.",
      },
      {
        demo: "scatter-chart/groups",
        title: "Two groups separated",
        description:
          "`groupKey` names the row field that says which `config` entry a row belongs to, so one flat array becomes two coloured clouds. The separation is the finding here, not any individual point.",
      },
      {
        demo: "scatter-chart/bubble",
        title: "Bubble sizing",
        description:
          "`sizeKey` adds a third variable as the mark's area. Ireland's GDP outlier reads as an outlier partly because its bubble is small — the size is carrying the population that explains it.",
      },
      {
        demo: "scatter-chart/dense",
        title: "Hundreds of points",
        description:
          "320 marks at a partial fill opacity, so overlap reads as density rather than as a solid block. `grid={false}` removes rules that stop helping once the cloud fills the box.",
      },
    ],
  },

  {
    slug: "treemap",
    name: "Treemap",
    category: "Data display",
    exports: ["Treemap", "type TreemapDatum"],
    description:
      "A weighted hierarchy as nested areas. Use it where a pie has too many slices.",
    examples: [
      {
        demo: "treemap/spend",
        title: "Flat spend by service",
        description:
          "Ten services in one level, which is already past where a pie would hold up. `formatValue` prints the figure under each label; the raw values stay numbers so the tiling is still weighted correctly.",
      },
      {
        demo: "treemap/two-level",
        title: "Team then project",
        description:
          "Nesting `children` groups the tiles and tints each child off its parent's hue. A group's own tile contributes only the frame, since its area is entirely covered by its children — the legend beside the chart is composed by the caller.",
      },
      {
        demo: "treemap/long-tail",
        title: "One dominant part",
        description:
          "Where a treemap beats a pie outright: `react-dom` at 63% and seven packages under 3% each. The small tiles stay visible as tiles rather than becoming unclickable slivers of a circle.",
      },
      {
        demo: "treemap/small-tiles",
        title: "Small tiles",
        description:
          "Eighteen entries, where the labels suppress themselves rather than overflow. Suppression is measured against each tile's rendered width and height, so it responds to the container rather than to the number of rows.",
      },
    ],
  },

  {
    slug: "waterfall-chart",
    name: "Waterfall Chart",
    category: "Data display",
    exports: ["WaterfallChart"],
    description:
      "Signed deltas accumulating from a starting value to a total.",
    examples: [
      {
        demo: "waterfall-chart/arr-bridge",
        title: "ARR bridge",
        description:
          "The canonical shape: two totals bracketing four deltas. The connectors are what make it read as a bridge rather than as six unrelated bars, and the tooltip carries the signed change and the running figure — never the internal offset.",
      },
      {
        demo: "waterfall-chart/budget-variance",
        title: "Budget variance",
        description:
          "Ends below where it started, with rises and falls interleaved. The tones are doing the reading here, so the closing total needs no annotation to say the budget was underspent.",
      },
      {
        demo: "waterfall-chart/accumulation",
        title: "All positive",
        description:
          "No totals and no falls — a pure accumulation, which is a stacked bar unrolled along an axis. `connectors={false}` because with every step rising the staircase is already unambiguous.",
      },
      {
        demo: "waterfall-chart/subtotal",
        title: "Mid-sequence subtotals",
        description:
          "Three entries in `totalKeys`, so Q2 restates the running figure in the middle of the sequence and the deltas after it stack on that instead of on the arithmetic before it.",
      },
    ],
  },

  {
    slug: "heatmap",
    name: "Heatmap",
    category: "Data display",
    exports: ["Heatmap", "type HeatmapCell", "type HeatmapDay"],
    description:
      "Density across two axes shown as colour, built on CSS grid rather than a chart library.",
    examples: [
      {
        demo: "heatmap/activity",
        title: "Weekday by hour",
        description:
          "168 cells, which is the density this form exists for. `formatValue` reaches the accessible name on every cell, so the value is available to a screen reader and on hover without a single focusable trigger.",
      },
      {
        demo: "heatmap/calendar",
        title: "Contribution calendar",
        description:
          'layout="calendar" derives the week columns from the date range, so the caller passes dates and never a week index. Month labels appear where the month changes and weekdays are labelled every other row, which is what keeps a year legible at 12px cells.',
      },
      {
        demo: "heatmap/sparse",
        title: "Sparse grid",
        description:
          "Missing pairs render as an unfilled ring while a present zero takes the lowest step — the distinction matters, and it is visible. `emptyLabel` is what a missing cell announces.",
      },
      {
        demo: "heatmap/pinned",
        title: "Pinned scale",
        description:
          "The same `scale.max` on both grids is what makes them comparable. Left off, each would scale to its own maximum and last week's quiet load would look exactly as busy as this week's.",
      },
    ],
  },

  {
    slug: "bullet-chart",
    name: "Bullet Chart",
    category: "Data display",
    exports: ["BulletChart", "type BulletBand"],
    description:
      "A value against its target, with two or three qualitative bands behind it.",
    examples: [
      {
        demo: "bullet-chart/quota",
        title: "Quota with bands",
        description:
          "Three toned bands behind the measure, with the target tick at 85%. The bands are what turn 68 from a number into a judgement — it is in the warning range and short of target.",
      },
      {
        demo: "bullet-chart/stack",
        title: "A stack of KPIs",
        description:
          "Four bullets in a card, all on different scales and all aligned. `[--bullet-label:8rem]` on the container retunes the label column for every row at once rather than per instance.",
      },
      {
        demo: "bullet-chart/in-table",
        title: "In a table cell",
        description:
          "Collapsing `--bullet-label` to zero drops the label column when the table's own column already names the row. `aria-label` then supplies the accessible name, since there is no visible label left to derive one from.",
      },
      {
        demo: "bullet-chart/no-target",
        title: "No target",
        description:
          "Omit `target` and no tick renders — the component degrades to a banded meter rather than inventing a goal. The default three-band neutral ramp is still drawn, so the bar has something to be read against.",
      },
    ],
  },
  /* -- Batch 6 — wholesale replacements ----------------------------------- */
  {
    slug: "stepper",
    name: "Stepper",
    category: "Navigation",
    exports: [
      "Stepper",
      "StepperItem",
      "StepperIndicator",
      "StepperContent",
      "StepperTitle",
      "StepperDescription",
    ],
    description:
      "The step rail of a multi-step flow: the steps, the one you are on, and how much is left.",
    examples: [
      {
        demo: "stepper/basic",
        title: "Basic",
        description:
          "`state` is a prop on `StepperItem`, and the indicator swaps its number for a check on `completed` by itself.",
      },
      {
        demo: "stepper/wizard",
        title: "In a form wizard",
        description:
          "The shape most steppers ship in: the rail heads the panel, and one index drives both the item states and which fields render. Nothing inside the component tracks that index — `Continue` moves it.",
      },
      {
        demo: "stepper/vertical",
        title: "Vertical",
        description:
          '`orientation="vertical"` re-lays the step as a two-column grid: marker beside the text rather than above it, and the connector running down the marker column. No change to the items.',
      },
      {
        demo: "stepper/icon-indicators",
        title: "Icon indicators",
        description:
          "A glyph instead of a number, for a flow whose steps have identities. `StepperIndicator` hides its children on `completed` and swaps in a check, so the icon reads only while the step is still ahead — design for that rather than around it.",
      },
    ],
    parts: {
      Stepper:
        "An `<ol>` that owns `data-orientation`. It renders 0.11's class grammar on purpose — `Wizard` renders the same `.ds-stepper__step` / `__marker` / `__label` block and does not move in this migration, so the stylesheet is pinned and the React is what changed.",
      StepperItem:
        'Where `state` lives, as `is-active` / `is-complete` on the `<li>`; it also sets `aria-current="step"` on the active one. A part outside an item stays in the inactive look.',
      StepperIndicator:
        "The numbered marker. Its children are hidden on `completed` and a check is drawn in their place by a `::after` in the stylesheet — which is why nothing here imports a check icon.",
      StepperTitle:
        "The step's label. A `<span>` — wrap or render it as a heading when the level matters to the page outline.",
      StepperDescription:
        "The optional second line under a label, at the smallest type size and the faintest ink.",
    },
  },

  {
    slug: "timeline",
    name: "Timeline",
    category: "Data display",
    exports: [
      "Timeline",
      "TimelineItem",
      "TimelineIndicator",
      "TimelineContent",
      "TimelineTitle",
      "TimelineTime",
      "TimelineDescription",
    ],
    description:
      "A vertical sequence of events, each completed, active or inactive.",
    examples: [
      {
        demo: "timeline/basic",
        title: "Basic",
        description:
          "The rail is a `::before` on each item, hidden on the last — items can be added or removed without touching it.",
      },
      {
        demo: "timeline/states",
        title: "States",
        description:
          "`data-state` goes on the *item*, not the indicator — and so does `tone`. The indicator reads both, which is what lets one attribute fill it and colour it at once.",
      },
      {
        demo: "timeline/activity-feed",
        title: "Activity feed",
        description:
          'The audit-trail shape: an icon per kind of event rather than a step number, and every entry already past, so no item takes a state. `TimelineTime` is a real `time` element — pass `dateTime` whenever the visible text is written for people, like "09:12".',
      },
      {
        demo: "timeline/in-panel",
        title: "Compact, in a panel",
        description:
          "Density is `--ds-timeline-gap`, set on an item or on the list; the default is 2rem. The rail spans from below the indicator to the bottom of the item, so it follows the tighter spacing without being retuned.",
      },
    ],
    parts: {
      Timeline:
        "An `ol`, so the reading order is the chronology and the count is announced. It draws nothing itself — the rail belongs to the items.",
      TimelineItem:
        "Takes `data-state` and `tone`, and draws the rail: a `::before` from below the indicator to the bottom of the item, hidden on the last one. Both offsets are keyed to the 1.5rem indicator, so resizing it means retuning the rail's `top` and `inset-inline-start` with it.",
      TimelineIndicator:
        "Reads the item's `data-state` and `tone`, so it takes no state prop of its own. Fixed at 1.5rem and `flex-shrink: 0` — it is what the rail is aligned to.",
      TimelineTitle:
        "Uppercase tracked label type, and a `div` rather than a heading — add your own element when the level matters.",
      TimelineDescription:
        "Sets `text-transform: none` explicitly, so detail text stays sentence case under the uppercased title above it.",
      TimelineTime:
        "A real `time` element with `tabular-nums`, so a column of timestamps lines up. Give it `dateTime` whenever the visible text is not machine-readable.",
    },
  },
  {
    slug: "avatar",
    name: "Avatar",
    category: "Data display",
    exports: [
      "Avatar",
      "AvatarImage",
      "AvatarFallback",
      "AvatarBadge",
      "AvatarGroup",
      "AvatarGroupCount",
    ],
    description:
      "A user image with initials behind it, plus a group form with an overflow count.",
    examples: [
      {
        demo: "avatar/basic",
        title: "Basic",
        description:
          "The fallback shows until the image resolves and stays if it fails, so initials are the default rather than a broken-image icon. The portrait is inlined as a data URI so the demo needs no network — any `src` behaves the same.",
      },
      {
        demo: "avatar/sizes",
        title: "Sizes and badge",
        description:
          "`AvatarBadge` reads the avatar's `data-size` instead of taking a size prop, and drops its icon at `sm` where it would be unreadable.",
      },
      {
        demo: "avatar/group",
        title: "Group",
        description:
          "`AvatarGroup` overlaps its children and rings them in the background colour; `AvatarGroupCount` closes the stack.",
      },
      {
        demo: "avatar/in-row",
        title: "In a member list",
        description:
          "Where avatars usually sit: leading a row, inside `ItemMedia`, with the name beside them. The online dot is decoration only — the row says `online` in words too, so the state does not depend on colour.",
      },
    ],
    parts: {
      Avatar:
        "Sets `data-size`, which every other part reads — a part rendered outside an Avatar falls back to its own default. The border is an `::after` overlay in `mix-blend-darken`, so it darkens a photo's own edge instead of drawing a ring over it.",
      AvatarImage:
        "Base UI keeps it unmounted until the image loads, and removes it again if the load fails — which is why the fallback is not conditional. Render both, always.",
      AvatarBadge:
        "Positioned absolutely against the root, so it has to be a child of Avatar. It takes no size of its own and drops its icon at `sm`, where a glyph would be unreadable.",
      AvatarGroup:
        "Overlaps its children and rings each one in the background colour; the ring is what separates them, so a group on a tinted surface needs that ring recoloured.",
      AvatarGroupCount:
        "A counter, not an Avatar. It matches the group's size through `group-has-data-*`, so it follows whatever size the avatars were given.",
    },
    wiring:
      "A from-scratch binding has to load the image itself and only reveal it on success, keeping the fallback rendered underneath at all times — Base UI's Avatar unmounts `AvatarImage` on a failed load rather than letting a browser's broken-image icon show through, so a plain `<img>` needs its own `onload`/`onerror` handling to reproduce that.",
  },
  {
    slug: "pagination",
    name: "Pagination",
    category: "Navigation",
    exports: [
      "Pagination",
      "PaginationContent",
      "PaginationItem",
      "PaginationLink",
      "PaginationPrevious",
      "PaginationNext",
      "PaginationEllipsis",
      "paginationRange",
    ],
    description: "Page links with previous, next and an ellipsis.",
    examples: [
      {
        demo: "pagination/basic",
        title: "Basic",
        description:
          "`PaginationLink` renders an anchor through Button's `render` with `nativeButton={false}`, so it stays a real link — middle-click and open-in-new-tab keep working.",
      },
      {
        demo: "pagination/controlled",
        title: "Controlled",
        description:
          "In an SPA, intercept the click rather than dropping the `href` — the pages stay shareable that way.",
      },
      {
        demo: "pagination/long-range",
        title: "Long ranges",
        description:
          "Past a dozen pages the rail has to be computed, so `paginationRange` does it: `page` and `pageCount` in, page numbers and `ellipsis` markers out. It keeps a constant width — near an edge the run widens rather than the rail shrinking — and never puts an ellipsis in front of a single hidden page.",
      },
      {
        demo: "pagination/under-a-table",
        title: "Under a table",
        description:
          "Where a rail usually sits: a footer beside the result count. The root centres itself in the full width, so seating it at one end means overriding `margin-inline`, `width` and `justify-content` on `.ds-pagination`.",
      },
    ],
    parts: {
      Pagination:
        "Already a `<nav>` labelled `pagination`, so it needs no wrapper of its own — but two rails on one page need distinct `aria-label`s. It is centred in the full width; both have to go to seat it in a table footer.",
      PaginationContent:
        "A real `<ul>`, so every child belongs in a `PaginationItem` — a link dropped straight in here breaks the list semantics screen readers count from.",
      PaginationLink:
        'Only `size` reaches Button; `variant` is decided by `isActive`, which also sets `aria-current="page"`. Styling the current page by hand instead leaves that announcement out.',
      PaginationPrevious:
        "Its word is hidden below the `sm` breakpoint, leaving the caret alone. The label is the `text` prop rather than children, which is what makes it translatable.",
      PaginationNext:
        "Mirrors Previous, `text` prop included; the caret flips itself under `rtl`.",
      PaginationEllipsis:
        "Decorative — `aria-hidden`, so it announces nothing and is never a target. It stands for skipped pages, not a menu: nothing opens.",
    },
  },
  {
    slug: "agenda",
    name: "Agenda",
    category: "Data display",
    exports: ["Agenda"],
    description:
      "Events sorted by day and time, grouped under day headings. Use it for what is coming up.",
    examples: [
      {
        demo: "agenda/basic",
        title: "Basic",
        description:
          "Events arrive unsorted and are grouped by day for you. `time` is free text sorted as a string, so write it zero-padded — `09:00` sorts before `14:00`, `9am` does not.",
      },
      {
        demo: "agenda/with-calendar",
        title: "With a calendar",
        description:
          "The intended pairing: `calendar` owns selection, Agenda owns the events. Filtering is the caller's, which is what keeps both components ignorant of each other.",
      },
      {
        demo: "agenda/empty",
        title: "Empty state",
        description:
          "No events renders `Empty` rather than a bespoke placeholder, so the voice matches every other empty surface in the system. `emptyMessage` is the one line you write.",
      },
    ],
  },
  {
    slug: "table",
    name: "Table",
    category: "Data display",
    exports: [
      "Table",
      "TableHeader",
      "TableBody",
      "TableFooter",
      "TableRow",
      "TableHead",
      "TableCell",
      "TableCaption",
    ],
    description:
      "The styled HTML table primitives, with no data layer. Use `Data Table` for sorting, filtering and paging.",
    examples: [
      {
        demo: "table/basic",
        title: "Basic",
        description:
          "The whole skeleton in one pass. Rules come from the sections rather than the rows — `TableHeader` draws the line under the head and `TableBody` drops it on the last row, so a row never has to know where it sits.",
      },
      {
        demo: "table/with-badges",
        title: "With status badges",
        description:
          "Numeric columns take `text-right`; ids take `font-mono` so digits align down the column. `TableCaption` renders below the table whatever its position in the JSX — the root is `caption-bottom`.",
      },
      {
        demo: "table/with-footer",
        title: "With footer total",
        description:
          "`TableFooter` is styled as a summary row, not a repeat of the header — fill it with `TableCell`, not `TableHead`, and compute the total from the same array the body maps.",
      },
      {
        demo: "table/selectable",
        title: "Selectable rows",
        description:
          'Selection is the one state the primitives track: `data-state="selected"` tints the row and outranks the hover tint, so a selected row holds still under the pointer. A cell containing a `role="checkbox"` element drops its trailing padding, which is what keeps the control column narrow without a width.',
      },
    ],
    parts: {
      Table:
        "Renders a scrolling div around the `table`, and `className` goes on the table inside it — a max-width or a border meant for the scroll container has to wrap this part instead.",
      TableHeader:
        "`[&_tr]:border-b`, so the head rule belongs to the section. A header of two stacked rows draws a line under each.",
      TableBody:
        "Drops the border on its last row, so the body never doubles up with the footer's own top rule.",
      TableFooter:
        "A summary row: muted fill, `font-medium`, top border. It is not a second header — put `TableCell` in it, so screen readers do not read the totals as column names.",
      TableHead:
        "Uppercase tracked caption text, start-aligned and `whitespace-nowrap`. It sets nothing for the column below it — a right-aligned column needs `text-right` here and on every cell.",
      TableRow:
        'Hover and `data-state="selected"` both tint the row, and selection wins the cascade, so a selected row does not change under the pointer. `has-aria-expanded` tints it too, for a row that owns an open disclosure.',
      TableCell:
        '`whitespace-nowrap` by default, so prose in a cell needs `whitespace-normal` and a width to wrap. Trailing padding drops to zero when the cell holds a `role="checkbox"` element.',
      TableCaption:
        "Always renders below the table — the root is `caption-bottom` — so it reads as a footnote, not a title. A real heading belongs above the component.",
    },
  },
  {
    slug: "breadcrumb",
    name: "Breadcrumb",
    category: "Navigation",
    exports: [
      "Breadcrumb",
      "BreadcrumbList",
      "BreadcrumbItem",
      "BreadcrumbLink",
      "BreadcrumbPage",
      "BreadcrumbSeparator",
      "BreadcrumbEllipsis",
    ],
    description:
      "The trail to the current page, with the last item as plain text.",
    examples: [
      {
        demo: "breadcrumb/basic",
        title: "Basic",
        description:
          "`BreadcrumbPage` marks the current page: not a link, and `aria-current`. Separators are `aria-hidden`, so the trail reads cleanly aloud.",
      },
      {
        demo: "breadcrumb/collapsed",
        title: "Collapsed",
        description:
          "A deep path shortened to its ends. `BreadcrumbEllipsis` stands in for the levels between, and `BreadcrumbSeparator` renders a caret unless given children — pass a character or another icon to change the punctuation.",
      },
      {
        demo: "breadcrumb/overflow-menu",
        title: "Overflow menu",
        description:
          "The same truncation, but the hidden levels stay reachable: the ellipsis becomes a `DropdownMenu` trigger. `BreadcrumbEllipsis` is `aria-hidden`, so the accessible name has to come from the trigger around it.",
      },
    ],
    parts: {
      BreadcrumbLink:
        "Takes Base UI's `render` prop, not `asChild` — pass a router link (`render={<Link to=\"/docs\" />}`) and it renders as that element with the breadcrumb's classes merged in.",
      BreadcrumbPage:
        'Plain text with `aria-current="page"` and `aria-disabled`, since the current page is not somewhere to navigate to. It is the last item, and only ever one.',
      BreadcrumbSeparator:
        "A presentational list item, hidden from the accessibility tree so the trail reads as words rather than punctuation. Give it children to replace the default caret.",
      BreadcrumbEllipsis:
        "Also `aria-hidden`. Wrapping it in a control — a menu trigger — means the label has to be on that control, or the button reads as unnamed.",
    },
  },
  {
    slug: "empty",
    name: "Empty",
    category: "Data display",
    exports: [
      "Empty",
      "EmptyHeader",
      "EmptyMedia",
      "EmptyTitle",
      "EmptyDescription",
      "EmptyContent",
    ],
    description:
      "The empty-state block: media, title, description and an action.",
    examples: [
      {
        demo: "empty/basic",
        title: "Basic",
        description:
          "`Empty` sets `border-dashed` but no border width, so the caller decides whether the state is framed or sits flush in a card.",
      },
      {
        demo: "empty/with-action",
        title: "With actions",
        description:
          "`EmptyContent` is the slot for the way out — it constrains its own width so buttons stay centred under the text.",
      },
      {
        demo: "empty/failed",
        title: "Failed to load",
        description:
          'The same anatomy saying something went wrong rather than nothing is here, so the action is `Retry` and the description says what to expect. Empty ships no role, so `role="status"` is what makes the swap announced.',
      },
      {
        demo: "empty/in-card",
        title: "Inside a card",
        description:
          "The unframed form: no border, since the panel already has edges, and tighter padding than the default 3rem. The padding belongs to the block, so the container passes `px-0` rather than stacking the two.",
      },
    ],
    parts: {
      Empty:
        'Sets `border-dashed` with no border width, so a standalone block needs `border` and one inside a card needs nothing. `flex-1` makes it fill a flex parent, and it carries no role — pass `role="status"` when it replaces loaded content.',
      EmptyHeader:
        "`max-w-sm` on the text column, so a long description wraps to a readable measure instead of the container's width.",
      EmptyMedia:
        '`variant="icon"` is the muted chip and sizes an `svg` child for you; `default` is a bare slot, so an illustration or a larger glyph carries its own size.',
      EmptyTitle:
        "Heading face, uppercase and tracked, but a `div` — add your own heading element when the page needs the level.",
      EmptyDescription:
        "Styles its descendant links, underlined and primary on hover, so the way out can live inside the sentence.",
      EmptyContent:
        "The slot for the way out, with its own `max-w-sm` so buttons stay centred under the text rather than spreading to the block's width.",
    },
  },
  {
    slug: "toolbar",
    name: "Toolbar",
    category: "Actions",
    exports: [
      "Toolbar",
      "ToolbarGroup",
      "ToolbarButton",
      "ToolbarLink",
      "ToolbarInput",
      "ToolbarSeparator",
    ],
    description:
      "A strip of grouped buttons, inputs and separators. It is one tab stop, with the arrow keys moving inside it.",
    examples: [
      {
        demo: "toolbar/basic",
        title: "Basic",
        description:
          "One tab stop for the whole toolbar; arrow keys move between buttons. `ToolbarGroup` bundles related actions.",
      },
      {
        demo: "toolbar/with-input",
        title: "With input and link",
        description:
          "`ToolbarInput` and `ToolbarLink` join the same arrow-key ring as the buttons, so a filter field stays reachable without a second tab stop.",
      },
      {
        demo: "toolbar/vertical",
        title: "Vertical",
        description:
          '`orientation="vertical"` switches the axis. `ToolbarSeparator` reads the root orientation and draws across it, so it needs no prop.',
      },
    ],
    parts: {
      Toolbar:
        "Owns the roving focus: one tab stop for the strip, arrow keys within it, wrapping at the ends unless `loopFocus={false}`. Its `disabled` reaches every item, and `orientation` sets the axis the separators draw across.",
      ToolbarGroup:
        "Clusters items visually without breaking the ring — arrow keys still run the length of the toolbar. Its own `disabled` covers every item in the group.",
      ToolbarButton:
        "Renders a `Button`, so `variant`, `size` and `tone` all apply; it only changes the defaults to `ghost` and `icon-sm`. Icon-only buttons still need an `aria-label`.",
      ToolbarInput:
        "A real input inside the ring: the arrow keys move its caret first and only step out of the field once the caret has reached the end, so a filter field costs no second tab stop.",
      ToolbarSeparator:
        "Defaults to the opposite orientation of the toolbar, which is the one that draws across it — pass `orientation` only to override that.",
    },
    wiring:
      "The whole strip is one tab stop — a from-scratch binding has to give it roving `tabindex` itself: `tabindex=0` on exactly one child (`ToolbarButton`/`ToolbarLink`/`ToolbarInput`), `-1` on the rest, arrow keys (matching `data-orientation`) move both focus and that index across every enabled child including the input, and Home/End jump to the first/last.",
  },
  {
    slug: "banner",
    name: "Banner",
    category: "Layout",
    exports: [
      "Banner",
      "BannerContent",
      "BannerTitle",
      "BannerDescription",
      "BannerAction",
    ],
    description:
      "A full-width, tone-coloured message bar for a whole page or section. Use `Alert` inside content.",
    examples: [
      {
        demo: "banner/basic",
        title: "Basic",
        description:
          'Icon, title, description. The root carries `role="status"`, so a banner mounted after load is announced without an aria-live wrapper.',
      },
      {
        demo: "banner/with-action",
        title: "Action and dismiss",
        description:
          "`BannerAction` is a plain flex sibling rather than an absolutely-positioned corner, so it can hold more than one control without overlapping the text.",
      },
      {
        demo: "banner/tones",
        title: "Tones",
        description:
          "The full severity ladder. Each tone reads its `--ds-<tone>-bg`/`--ds-<tone>-ink` pair, so the ladder stays in step with Button, Alert and every other tone-aware component.",
      },
    ],
    parts: {
      Banner:
        'Carries `role="status"` — mounted banners are announced politely with no aria-live wrapper. A leading `svg` child is auto-sized and top-aligned by the root\'s selectors.',
      BannerDescription:
        "Deliberately un-faded: the tone inks clear AA as bare text but drop under 4.5:1 behind opacity, so hierarchy comes from BannerTitle's `font-medium` instead.",
      BannerAction:
        "A flex sibling, not an absolutely-positioned corner — several controls fit beside long text without overlap.",
    },
  },
  {
    slug: "progress",
    name: "Progress",
    category: "Data display",
    exports: [
      "Progress",
      "ProgressTrack",
      "ProgressIndicator",
      "ProgressLabel",
      "ProgressValue",
    ],
    description: "Task completion advancing towards done, with optional label and value. `value={null}` is the indeterminate state.",
    examples: [
      {
        demo: "progress/basic",
        title: "Basic",
        description:
          "`Progress` renders its own track and indicator, so children are the label and value only. `format` takes `Intl.NumberFormatOptions`, which is what turns the 0–1 ratio into a percentage — without it the value prints as `value` divided by 100 regardless of `max`, unlike Meter, which reads its range.",
      },
      {
        demo: "progress/indeterminate",
        title: "Indeterminate",
        description:
          "`value={null}` means unknown — distinct from `0`, which means started but nothing done. A plain `ProgressValue` renders nothing while indeterminate; a function child is handed the literal string `indeterminate` instead.",
      },
      {
        demo: "progress/upload-queue",
        title: "Upload queue",
        description:
          "Several tasks in one list, with the finished bar recoloured off the root's `data-complete` attribute rather than a comparison at the call site. The function child on `ProgressValue` is what lets the completed row read `Done` instead of `100%`.",
      },
    ],
    parts: {
      Progress:
        "Renders the track and the indicator itself, after your children, and carries `data-indeterminate`, `data-progressing` or `data-complete` — style completion off the attribute.",
      ProgressTrack:
        "Rendered for you. Restyle the bar through a descendant selector on the root rather than by adding a second track.",
      ProgressIndicator:
        "Also internal, and Base UI sets its width inline, so colour is the one thing left to change from outside.",
      ProgressLabel:
        "Registers itself as the bar's accessible name, so a bar without one needs an `aria-label` on the root.",
      ProgressValue:
        "`aria-hidden`: the root already announces the value through `aria-valuetext`. It renders nothing while `value` is `null` unless you pass a function child.",
    },
  },
  {
    slug: "page-header",
    name: "Page Header",
    category: "Layout",
    exports: [
      "PageHeader",
      "PageHeaderHeading",
      "PageHeaderIcon",
      "PageHeaderTitle",
      "PageHeaderDescription",
      "PageHeaderActions",
      "PageHeaderTabs",
    ],
    description:
      "The top of a page: breadcrumb, title, description, actions, and an optional tab strip.",
    examples: [
      {
        demo: "page-header/basic",
        title: "Basic",
        description: "Just a title and description, no prop bag, only slots.",
      },
      {
        demo: "page-header/advanced",
        title: "Advanced",
        description:
          "Breadcrumb, title, description and actions compose freely alongside the title.",
      },
      {
        demo: "page-header/with-tabs",
        title: "With tabs and icon",
        description:
          "`PageHeaderTabs` flips the header's bottom rule flush against the tab strip; `Tabs` wraps the header so the panels render below it. `PageHeaderIcon` sizes and mutes whatever Phosphor icon you hand it.",
      },
    ],
    parts: {
      PageHeader:
        "Owns the bottom rule and the padding above it, and drops that padding when a PageHeaderTabs is present so the rule sits under the tabs.",
      PageHeaderHeading:
        "A wrapping `justify-between` row, which means it wants exactly two children: the title stack in one, PageHeaderActions in the other. Wrap the title and description together yourself — they are not a slot.",
      PageHeaderTitle:
        "An `h1`, so one per page. It carries the heading face and no spacing, and there is no level prop — a nested heading is a plain element, not this part.",
      PageHeaderIcon:
        "Fixes any icon inside it to 1.5rem and mutes it, and its 2rem height is what aligns it with the title's cap height, so it belongs beside the title stack rather than inside it.",
      PageHeaderTabs:
        "A marker with no styles of its own: its `data-slot` is what flips the root's padding. Put TabsList inside it and Tabs around the whole header, so the panels render below the rule.",
    },
  },
  {
    slug: "description-list",
    name: "Description List",
    category: "Data display",
    exports: ["DescriptionList", "DescriptionTerm", "DescriptionDetail"],
    description:
      "Term and detail pairs in a real `dl`, for record summaries.",
    examples: [
      {
        demo: "description-list/basic",
        title: "Basic",
        description:
          "The term column is `auto`-sized and the detail column takes the rest, so the widest term sets the gutter for every row.",
      },
      {
        demo: "description-list/in-card",
        title: "In a card",
        description:
          "Its most common home: the summary block of a record. The rules come from each pair's own `border-t`, with `first-of-type` suppressing the leading one — the list needs no divider of its own.",
      },
      {
        demo: "description-list/rich-details",
        title: "Details that aren't text",
        description:
          "A detail can hold a `Status` or a `Tag`, not just a string. The `dd` is padded for text, so a boxed control makes its row slightly taller than its neighbours.",
      },
    ],
    parts: {
      DescriptionList:
        "Owns the `auto 1fr` grid, so every term and detail must be a direct child — a wrapper around a pair drops it out of the columns.",
      DescriptionTerm:
        "`whitespace-nowrap`: a long term widens the first column for the whole list rather than wrapping.",
      DescriptionDetail:
        "`tabular-nums`, so a column of amounts or dates lines up digit for digit.",
    },
  },
  {
    slug: "kbd",
    name: "Kbd",
    category: "Actions",
    exports: ["Kbd", "KbdGroup"],
    description:
      "Renders a keyboard key inline, sized to the text around it. Use `KbdGroup` for a chord.",
    examples: [
      {
        demo: "kbd/basic",
        title: "Basic",
        description:
          "Single keys, plus a `KbdGroup` for a chord. The min-width keeps one-character keys square.",
      },
      {
        demo: "kbd/shortcuts",
        title: "Shortcut list",
        description: "A shortcuts panel built from a plain description list.",
      },
      {
        demo: "kbd/in-context",
        title: "Inside other components",
        description:
          "`Kbd` restyles from its container — inside an input group it takes the input fill, inside a tooltip it inverts.",
      },
    ],
    parts: {
      Kbd: "A minimum width keeps a single character square while `Esc` or `⌘⇧` widen past it. `pointer-events-none` and `select-none` are deliberate: the handler belongs on the control this annotates.",
      KbdGroup:
        "The gap between the keys of one chord, and nothing else. It renders a `kbd` too, so the keys nest inside it legally — no `+` between them.",
    },
  },

  {
    slug: "spinner",
    name: "Spinner",
    category: "Data display",
    exports: ["Spinner"],
    description:
      "An indeterminate loading indicator sized to the surrounding text. Use `Skeleton` when the shape of the content is known.",
    examples: [
      {
        demo: "spinner/basic",
        title: "Sizes",
        description:
          'It ships with `role="status"` and a default `label` of "Loading", so it is announced without a wrapper.',
      },
      {
        demo: "spinner/labelled",
        title: "Naming each wait",
        description:
          'Three spinners all announcing "Loading" tell a screen reader nothing. `label` names the one job each is waiting on, which is the whole reason it is a prop.',
      },
      {
        demo: "spinner/in-context",
        title: "In buttons and empty states",
        description:
          "A button sizes the glyph inside it, so a spinner needs no adjustment there. Written into plain HTML the class draws 0.11's ruled ring instead, because there is no glyph to spin.",
      },
      {
        demo: "spinner/activity-rows",
        title: "Per-row activity",
        description:
          'One wait per row, so each spinner takes its own `aria-label` — four rows all announcing "Loading" tell a screen-reader user nothing. Settled rows swap to `Status`, whose label carries the outcome without relying on colour.',
      },
      {
        demo: "spinner/deferred",
        title: "Deferred appearance",
        description:
          "A spinner that flashes for 80ms reads as a glitch, so the timer — not the request — decides when it mounts. Only waits long enough to be noticed ever draw one.",
      },
    ],
  },

  /* -- Batch 7 — frozen contracts and the form-controls split -------------
     Every class name on these sixteen is fixed by a surface outside the
     package — a `<ds-*>` web component, a Streamlit page, or `Card.js` — so
     their CSS was absorbed *into* the existing contract rather than
     replacing it. */
  {
    slug: "icon",
    name: "Icon",
    category: "Utilities",
    exports: ["Icon", "icons"],
    description:
      "The built-in glyph set: 34 Phosphor icons keyed by name. Import from `@phosphor-icons/react` for anything outside it.",
    examples: [
      {
        demo: "icon/basic",
        title: "The set",
        description:
          "Six of the 34. A name that is not in the map renders a blank SVG rather than throwing, so a typo degrades to a gap instead of a crash.",
      },
      {
        demo: "icon/sizing",
        title: "Sizing and colour",
        description:
          "`size` fixes the square; omit it and the glyph is `1em`, so it tracks the surrounding font-size and takes its colour from `currentColor`.",
      },
      {
        demo: "icon/accessible-name",
        title: "Accessible name",
        description:
          '`title` makes the icon `role="img"` with a name. Omit it and the icon is `aria-hidden` — which is correct whenever a label or an `aria-label` beside it already says the same thing, because two names read as two things.',
      },
    ],
    parts: {
      Icon: 'A `name` from the `icons` map and nothing else required. `title` decides whether it is `role="img"` or `aria-hidden`; there is no third state, and no name is the default.',
      icons:
        "The map itself, exported so a consumer can enumerate the set or paste one glyph's geometry into static HTML. Values are the *inner* markup only — the `<svg>` wrapper belongs to whichever binding draws it.",
    },
  },
  /* -- Actions ----------------------------------------------------------- */
  {
    slug: "button",
    name: "Button",
    category: "Actions",
    exports: ["Button", "buttonVariants"],
    description:
      "The main action trigger. Eight variants and eight brand tones that combine freely.",
    examples: [
      {
        demo: "button/variants",
        title: "Variants",
        description:
          "All eight variants, mapped onto charte tokens — `default` is the solid action fill, `destructive` the tinted red. `primary` is 0.11's spelling of `default` and resolves to the same rule; `danger` is 0.11's bordered red and stays distinct from `destructive`. The first button omits `variant` entirely, which is 0.11's bordered button and what `<ds-button>` renders with no attribute.",
      },
      {
        demo: "button/tones",
        title: "Brand tones",
        description:
          "`tone` sets the fill from the Tier-1 palette. It is a separate axis from `variant`, so there is no compound-variant explosion.",
      },
      {
        demo: "button/tones-subtle",
        title: "Tones on outline and ghost",
        description:
          "On the low-emphasis variants, tone drives the border and hover wash while the label stays `text-foreground` for contrast on light tones like beige and yellow.",
      },
      {
        demo: "button/sizes",
        title: "Sizes",
        description:
          "Three text sizes and a square `icon` set that matches each of them — an icon-only button carries no label, so it takes an `aria-label`.",
      },
      {
        demo: "button/icon",
        title: "With icon and loading",
        description:
          "Icons are sized by the button's own `[&_svg]` rules — no wrapper classes needed.",
      },
    ],
    wiring:
      "The one state worth wiring is `loading`: it has to disable the button and set `aria-busy=\"true\"` alongside the `.ds-button--loading` class, since the class alone only hides the label and paints the spinner — it doesn't stop a keyboard press or a form submit. `<ds-button>` already covers the plain `variant`/`type`/`disabled` contract for a static button; `loading`, `tone` and `block` have no web-component equivalent.",
  },
  {
    slug: "input",
    name: "Input",
    category: "Forms",
    exports: ["Input"],
    description:
      "The single-line text field, and the base the other text controls borrow their focus and invalid styling from.",
    examples: [
      {
        demo: "input/basic",
        title: "Basic",
        description:
          "The bare control with no wrapper, which is why `aria-label` is doing the labelling — an input with neither a visible label nor an `aria-label` fails an axe check.",
      },
      {
        demo: "input/with-field",
        title: "With label and description",
        description:
          "`Field` supplies the label association and helper text; `Input` stays a plain control.",
      },
      {
        demo: "input/types",
        title: "Typed values",
        description:
          "`type` swaps the native control, not just the keyboard: `date` brings the platform picker and `file` picks up the `file:` classes the component ships for the browser's own button. Validation props (`min`, `max`, `accept`) pass straight through. For a numeric field with steppers, `Number Field` is the richer sibling.",
      },
      {
        demo: "input/invalid",
        title: "Invalid and disabled",
        description:
          "`aria-invalid` drives the destructive ring — the styling follows the accessibility attribute rather than a separate prop.",
      },
      {
        demo: "input/with-addon",
        title: "With addons",
        description:
          "`InputGroup` positions icons and buttons inside the field box, keeping one focus ring around the whole group.",
      },
    ],
  },
  {
    slug: "textarea",
    name: "Textarea",
    category: "Forms",
    exports: ["Textarea"],
    description:
      "A multi-line text field, measured in rows and sharing Input's focus and invalid states.",
    examples: [
      {
        demo: "textarea/basic",
        title: "Basic",
        description:
          "`field-sizing: content` grows the box with its content, so `rows` sets a floor rather than a fixed height. The grip is still there for a reader who wants more room than the content asks for.",
      },
      {
        demo: "textarea/with-field",
        title: "In a field",
        description:
          "`aria-invalid` is the switch for the error styling; `FieldError` renders the message.",
      },
      {
        demo: "textarea/counter",
        title: "Character count",
        description:
          "Controlled, because the count is read off the value: `maxLength` stops the typing and `FieldDescription` carries the readout, so the count stays inside the row the label already names.",
      },
      {
        demo: "textarea/bounded",
        title: "Bounded growth",
        description:
          "Where auto-growth needs a ceiling: `max-h-40` plus `overflow-y-auto` on the textarea gives it something to scroll inside, while `rows` still decides where it starts. The cap belongs on the control, which is what owns the scrolling.",
      },
    ],
  },
  {
    slug: "field",
    name: "Field",
    category: "Forms",
    exports: [
      "Field",
      "FieldSet",
      "FieldLegend",
      "FieldGroup",
      "FieldContent",
      "FieldLabel",
      "FieldTitle",
      "FieldDescription",
      "FieldSeparator",
      "FieldError",
    ],
    description:
      "The form row: label, control, description and error in one accessible group. Use it for every labelled control.",
    examples: [
      {
        demo: "field/basic",
        title: "Basic",
        description:
          "Label, control and description. `FieldDescription` is the helper text slot; it sits below the control.",
      },
      {
        demo: "field/group",
        title: "Field group",
        description:
          "`FieldGroup` stacks rows on `gap-10`; a group nested inside another drops to `gap-4`, which is how a sub-section reads as one without extra classes.",
      },
      {
        demo: "field/fieldset",
        title: "Fieldset and legend",
        description:
          "The section shape: `FieldSet` is a real `fieldset` and `FieldLegend` its legend, so the group's name is announced with every control inside it. A description placed straight after the legend tightens against it, and `FieldSeparator` divides the section out of the existing gap rather than adding a row.",
      },
      {
        demo: "field/choices",
        title: "Horizontal orientation",
        description:
          '`orientation="horizontal"` puts the control before the label — the correct order for checkboxes and radios. Wrap a label that carries a description in `FieldContent`: the row keys its `items-start` off that part, so the control aligns to the first line instead of centring against two.',
      },
      {
        demo: "field/invalid",
        title: "With error",
        description:
          "`FieldError` accepts either children or an `errors` array, which it de-duplicates by message and renders as a list when there is more than one.",
      },
    ],
    parts: {
      Field:
        "Nothing sets `data-invalid` for you — pass it here to turn the whole row destructive. `aria-invalid` on the control only recolours the control, so a fully red row wants both.",
      FieldSet:
        "Drops its own gap from 6 to 3 when its direct child is a `CheckboxGroup` or a `RadioGroup`, since those already space their own items.",
      FieldGroup:
        "`gap-10` between rows, and `gap-4` for a FieldGroup nested in another — sub-sections tighten by nesting rather than by class.",
      FieldLabel:
        "`Label` with the group's disabled wiring added, so it inherits the peer restyling too: a checkbox or radio still has to come before it in the DOM. Wrap a whole `Field` in one and it turns into a full-width bordered box that tints while a control inside it is checked — the selectable-card pattern, with no separate component.",
      FieldTitle:
        "Renders a `div`, not a `label` — it names a group visually without claiming to label a control, which is what you want above a set of radios that each carry their own FieldLabel.",
      FieldContent:
        "The wrapper for a label plus its description in a horizontal row: the Field keys its `items-start` off this part's `data-slot`, so a plain `div` leaves the control centred against two lines of text.",
      FieldDescription:
        "Its margins are order-sensitive (`last:mt-0`, `nth-last-2:-mt-1`, and a tighter rule right after a legend), so keep it after the control and before the error rather than the other way round.",
      FieldSeparator:
        "Sits in the group's existing gap with `-my-2` rather than adding a row of its own; the optional children print as a centred label over the rule.",
      FieldError:
        'Returns `null` with neither children nor a non-empty `errors`, so it can stay mounted through a valid state. `errors` de-duplicates by message and switches to a list past one; the root is `role="alert"`, which announces the message as it appears.',
    },
  },
  {
    slug: "select",
    name: "Select",
    category: "Forms",
    exports: [
      "Select",
      "SelectTrigger",
      "SelectValue",
      "SelectContent",
      "SelectGroup",
      "SelectLabel",
      "SelectItem",
      "SelectSeparator",
    ],
    description:
      "A closed list for choosing one option, with a trigger and a portalled popup. Use `Combobox` once the list gets long.",
    examples: [
      {
        demo: "select/basic",
        title: "Basic",
        description:
          "Pass `items` on the root: without it `SelectValue` renders the raw value (`next`) rather than the selected item's label (`Next.js`).",
      },
      {
        demo: "select/grouped",
        title: "Grouped options",
        description:
          "`SelectGroup` with a `SelectLabel` scopes a heading to its options; `SelectSeparator` divides groups.",
      },
      {
        demo: "select/with-field",
        title: "In a field",
        description:
          "The trigger fills its column by default, which is what a field wants; narrow it with a width of your own where it sits beside something else.",
      },
      {
        demo: "select/status",
        title: "Status picker",
        description:
          "`SelectValue` also takes a function child, which receives the current value — the way to print an icon beside the label, since `items` only carries text. The trigger sizes any icon it holds, so no wrapper classes.",
      },
      {
        demo: "select/long-list",
        title: "Long lists",
        description:
          "Past the popup's `--available-height` the list scrolls and the arrow buttons appear on their own. The selected item still opens over the trigger, so the current answer stays put instead of jumping to the top of a long list.",
      },
    ],
    parts: {
      Select:
        "Where `items` goes — the map every `SelectValue` reads to turn a stored value into a label. It is also the state owner: `defaultValue`, `value` and `onValueChange` live here, not on the trigger.",
      SelectTrigger:
        'Full-width by default. It has `role="combobox"`, which is not named from its content, so it points `aria-labelledby` at the SelectValue it renders — passing your own `aria-label` overrides that.',
      SelectValue:
        "Prints the label for the current value by looking it up in the root's `items`; with no `items` it prints the raw value. `placeholder` covers the empty state, and a function child replaces both.",
      SelectContent:
        "Portals the popup and sizes it to `--anchor-width`, so a wide trigger gives a wide list. `alignItemWithTrigger` (default) aligns the selected item over the trigger and disables the open animation.",
      SelectLabel:
        "A group heading — it must sit inside a `SelectGroup` to be tied to the options it names.",
    },
    wiring:
      "A from-scratch binding has to toggle `aria-expanded` on the trigger and open/closed state on the popup, implement roving selection inside the list (arrow keys, Home/End, typeahead) that moves `data-highlighted` without committing, and commit on Enter/Space/click — updating the trigger's displayed value, `data-selected` on the item, and closing the popup. Escape and outside-click must dismiss without committing, restoring focus to the trigger.",
  },
  {
    slug: "checkbox",
    name: "Checkbox",
    category: "Forms",
    exports: ["Checkbox"],
    description:
      "A single yes-or-no control for a value a form submits. Use `Switch` for a setting that applies immediately.",
    examples: [
      {
        demo: "checkbox/basic",
        title: "States",
        description:
          "The four states, `indeterminate` among them — it is a prop you set, not a third value the box arrives at on its own.",
      },
      {
        demo: "checkbox/consent",
        title: "Consent field",
        description:
          'The single-box form row: `FieldContent` holds the label and its fine print, and `orientation="horizontal"` keeps the box beside them rather than above.',
      },
      {
        demo: "checkbox/task-list",
        title: "Task list",
        description:
          "The box carries `peer`, so anything after it in the DOM can react to the check — here `peer-data-checked:line-through` on the label, with no state in the component.",
      },
      {
        demo: "checkbox/as-cards",
        title: "As cards",
        description:
          "A `FieldLabel` that *contains* a `Field` becomes a card: full width, bordered, and tinted on `has-data-checked`.",
      },
    ],
    wiring:
      "A from-scratch binding keeps the `role=\"checkbox\"` span's `data-checked`/`data-indeterminate` (and `aria-checked`) in sync with clicks and keyboard activation, and mirrors that state onto a hidden `input[type=checkbox]` so the value actually submits with the form — the visible span carries no `name` of its own.",
  },
  {
    slug: "checkbox-group",
    name: "Checkbox Group",
    category: "Forms",
    exports: ["CheckboxGroup"],
    description:
      "Holds the array of values behind a set of checkboxes, including the select-all parent.",
    examples: [
      {
        demo: "checkbox-group/basic",
        title: "Basic",
        description:
          "Children take a `value`; the group owns the array. Disabling the group disables every box, with no per-box prop.",
      },
      {
        demo: "checkbox-group/with-parent",
        title: "Select all",
        description:
          "`allValues` on the group plus `parent` on one checkbox gives select-all for free — the parent derives checked/indeterminate itself.",
      },
      {
        demo: "checkbox-group/filters",
        title: "Filter bar",
        description:
          "Controlled with `value` and `onValueChange` when something outside the group reads the selection — a count, a clear button, a query. `flex-row flex-wrap` on the group is the whole layout change.",
      },
      {
        demo: "checkbox-group/validation",
        title: "With validation",
        description:
          "`FieldError` renders nothing until it has content, so it can sit in the markup unconditionally, and `aria-invalid` on each box is what carries the destructive border and ring — the group has no invalid state of its own.",
      },
    ],
    wiring:
      "The select-all relationship is the real logic to wire: a parent checkbox's checked/indeterminate state has to be derived from whether its children are all, some, or none checked, and toggling the parent has to check or uncheck every child in turn. `data-disabled` cascading from the group to every child, and the group's own array of checked values, are the binding's responsibility too.",
  },
  {
    slug: "switch",
    name: "Switch",
    category: "Forms",
    exports: ["Switch"],
    description:
      "An on/off toggle for a setting that applies as soon as it changes.",
    examples: [
      {
        demo: "switch/basic",
        title: "States and sizes",
        description:
          "Square like everything else: the thumb translates rather than sliding along a pill, so there is no radius to keep in sync.",
      },
      {
        demo: "switch/in-settings",
        title: "Settings rows",
        description:
          '`FieldContent` first with `orientation="horizontal"` is the settings row — text takes the space, control pinned to the far edge.',
      },
      {
        demo: "switch/master-toggle",
        title: "Master toggle",
        description:
          "Controlled with `checked` and `onCheckedChange` when one switch governs the others. The children stay mounted and go `disabled` rather than disappearing, so the row heights do not jump.",
      },
      {
        demo: "switch/in-toolbar",
        title: "Toolbar filter",
        description:
          '`size="sm"` is the dense pairing — a switch reading as one word of chrome in a bar, where a checkbox would read as part of a form.',
      },
    ],
    wiring:
      "The real root is a `role=\"switch\"` button that IS the track (`data-checked`/`data-unchecked`, no hidden input), so a from-scratch binding must wire its own click/Space/Enter handler that flips those two data attributes and, if the value needs to reach a native form, add a hidden input itself — Base UI's switch doesn't render one. `<ds-switch>` does not cover this: it renders the older grammar entirely (a `<label>` wrapping a real checkbox `<input>` plus a `.ds-switch__track` span), and while `switch.css` disambiguates the shared `.ds-switch` class name by `:has(> .ds-switch__track)`, the two are different DOM shapes with a different state model.",
  },
  {
    slug: "slider",
    name: "Slider",
    category: "Forms",
    exports: ["Slider"],
    description: "Picks a number, or a range, by dragging along a track. Use `Number Field` when the exact figure matters.",
    examples: [
      {
        demo: "slider/basic",
        title: "Basic",
        description:
          "The component counts thumbs from the value's shape, so a number gives one thumb and an array gives one per entry.",
      },
      {
        demo: "slider/range",
        title: "Range",
        description:
          "An array value gives two thumbs and an indicator between them. The callback hands back the whole array, so the readout reads both ends from state rather than tracking a thumb.",
      },
      {
        demo: "slider/stepped",
        title: "Stepped scale",
        description:
          "`min`, `max` and `step` turn the track into named notches — the value is an index into the labels, and the flush thumb keeps the first and last notch over the first and last label.",
      },
      {
        demo: "slider/vertical",
        title: "Vertical faders",
        description:
          '`orientation="vertical"` needs no height of its own — the control carries `min-h-40`. `flex-1` inside a fixed-height column is what makes a bank of faders agree on one height and still leave room for their labels.',
      },
    ],
    wiring:
      "A from-scratch binding has to implement the drag/click interaction itself: computing a thumb's value from pointer position along the track, updating `aria-valuenow` (and `aria-valuemin`/`aria-valuemax`) on the active `.ds-slider-thumb`, and repositioning `.ds-slider-range`'s fill to match. Arrow/Home/End/PageUp/PageDown key-stepping on a focused thumb, and — for a two-thumb range — keeping the low thumb from crossing the high one, are Base UI behavior with no CSS equivalent.",
  },
  {
    slug: "input-group",
    name: "Input Group",
    category: "Forms",
    exports: [
      "InputGroup",
      "InputGroupAddon",
      "InputGroupButton",
      "InputGroupText",
      "InputGroupInput",
      "InputGroupTextarea",
      "inputGroupAddonVariants",
    ],
    description:
      "Puts icons, addons and buttons inside an input's own border.",
    examples: [
      {
        demo: "input-group/addons",
        title: "Addons",
        description:
          "Clicking an addon focuses the input — the addon forwards the click unless you land on a button inside it.",
      },
      {
        demo: "input-group/with-buttons",
        title: "With buttons",
        description:
          "`InputGroupButton` is a Button with its own size scale, sized to sit inside the field rather than beside it.",
      },
      {
        demo: "input-group/in-field",
        title: "In a field",
        description:
          "The group replaces the control, not the row: label, description and error still come from `Field`. Only the control takes `aria-invalid` — the group's `has-[[data-slot][aria-invalid=true]]` selector is what carries the destructive rule across the whole box.",
      },
      {
        demo: "input-group/block-align",
        title: "Stacked addons",
        description:
          "`block-start` / `block-end` stack the addon above or below and switch the group to a column, which is what turns it into a composer.",
      },
    ],
    parts: {
      InputGroup:
        "Owns the border, the focus rule and the invalid rule, all as `has-*` selectors — state lives on the control and the box reacts to it. Its `h-10` holds until a textarea or a block-aligned addon is present, which releases it to `h-auto`.",
      InputGroupAddon:
        "Clicking it focuses the group's input, unless the click landed on a button inside. `align` sets the flex order rather than a position, so where the addon sits in your JSX does not matter — but the two block alignments also turn the group into a column.",
      InputGroupInput:
        'Input with its own border and ring removed and `data-slot="input-group-control"` set, which is the hook the group\'s focus rule looks for — a bare `Input` in its place leaves the group unable to show focus.',
      InputGroupTextarea:
        "The multi-line control, and its presence is what releases the group's fixed height, so the box grows with the message.",
      InputGroupButton:
        'A ghost Button at `xs` with its own size scale (`xs`, `sm`, `icon-xs`, `icon-sm`) tuned to fit inside the field. It defaults to `type="button"`, so an icon-only one still needs an `aria-label`.',
      InputGroupText:
        "Muted text for a unit, prefix or suffix. It carries no `data-slot`, so the group treats it as decoration rather than as the control it reacts to.",
    },
  },
  {
    slug: "card",
    name: "Card",
    category: "Data display",
    exports: [
      "Card",
      "CardMedia",
      "CardHeader",
      "CardTitle",
      "CardDescription",
      "CardAction",
      "CardContent",
      "CardBlock",
      "CardFooter",
    ],
    description:
      "A bordered surface with header, content and footer slots. Use `Panel` for a flat region that belongs to the page.",
    examples: [
      {
        demo: "card/basic",
        title: "Basic",
        description:
          "Title, description, content — the minimum useful card. No rules are drawn: the header takes its bottom rule only with `ruled`, so an undivided card is spaced by its parts' own padding alone.",
      },
      {
        demo: "card/with-action",
        title: "With header action",
        description:
          "`CardAction` is positioned by the header grid, so it stays top-right without absolute positioning. The header grows that second column only when an action is present, which is why a card without one needs no change.",
      },
      {
        demo: "card/stat",
        title: "Stat card",
        description:
          "The dashboard tile built from Card's own slots: description as the label, title as the figure. Titles use the Ufficio heading face; figures use tabular digits. Reach for `Stat Card` once the tile also wants a delta or a sparkline.",
      },
      {
        demo: "card/media",
        title: "With cover media",
        description:
          "`CardMedia` bleeds to the edges — the root's `overflow: hidden` clips it to the border. Pass `src` for the common case and it renders the `img` itself; pass children and it wraps them, which is how an `AspectRatio` gets in.",
      },
      {
        demo: "card/blocks",
        title: "Divided blocks",
        description:
          "`CardBlock` is the stacked region: each one draws a soft rule above it and the first drops its own, so a list of key/value lines needs no separators of its own.",
      },
      {
        demo: "card/with-chart",
        title: "With a chart",
        description:
          "`CardContent` is horizontal padding and nothing else — no height, no gap — so the `ChartContainer` brings its own `h-40 w-full`. Left to itself the chart's `aspect-video` would decide how tall the card is.",
      },
    ],
    parts: {
      CardMedia:
        "Full-bleed by design, and the only part with no inner padding. `src` renders the image itself; children are wrapped instead, which is what lets an `AspectRatio` reserve the height before the image arrives.",
      CardBlock:
        "A stacked region with a soft rule above it. The first one drops its rule, so blocks can be mapped without an index check.",
      Card: "Owns `--ds-card-pad-x` / `--ds-card-pad-y`, which every part reads for its padding, and `size` is the one knob that rewrites them. `overflow: hidden` is deliberate: it lets `CardMedia` reach the edges and keeps anything else from escaping them. `clickable` is a prop rather than a part because it is what the whole card *is* — it carries the `tabIndex` and the `role` with it.",
      CardHeader:
        "A grid rather than a stack — it grows a second column when a `CardAction` is present and a second row when a `CardDescription` is, so neither needs a wrapper. `ruled` draws the bottom rule.",
      CardTitle:
        "Type styles only: heading face, uppercase, tracked out, with no padding and no heading element of its own. Add an `h2` or `h3` when the level matters to the page outline.",
      CardDescription:
        "Its presence is what grows the header's second row — the rule is a `:has()` on its `data-slot`, so the description can sit inside a wrapper and the row still appears.",
      CardAction:
        "Placed by the header grid at row 1, column 2 — top-right with no absolute positioning, and nothing outside a `CardHeader`.",
      CardContent:
        "Horizontal padding and nothing else. It sets no height and no gap, so a chart, a list or a form brings its own.",
      CardFooter:
        "A flex row on the alt background with its own top rule, pushed to the bottom of the card. Items are start-aligned, so a pair of buttons that belong at the end needs a justification of your own.",
    },
  },
  {
    slug: "badge",
    name: "Badge",
    category: "Data display",
    exports: ["Badge", "badgeVariants"],
    description: "A compact, uppercase status or category label with no box. `Tag` is the boxed, tinted version.",
    examples: [
      {
        demo: "badge/variants",
        title: "Variants",
        description:
          "Badge here is typographic, not a pill — no border, fill or padding. The variants change colour only, so it sits inline in running text.",
      },
      {
        demo: "badge/with-icon",
        title: "With an icon",
        description:
          "Keep a glyph small enough not to outweigh the uppercase label beside it — 12px is the size the badge next door uses.",
      },
      {
        demo: "badge/in-context",
        title: "In a list",
        description: "Where badges usually live: the status column of a row.",
      },
    ],
  },
  {
    slug: "status",
    name: "Status",
    category: "Data display",
    exports: [
      "Status",
      "StatusIndicator",
      "StatusLabel",
      "StatusPanel",
      "Metric",
      "statusVariants",
    ],
    description:
      "A coloured dot and a word, for the state of one thing. Six tones.",
    examples: [
      {
        demo: "status/tones",
        title: "Tones",
        description:
          "The six tones of the shared family. The dot and label share one `--tone` variable, so they never drift from each other.",
      },
      {
        demo: "status/pulse",
        title: "Pulse",
        description:
          "`pulse` lives on `StatusIndicator`, not `Status` — a live state can still pair with a static label, and the ping only runs under `motion-safe`.",
      },
      {
        demo: "status/in-service-list",
        title: "In a service list",
        description:
          "Where statuses earn their keep: a column of them scans in one pass. The root is `inline-flex`, so it drops into a row without a wrapper.",
      },
      {
        demo: "status/panel",
        title: "Status panel",
        description:
          "`StatusPanel` is 0.11's signature component and a different thing entirely — a solid coloured head over a body of `Metric` rows. It kept the `.ds-status` class stem, because `<ds-status>` writes it; the two are told apart in CSS by whether the element has a `__head`.",
      },
    ],
    parts: {
      Status:
        "Sets `--tone` and nothing else — both parts read it, so a part rendered outside a Status comes out uncoloured.",
      StatusIndicator:
        "`aria-hidden`, so colour is never the only cue — the label carries the meaning. `pulse` belongs here, not on the root.",
      StatusLabel:
        "Bare text at `--tone`. Fading it with opacity re-opens the contrast failure the `-ink` tones were chosen to fix.",
      StatusPanel:
        "0.11's signature panel, renamed from `Status` in `1.0.0-beta.7` when the inline indicator took that name. `<ds-status>` is unchanged and still renders this one, so no consumer of the web component has to move. Still a prop bag — `kicker`, `heading`, `subtitle` — because the head is one fixed shape, not a composition.",
      Metric:
        "The row that fills a StatusPanel's body: a key on the left, a figure on the right, ruled between. `sign` colours the figure — positive success, negative danger — and `variant` sets the hierarchy, `hero` for the one number the panel is about.",
    },
  },
  {
    slug: "tag",
    name: "Tag",
    category: "Data display",
    exports: ["Tag", "tagVariants"],
    description:
      "A boxed, tinted label in six tones. Absorbs v1's Chip, whose `warn` boolean is now `tone=\"warning\"`.",
    examples: [
      {
        demo: "tag/tones",
        title: "Tones",
        description:
          "The six tones of the shared family. Each sets `--tone-bg` and `--tone-ink` together — v1's boolean `warn` axis is the `warning` tone here.",
      },
      {
        demo: "tag/in-context",
        title: "In a list",
        description:
          "Where tags usually live: the status column of a row. The root is inline and never stretches to the row.",
      },
      {
        demo: "tag/with-icon",
        title: "With a leading icon",
        description:
          "The root's `gap-1.5` is there for a glyph. Keep the icon `aria-hidden` — the word carries the meaning, so the tag still reads without it.",
      },
    ],
  },
  /* -- Layout ------------------------------------------------------------ */
  {
    slug: "panel",
    name: "Panel",
    category: "Layout",
    exports: [
      "Panel",
      "PanelHeader",
      "PanelTitle",
      "PanelContent",
      "PanelFooter",
      "PanelRow",
    ],
    description:
      "A flat, bordered section container — Card without the elevation — plus a row part for settings lists.",
    examples: [
      {
        demo: "panel/basic",
        title: "Basic",
        description:
          "A self-contained summary block: header, prose content, one footer action. Rules are opt-in through `ruled` on the header and the footer — a modifier this package defines, rather than a Tailwind utility it does not.",
      },
      {
        demo: "panel/rows",
        title: "Settings rows",
        description:
          "The settings-page shape: `PanelRow` packs each label-and-control pair into a divided list. Rows carry their own padding, so PanelContent passes `px-0` rather than stacking the two.",
      },
      {
        demo: "panel/form-section",
        title: "Form section",
        description:
          "A form group with its actions kept inside the boundary: fields in PanelContent, cancel/save in a ruled PanelFooter — the footer earns its keep instead of decorating.",
      },
    ],
    parts: {
      Panel:
        "Carries the panel's padding itself. `<ds-panel>` renders arbitrary children with no parts at all, so the padding cannot live on them.",
      PanelHeader:
        "`ruled` draws the bottom rule and the padding that goes with it, so a header without one stays tight.",
      PanelTitle:
        "Type styles only, with no padding of its own — that is why it sits inside PanelHeader. Add your own heading element when the level matters.",
      PanelContent:
        "Horizontal padding and nothing else. Pass `px-0` when the children carry their own, as PanelRow does.",
      PanelFooter:
        "Mirrors the header: `ruled` draws the top rule and its padding.",
      PanelRow:
        "Carries its own padding and divider; the last row drops its rule so it does not double up with the footer's.",
    },
  },

  /* -- Batch 8 — defect swaps ------------------------------------------- */
  /* Three of these five replace an incumbent whose measured accessibility
     defect earned the swap, and each of the three owes a regress spec:
     tooltip (never announced), drawer + sheet (no focus trap, no portal),
     kanban (no keyboard path at all). skeleton was the cross-boundary pin —
     its stylesheet held for DataGrid's sake until batch 13 (#46) removed
     DataGrid and the pin along with it; skeleton.css is now source's file
     outright, no accommodation needed. */
  {
    slug: "kanban",
    name: "Kanban",
    category: "Data display",
    exports: ["Kanban", "KanbanCardTitle"],
    description:
      "A board of columns whose cards move between them by drag or by arrow key.",
    examples: [
      {
        demo: "kanban/basic",
        title: "Basic",
        description:
          "`columns` names the lanes, `defaultItems` seeds the cards, and each card's `column` says where it starts. With no `renderCard` the card falls back to the item's `title`. Shipped starts empty and still accepts a drop, because the column body is a drop target in its own right.",
      },
      {
        demo: "kanban/card-content",
        title: "Card content",
        description:
          "`renderCard` fills the card body and nothing else — the board keeps the surface and the grip, so a card carrying its own badges or buttons never competes with the drag. Compose `KanbanCardTitle` back in to keep the heading matching the default.",
      },
      {
        demo: "kanban/controlled",
        title: "Controlled board",
        description:
          "`items` with `onItemsChange` hands the order to the caller; `onMove` fires alongside it, but only when the card actually changed column — a reorder inside one lane updates the array without reporting a move, which is what keeps `onMove` mapping one-to-one onto a persisted status change. Reach for `defaultItems` when the board can own its own order.",
      },
    ],
    parts: {
      Kanban:
        "Owns the card order. Seed it with `defaultItems` and it manages itself; pass `items` and it defers to you completely — which means passing `items` without also handling `onItemsChange` freezes the board.",
      KanbanCardTitle:
        "Type styles only, and what the card falls back to when no `renderCard` is given. `renderCard` replaces the whole body, so compose this back in when the heading should still match.",
    },
    wiring:
      "The board's real interaction is accessible drag-and-drop: a pointer drag *and* a keyboard path through the same grip button (Space lifts, arrow keys move the card across columns, Space drops, Escape cancels), plus live-region announcements at each transition. A from-scratch binding has to build that whole lift/move/drop state machine itself — plain HTML5 drag-and-drop, what this replaced, has no keyboard route at all.",
  },
  {
    slug: "skeleton",
    name: "Skeleton",
    category: "Data display",
    exports: ["Skeleton"],
    description: "A pulsing placeholder block for content that has not loaded yet.",
    examples: [
      {
        demo: "skeleton/basic",
        title: "Basic",
        description:
          "Size and shape are entirely the caller's: the component contributes the pulse and the muted fill.",
      },
      {
        demo: "skeleton/matching-layout",
        title: "Matching the real layout",
        description:
          "Reusing the loaded row's wrapper and swapping only the text is what keeps both states the same height and kills the layout jump.",
      },
      {
        demo: "skeleton/table-rows",
        title: "Table body",
        description:
          "The header stays real and only the cells are placeholders, so the columns are already sized when the rows arrive. Bar widths come from the column list rather than being uniform, which is what stops the block reading as a grid of identical dashes.",
      },
      {
        demo: "skeleton/announced",
        title: "Announcing the wait",
        description:
          'Skeleton has no ARIA of its own: `aria-busy` on the region plus one `role="status"` line says what is loading, and the bars go `aria-hidden` so a screen reader never walks a wall of empty divs.',
      },
    ],
  },
  {
    slug: "sheet",
    name: "Sheet",
    category: "Overlays",
    exports: [
      "Sheet",
      "SheetTrigger",
      "SheetClose",
      "SheetContent",
      "SheetHeader",
      "SheetFooter",
      "SheetTitle",
      "SheetDescription",
    ],
    description:
      "A panel that slides in from an edge, with Dialog's modal behaviour.",
    examples: [
      {
        demo: "sheet/sides",
        title: "Sides",
        description:
          "`side` drives position, border edge and enter/exit transform from one `data-side` attribute.",
      },
      {
        demo: "sheet/detail",
        title: "Detail panel",
        description:
          "The inspector shape: a header that stays, a body that scrolls, a footer that acts. `SheetContent` never scrolls itself, so the scroll region is the body — `min-h-0 flex-1 overflow-y-auto`, with its own `px-8` since only the header and footer are padded.",
      },
      {
        demo: "sheet/with-form",
        title: "With a form",
        description:
          "`SheetFooter` carries `mt-auto`, so it pins to the bottom however short the body is. Note the header and footer pad themselves — the body does not.",
      },
      {
        demo: "sheet/navigation",
        title: "Navigation menu",
        description:
          "The narrow-screen menu, opened from the left. Each link is a `SheetClose` rendered as an `a`, so following it dismisses the sheet in the same click and there is no open state to reset by hand. `nativeButton={false}` is what keeps it a real link — the same escape hatch `PaginationLink` uses.",
      },
    ],
    parts: {
      SheetContent:
        "Mounts its own portal and overlay, and reads `side` for position, border edge and transform. It is a flex column that never scrolls itself — a long body needs `min-h-0 flex-1 overflow-y-auto`.",
      SheetHeader:
        "Carries its own `p-8`. Whatever sits between header and footer has no padding at all, so repeat `px-8` on the body to keep the column aligned.",
      SheetFooter:
        "`mt-auto` pins it to the bottom however short the body is, and it stacks as a column — the primary action goes first in source order.",
      SheetTitle:
        "Supplies the panel's accessible name, so keep the part even when the design shows no visible heading.",
    },
    wiring:
      "A binding has to trap focus inside the open panel (Tab/Shift+Tab cycling within it), move focus into the panel on open and restore it to the trigger on close, and close on Escape or backdrop click. It also needs to lock body scroll while open and drive the slide transition off an open/closed state on the overlay and panel.",
  },
  {
    slug: "drawer",
    name: "Drawer",
    category: "Overlays",
    exports: [
      "Drawer",
      "DrawerTrigger",
      "DrawerPortal",
      "DrawerOverlay",
      "DrawerSwipeHandle",
      "DrawerClose",
      "DrawerContent",
      "DrawerHeader",
      "DrawerFooter",
      "DrawerTitle",
      "DrawerDescription",
    ],
    description:
      "A bottom sheet that follows the finger, with drag-to-dismiss and snap points. Tuned for touch.",
    examples: [
      {
        demo: "drawer/basic",
        title: "Basic",
        description:
          "`showSwipeHandle` adds the grab affordance. Everything else about the geometry follows `swipeDirection`.",
      },
      {
        demo: "drawer/directions",
        title: "Directions",
        description:
          "There is no `side` prop: `swipeDirection` is the single source of truth, and the axis, edge, border and closed transform all derive from it.",
      },
      {
        demo: "drawer/snap-points",
        title: "Snap points",
        description:
          "With snap points the popup takes full viewport height and the snap offset moves it — which is why the sizing rules switch on `data-snap-points`.",
      },
      {
        demo: "drawer/non-modal",
        title: "Non-modal",
        description:
          "`modal={false}` skips the overlay and the scroll lock and leaves the viewport pointer-transparent, so the page behind stays scrollable and clickable. The shape for a tray that reports on background work rather than interrupting it.",
      },
    ],
    parts: {
      Drawer:
        "Owns the geometry: `swipeDirection`, `snapPoints`, `modal` and `showSwipeHandle` all sit here and reach the content through context — a content part rendered outside a Drawer throws rather than falling back.",
      DrawerContent:
        "Renders the viewport and, only when `modal` is true, the overlay. With snap points the popup takes the full viewport height and the snap offset moves it, which is why the sizing rules switch on `data-snap-points`.",
      DrawerSwipeHandle:
        "`DrawerContent` renders it for you when the root has `showSwipeHandle`, so compose it directly only inside a custom content. It is `aria-hidden`: dragging is a pointer affordance, and Escape is the keyboard equivalent.",
      DrawerHeader:
        "Centres its text on vertical drawers and goes start-aligned from `md` up — a bottom sheet's title reads as a centred label on a phone and as a heading on a desktop.",
    },
    wiring:
      "Beyond open/close (trigger → portal + overlay + popup, closed by the close control, Escape, or a backdrop click when `modal`), the real behavior to reproduce is the swipe gesture: dragging the popup along the `swipeDirection` axis and snapping to each of `snapPoints` on release. A binding also has to trap focus inside the popup while open — 0.11's own drawer never implemented that, so there's no incumbent code to copy.",
  },
  {
    slug: "tooltip",
    name: "Tooltip",
    category: "Overlays",
    exports: ["Tooltip", "TooltipTrigger", "TooltipContent", "TooltipProvider"],
    description:
      "A short label shown on hover or focus. Never put interactive content in one.",
    examples: [
      {
        demo: "tooltip/basic",
        title: "Basic",
        description:
          "`TooltipProvider` shares one delay across its subtree, so a row of icon buttons doesn't re-arm the timer per button.",
      },
      {
        demo: "tooltip/sides",
        title: "Sides and shortcuts",
        description:
          "Prefer the logical sides `inline-start` / `inline-end`, which follow direction, over the physical `left` / `right`. A nested `Kbd` restyles to invert against the dark surface.",
      },
      {
        demo: "tooltip/truncated",
        title: "Clipped labels",
        description:
          "The overflow escape hatch: narrow rows clip with `truncate` and the tooltip carries the full string. `render` puts the trigger on the row's own button, which is what keeps the label reachable by keyboard rather than by pointer alone.",
      },
    ],
    parts: {
      TooltipProvider:
        "Optional, and it changes the timing: it defaults `delay` to 0, where a provider-less trigger waits Base UI's 600ms. Wrap the group of tooltips that should share one delay, not the whole app.",
      TooltipTrigger:
        "`delay` and `closeDelay` are trigger props, so one control can be slower than the rest of its group. A tooltip on a `disabled` element never opens — the element emits no pointer events.",
      TooltipContent:
        "Renders the portal, positioner and arrow together, so positioning props belong here. A nested `Kbd` is re-styled and the trailing padding tightened by the popup's own `data-[slot=kbd]` rules — nothing to pass.",
    },
    wiring:
      "Base UI's tooltip, per `docs/absorption/corrections.md`'s batch-8 row, wires none of `aria-describedby`/`role=\"tooltip\"` — a from-scratch binding gets no automatic ARIA association and must give the trigger its own accessible name that matches the popup's text. What it does have to wire itself: a shared open delay, Escape-to-dismiss, and keeping the popup open while the pointer moves from the trigger into it (a hoverable popup, not a `mouseleave`-closes-immediately one).",
  },
]

export const CATEGORIES = [
  "Actions",
  "Forms",
  "Data display",
  "Navigation",
  "Layout",
  "Disclosure",
  "Overlays",
  "Feedback",
  "Conversation",
  "Utilities",
]

/**
 * The entries waiting on their absorption batch, kept here rather than deleted:
 * the prose is measured work, and a batch that lands a component wants its page
 * copy already written. Nothing reads this array — it is a holding pen, and the
 * batch that lands a slug moves its entry into `COMPONENTS` above.
 */
export const PENDING: ComponentDoc[] = [
  {
    slug: "stat-card",
    name: "Stat Card",
    category: "Data display",
    description:
      "A single headline figure, with an optional signed delta and sparkline.",
    examples: [
      {
        demo: "stat-card/basic",
        title: "Basic",
        description:
          "Label and figure only, which is most of the use. The tiles take their width from the row, not from the component.",
      },
      {
        demo: "stat-card/with-delta",
        title: "With a delta",
        description:
          "The arrow is `aria-hidden` — the signed figure carries the direction, so colour is never the only cue. `direction` uses the `-ink` tones, the text-weight values that pass AA on both themes.",
      },
      {
        demo: "stat-card/with-spark",
        title: "With a sparkline",
        description:
          "The spark is a trend hint, not a chart: no axes, no tooltip. `StatCardSpark` is a bare slot, so a hand-drawn polyline needs no chart dependency — reach for `chart` when values must be read.",
      },
    ],
    parts: {
      StatCard:
        "Border, surface and padding, with no width of its own — the grid around it decides the size.",
      StatCardLabel:
        "The caption, not a heading: uppercase and muted at 11px, and it takes no heading element.",
      StatCardValue:
        "Heading face and `tabular-nums`. Its `mt-2` is what separates it from the label, so a card without one closes up on its own.",
      StatCardDelta:
        "`direction` is the whole axis and it draws the arrow itself — pass the signed figure as children so the direction survives without colour.",
      StatCardSpark:
        "A slot with a top margin and nothing else. Keep whatever goes in it `aria-hidden`; the figure above already carries the number.",
    },
  },
] as const

export function componentsByCategory() {
  return CATEGORIES.map((category) => ({
    category,
    items: COMPONENTS.filter((component) => component.category === category),
  })).filter((group) => group.items.length > 0)
}

export function findComponent(slug: string) {
  return COMPONENTS.find((component) => component.slug === slug)
}

/**
 * The barrel is the only supported React entry — `./react/*` was demoted in
 * batch 0.1 — so every page's import line names the same path. A constant
 * rather than a per-slug function: the slug no longer appears in it.
 */
export const IMPORT_PATH = "@diametral/design-system/react"

/** Stable in-page anchor so an individual usage can be linked, e.g. #tones. */
export function exampleAnchor(example: Example) {
  return example.demo.split("/").slice(1).join("-")
}

/**
 * The heading a demo renders under: its curated title, or the file name for a
 * demo no entry documents. Shared so the anatomy index can name the section a
 * part is shown in and be naming the same words the reader will scroll to.
 */
export function exampleTitle(key: string, examples: Example[] = []) {
  const documented = examples.find((example) => example.demo === key)
  return documented?.title ?? key.split("/").slice(1).join(" ")
}
