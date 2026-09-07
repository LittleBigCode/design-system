# Components

Every component is a framework-agnostic `.ds-*` class set; some have an optional light-DOM Web
Component on top (see [`../components/README.md`](../components/README.md)). All markup below is
copied from the live showcase — class and modifier names are exact. Each section links to its
showcase page.

<!-- BEGIN generated: react-components (npm run build) -->

## React components

The 118 components exported from [`@diametral/design-system/react`](react.md). Every row has a live page with runnable examples, and every page is what the visual and accessibility gates drive — so this table and the tested surface cannot disagree.

> Generated from `examples/registry/registry.ts` by `scripts/build-components-md.mjs`. Edit the registry, then run `npm run build`.

### Actions

| Component | Imports | What it is |
| --- | --- | --- |
| [Button](https://littlebigcode.github.io/design-system/docs/button) | `Button`, `buttonVariants` | The primary action trigger. Eight variants and an eight-colour brand tone axis that compose independently. |
| [Button Group](https://littlebigcode.github.io/design-system/docs/button-group) | `ButtonGroup`, `ButtonGroupSeparator`, `ButtonGroupText`, `buttonGroupVariants` | Joins related buttons into a single segmented control with shared borders. |
| [Icon Button](https://littlebigcode.github.io/design-system/docs/icon-button) | `IconButton` | `Button` for an icon alone, with an accessible name it cannot ship without. |
| [Kbd](https://littlebigcode.github.io/design-system/docs/kbd) | `Kbd`, `KbdGroup` | Renders a keyboard key or chord inline, sized to sit in a line of text. |
| [Segmented](https://littlebigcode.github.io/design-system/docs/toggle-group) | `Segmented`, `type SegmentedProps`, `type SegmentedItem` | A short row of mutually exclusive options, all visible at once. |
| [Speed Dial](https://littlebigcode.github.io/design-system/docs/speed-dial) | `SpeedDial`, `SpeedDialAction` | A floating action button whose two-to-four actions fan out on open — the create button a whole view is about. |
| [SplitButton](https://littlebigcode.github.io/design-system/docs/split-button) | `SplitButton`, `IconButton`, `ButtonGroup` | One primary action, with its variants behind an attached caret. |
| [Toggle](https://littlebigcode.github.io/design-system/docs/toggle) | `Toggle`, `toggleVariants` | A two-state button for on/off formatting controls. |
| [Toolbar](https://littlebigcode.github.io/design-system/docs/toolbar) | `Toolbar`, `ToolbarGroup`, `ToolbarButton`, `ToolbarLink`, `ToolbarInput`, `ToolbarSeparator` | A Base UI toolbar with arrow-key navigation across grouped buttons, inputs and separators. |
| [Wizard](https://littlebigcode.github.io/design-system/docs/wizard) | `Wizard`, `type WizardProps`, `type WizardStep` | An ordered sequence of steps, with the progress and the navigation handled. |

### Forms

| Component | Imports | What it is |
| --- | --- | --- |
| [Autocomplete](https://littlebigcode.github.io/design-system/docs/autocomplete) | `Autocomplete`, `AutocompleteInput`, `AutocompleteClear`, `AutocompleteContent`, `AutocompleteList`, `AutocompleteItem`, `AutocompleteGroup`, `AutocompleteLabel`, `AutocompleteCollection`, `AutocompleteEmpty`, `AutocompleteStatus`, `AutocompleteSeparator` | Free-text input with suggestions — unlike Combobox, the typed value need not come from the list. |
| [Calendar](https://littlebigcode.github.io/design-system/docs/calendar) | `Calendar`, `type CalendarProps`, `type CalendarEvent` | A month grid with dated events, statuses and a selected day. |
| [Checkbox](https://littlebigcode.github.io/design-system/docs/checkbox) | `Checkbox` | A single boolean control, with indeterminate support via the `parent` prop inside a group. |
| [Checkbox Group](https://littlebigcode.github.io/design-system/docs/checkbox-group) | `CheckboxGroup` | Manages a set of checkbox values, including the parent select-all relationship. |
| [ColorPicker](https://littlebigcode.github.io/design-system/docs/color-picker) | `ColorPicker`, `type ColorPickerProps` | A swatch group over the brand palette, with a free-form hex field beside it. |
| [Combobox](https://littlebigcode.github.io/design-system/docs/combobox) | `Combobox`, `type ComboboxProps`, `type ComboboxOption` | A text field that filters a list as you type, and settles on one value. |
| [DatePicker](https://littlebigcode.github.io/design-system/docs/date-picker) | `DatePicker`, `type DatePickerProps`, `type DateLike` | One date, from a field with a calendar under it. |
| [DateRangePicker](https://littlebigcode.github.io/design-system/docs/date-range-picker) | `DateRangePicker`, `type DateRangePickerProps`, `type DateRange` | A start and an end, picked together in one calendar. |
| [DateTimePicker](https://littlebigcode.github.io/design-system/docs/date-time-picker) | `DateTimePicker`, `type DateTimePickerProps` | A date and a time in one field, on the native `datetime-local` control. |
| [Editable](https://littlebigcode.github.io/design-system/docs/editable) | `Editable` | Inline click-to-edit text — a preview with an edit affordance that swaps to a field, committed on Enter or blur, discarded on Escape. |
| [Field](https://littlebigcode.github.io/design-system/docs/field) | `Field`, `FieldSet`, `FieldLegend`, `FieldGroup`, `FieldContent`, `FieldLabel`, `FieldTitle`, `FieldDescription`, `FieldSeparator`, `FieldError` | The form row primitive — label, control, description and error in one accessible group. Replaces the retired `form` component in this system. |
| [Field Array](https://littlebigcode.github.io/design-system/docs/field-array) | `FieldArray`, `FieldArrayItem`, `FieldArrayItemContent`, `FieldArrayRemove`, `FieldArrayAdd` | Repeated entries for an array of objects — one bordered block per entry, each removable, with one add button under the stack. |
| [FileUpload](https://littlebigcode.github.io/design-system/docs/file-upload) | `FileUpload`, `type FileUploadProps` | A drop zone that is also a file button, with the picked files listed under it. |
| [Form](https://littlebigcode.github.io/design-system/docs/form) | `Form` | A thin Base UI Form wrapper: the page-level `<form>` and its vertical rhythm. `FormField` owns everything inside it. |
| [Input](https://littlebigcode.github.io/design-system/docs/input) | `Input` | The single-line text field, and the base every other text control borrows its focus ring and invalid styling from. |
| [Input Group](https://littlebigcode.github.io/design-system/docs/input-group) | `InputGroup`, `InputGroupAddon`, `InputGroupButton`, `InputGroupText`, `InputGroupInput`, `InputGroupTextarea`, `inputGroupAddonVariants` | Composes addons, icons and buttons around an input inside a single bordered box. |
| [Input OTP](https://littlebigcode.github.io/design-system/docs/input-otp) |  | A segmented one-time-code field with per-character slots. Stylesheet only — the one-field-many-boxes behaviour needs a binding this package does not ship. |
| [Label](https://littlebigcode.github.io/design-system/docs/label) | `Label` | An accessible label; pairs with a control via `htmlFor` and dims with its disabled state. |
| [MultiSelect](https://littlebigcode.github.io/design-system/docs/multi-select) | `MultiSelect`, `type MultiSelectProps`, `type MultiSelectOption` | Several values from a fixed list, shown as removable chips. |
| [NumberInput](https://littlebigcode.github.io/design-system/docs/number-field) | `NumberInput`, `type NumberInputProps` | A numeric field with stepper buttons and a real `null` for empty. |
| [Phone Input](https://littlebigcode.github.io/design-system/docs/phone-input) | `PhoneInput` | A country dial-code select paired with a national-number field, composing into one E.164-ish string value. |
| [RadioGroup](https://littlebigcode.github.io/design-system/docs/radio-group) | `RadioGroup`, `Radio`, `type RadioGroupProps` | One choice from a few, over native `<input type="radio">`. |
| [Rating](https://littlebigcode.github.io/design-system/docs/rating) | `Rating`, `type RatingProps` | A star scale, as an input or as a read-only display. |
| [Select](https://littlebigcode.github.io/design-system/docs/select) | `Select`, `SelectTrigger`, `SelectValue`, `SelectContent`, `SelectGroup`, `SelectLabel`, `SelectItem`, `SelectSeparator` | A Base UI listbox for choosing one option from a set, with a rendered trigger and portalled popup. |
| [Slider](https://littlebigcode.github.io/design-system/docs/slider) | `Slider` | Selects a number, or a range, by dragging along a track. |
| [Switch](https://littlebigcode.github.io/design-system/docs/switch) | `Switch` | An immediate on/off toggle for settings that apply on change. |
| [TagInput](https://littlebigcode.github.io/design-system/docs/tags-input) | `TagInput`, `type TagInputProps` | Free-form labels, entered one at a time and shown as removable chips. |
| [Textarea](https://littlebigcode.github.io/design-system/docs/textarea) | `Textarea` | A multi-line text field sharing Input's focus and invalid states. |
| [TimePicker](https://littlebigcode.github.io/design-system/docs/time-picker) | `TimePicker`, `type TimePickerProps` | A time of day, in 24-hour `HH:mm`. |

### Data display

| Component | Imports | What it is |
| --- | --- | --- |
| [Agenda](https://littlebigcode.github.io/design-system/docs/agenda) | `Agenda` | A chronological list of events grouped by day — the list half of a calendar, and where v2 keeps event display. |
| [Area Chart](https://littlebigcode.github.io/design-system/docs/area-chart) | `AreaChart` | `Line Chart` read as a volume — the same props, with a filled band under each series. |
| [Avatar](https://littlebigcode.github.io/design-system/docs/avatar) | `Avatar`, `AvatarImage`, `AvatarFallback`, `AvatarBadge`, `AvatarGroup`, `AvatarGroupCount` | A user image with a text fallback, and a group with overflow count. |
| [Badge](https://littlebigcode.github.io/design-system/docs/badge) | `Badge`, `badgeVariants` | A compact status or category label. |
| [Bar Chart](https://littlebigcode.github.io/design-system/docs/bar-chart) | `BarChart` | Categorical bars with a pinned value axis, a row layout, and per-bar semantic tinting. |
| [Bullet Chart](https://littlebigcode.github.io/design-system/docs/bullet-chart) | `BulletChart`, `type BulletBand` | An actual against its target and qualitative bands — what `meter`, `gauge` and `progress` cannot say. |
| [Card](https://littlebigcode.github.io/design-system/docs/card) | `Card`, `CardMedia`, `CardHeader`, `CardTitle`, `CardDescription`, `CardAction`, `CardContent`, `CardBlock`, `CardFooter` | A bordered surface with header, content and footer slots — the default container for grouped content. |
| [Chart](https://littlebigcode.github.io/design-system/docs/chart) | `ChartContainer`, `ChartTooltip`, `ChartTooltipContent`, `ChartLegend`, `ChartLegendContent`, `ChartStyle` | Recharts wrapped so series colours come from a `ChartConfig` and resolve to brand chart tokens. |
| [CodeBlock](https://littlebigcode.github.io/design-system/docs/code-block) | `CodeBlock`, `type CodeBlockProps` | A source snippet with a filename strip and a copy button. |
| [Combo Chart](https://littlebigcode.github.io/design-system/docs/combo-chart) | `ComboChart`, `type ComboSeries` | Bars and a line on one x axis, with a second Y scale — the volume-plus-rate dashboard shape. |
| [DataGrid](https://littlebigcode.github.io/design-system/docs/data-table) | `DataGrid`, `type DataGridProps`, `type DataGridColumn` | A real `<table>` with sorting, selection, filtering, inline edit and paging. |
| [Description List](https://littlebigcode.github.io/design-system/docs/description-list) | `DescriptionList`, `DescriptionTerm`, `DescriptionDetail` | Term/detail pairs for record summaries. Renders a real `dl`, so the pairing survives without sight of the layout. |
| [Donut Chart](https://littlebigcode.github.io/design-system/docs/donut-chart) | `DonutChart` | `Pie Chart` with the middle cut out, and a figure in the hole. |
| [Empty](https://littlebigcode.github.io/design-system/docs/empty) | `Empty`, `EmptyHeader`, `EmptyMedia`, `EmptyTitle`, `EmptyDescription`, `EmptyContent` | The empty-state block: media, title, description and an action. |
| [Funnel Chart](https://littlebigcode.github.io/design-system/docs/funnel-chart) | `FunnelChart`, `type FunnelConversion` | Ordered conversion stages with the drop-off derived for you from raw counts. |
| [Gauge](https://littlebigcode.github.io/design-system/docs/gauge) | `Gauge`, `type GaugeThreshold` | A radial progress dial for a bounded value, with optional thresholds that recolour the arc. |
| [Heatmap](https://littlebigcode.github.io/design-system/docs/heatmap) | `Heatmap`, `type HeatmapCell`, `type HeatmapDay` | Density across two axes as colour — CSS grid, not a chart library, and the only form here that encodes magnitude without position. |
| [Item](https://littlebigcode.github.io/design-system/docs/item) | `Item`, `ItemMedia`, `ItemContent`, `ItemActions`, `ItemGroup`, `ItemSeparator`, `ItemTitle`, `ItemDescription`, `ItemHeader`, `ItemFooter` | A list row with media, content and actions slots — lighter than a Card for repeated rows. |
| [Kanban](https://littlebigcode.github.io/design-system/docs/kanban) | `Kanban`, `KanbanCardTitle` | A board of columns holding cards that move between them by drag or by arrow key. |
| [Line Chart](https://littlebigcode.github.io/design-system/docs/line-chart) | `LineChart` | A finished line chart over the Chart primitives — grid, axis, tooltip and legend already wired to one `config`. |
| [Marker](https://littlebigcode.github.io/design-system/docs/marker) | `Marker`, `MarkerIcon`, `MarkerContent`, `markerVariants` | A small inline badge pairing an icon with a label. |
| [Meter](https://littlebigcode.github.io/design-system/docs/meter) | `Meter`, `MeterTrack`, `MeterIndicator`, `MeterLabel`, `MeterValue`, `meterVariants` | Displays a measured value within a known range — capacity, not task progress. |
| [Pie Chart](https://littlebigcode.github.io/design-system/docs/pie-chart) | `PieChart` | A whole split into slices, coloured per slice from a `config` keyed by slice name. |
| [Progress](https://littlebigcode.github.io/design-system/docs/progress) | `Progress`, `ProgressTrack`, `ProgressIndicator`, `ProgressLabel`, `ProgressValue` | Task completion, with optional label and value slots. |
| [QR Code](https://littlebigcode.github.io/design-system/docs/qr-code) | `QrCode`, `type QrErrorCorrectionLevel` | Renders a QR code as inline SVG from a hand-rolled byte-mode encoder — no dependency, no network, no canvas. Versions 1-10, all four correction levels. |
| [Radar Chart](https://littlebigcode.github.io/design-system/docs/radar-chart) | `RadarChart` | A spider chart — how two or three entities compare across many dimensions at once. |
| [Relative Time](https://littlebigcode.github.io/design-system/docs/relative-time) | `RelativeTime`, `formatRelativeTime` | Renders "3 hours ago" from a date, inside a `time` element that keeps the machine-readable timestamp. |
| [Scatter Chart](https://littlebigcode.github.io/design-system/docs/scatter-chart) | `ScatterChart` | Quantity against quantity, with optional bubble sizing for a third variable. |
| [Skeleton](https://littlebigcode.github.io/design-system/docs/skeleton) | `Skeleton` | A placeholder block for content that has not loaded. |
| [Snippet](https://littlebigcode.github.io/design-system/docs/snippet) | `Snippet` | A one-line copyable command. Shares Code Block's copy affordance rather than restating it. |
| [Sparkline](https://littlebigcode.github.io/design-system/docs/sparkline) | `Sparkline` | An inline mini line chart, small and cheap enough to sit in every row of a table. |
| [Spinner](https://littlebigcode.github.io/design-system/docs/spinner) | `Spinner` | An indeterminate loading indicator, sized to the current text. |
| [Stacked Bar](https://littlebigcode.github.io/design-system/docs/stacked-bar) | `StackedBar` | Proportional bars — every row normalised to its own total, so only the split differs. |
| [Status](https://littlebigcode.github.io/design-system/docs/status) | `Status`, `StatusIndicator`, `StatusLabel`, `StatusPanel`, `Metric`, `statusVariants` | A dot-and-label state indicator across the shared six-tone family — success, warning, danger, critical, neutral, info. |
| [Table](https://littlebigcode.github.io/design-system/docs/table) | `Table`, `TableHeader`, `TableBody`, `TableFooter`, `TableRow`, `TableHead`, `TableCell`, `TableCaption` | The static table primitives. For sorting, filtering and pagination use Data Table. |
| [Tag](https://littlebigcode.github.io/design-system/docs/tag) | `Tag`, `tagVariants` | A boxed, tinted label across the shared six-tone family. Absorbs v1's Chip, whose one boolean `warn` axis is now `tone="warning"`. |
| [Timeline](https://littlebigcode.github.io/design-system/docs/timeline) | `Timeline`, `TimelineItem`, `TimelineIndicator`, `TimelineContent`, `TimelineTitle`, `TimelineTime`, `TimelineDescription` | A vertical sequence of events with completed, active and inactive states. |
| [Tree](https://littlebigcode.github.io/design-system/docs/tree) | `Tree`, `type TreeProps`, `type TreeNode` | A nested, expandable hierarchy — files, org units, categories. |
| [Treemap](https://littlebigcode.github.io/design-system/docs/treemap) | `Treemap`, `type TreemapDatum` | A weighted hierarchy as nested areas — where a pie stops working and a bar chart runs out of room. |
| [Waterfall Chart](https://littlebigcode.github.io/design-system/docs/waterfall-chart) | `WaterfallChart` | Signed deltas accumulating to a total — the bridge a bar chart and a line chart each tell half of. |

### Navigation

| Component | Imports | What it is |
| --- | --- | --- |
| [Breadcrumb](https://littlebigcode.github.io/design-system/docs/breadcrumb) | `Breadcrumb`, `BreadcrumbList`, `BreadcrumbItem`, `BreadcrumbLink`, `BreadcrumbPage`, `BreadcrumbSeparator`, `BreadcrumbEllipsis` | The trail to the current page, with the last item as plain text. |
| [CommandPalette](https://littlebigcode.github.io/design-system/docs/command) | `CommandPalette`, `type CommandPaletteProps`, `type Command` | The ⌘K surface: one flat list of commands, grouped and filtered as you type. |
| [Menubar](https://littlebigcode.github.io/design-system/docs/menubar) | `Menubar`, `MenubarMenu`, `MenubarTrigger`, `MenubarContent`, `MenubarItem`, `MenubarCheckboxItem`, `MenubarRadioGroup`, `MenubarRadioItem`, `MenubarLabel`, `MenubarSeparator`, `MenubarShortcut`, `MenubarGroup`, `MenubarPortal`, `MenubarSub`, `MenubarSubTrigger`, `MenubarSubContent` | A desktop-style application menu bar with keyboard traversal. |
| [Navigation Menu](https://littlebigcode.github.io/design-system/docs/navigation-menu) | `NavigationMenu`, `NavigationMenuList`, `NavigationMenuItem`, `NavigationMenuTrigger`, `NavigationMenuContent`, `NavigationMenuPositioner`, `NavigationMenuLink`, `NavigationMenuIndicator`, `navigationMenuTriggerStyle` | A horizontal site menu with optional rich dropdown panels. |
| [Pagination](https://littlebigcode.github.io/design-system/docs/pagination) | `Pagination`, `PaginationContent`, `PaginationItem`, `PaginationLink`, `PaginationPrevious`, `PaginationNext`, `PaginationEllipsis`, `paginationRange` | Page links with previous, next and ellipsis. |
| [Stepper](https://littlebigcode.github.io/design-system/docs/stepper) | `Stepper`, `StepperItem`, `StepperIndicator`, `StepperContent`, `StepperTitle`, `StepperDescription` | Progress through a multi-step flow, with per-step state and orientation support. |
| [Tabs](https://littlebigcode.github.io/design-system/docs/tabs) | `Tabs`, `type TabsProps`, `type TabItem` | Sibling views of one subject, one visible at a time. |
| [Toc](https://littlebigcode.github.io/design-system/docs/toc) | `Toc`, `TocLabel`, `TocList`, `TocItem`, `TocLink` | The in-page anchor rail — a sticky list of the sections on the current page. |
| [VerticalNav](https://littlebigcode.github.io/design-system/docs/sidebar) | `VerticalNav`, `type VerticalNavProps`, `type VerticalNavItem` | The app's own nav column: one level of nesting, one active row. |

### Layout

| Component | Imports | What it is |
| --- | --- | --- |
| [Aspect Ratio](https://littlebigcode.github.io/design-system/docs/aspect-ratio) | `AspectRatio` | Constrains content to a fixed width-to-height ratio. |
| [Banner](https://littlebigcode.github.io/design-system/docs/banner) | `Banner`, `BannerContent`, `BannerTitle`, `BannerDescription`, `BannerAction` | A full-width, tone-coloured message bar over the shared six-tone family — the same tokens button.tsx's `tone` axis reads. |
| [Carousel](https://littlebigcode.github.io/design-system/docs/carousel) |  | A paged slide viewport with previous and next controls. Stylesheet only — the drag and snap need a binding this package does not ship. |
| [Masonry](https://littlebigcode.github.io/design-system/docs/masonry) | `Masonry` | A multi-column layout that balances items of uneven height, via CSS columns rather than a JS measurement pass. |
| [Page Header](https://littlebigcode.github.io/design-system/docs/page-header) | `PageHeader`, `PageHeaderHeading`, `PageHeaderIcon`, `PageHeaderTitle`, `PageHeaderDescription`, `PageHeaderActions`, `PageHeaderTabs` | Breadcrumb, title, description and actions for the top of a page, with an optional flush tab strip. |
| [Panel](https://littlebigcode.github.io/design-system/docs/panel) | `Panel`, `PanelHeader`, `PanelTitle`, `PanelContent`, `PanelFooter`, `PanelRow` | A sunken section container — the flat sibling of Card, plus a row part for tightly-packed settings lists. |
| [Resizable](https://littlebigcode.github.io/design-system/docs/resizable) |  | Panel groups split by draggable handles. Stylesheet only — the drag needs a binding this package does not ship. |
| [Scroll Area](https://littlebigcode.github.io/design-system/docs/scroll-area) | `ScrollArea`, `ScrollBar` | A scrollable region with styled, overlay scrollbars. |
| [Separator](https://littlebigcode.github.io/design-system/docs/separator) | `Separator` | A rule between content. Base UI inverts the orientation semantics — a horizontal group takes vertical separators. |
| [Theme Switcher](https://littlebigcode.github.io/design-system/docs/theme-switcher) | `ThemeSwitcher`, `type ThemeSwitcherMode` | A light/dark/system toggle, promoted from the docs app's own theme-toggle. Fully controlled — the consumer owns the theme hook. |
| [Wordmark](https://littlebigcode.github.io/design-system/docs/wordmark) | `Wordmark`, `wordmarkVariants` | The Diametral logo lockup, inlined as JSX so it recolours with the surrounding text. |

### Disclosure

| Component | Imports | What it is |
| --- | --- | --- |
| [Accordion](https://littlebigcode.github.io/design-system/docs/accordion) | `Accordion`, `type AccordionProps`, `type AccordionItem` | A stack of disclosure rows, driven by an `items` array rather than composed from children. |
| [Collapsible](https://littlebigcode.github.io/design-system/docs/collapsible) | `Collapsible`, `CollapsibleTrigger`, `CollapsibleContent` | A single show/hide region. Emits `data-open` / `data-closed`, not `data-state`. |

### Overlays

| Component | Imports | What it is |
| --- | --- | --- |
| [ContextMenu](https://littlebigcode.github.io/design-system/docs/context-menu) | `ContextMenu`, `ContextMenuTrigger`, `ContextMenuContent`, `ContextMenuItem`, `ContextMenuCheckboxItem`, `ContextMenuRadioGroup`, `ContextMenuRadioItem`, `ContextMenuLabel`, `ContextMenuSeparator`, `ContextMenuShortcut`, `ContextMenuGroup`, `ContextMenuPortal`, `ContextMenuSub`, `ContextMenuSubTrigger`, `ContextMenuSubContent` | Right-click's own menu, positioned at the pointer. |
| [Drawer](https://littlebigcode.github.io/design-system/docs/drawer) | `Drawer`, `DrawerTrigger`, `DrawerPortal`, `DrawerOverlay`, `DrawerSwipeHandle`, `DrawerClose`, `DrawerContent`, `DrawerHeader`, `DrawerFooter`, `DrawerTitle`, `DrawerDescription` | A bottom sheet with drag-to-dismiss and snap points — Sheet's gesture-driven sibling, tuned for touch. |
| [Dropdown](https://littlebigcode.github.io/design-system/docs/dropdown-menu) | `Dropdown`, `MenuItem`, `MenuHeader`, `MenuDivider` | A menu of actions hanging off a trigger. |
| [Hover Card](https://littlebigcode.github.io/design-system/docs/hover-card) | `HoverCard`, `HoverCardTrigger`, `HoverCardContent` | A preview surface shown on hover, for links and mentions. |
| [Modal](https://littlebigcode.github.io/design-system/docs/alert-dialog) | `Modal`, `type ModalProps` | The destructive-confirmation shape of `Modal`: a heading, the consequence, and two buttons. |
| [Modal](https://littlebigcode.github.io/design-system/docs/dialog) | `Modal`, `type ModalProps` | A focused task on top of the page: heading, body, footer actions. |
| [Popover](https://littlebigcode.github.io/design-system/docs/popover) | `Popover`, `type PopoverProps`, `type PopoverPlacement` | A small panel anchored to a trigger, for detail that would crowd the page. |
| [Sheet](https://littlebigcode.github.io/design-system/docs/sheet) | `Sheet`, `SheetTrigger`, `SheetClose`, `SheetContent`, `SheetHeader`, `SheetFooter`, `SheetTitle`, `SheetDescription` | A panel that slides in from an edge — Dialog's modal contract, sized to a column instead of a centred box. |
| [Tooltip](https://littlebigcode.github.io/design-system/docs/tooltip) | `Tooltip`, `TooltipTrigger`, `TooltipContent`, `TooltipProvider` | A short label on hover or focus. Never put interactive content in one. |

### Feedback

| Component | Imports | What it is |
| --- | --- | --- |
| [Alert](https://littlebigcode.github.io/design-system/docs/alert) | `Alert`, `type AlertProps`, `type AlertType` | An inline message about the thing next to it. Four types, optionally dismissible. |
| [Toast](https://littlebigcode.github.io/design-system/docs/toast) | `ToastProvider`, `useToast`, `Toast`, `type ToastOptions` | A transient confirmation that an action landed, raised from anywhere via `useToast`. |

### Conversation

| Component | Imports | What it is |
| --- | --- | --- |
| [Attachment](https://littlebigcode.github.io/design-system/docs/attachment) | `Attachment`, `AttachmentGroup`, `AttachmentMedia`, `AttachmentContent`, `AttachmentTitle`, `AttachmentDescription`, `AttachmentActions`, `AttachmentAction`, `AttachmentTrigger`, `type AttachmentState` | File metadata display for a message. Not an upload input — see File Upload. |
| [Bubble](https://littlebigcode.github.io/design-system/docs/bubble) | `BubbleGroup`, `Bubble`, `BubbleContent`, `BubbleReactions`, `type BubbleVariant` | Chat bubbles grouped by author. |
| [Message](https://littlebigcode.github.io/design-system/docs/message) | `MessageGroup`, `Message`, `MessageAvatar`, `MessageContent`, `MessageHeader`, `MessageFooter` | A conversation row with avatar and content. |
| [Message Scroller](https://littlebigcode.github.io/design-system/docs/message-scroller) |  | A transcript viewport that keeps itself pinned to the latest message. Stylesheet only — the pinning needs a binding this package does not ship. |

### Utilities

| Component | Imports | What it is |
| --- | --- | --- |
| [Direction](https://littlebigcode.github.io/design-system/docs/direction) | `DirectionProvider`, `useDirection` | A provider that sets text direction (LTR/RTL) for every Base UI component beneath it. |
| [Icon](https://littlebigcode.github.io/design-system/docs/icon) | `Icon`, `icons` | The built-in glyph set — 34 Phosphor icons, keyed by name, shared by the React binding and the `<ds-icon>` web component. |

<!-- END generated: react-components -->

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

A full-width notice with a six-tone axis. The tone sets the tint and the ink; `neutral` is the
default, because a banner that is always shouting is a banner nobody reads.

```html
<div class="ds-banner ds-banner--info" role="status">
  <div class="ds-banner-content">
    <div class="ds-banner-title">Scheduled maintenance</div>
    <div>Staging is unavailable from 10pm to midnight UTC.</div>
  </div>
  <div class="ds-banner-action"><button class="ds-button ds-button--sm">Details</button></div>
</div>
```

**Parts / variants:** `.ds-banner` with `--neutral` (default), `--info`, `--success`, `--warning`,
`--danger`, `--critical`. `.ds-banner-content` holds `.ds-banner-title` and the description;
`.ds-banner-action` is the trailing control cluster. Add `hidden` to dismiss it.

**React** — `<Banner>` (prop: `tone`), `<BannerContent>`, `<BannerTitle>`, `<BannerDescription>`,
`<BannerAction>`.

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
<dl class="ds-description-list">
  <dt class="ds-description-term">Entity</dt><dd class="ds-description-detail">LBC_FR</dd>
  <dt class="ds-description-term">Day rate</dt><dd class="ds-description-detail">€900</dd>
  <dt class="ds-description-term">Margin</dt><dd class="ds-description-detail">38.0 %</dd>
</dl>
```

**Parts:** `.ds-description-list` (the grid), `.ds-description-term` (uppercase label `<dt>`), `.ds-description-detail` (tabular
value `<dd>`). The first row drops its leading rule.

**React** — `<DescriptionList>`, `<DescriptionTerm>`, `<DescriptionDetail>`. Parts rather than an
`items` array, so a detail cell can hold a Tag, a Snippet or a link.

```jsx
<DescriptionList>
  <DescriptionTerm>Entity</DescriptionTerm>
  <DescriptionDetail>LBC_FR</DescriptionDetail>
  <DescriptionTerm>Day rate</DescriptionTerm>
  <DescriptionDetail>€900</DescriptionDetail>
</DescriptionList>
```

Live: [../examples/components/description-list.html](../examples/components/description-list.html)

## Avatar

A flat, sharp square showing uppercase initials or a cover-fit image clipped to a 1px bordered
tile, plus an overlapping group with a "+N" overflow count.

```html
<span class="ds-avatar" data-size="sm"><span class="ds-avatar-fallback">VD</span></span>
<span class="ds-avatar"><span class="ds-avatar-fallback">VD</span></span>
<span class="ds-avatar" data-size="lg"><img class="ds-avatar-image" src="…" alt="Leo Marsh"></span>

<div class="ds-avatar-group">
  <span class="ds-avatar"><img class="ds-avatar-image" src="…" alt="Maria Vance"></span>
  <span class="ds-avatar"><span class="ds-avatar-fallback">JL</span></span>
  <span class="ds-avatar-group-count" aria-label="3 more">+3</span>
</div>
```

**Parts / variants:** `.ds-avatar` (tile) holding a `.ds-avatar-image` and/or a
`.ds-avatar-fallback`; size is `data-size="sm" | "lg"` (default 32px, no attribute).
`.ds-avatar-badge` is the corner dot. `.ds-avatar-group` overlaps tiles and sizes its trailing
`.ds-avatar-group-count` off its members.

**React** — `<Avatar>` (prop: `size`), `<AvatarImage>`, `<AvatarFallback>`, `<AvatarBadge>`,
`<AvatarGroup>`, `<AvatarGroupCount>`. Base UI underneath, so the fallback appears only once the
image has actually failed or is still loading. The count is written, not computed.

```jsx
<Avatar size="lg"><AvatarFallback>VD</AvatarFallback></Avatar>
<Avatar>
  <AvatarImage src="https://i.pravatar.cc/96?img=32" alt="Leo Marsh" />
  <AvatarFallback>LM</AvatarFallback>
</Avatar>
<AvatarGroup>
  <Avatar><AvatarFallback>MV</AvatarFallback></Avatar>
  <AvatarGroupCount aria-label="3 more">+3</AvatarGroupCount>
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

A vertical event list: a 1px rail runs down the indicator column, and each item stacks a title, a
timestamp and supporting text beside it.

```html
<ol class="ds-timeline">
  <li class="ds-timeline-item ds-timeline-item--success" data-state="completed">
    <div class="ds-timeline-indicator"></div>
    <div class="ds-timeline-content">
      <div class="ds-timeline-title">Matrix published</div>
      <time class="ds-timeline-time">09:42</time>
      <p class="ds-timeline-description">All 1,204 rates synced to production.</p>
    </div>
  </li>
  <li class="ds-timeline-item">
    <div class="ds-timeline-indicator"></div>
    <div class="ds-timeline-content">
      <div class="ds-timeline-title">Draft created</div>
      <time class="ds-timeline-time">Yesterday</time>
    </div>
  </li>
</ol>
```

**Parts / variants:** `.ds-timeline` (`<ol>` rail), `.ds-timeline-item`, `.ds-timeline-indicator`,
`.ds-timeline-content`, `.ds-timeline-title`, `.ds-timeline-time`, `.ds-timeline-description`.
Tone rides on the **item** — `--neutral`, `--info`, `--success`, `--warning`, `--danger`,
`--critical` — and `data-state="completed" | "active"` fills or outlines the indicator with it.
Row spacing is `--ds-timeline-gap`, settable on an item or on the list.

**React** — `<Timeline>`, `<TimelineItem>` (prop: `tone`), `<TimelineIndicator>`,
`<TimelineContent>`, `<TimelineTitle>`, `<TimelineTime>`, `<TimelineDescription>`.

```jsx
<Timeline>
  <TimelineItem tone="success" data-state="completed">
    <TimelineIndicator />
    <TimelineContent>
      <TimelineTitle>Matrix published</TimelineTitle>
      <TimelineTime>09:42</TimelineTime>
    </TimelineContent>
  </TimelineItem>
</Timeline>
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

A circular loading indicator. Written by hand it is a 2px ruled ring whose top segment is the accent
color; the React binding spins a glyph instead. Both rotate off the same class
(`border-radius:50%` is a sanctioned exception; honors `prefers-reduced-motion`).

```html
<span class="ds-spinner ds-spinner--sm"></span>
<span class="ds-spinner"></span>
<span class="ds-spinner ds-spinner--lg"></span>
```

**Variants:** sizes `--sm` / `--lg` (default 20px); `--inline` aligns it to the text baseline beside
a label.

**React** — `<Spinner>`. Prop: `label` (accessible name via `aria-label`, default `"Loading"`).
It renders a Phosphor spinner glyph and takes no size prop — the size classes above apply to it.

```jsx
<Spinner className="ds-spinner--lg" />
<Spinner className="ds-spinner--sm ds-spinner--inline" label="Saving" />
```

Live: [../examples/components/spinner.html](../examples/components/spinner.html)

## Progress

A determinate task bar: a `.ds-progress` row holding an optional label and value, then a track with
an indicator whose width is set inline as a percent. Tone modifiers recolor the fill;
`--indeterminate` animates a sliding segment.

```html
<div>
  <div class="ds-progress-label"><span>Uploading</span><span class="ds-progress-value">62%</span></div>
  <div class="ds-progress"><div class="ds-progress-track"><div class="ds-progress-indicator" style="width:62%"></div></div></div>
</div>
<div class="ds-progress ds-progress--indeterminate"><div class="ds-progress-track"><div class="ds-progress-indicator"></div></div></div>
```

**Parts / variants:** `.ds-progress` (the wrapping row), `.ds-progress-track` and
`.ds-progress-indicator` (the fill). Tone modifiers `--tone-neutral`, `--tone-info`,
`--tone-success`, `--tone-warning`, `--tone-danger`, `--tone-critical`; `--indeterminate` for the
sliding segment. `.ds-progress-label` and `.ds-progress-value` are siblings of the track.

**React** — `<Progress>` (Base UI). Props: `value` (`null` is indeterminate), `max`, `tone`. It
renders its own `<ProgressTrack>` and `<ProgressIndicator>`; `<ProgressLabel>` and
`<ProgressValue>` are its children.

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

A path trail rendered as an ordered list in micro-caps. The separator is its own presentational
`<li>` holding a caret, so it flips for RTL and stays out of the accessible name of the item beside
it — which a generated `/` could not do.

```html
<nav aria-label="breadcrumb">
  <ol class="ds-breadcrumb-list">
    <li class="ds-breadcrumb-item"><a class="ds-breadcrumb-link" href="/">Home</a></li>
    <li class="ds-breadcrumb-separator" role="presentation" aria-hidden="true">›</li>
    <li class="ds-breadcrumb-item"><a class="ds-breadcrumb-link" href="/pricing">Pricing</a></li>
    <li class="ds-breadcrumb-separator" role="presentation" aria-hidden="true">›</li>
    <li class="ds-breadcrumb-item">
      <span class="ds-breadcrumb-page" role="link" aria-disabled="true" aria-current="page">Matrix</span>
    </li>
  </ol>
</nav>
```

**Parts:** `.ds-breadcrumb-list` (the `<ol>` — the `<nav>` root carries no class),
`.ds-breadcrumb-item`, `.ds-breadcrumb-link`, `.ds-breadcrumb-page` (the current page),
`.ds-breadcrumb-separator`, `.ds-breadcrumb-ellipsis` (a collapsed middle).

**React** — `<Breadcrumb>`, `<BreadcrumbList>`, `<BreadcrumbItem>`, `<BreadcrumbLink>`,
`<BreadcrumbPage>`, `<BreadcrumbSeparator>`, `<BreadcrumbEllipsis>`. `BreadcrumbLink` is
polymorphic through `render`, so a router's own Link renders in its place.

```jsx
<Breadcrumb>
  <BreadcrumbList>
    <BreadcrumbItem><BreadcrumbLink href="/">Home</BreadcrumbLink></BreadcrumbItem>
    <BreadcrumbSeparator />
    <BreadcrumbItem><BreadcrumbPage>Matrix</BreadcrumbPage></BreadcrumbItem>
  </BreadcrumbList>
</Breadcrumb>
```

Live: [../examples/components/breadcrumb.html](../examples/components/breadcrumb.html)

## Pagination

A strip of page controls with prev/next and an ellipsis where the run is collapsed. Each page is a
`.ds-button` inside a list, so a page can be a real link; the active one takes `--primary`.

```html
<nav class="ds-pagination" role="navigation" aria-label="Pagination">
  <ul class="ds-pagination-content">
    <li><a class="ds-button ds-pagination-previous" href="?page=1" aria-label="Go to previous page">
      <span class="ds-pagination-label">Previous</span></a></li>
    <li><a class="ds-button ds-button--icon ds-button--primary" href="?page=1" aria-current="page">1</a></li>
    <li><a class="ds-button ds-button--icon" href="?page=2">2</a></li>
    <li><span class="ds-pagination-ellipsis" aria-hidden="true">…</span></li>
    <li><a class="ds-button ds-button--icon" href="?page=24">24</a></li>
    <li><a class="ds-button ds-pagination-next" href="?page=2" aria-label="Go to next page">
      <span class="ds-pagination-label">Next</span></a></li>
  </ul>
</nav>
```

**Parts / state:** `.ds-pagination` (the nav), `.ds-pagination-content` (the list),
`.ds-pagination-previous` / `.ds-pagination-next` (the end controls),
`.ds-pagination-label` (their text, hidden below 640px), `.ds-pagination-ellipsis` (gap marker).
The page controls are `.ds-button`s; the active one carries `--primary` and `aria-current="page"`.

**React** — parts, not a controlled component. `paginationRange({ page, pageCount, siblingCount })`
is exported and returns the run of page numbers and `"ellipsis"` markers; you render it with
`<PaginationLink isActive>`. That is what lets a page be an `<a href>`.

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

**Modifiers:** sizes `--xs` / `--sm` / `--lg`; `--block` (full-width); `--icon` (square; pair with
an `aria-label`); `--loading` (hides the label and shows a centered spinner). `.ds-split` joins a
main action to a caret (`.ds-split__menu` holds its dropdown).

`.ds-button-group` joins buttons sharing borders. Since `1.0.0-beta.3` it lives in its own
`components/button-group.css`, gained `[data-orientation="vertical"]`, a `.ds-button-group-text`
cell and a `.ds-button-group-separator`, and collapses the shared edge by *removing* the losing
border rather than overlapping members — so it is correct under `dir="rtl"`. The class name and the
markup above are unchanged.

```html
<div class="ds-button-group" role="group" data-orientation="horizontal">
  <button class="ds-button">Copy</button>
  <span class="ds-button-group-separator ds-separator ds-separator--auto" data-orientation="vertical"></span>
  <button class="ds-button">Paste</button>
</div>
```

**React** — the base `<Button>` takes `variant` (`"primary" | "danger"`), `size` (`"sm" | "lg"`),
`loading`, and `block`. Plus `<ButtonGroup>` (props: `orientation`) with `<ButtonGroupText>` and
`<ButtonGroupSeparator>`, `<IconButton>` (props: `label` — accessible name + title, `variant`,
`size` — the four square sizes `"icon" | "icon-xs" | "icon-sm" | "icon-lg"`, or the bare
`"sm" | "lg"`), and `<SplitButton>` (props: `onMain`, `variant`, `size`, `menu`).

```jsx
import { Button, ButtonGroup, IconButton, SplitButton } from "@diametral/design-system/react";

<Button size="lg" loading>Saving</Button>
<IconButton label="Add" variant="primary" size="icon-sm"><PlusIcon /></IconButton>
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
  <div class="ds-empty-header">
  <div class="ds-empty-media ds-empty-media--icon" aria-hidden="true"><svg>…</svg></div>
    <p class="ds-empty-title">No missions yet</p>
    <p class="ds-empty-description">Create your first mission to compute a day rate, margin, and target salary.</p>
  </div>
  <div class="ds-empty-content">
    <button class="ds-button ds-button--primary">New mission</button>
    <button class="ds-button">Import</button>
  </div>
</div>
```

**Parts:** `.ds-empty` (centered column), `.ds-empty-header` (media + title + description),
`.ds-empty-media` with `--icon` for the tinted tile or `--default` for a bare illustration,
`.ds-empty-title`, `.ds-empty-description`, and an optional `.ds-empty-content` for what recovers
from the empty state.

**React** — `<Empty>`, `<EmptyHeader>`, `<EmptyMedia>` (prop: `variant`), `<EmptyTitle>`,
`<EmptyDescription>`, `<EmptyContent>`. Parts rather than props, which is what lets the media slot
hold an illustration and the content slot hold a form.

```jsx
<Empty>
  <EmptyHeader>
    <EmptyMedia variant="icon"><InboxIcon /></EmptyMedia>
    <EmptyTitle>No missions yet</EmptyTitle>
    <EmptyDescription>Create your first mission to compute a day rate.</EmptyDescription>
  </EmptyHeader>
  <EmptyContent>
    <Button variant="primary">New mission</Button>
  </EmptyContent>
</Empty>
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

---

# Layout & advanced inputs

The wave-two additions: richer form controls (a typeahead, token field, number stepper, date
picker, and file dropzone) plus the page-level layout primitives (a toolbar, an application shell,
and a multi-step wizard). Same parti pris — 1px borders, no radius, no shadow — and each ships a
`.ds-*` class set, a React component (`@diametral/design-system/react`), and a showcase page.

## Combobox

A typeahead — an `.ds-input`-styled field with a filtered popover list. Type to narrow the options,
ArrowUp / ArrowDown to move the active row, Enter to select, Escape or an outside-click to close.

```html
<div class="ds-combobox">
  <input class="ds-combobox__input" type="text" role="combobox"
         aria-expanded="true" aria-controls="cb-list" aria-autocomplete="list" autocomplete="off">
  <ul class="ds-combobox__list" id="cb-list" role="listbox">
    <li class="ds-combobox__option is-active" role="option" aria-selected="true">EUR — Euro</li>
    <li class="ds-combobox__option" role="option">USD — US Dollar</li>
    <li class="ds-combobox__option" role="option">GBP — Pound Sterling</li>
  </ul>
</div>
```

**Parts / state:** `.ds-combobox` (relative anchor; `--block` for full-width), `.ds-combobox__input`
(the field), `.ds-combobox__list` (bordered popover at `--ds-z-popover`), `.ds-combobox__option`
(`.is-active` on keyboard focus, `[aria-selected="true"]` on the current value, `[aria-disabled]` to
lock), and `.ds-combobox__empty` for the no-match row.

**React** — `<Combobox>`. Props: `options` (a `(string | { value, label?, disabled? })[]`), `value`
/ `defaultValue`, `onChange(value)`, `placeholder`, `allowCustom` (commit free text via Enter),
`disabled`; forwards a ref to the input and `<div>` attributes.

```jsx
<Combobox
  placeholder="Search currency…"
  defaultValue="EUR"
  options={[
    { value: "EUR", label: "EUR — Euro" },
    { value: "USD", label: "USD — US Dollar" },
    { value: "GBP", label: "GBP — Pound Sterling" },
  ]}
  onChange={(value) => setCurrency(value)}
/>
```

Live: [../examples/components/combobox.html](../examples/components/combobox.html)

## Tag input

A token field — a flex-wrap box styled like `.ds-input` that holds removable tokens followed by a
text entry. Enter or a comma adds a token, Backspace on the empty field removes the last, and each
token's × removes it.

```html
<div class="ds-tag-input">
  <span class="ds-tag-input__token">Pricing
    <button class="ds-tag-input__remove" type="button" aria-label="Remove Pricing" tabindex="-1">×</button>
  </span>
  <span class="ds-tag-input__token">Margin
    <button class="ds-tag-input__remove" type="button" aria-label="Remove Margin" tabindex="-1">×</button>
  </span>
  <input class="ds-tag-input__field" type="text" placeholder="Add tag…">
</div>
```

**Parts / state:** `.ds-tag-input` (the box; owns the focus ring via `:focus-within`, `--block` for
full-width), `.ds-tag-input__token` (a `.ds-tag`-style pill) with a trailing `.ds-tag-input__remove`
×, and the borderless `.ds-tag-input__field` text entry. Add `.is-disabled` (or disable the field)
to lock it.

**React** — `<TagInput>`. Props: `value` / `defaultValue` (a `string[]`), `onChange(value)`,
`placeholder`, `disabled`; forwards a ref to the input and `<div>` attributes.

```jsx
<TagInput
  placeholder="Add tag…"
  defaultValue={["Pricing", "Margin"]}
  onChange={(tags) => setTags(tags)}
/>
```

Live: [../examples/components/tag-input.html](../examples/components/tag-input.html)

## Number input

A numeric field flanked by −/+ stepper buttons that share borders like an input group. The buttons
step by `step`, clamp to `min` / `max`, and disable themselves at the bounds.

```html
<div class="ds-number-input">
  <button class="ds-number-input__step" type="button" aria-label="Decrement" tabindex="-1">−</button>
  <input class="ds-number-input__field" type="number" value="3" aria-label="Quantity">
  <button class="ds-number-input__step" type="button" aria-label="Increment" tabindex="-1">+</button>
</div>
```

**Parts / state / variants:** `.ds-number-input` (the group; `--block` for full-width),
`.ds-number-input__step` (the ± buttons; `disabled` at a bound), and the centered
`.ds-number-input__field` (native spinners stripped). The shared borders collapse so it reads as one
unit; disable the field to lock the whole control.

**React** — `<NumberInput>`. Props: `value` / `defaultValue` (a `number | null`),
`onChange(value)` (null when cleared), `min`, `max`, `step` (default 1), `disabled`; forwards a ref
to the input and `<div>` attributes.

```jsx
<NumberInput
  defaultValue={1}
  min={0}
  max={10}
  step={1}
  onChange={(value) => setQty(value)}
/>
```

Live: [../examples/components/number-input.html](../examples/components/number-input.html)

## Date picker

A `.ds-input` that opens a flat `.ds-calendar` popover — a bordered surface with a month label
between prev / next icon buttons and a 7-column grid of square day cells. No radius, no shadow.

```html
<div class="ds-datepicker">
  <input class="ds-input" type="text" readonly value="2026-06-18"
         aria-haspopup="dialog" aria-expanded="false" autocomplete="off">
  <div class="ds-calendar" role="dialog" aria-label="Choose date">
    <div class="ds-calendar__head">
      <button class="ds-button ds-button--icon ds-button--sm" type="button" aria-label="Previous month">…</button>
      <div class="ds-calendar__label">June 2026</div>
      <button class="ds-button ds-button--icon ds-button--sm" type="button" aria-label="Next month">…</button>
    </div>
    <div class="ds-calendar__grid" role="grid">
      <div class="ds-calendar__weekday" aria-hidden="true">Su</div> … <div class="ds-calendar__weekday" aria-hidden="true">Sa</div>
      <button class="ds-calendar__day is-outside" type="button">31</button>
      <button class="ds-calendar__day" type="button">1</button> …
      <button class="ds-calendar__day is-today" type="button">17</button>
      <button class="ds-calendar__day is-selected" type="button" aria-pressed="true">18</button> …
    </div>
  </div>
</div>
```

**Parts / state:** `.ds-datepicker` (relative anchor) holds the `.ds-input` and the `.ds-calendar`
surface (position it yourself — absolute / portal). The calendar carries `.ds-calendar__head` (label
+ `.ds-button--icon` steppers), `.ds-calendar__grid`, `.ds-calendar__weekday` labels, and
`.ds-calendar__day` cells: `.is-today` (accent ring), `.is-selected` (ink fill), `.is-outside` (faint
neighbour month), and `:disabled` (out of range).

**React** — `<DatePicker>`. Props: `value` / `defaultValue` (a `Date` or ISO `yyyy-mm-dd` string,
nullable), `onChange(date, iso)`, `min`, `max` (inclusive bounds), `format(date)`, `placeholder`
(default `yyyy-mm-dd`), `disabled`, `name`.

```jsx
<DatePicker
  defaultValue="2026-06-18"
  min="2026-01-01"
  max="2026-12-31"
  onChange={(date, iso) => console.log(iso, date)}
/>
```

Live: [../examples/components/date-picker.html](../examples/components/date-picker.html)

## File upload

A flat `.ds-dropzone` — a dashed-bordered click / keyboard / drag-and-drop target. On `.is-dragover`
the border and background shift to the accent. Selected files list below in a `.ds-filelist`.

```html
<div class="ds-file-upload">
  <div class="ds-dropzone" role="button" tabindex="0">
    <input type="file" multiple hidden>
    <div class="ds-dropzone__hint"><strong>Click to upload</strong> or drag and drop</div>
  </div>
  <ul class="ds-filelist">
    <li class="ds-filelist__item">
      <span class="ds-filelist__name">margin-report-q2.pdf</span>
      <span class="ds-filelist__size">248 KB</span>
      <button class="ds-filelist__remove" type="button" aria-label="Remove margin-report-q2.pdf">×</button>
    </li>
    <li class="ds-filelist__item">
      <span class="ds-filelist__name">price-matrix-export.csv</span>
      <span class="ds-filelist__size">1.4 MB</span>
      <div class="ds-progress" role="progressbar" aria-valuenow="62">
        <div class="ds-progress-track"><div class="ds-progress-indicator" style="width:62%"></div></div>
      </div>
      <button class="ds-filelist__remove" type="button" aria-label="Remove price-matrix-export.csv">×</button>
    </li>
  </ul>
</div>
```

**Parts / state:** `.ds-file-upload` (root wrapper), `.ds-dropzone` (dashed target; `.is-dragover`
for the accent drop state) with a `.ds-dropzone__hint`, and `.ds-filelist` rows of
`.ds-filelist__item` carrying a `.ds-filelist__name`, a tabular `.ds-filelist__size`, an optional
reused `.ds-progress` bar, and a `.ds-filelist__remove` × button.

**React** — `<FileUpload>`. Props: `accept`, `multiple`, `onFiles(files)`, `value` (a `File[]` for
controlled use), `hint`, `disabled`, `name`.

```jsx
<FileUpload
  accept=".pdf,.csv"
  multiple
  onFiles={(files) => console.log(files)}
/>
```

Live: [../examples/components/file-upload.html](../examples/components/file-upload.html)

## Toolbar

A horizontal bar that aligns controls on one row — buttons, a segmented control, a search field.
Cluster related controls with `.ds-toolbar-group` and push the rest to the far edge with a flexible

```html
<div class="ds-toolbar" role="toolbar">
  <div class="ds-toolbar-group">
    <button class="ds-button ds-button--primary">New</button>
    <button class="ds-button">Import</button>
  </div>
  
  <div class="ds-toolbar-group">
    <button class="ds-button">Export</button>
    <button class="ds-button ds-button--danger">Delete</button>
  </div>
</div>
```

**Parts / variants:** `.ds-toolbar` (a boxed strip, `width: fit-content`; `data-orientation="vertical"`
stacks it), `.ds-toolbar-group` (a tight cluster), `.ds-toolbar-separator` (rules between groups),
`.ds-toolbar-button`, `.ds-toolbar-link`, `.ds-toolbar-input`. `.ds-toolbar-spacer` still eats the
free space, but only on a bar you have widened past its content — the strip sizes to its contents by
default, where 0.11's stretched to its container.

```html
<div class="ds-toolbar" role="toolbar">
  <input class="ds-input" type="search" placeholder="Search rows…" aria-label="Search">
  
  <button class="ds-button">Filters</button>
</div>
```

**React** — `<Toolbar>`, `<ToolbarGroup>`, `<ToolbarButton>` (props: `variant`, `size`),
`<ToolbarLink>`, `<ToolbarInput>`, `<ToolbarSeparator>`. Base UI's Toolbar underneath, so the whole
strip is **one** tab stop and the arrow keys walk it — where 0.11's flex row made every control its
own stop.

```jsx
<Toolbar>
  <ToolbarInput type="search" placeholder="Search rows…" aria-label="Search" />
  <ToolbarSeparator />
  <ToolbarGroup>
    <ToolbarButton aria-label="Export"><DownloadIcon /></ToolbarButton>
    <ToolbarButton aria-label="Delete" variant="danger"><TrashIcon /></ToolbarButton>
  </ToolbarGroup>
</Toolbar>
```

Live: [../examples/components/toolbar.html](../examples/components/toolbar.html)

## App shell

A full application scaffold on a CSS grid: a full-width header reusing the app-bar look, a left
sidebar (1px right rule) holding a vertical nav, and a scrolling main content area. At `--ds-bp-md`
the sidebar collapses behind a `☰` toggle.

```html
<div class="ds-shell">
  <header class="ds-shell__header">
    <button class="ds-shell__toggle" type="button" aria-label="Toggle navigation" aria-expanded="false">☰</button>
    <span class="ds-wordmark" data-variant="horizontal"><svg>…</svg></span>
  </header>
  <aside class="ds-shell__sidebar">
    <nav class="ds-vnav" aria-label="Sidebar">
      <a class="ds-vnav__item is-active" href="#" aria-current="page">Dashboard</a>
      <a class="ds-vnav__item" href="#">Pricing matrix</a>
    </nav>
  </aside>
  <main class="ds-shell__main">…</main>
</div>
```

**Parts / state:** `.ds-shell` (the grid with named `header` / `sidebar` / `main` areas),
`.ds-shell__header` (sticky, full-width), `.ds-shell__sidebar` (scrolls independently),
`.ds-shell__main` (the scrolling content), and the `.ds-shell__toggle` ghost button (shown below
940px). Add `.is-sidebar-open` to the shell to band the sidebar back in on narrow screens.

**React** — `<AppShell>`. Props: `header`, `sidebar` (omit for a header + main only), `children`
(the main area), `collapsed` / `defaultCollapsed` (narrow-screen sidebar state, default collapsed),
`onToggle(collapsed)`; forwards a ref and `<div>` attributes.

```jsx
<AppShell
  header={<Wordmark sub="Console" />}
  sidebar={
    <VerticalNav
      items={[
        { label: "Dashboard", href: "/", active: true },
        { label: "Pricing matrix", href: "/matrix" },
      ]}
    />
  }
>
  <h1 className="ds-title">Dashboard</h1>
</AppShell>
```

Live: [../examples/components/app-shell.html](../examples/components/app-shell.html)

## Wizard

A multi-step flow built on the stepper. A `.ds-stepper` trail heads the card, the active step's
content fills the `.ds-wizard__panel`, and a footer set off by a top rule carries Back on the left
with Next / Finish on the right.

```html
<div class="ds-wizard">
  <div class="ds-wizard__steps">
    <ol class="ds-stepper">
      <li class="ds-stepper__step is-active" aria-current="step"><span class="ds-stepper__marker">1</span><span class="ds-stepper__label">Profile</span></li>
      <li class="ds-stepper__step"><span class="ds-stepper__marker">2</span><span class="ds-stepper__label">Rates</span></li>
      <li class="ds-stepper__step"><span class="ds-stepper__marker">3</span><span class="ds-stepper__label">Review</span></li>
    </ol>
  </div>
  <div class="ds-wizard__panel">Step 1 — capture the consultant profile…</div>
  <div class="ds-wizard__footer">
    <button class="ds-button" type="button" disabled>Back</button>
    <div class="ds-wizard__footer-actions">
      <button class="ds-button ds-button--primary" type="button">Next</button>
    </div>
  </div>
</div>
```

**Parts:** `.ds-wizard` (the bordered column), `.ds-wizard__steps` (wraps a [`.ds-stepper`](#stepper)
trail; prior markers flip to `.is-complete`, the current to `.is-active`), `.ds-wizard__panel` (the
active step's content), and `.ds-wizard__footer` (Back on the left, `.ds-wizard__footer-actions`
keeps Next / Finish grouped at the end). On the last step the trailing action reads Finish.

**React** — `<Wizard>`. Props: `steps` (a `{ label, content?, disableNext? }[]`), `active` /
`defaultActive` (the active step index), `onStepChange(index)`, `onFinish()`; forwards a ref and
`<div>` attributes.

```jsx
<Wizard
  defaultActive={0}
  onFinish={() => publish()}
  steps={[
    { label: "Profile", content: <ProfileForm /> },
    { label: "Rates",   content: <RatesForm />, disableNext: !ratesValid },
    { label: "Review",  content: <ReviewPanel /> },
  ]}
/>
```

Live: [../examples/components/wizard.html](../examples/components/wizard.html)

---

# Data viz & utilities

The wave-three additions: two overlays (an off-canvas drawer and a ⌘K command palette), a small set
of data-viz primitives (a sparkline, a bar chart, and a KPI stat card), a few more inputs (a rating,
a date-range picker, and a color picker), and two utilities (a dark code block and an inline keycap).
Same parti pris — 1px borders, no radius, no shadow — and each ships a `.ds-*` class set, a React
component (`@diametral/design-system/react`), and a showcase page.

## Drawer

An off-canvas panel anchored to an edge of the viewport over a dimmed scrim: a bordered head with a
title and close button, a scrollable body, and an optional footer. Slides in via a transform.

```html
<div class="ds-drawer-overlay is-open">
  <div class="ds-drawer ds-drawer--right" role="dialog" aria-modal="true">
    <div class="ds-drawer__head">
      <h2 class="ds-drawer__title">Filters</h2>
      <button class="ds-button ds-drawer__close">Close</button>
    </div>
    <div class="ds-drawer__body"><p>Body content…</p></div>
    <div class="ds-drawer__foot">
      <button class="ds-button">Clear</button>
      <span class="ds-drawer__spacer"></span>
      <button class="ds-button ds-button--primary">Apply</button>
    </div>
  </div>
</div>
```

**Parts / state:** `.ds-drawer-overlay` (the fixed backdrop scrim; opened with `.is-open` or
`[data-open="true"]`) wraps the `.ds-drawer` panel, which carries `.ds-drawer__head`
(`.ds-drawer__title` + `.ds-drawer__close`), a scrolling `.ds-drawer__body`, and an optional
`.ds-drawer__foot`; `.ds-drawer__spacer` pushes the trailing action to the right. **Placement
modifiers** dock the panel to an edge: `--right` (default), `--left`, `--top`, `--bottom`. Motion is
held still under `prefers-reduced-motion`.

**React** — `<Drawer>` portals to `<body>` and is controlled via `open`; it closes on Escape and a
backdrop click. Props: `open` (required), `onClose`, `placement` (`"right" | "left" | "top" |
"bottom"`, default `right`), `heading`, `footer`, `className`, `children`.

```jsx
<Drawer open={open} onClose={() => setOpen(false)} placement="right" heading="Filters"
  footer={<Button variant="primary" onClick={() => setOpen(false)}>Apply</Button>}>
  <p>Body content…</p>
</Drawer>
```

Live: [../examples/components/drawer.html](../examples/components/drawer.html)

## Command palette

A ⌘K-style command surface: a borderless search input over a scrollable list of grouped, selectable
rows. Filter as you type, move the active row with the arrows, and run it with Enter. Reuses the
shared `.ds-overlay` scrim.

```html
<div class="ds-cmdk" role="dialog" aria-modal="true" aria-label="Command palette">
  <input class="ds-cmdk__input" type="text" placeholder="Type a command or search…">
  <div class="ds-cmdk__list" role="listbox">
    <div class="ds-cmdk__group-label">Navigation</div>
    <button class="ds-cmdk__item is-active" role="option" aria-selected="true">
      <span class="ds-cmdk__label">Go to dashboard</span>
      <span class="ds-cmdk__kbd">G D</span>
    </button>
    <button class="ds-cmdk__item" role="option">
      <span class="ds-cmdk__label">Go to settings</span>
      <span class="ds-cmdk__kbd">G S</span>
    </button>
    <div class="ds-cmdk__group-label">Actions</div>
    <button class="ds-cmdk__item" role="option">
      <span class="ds-cmdk__label">Create reference</span>
      <span class="ds-cmdk__hint">⌘ N</span>
    </button>
  </div>
</div>
```

**Parts / state:** `.ds-cmdk` (the surface; drop it inside a `.ds-overlay` aligned to `flex-start`),
`.ds-cmdk__input` (borderless, bottom rule), `.ds-cmdk__list`, `.ds-cmdk__group-label` (faint
uppercase cluster heading), `.ds-cmdk__item` (a row; `.is-active` shifts it to the alt background)
holding a `.ds-cmdk__label` and an optional right-aligned `.ds-cmdk__hint` or boxed `.ds-cmdk__kbd`.
When the query matches nothing, the list shows a single centered `.ds-cmdk__empty`.

**React** — `<CommandPalette>` portals to `<body>` and is controlled via `open`; filtering, arrow
navigation, and Enter-to-run are built in. Props: `open` (required), `onClose`, `commands` (a
`{ id, label, group?, hint?, onRun? }[]`), `placeholder`, `className`. Wire a global ⌘K listener to
flip `open`.

```jsx
<CommandPalette open={open} onClose={() => setOpen(false)}
  placeholder="Type a command or search…"
  commands={[
    { id: "dash", label: "Go to dashboard", group: "Navigation", hint: "G D", onRun: () => navigate("/") },
    { id: "new",  label: "Create reference", group: "Actions", hint: "⌘ N", onRun: createReference },
  ]} />
```

Live: [../examples/components/command-palette.html](../examples/components/command-palette.html)

## Sparkline

An inline SVG mini line chart — no axes, no grid, no library. The line is a single polyline scaled to
fit its box and drawn with `currentColor`, so setting `color` recolors it; the wrapper's own default
is `--ds-chart-1`, the first series color, because a themed accent must not repaint data.

```html
<span class="ds-sparkline" role="img" aria-label="Sessions over 6 weeks">
  <svg class="ds-sparkline-svg" width="120" height="32" viewBox="0 0 120 32" preserveAspectRatio="none" aria-hidden="true">
    <path class="ds-sparkline-area" d="M2,30 L2,24 25.6,18 49.2,26 72.8,8 96.4,14 118,2 L118,30 Z" />
    <polyline class="ds-sparkline-line" points="2,24 25.6,18 49.2,26 72.8,8 96.4,14 118,2" />
    <circle class="ds-sparkline-dot" cx="118" cy="2" r="2" />
  </svg>
</span>
```

**Parts:** `.ds-sparkline` (inline-block wrapper; set `color` to recolor), `.ds-sparkline-svg`, the
`.ds-sparkline-line` polyline, an optional faint `.ds-sparkline-area` fill under it, and an optional
`.ds-sparkline-dot` on the last point. All inherit the line color via `currentColor`.
`.ds-sparkline-line--animate` draws the line in on mount (and does nothing under
`prefers-reduced-motion`). The parts were `__svg` / `__line` / `__area` / `__dot` before
1.0.0-beta.4; the rename is mechanical, `__` for `-`.

**React** — `<Sparkline>`. Props: `data` (a `number[]`, scaled to fit), `width` (default 120),
`height` (default 32), `stroke` (line color), `fill` (`boolean | string` — a faint area under the
line), `showDot`, `animate`. A flat series — or a single point — pins to the middle of the box; before
1.0.0-beta.4 it drew along the floor and read as a minimum it was not.

```jsx
<Sparkline data={[4, 8, 6, 14, 11, 20]} fill showDot />
<Sparkline data={[2, 5, 4, 9, 11, 16]} stroke="var(--ds-success)" width={160} />
```

Live: [../examples/components/sparkline.html](../examples/components/sparkline.html)

## Charts

Every chart except the sparkline and the gauge is **React-only** from 1.0.0-beta.4 on: the marks are
drawn by [recharts](https://recharts.org), so there is no static markup that reproduces them and no
`.ds-*` class per mark. What the stylesheet owns is the frame — the plotting box, the tooltip and the
legend — plus the descendant rules that repaint recharts' own hard-coded defaults (`#ccc` gridlines,
`#fff` mark outlines) onto `--ds-*` tokens, in both themes.

0.11's pure-SVG and CSS-flex charts (`.ds-chart`, `.ds-barchart`, `.ds-linechart`, `.ds-areachart`,
`.ds-donut`, `.ds-piechart`, `.ds-stackedbar`) were removed in the same release. See
[migration/from-0.11.md](migration/from-0.11.md) for the class-by-class map.

**Parts:** `.ds-chart-container` (the plotting box, 16/9 by default) with `--plot` (a fixed height,
full width — the axis charts) and `--square` (1:1 — pie, donut) modifiers, both reading
`--ds-chart-height`; `.ds-chart-tooltip-content` and its label / item / indicator / value parts;
`.ds-chart-legend-content` with `-item` and a 10px `-dot` swatch. `.ds-stacked-bar-root`,
`.ds-pie-chart-root` and `.ds-donut-chart-root` size and centre their own charts, and
`.ds-donut-chart-center-label` / `-center-caption` set the figure in the hole.

**React** — `ChartContainer` + `ChartTooltip(Content)` + `ChartLegend(Content)` are the substrate; six
finished charts compose them, each taking a `config` and rows of `data`:

| component | for | the row fields it needs |
| --- | --- | --- |
| `LineChart` | a trend over a category axis | `xAxisKey` |
| `AreaChart` | the same, read as a volume; `stacked` sums the series | `xAxisKey` |
| `BarChart` | magnitudes; `horizontal`, `stacked`, `max`, `statusKey` | `xAxisKey` |
| `StackedBar` | shares — every row normalised to its own total | `labelKey` |
| `PieChart` | parts of one whole | `valueKey`, `nameKey` |
| `DonutChart` | the same with a figure in the hole | `valueKey`, `nameKey` |

`config` is the whole naming and coloring system: one entry per series or slice, keyed by the field
name in the data row. An entry that carries a `color` becomes a `--color-<key>` custom property scoped
to that one chart; an entry with no color takes the next slot of the six-color `--ds-chart-*` ramp.
The tooltip and legend read their labels from the same object, so a series is named once.

```jsx
const config = {
  signups: { label: "Signups", color: "var(--ds-chart-2)" },
  churn: { label: "Churn" },   // takes the next ramp slot
}

<LineChart config={config} data={rows} xAxisKey="week" />
<BarChart config={config} data={rows} xAxisKey="week" max={300} horizontal />
<DonutChart config={config} data={rows} valueKey="gb" nameKey="bucket" centerLabel="8.2 GB" />
```

`recharts` is an optional peer dependency (`>= 3`), like `react`: install it to use these six, and
nothing if you only consume the CSS. A chart whose shape none of them draws composes `ChartContainer`
with recharts children directly — import those from `recharts`, not from this package.

## Gauge

A 270° radial gauge for one value: a faint full track arc behind a colored value arc, whose length is
a `stroke-dasharray` so it redraws without recomputing the arc path. Library-free, like the
sparkline — the markup below renders it with no React at all.

```html
<div class="ds-gauge" role="img" aria-label="Capacity: 68 of 100">
  <svg class="ds-gauge-svg" width="180" height="180" viewBox="0 0 180 180" aria-hidden="true">
    <path class="ds-gauge-track" d="M 24,148 A 82,82 0 1 1 156,148" fill="none" stroke-width="16" />
    <path class="ds-gauge-value" d="M 24,148 A 82,82 0 1 1 156,148" fill="none" stroke-width="16"
          stroke-dasharray="263 386" />
    <text class="ds-gauge-center" x="90" y="86" font-size="43" text-anchor="middle">68</text>
    <text class="ds-gauge-label" x="90" y="122" text-anchor="middle">Capacity</text>
  </svg>
</div>
```

**Parts:** `.ds-gauge` (the inline-flex column), `.ds-gauge-svg`, `.ds-gauge-track` (the faint arc),
`.ds-gauge-value` (the value arc — color set inline, length via `stroke-dasharray`),
`.ds-gauge-center` (the figure) and `.ds-gauge-label` (the uppercase caption under it). The parts were
`__svg` / `__track` / `__value` / `__center` / `__label` before 1.0.0-beta.4.

**React** — `<Gauge>`, renamed from 0.11's `GaugeChart` with every prop intact: `value`, `max`
(default 100), `size` (default 180), `thickness` (default 16), `label`, `color`, `thresholds`
(`{ at, color }[]`, last match wins) and `format`. It renders `role="img"` with the value and the
maximum in the accessible name.

```jsx
<Gauge value={68} label="Capacity" />
<Gauge value={92} max={120} thresholds={[{ at: 80, color: "var(--ds-warning)" }]}
       format={(v) => `${v}%`} />
```

## Stat card

A dashboard KPI tile: a flat bordered surface carrying an uppercase faint label, a large title-voiced
figure with tabular numerals, an optional up/down delta, and a slot for an inline chart (e.g. a
sparkline) under the value.

```html
<div class="ds-stat">
  <div class="ds-stat__label">Sessions</div>
  <div class="ds-stat__value">9,201</div>
  <div class="ds-stat__delta is-up">12%</div>
  <div class="ds-stat__spark">
    <span class="ds-sparkline">…</span>
  </div>
</div>
```

**Parts / state:** `.ds-stat` (the tile), `.ds-stat__label` (uppercase faint eyebrow),
`.ds-stat__value` (the headline figure in the title face), an optional `.ds-stat__delta` (`.is-up`
reads success and prepends a ▲, `.is-down` reads danger and prepends a ▼), and an optional
`.ds-stat__spark` slot for an inline chart under the value.

**React** — `<StatCard>`. Props: `label`, `value`, `delta`, `deltaDir` (`"up" | "down"` — colors the
delta and prepends the arrow); `children` render in the spark slot. Forwards a ref and `<div>`
attributes.

```jsx
<StatCard label="Active users" value="12,840" delta="8.2% vs last week" deltaDir="up" />

<StatCard label="Sessions" value="9,201" delta="12%" deltaDir="up">
  <Sparkline data={[13, 17, 15, 22, 26, 30]} fill showDot width={160} />
</StatCard>
```

Live: [../examples/components/stat-card.html](../examples/components/stat-card.html)

## Rating

A 5-star rating: an inline row of star buttons drawn as inline SVG with `currentColor`. Filled stars
read accent, empty stars read the rule color. Click a star, or focus the group and use the arrow keys
then Enter to set the value.

```html
<div class="ds-rating" role="group" aria-label="Rating">
  <button type="button" class="ds-rating__star is-on" aria-label="1 star" aria-pressed="false"><svg viewBox="0 0 20 20" aria-hidden="true"><path d="M10 1.5l2.47 5.18 5.68.72-4.2 3.87 1.1 5.63L10 14.98 4.95 17.9l1.1-5.63-4.2-3.87 5.68-.72L10 1.5z"/></svg></button>
  <!-- …stars 2–3 .is-on, 4–5 empty… -->
</div>
```

**Parts / state / variants:** `.ds-rating` (the inline row), `.ds-rating__star` (one star; add
`.is-on` to fill it with the accent). The `--readonly` modifier drops the pointer affordance for
display-only ratings (render the stars as `<span>`s, with `role="img"` on the row).

**React** — `<Rating>`. Props: `value` (controlled) / `defaultValue` (uncontrolled), `max` (default
5), `onChange(value)`, `readOnly`; forwards `<div>` attributes (sans `onChange` / `defaultValue`).

```jsx
<Rating defaultValue={3} onChange={(v) => console.log(v)} />
<Rating value={4} readOnly />
```

Live: [../examples/components/rating.html](../examples/components/rating.html)

## Date range picker

A `.ds-input` that opens a flat `.ds-daterange__popover` laying two `.ds-calendar` month grids side by
side. Click to set the start, click again for the end — the span fills with a soft accent and the
endpoints fill with ink. Reuses the `.ds-calendar*` look from the [date picker](#date-picker).

```html
<div class="ds-daterange">
  <input class="ds-input" type="text" readonly value="2026-06-12 — 2026-07-03"
         aria-haspopup="dialog" aria-expanded="false" autocomplete="off">
  <!-- .ds-daterange__popover (hidden until open) -->
</div>

<div class="ds-daterange__popover" role="dialog" aria-label="Choose date range">
  <div class="ds-calendar__head">
    <button class="ds-button ds-button--icon ds-button--sm" aria-label="Previous month">…</button>
    <button class="ds-button ds-button--icon ds-button--sm" aria-label="Next month">…</button>
  </div>
  <div class="ds-daterange__months">
    <div class="ds-calendar" role="grid" aria-label="June 2026">
      <div class="ds-calendar__head"><div class="ds-calendar__label">June 2026</div></div>
      <div class="ds-calendar__grid">
        <button class="ds-calendar__day is-range-start" aria-pressed="true">12</button>
        <button class="ds-calendar__day is-in-range">13</button> …
      </div>
    </div>
    <div class="ds-calendar" role="grid" aria-label="July 2026">
      <button class="ds-calendar__day is-range-end" aria-pressed="true">3</button> …
    </div>
  </div>
</div>
```

**Parts / state:** `.ds-daterange` (the relative anchor holding the `.ds-input`),
`.ds-daterange__popover` (the bordered surface), and `.ds-daterange__months` (two borderless
`.ds-calendar` grids side by side). The grids reuse `.ds-calendar__head` / `.ds-calendar__label` /
`.ds-calendar__grid` / `.ds-calendar__weekday` / `.ds-calendar__day`, and the range adds three day
states: `.is-range-start` / `.is-range-end` (the endpoints — ink fill) and `.is-in-range` (the span
between them — a soft `var(--ds-accent-bg)` band).

**React** — `<DateRangePicker>` renders the input and two-month popover and selects a range (first
click sets the start, the next the end). Props: `value` (`{ start, end }` of Dates or ISO strings) /
`defaultValue`, `onChange(range, iso)`, `min`, `max` (inclusive), `format(date)`, `placeholder`,
`disabled`, `name`.

```jsx
<DateRangePicker
  defaultValue={{ start: "2026-06-12", end: "2026-07-03" }}
  min="2026-01-01" max="2026-12-31"
  onChange={(range, iso) => console.log(iso.start, iso.end, range)}
/>
```

Live: [../examples/components/date-range.html](../examples/components/date-range.html)

## Color picker

A flat `.ds-colorpicker` column: a grid of square swatch cells over a row pairing a hex `.ds-input`
with a native `<input type=color>`. Selecting a swatch, editing the hex field, or moving the native
input all converge on one value. The selected swatch takes a 2px ink ring.

```html
<div class="ds-colorpicker">
  <div class="ds-colorpicker__swatches" role="group" aria-label="Color swatches">
    <button class="ds-colorpicker__swatch is-selected" type="button" aria-pressed="true"
            aria-label="#161616" style="background:#161616"></button>
    <button class="ds-colorpicker__swatch" type="button" aria-pressed="false"
            aria-label="#ff2a00" style="background:#ff2a00"></button>
    <!-- …more swatches… -->
  </div>
  <div class="ds-colorpicker__row">
    <input class="ds-input" type="text" value="#161616" aria-label="Hex color">
    <input class="ds-colorpicker__native" type="color" value="#161616" aria-label="Pick a color">
  </div>
</div>
```

**Parts / state:** `.ds-colorpicker` (the column), `.ds-colorpicker__swatches` (the auto-fill grid)
holding `.ds-colorpicker__swatch` buttons (fill set inline; `.is-selected` draws the 2px ink ring),
and `.ds-colorpicker__row` pairing a hex `.ds-input` with the native `.ds-colorpicker__native` chip.

**React** — `<ColorPicker>` wires the swatches, hex field, and native input to one value. Props:
`value` (a hex string) / `defaultValue` (default `#161616`), `onChange(value)`, `swatches` (defaults
to the exported `BRAND_SWATCHES`), `disabled`, `name`.

```jsx
<ColorPicker defaultValue="#ff2a00" onChange={(hex) => console.log(hex)} />
```

Live: [../examples/components/color-picker.html](../examples/components/color-picker.html)

## Code block

A near-black `.ds-code` panel: a head with the filename on the left and a small Copy button on the
right, divided by a 1px rule from a scrolling body. Mono type, light text on `var(--ds-noir)`, no
radius and no shadow.

```html
<div class="ds-code" data-language="js">
  <div class="ds-code__head">
    <span class="ds-code__filename">format.js</span>
    <button class="ds-button ds-button--sm" type="button" aria-label="Copy code">Copy</button>
  </div>
  <pre class="ds-code__body"><code>export function toISO(d) { … }</code></pre>
</div>
```

**Parts:** `.ds-code` (the dark panel; an optional `data-language` label), `.ds-code__head` pairing a
faint uppercase `.ds-code__filename` with a `.ds-button--sm` (restyled to read on the dark head), and
`.ds-code__body` (a `<pre>` that scrolls horizontally when a line overflows).

**React** — `<CodeBlock>` renders the code as text content (never `dangerouslySetInnerHTML`), so any
`<` `>` `&` shows verbatim, and its Copy button writes to the clipboard. Props: `code` (the source),
`language` (label shown when no filename is given; also `data-language`), `filename`; forwards a ref
and `<div>` attributes.

```jsx
<CodeBlock
  filename="format.js"
  language="js"
  code={`export function toISO(d) {\n  return d.toISOString().slice(0, 10);\n}`}
/>
```

Live: [../examples/components/code-block.html](../examples/components/code-block.html)

## Kbd

An inline keycap for keyboard shortcuts — a small mono token on `var(--ds-bg-alt)` with a 1px rule and
no radius. The flat take on a keycap; combine them with a plain `+` separator for chords.

```html
<kbd class="ds-kbd">Esc</kbd>
<kbd class="ds-kbd">⌘</kbd>

<p>Press <kbd class="ds-kbd">⌘</kbd> + <kbd class="ds-kbd">K</kbd> to open the command palette.</p>
```

**Parts:** a `.ds-kbd` per key; `.ds-kbd-group` chains several into one chord. Inside an input group
the cap drops to a wash of its own ink; inside a tooltip it inverts with the surface.

**React** — `<Kbd>` and `<KbdGroup>`, both `<kbd>` elements — nesting is valid, and it keeps a chord
one keyboard-input phrase to a screen reader rather than several.

```jsx
<KbdGroup><Kbd>⌘</Kbd><Kbd>K</Kbd></KbdGroup>
```

Live: [../examples/components/kbd.html](../examples/components/kbd.html)

---

# Selection & date/time

## Multi-select

A combobox that holds multiple values as removable tokens.

```html
<div class="ds-multiselect">
  <div class="ds-multiselect__control">
    <span class="ds-multiselect__token">React <button class="ds-multiselect__remove" aria-label="Remove">×</button></span>
    <input class="ds-multiselect__input" placeholder="Add…">
  </div>
  <div class="ds-multiselect__list" role="listbox">
    <div class="ds-multiselect__option is-selected" role="option">React</div>
    <div class="ds-multiselect__option" role="option">Vue</div>
  </div>
</div>
```

**React** — `MultiSelect({ options, value, defaultValue, onChange, placeholder })`. `value` is a
`string[]`; type to filter, click/Enter toggles an option, Backspace removes the last, tokens are
removable. Controlled + uncontrolled.

Live: [../examples/components/multi-select.html](../examples/components/multi-select.html)

## Time picker

An `HH:MM` field with scrollable hour/minute columns.

```html
<div class="ds-timepicker">
  <input class="ds-input" value="09:30">
  <div class="ds-timepicker__popover">
    <div class="ds-timepicker__col"><button class="ds-timepicker__opt is-selected">09</button></div>
    <div class="ds-timepicker__col"><button class="ds-timepicker__opt is-selected">30</button></div>
  </div>
</div>
```

**React** — `TimePicker({ value, defaultValue, onChange, step })`. `value` is `"HH:MM"`; `step`
controls the minute increment (default 5). Controlled + uncontrolled.

Live: [../examples/components/time-picker.html](../examples/components/time-picker.html)

## Date-time picker

Composes the date picker and time picker into one ISO `YYYY-MM-DDTHH:MM` value.

```html
<div class="ds-datetime"><!-- a .ds-datepicker + a .ds-timepicker side by side --></div>
```

**React** — `DateTimePicker({ value, defaultValue, onChange, min, max, step })`.

Live: [../examples/components/date-time.html](../examples/components/date-time.html)

---

# Batch 1 — overlays and menus

Absorbed from `@diametral/ui` in `1.0.0-beta.1`. These six are the first components in
the system whose behaviour is not hand-written: it comes from Base UI, adopted as a
substrate of the React binding ([ADR 0001](adr/0001-base-ui-as-a-substrate.md)). Each one
records its **binding** below — the CSS ships for every binding, the keyboard and focus
contract is React-only, and a Streamlit, Keycloak or plain-HTML consumer should read that
line before reaching for one.

## Context menu

Right-click's own menu, positioned at the pointer. Rows come in four shapes — plain,
checkbox, radio, submenu.

```html
<div class="ds-context-menu-positioner">
  <div class="ds-context-menu-content">
    <div class="ds-context-menu-label">charte-2026.pdf</div>
    <div class="ds-context-menu-item">Rename</div>
    <div class="ds-context-menu-item">
      Duplicate <span class="ds-context-menu-shortcut">⌘D</span>
    </div>
    <div class="ds-context-menu-checkbox-item">
      <span class="ds-context-menu-item-indicator">✓</span> Pinned
    </div>
    <div class="ds-context-menu-sub-trigger">
      Move to <svg class="ds-context-menu-sub-trigger-icon"></svg>
    </div>
    <div class="ds-context-menu-separator"></div>
    <div class="ds-context-menu-item" data-variant="destructive">Delete</div>
  </div>
</div>
```

**Parts:** `.ds-context-menu-trigger` (the region that answers the right-click),
`-positioner`, `-content`, `-item`, `-checkbox-item`, `-radio-item`, `-item-indicator`,
`-sub-trigger` + `-sub-trigger-icon`, `-label`, `-separator`, `-shortcut`. `data-inset` on
an item adds the indicator gutter; `data-variant="destructive"` colours the row.

**React** — `ContextMenu` + 14 parts. `ContextMenuTrigger` takes `render` to become the real
element it guards; `ContextMenuContent` mounts its own portal and positioner.

**Binding** — CSS: every binding. Behaviour (right-click capture, pointer positioning,
submenus, focus return, Escape): React only.

## Navigation menu

A horizontal site menu whose triggers open one shared panel.

```html
<nav class="ds-navigation-menu">
  <ul class="ds-navigation-menu-list">
    <li class="ds-navigation-menu-item">
      <button class="ds-navigation-menu-trigger">
        Product <svg class="ds-navigation-menu-trigger-icon"></svg>
      </button>
    </li>
  </ul>
  <div class="ds-navigation-menu-positioner">
    <div class="ds-navigation-menu-popup">
      <div class="ds-navigation-menu-viewport">
        <div class="ds-navigation-menu-content">
          <a class="ds-navigation-menu-link" href="#">Overview</a>
          <a class="ds-navigation-menu-link ds-navigation-menu-link--block" href="#">Changelog</a>
        </div>
      </div>
    </div>
  </div>
</nav>
```

**Parts:** `.ds-navigation-menu`, `-list`, `-item`, `-trigger` + `-trigger-icon`,
`-positioner`, `-popup`, `-viewport`, `-content`, `-link`, `-indicator` +
`-indicator-arrow`. `.ds-navigation-menu-link--block` is the tighter block-flow link for a
stacked list; the default is a flex row with a 0.75rem inset.

**React** — `NavigationMenu` + 8 parts, plus `navigationMenuTriggerStyle()` for a top-level
link with no panel. The root mounts its own portal, positioner, popup and viewport, so the
tree you write is Root → List → Item.

**Binding** — CSS: every binding. Behaviour (one shared popup, resize and slide between
triggers, `data-activation-direction`): React only.

## Menubar

A desktop-style application menu bar: one tab stop, arrow keys between menus.

```html
<div class="ds-menubar">
  <button class="ds-menubar-trigger">File</button>
  <button class="ds-menubar-trigger">Edit</button>
</div>
<!-- an open menu is a .ds-menu, the same surface a Dropdown uses -->
<div class="ds-menu">
  <div class="ds-menu__header">Recent</div>
  <div class="ds-menu__item">Open… <span class="ds-menubar-shortcut">⌘O</span></div>
  <div class="ds-menu__item ds-menubar-checkbox-item">
    <span class="ds-menubar-item-indicator">✓</span> Show gutter
  </div>
  <div class="ds-menu__divider"></div>
  <div class="ds-menu__item ds-menubar-sub-trigger">
    Move to <svg class="ds-menubar-sub-trigger-icon"></svg>
  </div>
</div>
```

**Parts:** `.ds-menubar` (the bar), `-trigger`. Everything inside a menu wears this system's
own menu vocabulary — `.ds-menu`, `.ds-menu__item`, `.ds-menu__divider`, `.ds-menu__header`
(see [Menu](#dropdown-menu)) — plus `.ds-menubar-checkbox-item` / `-radio-item` and
`.ds-menubar-item-indicator` for the checkable rows, `-sub-trigger` + `-sub-trigger-icon`
for a submenu row, and `.ds-menubar-shortcut` for the keyboard hint.
`data-inset="true"` lines a plain row up with the checkable ones.

**React** — `Menubar` + 15 parts. Each menu is a Base UI `Menu`, not this repo's
`Dropdown`: the incumbent is click-toggled with no submenus and no checkable rows.

**Binding** — CSS: every binding. Behaviour (the bar's single tab stop, arrow-key traversal
between menus, submenus, checkable rows): React only.

## Autocomplete

A text input with suggestions, where the typed string is the value — the list is a
shortcut, never a constraint. `Combobox` is the one whose value must come from the list.

```html
<div class="ds-input-group">
  <input class="ds-input" placeholder="Start typing…">
  <span class="ds-input-group__addon">
    <button class="ds-button ds-button--icon ds-button--sm">
      <svg class="ds-autocomplete-clear-icon"></svg>
    </button>
  </span>
</div>
<div class="ds-autocomplete-positioner">
  <div class="ds-autocomplete-content">
    <div class="ds-autocomplete-status">3 results</div>
    <div class="ds-autocomplete-list">
      <div class="ds-autocomplete-label">Forms</div>
      <div class="ds-autocomplete-item">Combobox</div>
      <div class="ds-autocomplete-separator"></div>
      <div class="ds-autocomplete-empty">No suggestion.</div>
    </div>
  </div>
</div>
```

**Parts:** the field is a `.ds-input-group` + `.ds-input` (see [Form
controls](#form-controls)); the popup is `.ds-autocomplete-positioner`, `-content`,
`-list`, `-item`, `-label`, `-separator`, `-empty`, `-status`, and
`.ds-autocomplete-clear-icon` on the clear glyph.

**React** — `Autocomplete` + 11 parts. `AutocompleteInput` renders the input group and takes
`showClear`; `AutocompleteStatus` is a polite live region — swap its children rather than
unmounting it. `mode` decides what a query does (`list`, `both`, `inline`, `none`); set
`filter={null}` when something upstream already narrowed the items.

**Binding** — CSS: every binding. Behaviour (filtering, inline completion, the live region,
popup positioning, arrow-key traversal): React only.

## Speed dial

A floating action button whose two-to-four actions fan out on open.

```html
<button class="ds-button ds-button--icon ds-speed-dial" aria-label="Create" aria-expanded="false">
  <span class="ds-speed-dial-icon"><!-- glyph --></span>
  <svg class="ds-speed-dial-icon-close"></svg>
</button>
<div class="ds-speed-dial-positioner">
  <div class="ds-speed-dial-actions">
    <div class="ds-speed-dial-action">
      <span class="ds-speed-dial-action-label">Upload</span>
      <span class="ds-button ds-button--icon ds-speed-dial-action-icon"><!-- glyph --></span>
    </div>
  </div>
</div>
```

**Parts:** `.ds-speed-dial` on the trigger (a `.ds-button.ds-button--icon`, fixed to the
end-bottom corner); `.ds-speed-dial--docked` scopes it to a positioned ancestor and
`--docked-top` flips which edge; `-icon` / `-icon-close` are the two glyphs, swapped by CSS
off the trigger's `aria-expanded`; `-positioner`, `-actions`, `-action`, `-action-label`,
`-action-icon` are the fan-out column.

**React** — `SpeedDial` + `SpeedDialAction`. The trigger is the root, so `className`
positions the dial. `tone` is `primary` or `danger` — the two the incumbent button has.

**Binding** — CSS: every binding, including the open/closed glyph swap, which is pure CSS off
`aria-expanded`. Behaviour (Escape, arrow keys across the actions, focus return): React only.

## Hover card

A preview surface shown on hover, for links and mentions. Everything inside is
supplementary by definition — a touch user never hovers.

```html
<div class="ds-hover-card-positioner">
  <div class="ds-hover-card-content" data-side="bottom">
    <!-- the preview -->
  </div>
</div>
```

**Parts:** `.ds-hover-card-positioner`, `.ds-hover-card-content`. `data-side` on the content
picks which edge it slides in from.

**React** — `HoverCard`, `HoverCardTrigger`, `HoverCardContent`. The timings live on the
trigger (`delay` 600ms, `closeDelay` 300ms), so two triggers can differ in one view. The
trigger renders an `a` by default — pass `render` when it is really a button.

**Binding** — CSS: every binding. Behaviour (hover and focus delays, dismissal, positioning):
React only.
