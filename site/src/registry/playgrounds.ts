/**
 * Playground declarations. Variant axes are NOT listed here — they are parsed
 * out of each component's `cva()` block at build time, so adding a ninth button
 * tone needs no edit to this file. What lives here is only what cva cannot know:
 * which const to bind to, and the plain props (booleans, text) worth exposing.
 *
 * `variantsFrom` is validated at build time: a name that no longer resolves
 * fails the build rather than rendering an empty panel.
 */

/**
 * `always` prints the prop even when it still holds the first option's value.
 * Needed for props the component *requires* — `AspectRatio`'s `ratio`, a meter's
 * `value` — where omitting it at the default would emit code that does not
 * compile. Optional props should leave it off so an untouched panel prints clean.
 */
/**
 * A plain string is both the value and its own label. `{ value, label }` splits
 * them — e.g. the real component name as the value the code prints (`GearIcon`)
 * against a shorter label the panel shows (`Gear`).
 */
export type SelectOption = string | { value: string; label: string }

/**
 * A `YYYY-MM-DD HH:mm:ss` stamp in local time — the shape a SQL `updated_at`
 * arrives in. Local rather than UTC because a value carrying no zone is read as
 * local, so a UTC stamp here would render hours off for anyone outside UTC.
 *
 * Fixed at module load: the Relative Time panel needs a start that is recent
 * whenever the page is opened, and one that holds still while the panel is
 * driven.
 */
function sqlStamp(date: Date) {
  const pad = (part: number) => String(part).padStart(2, "0")
  return (
    `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())} ` +
    `${pad(date.getHours())}:${pad(date.getMinutes())}:${pad(date.getSeconds())}`
  )
}

export const TWELVE_MINUTES_AGO = sqlStamp(new Date(Date.now() - 12 * 60_000))

export type Control =
  | { prop: string; type: "boolean"; label?: string; always?: boolean }
  | {
      prop: string
      type: "text"
      label?: string
      placeholder?: string
      /**
       * Starting value, for props the component *requires* — without one a text
       * control starts empty, which prints nothing and leaves the snippet short
       * of a prop the preview is plainly rendering. Clearing the field returns
       * to it, since an empty required prop is not a state worth holding.
       */
      default?: string
      always?: boolean
    }
  | {
      prop: string
      type: "select"
      options: SelectOption[]
      label?: string
      always?: boolean
      /**
       * The value names a component rather than a prop value: it is substituted
       * into the playground's `{prop}` marker as `<Value />` instead of being
       * printed as an attribute. The playground file must render the matching
       * component itself — the panel only passes the name through.
       */
      marker?: "element"
    }

export type PlaygroundConfig = {
  /** Name of the cva const in `packages/ui/src/components/<slug>.tsx`. */
  variantsFrom?: string
  /** Props the cva block has no knowledge of. */
  extras?: Control[]
  /**
   * Editable text content. The playground file must place a `{children}` marker
   * where it belongs — which need not be on the subject itself: Marker puts it
   * inside MarkerContent, Checkbox inside its Label.
   */
  children?: { default: string; label?: string }
  /**
   * Additional editable text markers beyond `children` — each key needs its own
   * literal `{key}` marker in the playground's JSX. Tracked in the generated
   * snippet exactly like `children` is.
   */
  texts?: Record<string, { default: string; label?: string }>
  /** Shown above the controls when the subject needs explaining. */
  note?: string
}

export const PLAYGROUNDS: Record<string, PlaygroundConfig> = {
  /* -- Variant-driven ---------------------------------------------------- */
  button: {
    children: { default: "Save changes" },
    variantsFrom: "buttonVariants",
    extras: [{ prop: "disabled", type: "boolean" }],
  },
  badge: {
    children: { default: "In review" },
    variantsFrom: "badgeVariants",
  },
  alert: {
    children: { default: "Heads up", label: "title" },
    variantsFrom: "alertVariants",
  },
  toggle: {
    variantsFrom: "toggleVariants",
    extras: [
      { prop: "disabled", type: "boolean" },
      { prop: "defaultPressed", type: "boolean", label: "pressed" },
    ],
  },
  marker: {
    children: { default: "Verified" },
    variantsFrom: "markerVariants",
  },
  item: {
    children: { default: "charter.pdf", label: "title" },
    variantsFrom: "itemVariants",
  },
  bubble: {
    children: { default: "How do I theme this?", label: "message" },
    variantsFrom: "bubbleVariants",
    note: "Controls drive the Bubble inside a BubbleGroup.",
  },
  attachment: {
    children: { default: "charte-diametral.pdf", label: "title" },
    variantsFrom: "attachmentVariants",
  },
  empty: {
    children: { default: "No documents", label: "title" },
    variantsFrom: "emptyMediaVariants",
    note: "The only axis in empty.tsx belongs to EmptyMedia, so the controls drive the media slot.",
  },
  tabs: {
    variantsFrom: "tabsListVariants",
    note: "The axis belongs to TabsList, not Tabs.",
  },
  sidebar: {
    children: { default: "Dashboard", label: "label" },
    variantsFrom: "sidebarMenuButtonVariants",
    note: "The axis belongs to SidebarMenuButton.",
    extras: [{ prop: "isActive", type: "boolean" }],
  },
  "input-group": {
    children: { default: "Send", label: "button" },
    variantsFrom: "inputGroupAddonVariants",
    note: "The axis belongs to InputGroupAddon — it positions the addon within the group, and the two block alignments turn the group into a column.",
  },
  "button-group": {
    variantsFrom: "buttonGroupVariants",
  },
  "icon-button": {
    note: "The axes belong to `Button` and are forwarded, so they are listed here rather than parsed — icon-button.tsx declares no cva of its own. `label` is deliberately not drivable: a control whose whole point is having an accessible name should not be steerable into having none.",
    extras: [
      {
        prop: "variant",
        type: "select",
        options: ["default", "outline", "secondary", "ghost", "destructive"],
      },
      {
        prop: "size",
        type: "select",
        options: ["icon", "icon-xs", "icon-sm", "icon-lg"],
      },
      {
        prop: "tone",
        type: "select",
        options: ["black", "red", "green", "blue", "yellow"],
      },
      { prop: "disabled", type: "boolean" },
    ],
  },
  agenda: {
    note: "`events` carries nodes and Dates, so the two-day list is fixed here. `locale` drives the day headings only — the time column is your own string, printed as given. Leaving it on the em dash follows the browser.",
    extras: [
      {
        prop: "locale",
        type: "select",
        options: ["—", "en-GB", "en-US", "fr", "de", "ja"],
      },
    ],
  },
  "date-time-picker": {
    note: "Pick a day first: the clock stays inert until the calendar has answered, rather than inventing today. `step` snaps the minutes down on commit. `min`/`max` take Dates, so they are shown in the Bounded example rather than driven here.",
    extras: [
      { prop: "step", type: "select", options: ["5", "1", "15", "30"] },
      {
        prop: "datePlaceholder",
        type: "text",
        placeholder: "Pick a date",
        label: "placeholder",
      },
      { prop: "disabled", type: "boolean" },
    ],
  },
  "color-picker": {
    note: "Drive it in the preview: the swatches, the hex field and the native picker all converge on one value. `defaultValue` is absent from the panel because it seeds the uncontrolled state once — changing it after mount would move nothing. The hex field holds a partial value while you type and commits only once it parses, which is why the selected ring does not follow every keystroke.",
    extras: [
      { prop: "name", type: "text", placeholder: "tagColour" },
      { prop: "disabled", type: "boolean" },
    ],
  },
  wizard: {
    note: "`steps` carries nodes, so the three-step flow is fixed here — drive it with Back and Next in the preview. `defaultActive` is deliberately absent: it seeds the uncontrolled state once, so a panel changing it after mount would move nothing.",
    extras: [
      { prop: "backLabel", type: "text", default: "Back", label: "back" },
      { prop: "nextLabel", type: "text", default: "Next", label: "next" },
      {
        prop: "finishLabel",
        type: "text",
        default: "Finish",
        label: "finish",
      },
    ],
  },
  "split-button": {
    children: { default: "Save", label: "main action" },
    note: "The menu items are fixed here — `menu` takes nodes, not a value a panel can produce. `variant`, `size` and `tone` reach both halves, which is what keeps the seam invisible.",
    extras: [
      { prop: "disabled", type: "boolean" },
      {
        prop: "variant",
        type: "select",
        options: ["default", "outline", "secondary", "ghost"],
      },
      { prop: "size", type: "select", options: ["default", "sm", "lg"] },
      {
        prop: "tone",
        type: "select",
        options: ["black", "red", "green", "blue"],
      },
    ],
  },
  "speed-dial": {
    children: { default: "New invoice", label: "first action" },
    texts: {
      second: { default: "New client", label: "second action" },
      third: { default: "Import CSV", label: "third action" },
    },
    note: "`label` names the trigger, which carries no visible text — it is required, so the panel always prints it. The dial is scoped to the bordered region here: its own default is `fixed end-6 bottom-6`, which a `relative` ancestor plus an `absolute` override replaces. Pin `defaultOpen` to keep the actions on screen while you drive the rest.",
    extras: [
      { prop: "label", type: "text", default: "Create", always: true },
      { prop: "defaultOpen", type: "boolean", label: "open" },
      { prop: "side", type: "select", options: ["top", "bottom"] },
      {
        prop: "tone",
        type: "select",
        options: ["black", "red", "green", "blue"],
      },
    ],
  },
  field: {
    children: { default: "Email me each release", label: "label" },
    texts: {
      legend: { default: "Release notifications", label: "legend" },
      title: { default: "Private previews", label: "card title" },
      error: { default: "Enter a valid email address.", label: "error" },
    },
    extras: [
      {
        prop: "orientation",
        type: "select",
        options: ["vertical", "horizontal", "responsive"],
      },
    ],
    note: "The orientation axis belongs to the first row; the rows below it show the invalid state and the selectable-card shape a FieldLabel takes when it wraps a whole Field.",
  },

  /* -- Declared-only (no cva axis) --------------------------------------- */
  "field-array": {
    texts: {
      label: { default: "Session", label: "entry label" },
      add: { default: "Add a session", label: "add button" },
    },
    note: "Every part is layout only, so there is no variant axis and no prop to drive — what the parts leave you is the arrangement: pass a grid to FieldArrayItemContent, or lift FieldArrayRemove into a header row of its own, as the second example does.",
  },
  input: {
    extras: [
      {
        prop: "type",
        type: "select",
        options: ["text", "email", "password", "number", "date", "file"],
      },
      {
        prop: "placeholder",
        type: "text",
        placeholder: "you@diametral.com",
        default: "you@diametral.com",
      },
      { prop: "disabled", type: "boolean" },
      { prop: "readOnly", type: "boolean" },
      { prop: "aria-invalid", type: "boolean", label: "invalid" },
    ],
  },
  textarea: {
    extras: [
      {
        prop: "placeholder",
        type: "text",
        placeholder: "Say something…",
        default: "Say something…",
      },
      { prop: "rows", type: "select", options: ["1", "2", "3", "5", "8"] },
      { prop: "disabled", type: "boolean" },
      { prop: "aria-invalid", type: "boolean", label: "invalid" },
    ],
  },
  checkbox: {
    children: { default: "Accept the charter", label: "label" },
    extras: [
      { prop: "defaultChecked", type: "boolean", label: "checked" },
      { prop: "indeterminate", type: "boolean" },
      { prop: "disabled", type: "boolean" },
    ],
  },
  switch: {
    children: { default: "Email notifications", label: "label" },
    extras: [
      { prop: "defaultChecked", type: "boolean", label: "checked" },
      { prop: "disabled", type: "boolean" },
    ],
  },
  select: {
    extras: [
      { prop: "disabled", type: "boolean" },
      {
        prop: "defaultValue",
        type: "select",
        options: ["vite", "rolldown", "next", "astro"],
      },
    ],
  },
  avatar: {
    children: { default: "CR", label: "initials" },
    extras: [
      { prop: "size", type: "select", options: ["default", "sm", "lg"] },
    ],
  },
  separator: {
    note: "The row wraps, so a horizontal rule takes its own line while a vertical one stretches beside the labels.",
    extras: [
      {
        prop: "orientation",
        type: "select",
        options: ["horizontal", "vertical"],
      },
    ],
  },
  slider: {
    extras: [
      {
        prop: "orientation",
        type: "select",
        options: ["horizontal", "vertical"],
      },
      { prop: "step", type: "select", options: ["1", "5", "10", "25"] },
      { prop: "disabled", type: "boolean" },
    ],
  },
  rating: {
    extras: [
      { prop: "shape", type: "select", options: ["default", "star"] },
      { prop: "max", type: "select", options: ["5", "10", "3"] },
      { prop: "readOnly", type: "boolean" },
      { prop: "disabled", type: "boolean" },
    ],
  },
  stepper: {
    extras: [
      {
        prop: "orientation",
        type: "select",
        options: ["horizontal", "vertical"],
      },
    ],
  },
  "toggle-group": {
    note: "`variant` and `size` belong to toggleVariants in toggle.tsx, so they are declared here rather than extracted.",
    extras: [
      { prop: "multiple", type: "boolean" },
      {
        prop: "orientation",
        type: "select",
        options: ["horizontal", "vertical"],
      },
      { prop: "spacing", type: "select", options: ["2", "0", "4"] },
      { prop: "variant", type: "select", options: ["default", "outline"] },
      { prop: "size", type: "select", options: ["default", "sm", "lg"] },
    ],
  },
  toolbar: {
    extras: [
      {
        prop: "orientation",
        type: "select",
        options: ["horizontal", "vertical"],
      },
      { prop: "disabled", type: "boolean" },
    ],
  },
  accordion: {
    extras: [
      { prop: "multiple", type: "boolean" },
      { prop: "disabled", type: "boolean" },
    ],
  },
  collapsible: {
    extras: [
      { prop: "defaultOpen", type: "boolean", label: "open" },
      { prop: "disabled", type: "boolean" },
    ],
  },
  resizable: {
    note: "The axis belongs to ResizablePanelGroup, which takes `orientation` — not the `direction` older shadcn snippets pass.",
    extras: [
      {
        prop: "orientation",
        type: "select",
        options: ["horizontal", "vertical"],
      },
    ],
  },
  carousel: {
    extras: [
      {
        prop: "orientation",
        type: "select",
        options: ["horizontal", "vertical"],
      },
    ],
  },
  form: {
    note: "`validationMode` only reaches controls registered by Base UI's own Field.Root, and this system's Field is a plain div — so nothing here validates on its own. Errors are wired by hand through FieldError.",
    extras: [
      {
        prop: "validationMode",
        type: "select",
        options: ["onSubmit", "onBlur", "onChange"],
      },
    ],
  },
  "file-upload": {
    extras: [
      { prop: "multiple", type: "boolean" },
      { prop: "disabled", type: "boolean" },
      { prop: "accept", type: "text", placeholder: ".pdf,.png" },
    ],
  },
  direction: {
    note: "The provider drives Base UI's panels and arrow keys; the `dir` attribute drives the CSS. Set both — the template passes the same value to each.",
    extras: [{ prop: "direction", type: "select", options: ["ltr", "rtl"] }],
  },
  "radio-group": {
    extras: [
      { prop: "disabled", type: "boolean" },
      { prop: "readOnly", type: "boolean" },
      { prop: "required", type: "boolean" },
    ],
  },
  "checkbox-group": {
    extras: [{ prop: "disabled", type: "boolean" }],
  },
  "number-field": {
    texts: { label: { default: "Seats", label: "label" } },
    note: "The label is wrapped in `NumberFieldScrubArea`, so dragging it sideways changes the value — the part has no chrome of its own, only the cursor it renders.",
    extras: [
      { prop: "step", type: "select", options: ["1", "5", "10", "0.5"] },
      { prop: "min", type: "text", placeholder: "0" },
      { prop: "max", type: "text", placeholder: "20" },
      { prop: "disabled", type: "boolean" },
      { prop: "readOnly", type: "boolean" },
    ],
  },
  "input-otp": {
    extras: [
      {
        prop: "maxLength",
        type: "select",
        options: ["6", "4", "8"],
        always: true,
      },
      { prop: "disabled", type: "boolean" },
    ],
  },
  tree: {
    note: "The controls drive one branch: TreeItem is a Collapsible, so open state belongs to it rather than to Tree.",
    extras: [
      { prop: "defaultOpen", type: "boolean", label: "open" },
      { prop: "disabled", type: "boolean" },
    ],
  },
  timeline: {
    children: { default: "Brief received", label: "title" },
    note: "`data-state` and `tone` both go on the item, not the indicator — the indicator styles itself from them.",
    extras: [
      {
        prop: "data-state",
        type: "select",
        options: ["inactive", "completed", "active"],
        label: "state",
      },
      {
        prop: "tone",
        type: "select",
        options: [
          "neutral",
          "info",
          "success",
          "warning",
          "danger",
          "critical",
        ],
      },
    ],
  },
  message: {
    children: { default: "Sent you the export.", label: "message" },
    extras: [{ prop: "align", type: "select", options: ["start", "end"] }],
  },
  pagination: {
    note: "The controls drive one page link; the nav itself takes nothing.",
    extras: [
      { prop: "isActive", type: "boolean" },
      {
        prop: "size",
        type: "select",
        options: ["icon", "default", "sm", "lg"],
      },
    ],
  },

  /* -- Overlays: the subject is the content, so open it to see the effect -- */
  tooltip: {
    children: { default: "Move to archive", label: "content" },
    extras: [
      {
        prop: "side",
        type: "select",
        options: ["top", "bottom", "inline-start", "inline-end"],
      },
      { prop: "align", type: "select", options: ["center", "start", "end"] },
    ],
  },
  popover: {
    children: { default: "Charter tokens", label: "title" },
    extras: [
      {
        prop: "side",
        type: "select",
        options: ["bottom", "top", "inline-start", "inline-end"],
      },
      { prop: "align", type: "select", options: ["center", "start", "end"] },
    ],
  },
  "hover-card": {
    children: { default: "Camille Roux", label: "title" },
    extras: [
      {
        prop: "side",
        type: "select",
        options: ["bottom", "top", "inline-start", "inline-end"],
      },
      { prop: "align", type: "select", options: ["center", "start", "end"] },
    ],
  },
  dialog: {
    children: { default: "Share this component", label: "title" },
    extras: [{ prop: "showCloseButton", type: "boolean" }],
  },
  "alert-dialog": {
    children: { default: "Revoke access?", label: "title" },
    note: '`size="sm"` stays centred at every breakpoint; `default` goes start-aligned from `sm` up.',
    extras: [{ prop: "size", type: "select", options: ["default", "sm"] }],
  },
  sheet: {
    children: { default: "Edit project", label: "title" },
    extras: [
      {
        prop: "side",
        type: "select",
        options: ["right", "left", "top", "bottom"],
      },
      { prop: "showCloseButton", type: "boolean" },
    ],
  },
  drawer: {
    children: { default: "Filters", label: "title" },
    note: "There is no `side`: `swipeDirection` is the single source of truth the content derives its geometry from.",
    extras: [
      {
        prop: "swipeDirection",
        type: "select",
        options: ["down", "up", "left", "right"],
      },
      { prop: "modal", type: "boolean" },
    ],
  },
  "dropdown-menu": {
    extras: [
      {
        prop: "side",
        type: "select",
        options: ["bottom", "top", "inline-start", "inline-end"],
      },
      { prop: "align", type: "select", options: ["start", "center", "end"] },
    ],
  },
  "context-menu": {
    extras: [
      { prop: "align", type: "select", options: ["start", "center", "end"] },
    ],
  },
  "navigation-menu": {
    note: "navigationMenuTriggerStyle is a cva with no variants object, so there is no axis to extract — `align` on the root is the real knob.",
    extras: [
      { prop: "align", type: "select", options: ["start", "center", "end"] },
    ],
  },

  /* -- Value-driven: `always` keeps required props in the snippet --------- */
  "aspect-ratio": {
    note: "`ratio` is required, so it is always printed — omitting it at the default would emit code that does not compile.",
    extras: [
      {
        prop: "ratio",
        type: "select",
        options: ["1.7778", "1", "1.3333", "1.5", "2.3333"],
        always: true,
      },
    ],
  },
  meter: {
    variantsFrom: "meterVariants",
    extras: [
      {
        prop: "value",
        type: "select",
        options: ["68", "0", "25", "50", "100"],
        always: true,
      },
      { prop: "max", type: "text", placeholder: "100" },
    ],
  },
  progress: {
    note: "The panel cannot express the indeterminate state — that is `value={null}`, not a number.",
    variantsFrom: "progressVariants",
    extras: [
      {
        prop: "value",
        type: "select",
        options: ["72", "0", "25", "50", "100"],
        always: true,
      },
      { prop: "max", type: "text", placeholder: "100" },
    ],
  },
  calendar: {
    extras: [
      {
        prop: "captionLayout",
        type: "select",
        options: ["label", "dropdown", "dropdown-months", "dropdown-years"],
      },
      { prop: "numberOfMonths", type: "select", options: ["1", "2"] },
      { prop: "showOutsideDays", type: "boolean" },
      { prop: "disabled", type: "boolean" },
    ],
  },
  "date-picker": {
    note: "DatePicker is Popover; the controls drive the trigger, which is the only part this component adds.",
    extras: [
      { prop: "placeholder", type: "text", placeholder: "Pick a date" },
      {
        prop: "dateFormat",
        type: "select",
        options: ["PP", "P", "PPP", "PPPP"],
      },
      { prop: "disabled", type: "boolean" },
    ],
  },
  "multi-select": {
    note: "`options` supplies the fixed list; the controls below drive everything else. `emptyText` only shows once a filter query matches nothing.",
    extras: [
      { prop: "placeholder", type: "text", placeholder: "Select…" },
      { prop: "emptyText", type: "text", placeholder: "No results found." },
      { prop: "disabled", type: "boolean" },
    ],
  },
  "tags-input": {
    note: "Enter or comma commits the draft, Backspace on an empty draft removes the last tag — the controls below cover everything else.",
    extras: [
      { prop: "placeholder", type: "text", placeholder: "Add a tag…" },
      { prop: "max", type: "text", placeholder: "No limit" },
      { prop: "disabled", type: "boolean" },
    ],
  },
  "phone-input": {
    note: "The value is one string; `defaultCountry` only seeds the dial code while the value carries none of its own.",
    extras: [
      {
        prop: "defaultCountry",
        type: "select",
        options: ["FR", "BE", "CH", "LU", "DE", "ES", "IT", "GB", "US", "CA"],
      },
      { prop: "placeholder", type: "text", placeholder: "6 12 34 56 78" },
      { prop: "disabled", type: "boolean" },
    ],
  },
  editable: {
    extras: [
      {
        prop: "defaultValue",
        type: "text",
        placeholder: "Click to rename",
        always: true,
      },
      { prop: "disabled", type: "boolean" },
    ],
  },
  "time-picker": {
    note: "A 24-hour clock with no roll-over between segments — clamping and zero-padding both come from Number Field, and `picker` chooses what the clock button opens.",
    extras: [
      { prop: "picker", type: "select", options: ["dial", "list", "none"] },
      { prop: "showSeconds", type: "boolean" },
      { prop: "disabled", type: "boolean" },
    ],
  },
  "date-range-picker": {
    note: "Owns its own range state, so the controls below are its only knobs beyond `value`/`onValueChange`.",
    extras: [
      { prop: "placeholder", type: "text", placeholder: "Pick a date range" },
      { prop: "showTime", type: "boolean" },
      { prop: "numberOfMonths", type: "select", options: ["2", "1"] },
    ],
  },

  /* -- Investigated: provider-level, cmdk, and the imperative one -------- */
  combobox: {
    note: "The controls drive ComboboxInput, which owns this system's own additions rather than Base UI's root props.",
    extras: [
      { prop: "showTrigger", type: "boolean" },
      { prop: "showClear", type: "boolean" },
      { prop: "disabled", type: "boolean" },
      { prop: "placeholder", type: "text", placeholder: "Search a city…" },
    ],
  },
  autocomplete: {
    extras: [
      { prop: "showClear", type: "boolean" },
      { prop: "disabled", type: "boolean" },
      { prop: "placeholder", type: "text", placeholder: "Start typing…" },
    ],
  },
  command: {
    note: "cmdk's props: turn `shouldFilter` off to hand filtering to a server, and `loop` wraps arrow-key selection at the ends.",
    extras: [
      { prop: "shouldFilter", type: "boolean" },
      { prop: "loop", type: "boolean" },
      { prop: "vimBindings", type: "boolean" },
      { prop: "disablePointerSelection", type: "boolean" },
    ],
  },
  menubar: {
    extras: [
      {
        prop: "orientation",
        type: "select",
        options: ["horizontal", "vertical"],
      },
      { prop: "loopFocus", type: "boolean" },
      { prop: "modal", type: "boolean" },
      { prop: "disabled", type: "boolean" },
    ],
  },
  "message-scroller": {
    note: "The controls drive the provider — Root, Viewport and Button all read its context, and without it they throw.",
    extras: [
      { prop: "autoScroll", type: "boolean" },
      {
        prop: "defaultScrollPosition",
        type: "select",
        options: ["end", "start"],
      },
    ],
  },
  toast: {
    note: "Toast is fired, not rendered. The controls drive a live toast, but the snippet shows the shape of the `toast.add` call rather than tracking them — the generated code can only rewrite JSX attributes.",
    extras: [
      {
        prop: "type",
        type: "select",
        options: ["success", "info", "warning", "error", "loading"],
      },
      { prop: "title", type: "text", placeholder: "Invoice deleted" },
      { prop: "description", type: "text", placeholder: "INV-003 archived." },
    ],
  },

  /* -- Thin panels: little or no enumerable API --------------------------- */
  kbd: {
    children: { default: "K", label: "key" },
  },
  label: {
    children: { default: "Email", label: "text" },
  },
  skeleton: {
    note: "Size and shape are entirely the caller's, so `className` is the whole API.",
    extras: [
      {
        prop: "className",
        type: "select",
        options: ["h-4 w-40", "h-3 w-24", "size-10 rounded-full", "h-24 w-64"],
        always: true,
      },
    ],
  },
  spinner: {
    extras: [
      {
        prop: "className",
        type: "select",
        options: ["size-4", "size-6", "size-8 text-muted-foreground"],
        always: true,
      },
    ],
  },
  "scroll-area": {
    note: "The root needs a bounded height for anything to scroll. Only a vertical scrollbar is rendered today.",
    extras: [
      {
        prop: "className",
        type: "select",
        options: ["h-56", "h-32", "h-72"],
        always: true,
      },
    ],
  },
  breadcrumb: {
    children: { default: "Breadcrumb", label: "current page" },
  },
  toc: {
    children: { default: "Package manager", label: "link" },
    texts: { label: { default: "On this page", label: "heading" } },
    note: "No cva block, so `level` on TocItem is the only axis — and it is depth in the list, not heading rank.",
    extras: [{ prop: "level", type: "select", options: ["1", "2"] }],
  },
  card: {
    children: { default: "Charte graphique", label: "title" },
  },
  table: {
    note: 'The parts are plain elements with no variant axis; `data-state="selected"` on a row is the one state that changes anything.',
    extras: [
      {
        prop: "data-state",
        type: "select",
        options: ["default", "selected"],
        label: "row state",
      },
    ],
  },
  "data-table": {
    note: "`searchColumn` is what turns the filter box on — naming a column that does not exist silently disables it.",
    extras: [
      {
        prop: "searchColumn",
        type: "select",
        options: ["suite", "id", "status"],
      },
      { prop: "pageSize", type: "select", options: ["5", "3"] },
      {
        prop: "searchPlaceholder",
        type: "text",
        placeholder: "Filter results",
      },
      { prop: "emptyMessage", type: "text", placeholder: "No results." },
    ],
  },
  kanban: {
    note: "The columns are an array and the cards are a render prop, and the card list is state the board owns — so this panel is empty on purpose. Drag a card between columns, or tab to a grip and use the arrow keys.",
  },
  chart: {
    note: "Chart is configured through its `config` object and recharts children, not through enumerable props — so this panel is empty on purpose. The examples below are the documentation.",
  },
  "line-chart": {
    note: "`config` and `data` are objects, so the series are fixed here and only the flat props are drivable. `grid` and `dots` are on by default and so cannot be switched off from a panel that can only add props — the Dense sampling example below is where both are off.",
    extras: [
      { prop: "legend", type: "boolean" },
      {
        prop: "className",
        type: "select",
        options: ["h-56 w-full", "h-40 w-full", "h-80 w-full"],
        label: "size",
      },
    ],
  },
  "area-chart": {
    note: "Two series are declared here so `stacked` has something to stack. The panel can only add props, so anything already on by default — `grid`, and `legend` past one series — is shown switched off in an example instead.",
    extras: [
      { prop: "stacked", type: "boolean" },
      { prop: "dots", type: "boolean" },
      {
        prop: "className",
        type: "select",
        options: ["h-56 w-full", "h-40 w-full", "h-80 w-full"],
        label: "size",
      },
    ],
  },
  "bar-chart": {
    note: "Two series are declared here, so the legend is already on and `stacked` has something to stack. `max` pins the value axis; left off, the tallest bar sets it.",
    extras: [
      { prop: "horizontal", type: "boolean" },
      { prop: "stacked", type: "boolean" },
      { prop: "max", type: "select", options: ["300", "400", "1000"] },
      {
        prop: "className",
        type: "select",
        options: ["h-56 w-full", "h-40 w-full", "h-80 w-full"],
        label: "size",
      },
    ],
  },
  "stacked-bar": {
    note: "Every row is normalised to its own total, so the bars stay the same length whatever the figures — only the split moves. `showLegend` is on by default and a panel can only add props, so the Inline example below is where it is off.",
    extras: [
      {
        prop: "className",
        type: "select",
        options: ["h-40 w-full", "h-24 w-full", "h-64 w-full"],
        label: "size",
      },
    ],
  },
  "pie-chart": {
    note: "`valueKey` and `nameKey` name the two row fields the chart reads, so they are fixed here with the data. `legend` is on by default; the With a figure list example below is where it is off.",
    extras: [
      {
        prop: "className",
        type: "select",
        options: [
          "mx-auto aspect-square h-64",
          "mx-auto aspect-square h-40",
          "mx-auto aspect-square h-80",
        ],
        label: "size",
      },
    ],
  },
  "donut-chart": {
    note: "`thickness` is a percentage of the chart radius, not pixels — the container is responsive, so a fixed ring would not scale with it. At 90 the hole closes and the donut becomes a pie.",
    extras: [
      {
        prop: "thickness",
        type: "select",
        options: ["30", "12", "50", "90"],
      },
    ],
  },
  "radar-chart": {
    note: "Two entities are declared here, so the legend is already on. `domain` is pinned to 0–100 with the data, because a radar that auto-scales is not comparable with the one beside it. `grid` is on by default and a panel can only add props — the Dense dimensions example below is where it is off.",
    extras: [
      { prop: "radiusAxis", type: "boolean" },
      {
        prop: "fillOpacity",
        type: "select",
        options: ["0.2", "0", "0.45", "0.7"],
      },
      {
        prop: "className",
        type: "select",
        options: [
          "mx-auto aspect-square h-64",
          "mx-auto aspect-square h-48",
          "mx-auto aspect-square h-80",
        ],
        label: "size",
      },
    ],
  },
  "combo-chart": {
    note: "`series` and `rightAxis` are objects, so they are fixed here with the data — a bar on the left scale and a line on the right. Everything this component does lives in those two, and the panel can only add flat props: the examples below are the documentation. `legend` is already on past one series, and `grid` is on by default.",
    extras: [
      {
        prop: "className",
        type: "select",
        options: ["h-56 w-full", "h-40 w-full", "h-80 w-full"],
        label: "size",
      },
    ],
  },
  "funnel-chart": {
    note: "`conversion` is the reason this component exists: the rows carry raw counts and the percentage beside each stage is derived. `previous` is stage-over-stage drop, `first` is cumulative from the top, `none` prints counts only.",
    extras: [
      {
        prop: "conversion",
        type: "select",
        options: ["previous", "first", "none"],
      },
      { prop: "legend", type: "boolean" },
      {
        prop: "className",
        type: "select",
        options: ["h-64 w-full", "h-48 w-full", "h-80 w-full"],
        label: "size",
      },
    ],
  },
  "scatter-chart": {
    note: "Both axes are pinned to a numeric scale by the component — recharts would otherwise default the x axis to categories and space the points evenly, which turns a scatter into columns. `yKey` swaps which quantity is plotted against price; `sizeKey` turns the marks into bubbles and is shown in the Bubble example below, since a select cannot return to having no third variable.",
    extras: [
      {
        prop: "yKey",
        type: "select",
        options: ["rating", "installs"],
        label: "y",
      },
      {
        prop: "className",
        type: "select",
        options: ["h-64 w-full", "h-48 w-full", "h-80 w-full"],
        label: "size",
      },
    ],
  },
  treemap: {
    note: "The data here is one level deep, so every tile is a leaf; nesting a second level groups the tiles and tints each group off its parent's hue. `showLabels` is on by default and suppresses itself on tiles with no room for text, which the Small tiles example below shows.",
    extras: [
      {
        prop: "aspectRatio",
        type: "select",
        options: ["1.333", "1", "2.5"],
        label: "aspect",
      },
      {
        prop: "className",
        type: "select",
        options: ["h-64 w-full", "h-48 w-full", "h-80 w-full"],
        label: "size",
      },
    ],
  },
  "waterfall-chart": {
    note: "`totalKeys` names the two rows that restate the total rather than move it; without it the closing bar would stack on the running figure and float at roughly twice its height. `connectors` is on by default — the Accumulation example below is where it is off.",
    extras: [
      {
        prop: "className",
        type: "select",
        options: ["h-56 w-full", "h-40 w-full", "h-80 w-full"],
        label: "size",
      },
    ],
  },
  heatmap: {
    note: "This component carries two forms and `layout` chooses between them, but each reads a different row shape — the data here is a `{ x, y, value }` grid, so `layout` is not drivable from a panel that cannot also swap the data. The `{ date, value }` calendar is the second example below. `legend` is on by default, and without it the colours mean nothing.",
    extras: [
      { prop: "cellSize", type: "select", options: ["28", "12", "16", "40"] },
      { prop: "gap", type: "select", options: ["3", "0", "6"] },
      { prop: "emptyLabel", type: "text", placeholder: "no data" },
    ],
  },
  "bullet-chart": {
    texts: {
      label: { default: "New ARR" },
      caption: { default: "Q3 quota attainment" },
    },
    note: "`value`, `target`, `max` and `bands` are fixed here with the data. The label and figure columns are driven by `--bullet-label` and `--bullet-value` rather than sized to their content, so a stack of these lines up when the labels differ in length.",
    extras: [
      {
        prop: "className",
        type: "select",
        options: [
          "w-full max-w-md",
          "w-full max-w-md [--bullet-label:10rem]",
          "w-full max-w-xs [--bullet-label:5rem]",
        ],
        label: "columns",
      },
    ],
  },

  /* -- Layout & chrome (lane 3) -------------------------------------------- */
  "page-header": {
    children: { default: "Team settings", label: "title" },
    texts: {
      description: { default: "Manage members, roles and billing." },
      action: { default: "Invite" },
    },
    note: "PageHeader has no prop bag, only slots — the controls drive its parts rather than a props object.",
    extras: [
      {
        prop: "icon",
        type: "select",
        marker: "element",
        options: [
          { value: "UsersIcon", label: "Users" },
          { value: "GearIcon", label: "Gear" },
        ],
      },
    ],
  },
  panel: {
    children: { default: "Notifications", label: "title" },
    texts: {
      description: { default: "Choose which updates land in your inbox." },
      row: { default: "Email alerts", label: "row label" },
      action: { default: "Manage", label: "footer action" },
    },
    note: "`size` is not a cva axis — it rewrites `--panel-spacing`, so it retunes the padding of every part at once.",
    extras: [{ prop: "size", type: "select", options: ["default", "sm"] }],
  },
  masonry: {
    note: "`columns` becomes a `--columns` custom property, so any integer works — there is no fixed breakpoint list.",
    extras: [
      {
        prop: "columns",
        type: "select",
        options: ["3", "2", "4"],
        always: true,
      },
    ],
  },
  banner: {
    children: { default: "Scheduled maintenance", label: "title" },
    texts: {
      description: {
        default:
          "The staging environment is unavailable from 10pm to midnight UTC.",
      },
      action: { default: "View status", label: "action label" },
    },
    variantsFrom: "bannerVariants",
  },
  wordmark: {
    note: "The lockup SVGs already contain the wordmark text as vector paths — recolour with text-* utilities, don't restyle the text separately.",
    variantsFrom: "wordmarkVariants",
  },
  "theme-switcher": {
    note: "value/onValueChange are required, so the playground holds its own state to make the panel interactive — nothing here reaches the real app theme.",
    extras: [
      {
        prop: "variant",
        type: "select",
        options: ["segmented", "cycle", "dropdown"],
      },
    ],
  },

  /* -- Data display: lane 2 ------------------------------------------------ */
  status: {
    children: { default: "Operational" },
    variantsFrom: "statusVariants",
    extras: [{ prop: "pulse", type: "boolean" }],
    note: "`pulse` belongs to StatusIndicator, not Status.",
  },
  tag: {
    children: { default: "In review" },
    variantsFrom: "tagVariants",
  },
  "description-list": {
    note: "The parts are plain dt/dd elements with no variant axis — composition is the API, so only the first term is editable here.",
    children: { default: "Client", label: "term" },
  },
  "stat-card": {
    note: "`direction` belongs to StatCardDelta, not StatCard; the panel routes it there.",
    children: { default: "Missions actives", label: "label" },
    texts: { value: { default: "1 284", label: "figure" } },
    extras: [{ prop: "direction", type: "select", options: ["up", "down"] }],
  },
  "relative-time": {
    note: "`date` takes a row value as it comes: a SQL `2026-08-02 09:12:00`, an ISO string, epoch milliseconds, or a `Date`. Microseconds and a `+02` zone are normalised too. A stamp with no zone counts as local time — append `Z` if the column stores UTC. Leaving `locale` on `—` follows the browser, which is what an app usually wants.",
    extras: [
      {
        prop: "date",
        type: "text",
        placeholder: "2026-08-02 09:12:00",
        default: TWELVE_MINUTES_AGO,
        always: true,
      },
      {
        prop: "locale",
        type: "select",
        options: ["—", "en-GB", "en-US", "fr", "de", "ja"],
      },
    ],
  },
  gauge: {
    note: "The arc fills by fraction, so `value` only reads as a percentage while `max` stays at 100.",
    extras: [
      {
        prop: "value",
        type: "select",
        options: ["62", "0", "25", "88", "100"],
        always: true,
      },
      { prop: "max", type: "select", options: ["100", "10", "256", "500"] },
      { prop: "label", type: "text", placeholder: "CPU" },
    ],
  },
  sparkline: {
    note: "`data` is a `number[]`, which a text control could only hand over as a quoted string — so the series is a literal in the template and the four flat props are what this panel drives. Leaving `stroke` on the em dash keeps the line on `currentColor`, so it inherits from whatever the sparkline sits in.",
    extras: [
      {
        prop: "stroke",
        type: "select",
        options: [
          "—",
          { value: "var(--ds-chart-1)", label: "chart 1" },
          { value: "var(--ds-chart-2)", label: "chart 2" },
          { value: "var(--ds-chart-3)", label: "chart 3" },
        ],
      },
      { prop: "fill", type: "boolean" },
      { prop: "showDot", type: "boolean", label: "end dot" },
      { prop: "animate", type: "boolean" },
    ],
  },
  "code-block": {
    note: "Highlighter-agnostic: `CodeBlockBody` takes plain `code` or pre-highlighted `html`. The parts carry no variant axis, so only the filename is editable here.",
    children: { default: "terminal", label: "filename" },
  },
  snippet: {
    extras: [
      {
        prop: "value",
        type: "text",
        placeholder: "pnpm add @diametral/ui",
        always: true,
      },
    ],
  },
  "qr-code": {
    extras: [
      {
        prop: "value",
        type: "text",
        placeholder: "https://diametral.com",
        always: true,
      },
      { prop: "level", type: "select", options: ["M", "L", "Q", "H"] },
    ],
  },
}

export function playgroundFor(slug: string): PlaygroundConfig | undefined {
  return PLAYGROUNDS[slug]
}
