import { cx } from "./lib/cx.js";
/* ============================================================================
   Diametral Design System — React components
   ----------------------------------------------------------------------------
   The barrel. Since 1.0.0-beta.1 this file has been shrinking: every component
   that grew a second axis moved out to its own module, and 1.0.0-beta.7 takes
   the eight that were left with a frozen class contract — Button, Input, Field,
   Badge, Panel, Status, Switch and Metric. What remains here is the handful
   with no absorbed counterpart at all (Chip, Callout, SectionHeading, Tabs,
   Segmented, Modal) plus the re-exports.

   Styling comes from the global stylesheet — make sure it is loaded:
       import "@diametral/design-system/css/diametral.css";

   Peer dependencies: react, react-dom (>=18).
   ============================================================================ */
import React from "react";
import { createPortal } from "react-dom";

import type { HTMLAttributes, ReactNode } from "react";

/* The `Status` union type that lived here is `StatusTone`, in
   components/status.tsx. It could not be kept as a deprecated alias: `Status`
   is now a *component* exported from the same barrel, and a type alias of that
   name in this module shadows the value for every consumer. Renamed rather
   than aliased, and recorded in docs/migration/renames.json. */

export interface ChipProps extends HTMLAttributes<HTMLSpanElement> {
  warn?: boolean;
}

export interface CalloutProps extends HTMLAttributes<HTMLDivElement> {
  type?: "info" | "success" | "warning" | "danger";
  heading?: ReactNode;
}

export interface SectionHeadingProps extends HTMLAttributes<HTMLElement> {
  as?: keyof JSX.IntrinsicElements;
}

export interface TabItem {
  id: string;
  label: ReactNode;
  sublabel?: ReactNode;
  content?: ReactNode;
}
export interface TabsProps {
  items: TabItem[];
  value?: string;
  defaultValue?: string;
  onChange?: (id: string) => void;
  className?: string;
}

export interface SegmentedItem {
  value: string;
  label: ReactNode;
  dot?: "ok" | "ko";
}
export interface SegmentedProps {
  items: SegmentedItem[];
  value?: string;
  defaultValue?: string;
  onChange?: (value: string) => void;
  className?: string;
}

export interface ModalProps {
  open: boolean;
  onClose?: () => void;
  heading?: ReactNode;
  footer?: ReactNode;
  className?: string;
  children?: ReactNode;
}

const h = React.createElement;
export { cx } from "./lib/cx.js";
export type { ClassValue } from "./lib/cx.js";

/* Button, Input and Field moved to components/button.tsx, components/input.tsx
   and components/field.tsx in 1.0.0-beta.7, when each grew the source's axes:
   Button a variant/tone/size trio, Input a Base UI root, Field a whole part set
   with an orientation. `Badge`, `Panel`, `Switch`, `Status` and `Metric` moved
   the same way and for the same reason. */

/* ---- Chip ---------------------------------------------------------------- */
export function Chip({ warn, className, children, ...rest }: ChipProps) {
  return h("span", {
    className: cx("ds-chip", warn && "ds-chip--warn", className), ...rest,
  }, children);
}

/* Banner moved to components/banner.tsx in 1.0.0-beta.6, when it gained the
   six-tone axis and its content/title/description/action parts. */

/* ---- Callout ------------------------------------------------------------- */
export function Callout({ type, heading, className, children, ...rest }: CalloutProps) {
  return h("div", {
    className: cx("ds-callout", type && `ds-callout--${type}`, className), ...rest,
  },
    heading != null ? h("div", { className: "ds-callout__title" }, heading) : null,
    children
  );
}

/* ---- SectionHeading ------------------------------------------------------ */
export function SectionHeading({ as = "h3", className, children, ...rest }: SectionHeadingProps) {
  return h(as, { className: cx("ds-section-heading", className), ...rest }, children);
}

/* ---- Tabs (controlled or uncontrolled) ----------------------------------
   items: [{ id, label, sublabel?, content? }] */
export function Tabs({ items = [], value, defaultValue, onChange, className }: TabsProps) {
  const first = items[0] && items[0].id;
  const [internal, setInternal] = React.useState(defaultValue ?? first);
  const active = value !== undefined ? value : internal;
  const select = (id: any) => { if (value === undefined) setInternal(id); onChange && onChange(id); };
  return h(React.Fragment, null,
    h("div", { className: cx("ds-tabs", className), role: "tablist" },
      items.map((it) => h("button", {
        key: it.id, role: "tab", type: "button",
        "aria-selected": active === it.id,
        className: cx("ds-tabs__tab", active === it.id && "is-active"),
        onClick: () => select(it.id),
      },
        it.label,
        it.sublabel != null ? h("small", { className: "ds-tabs__sublabel" }, it.sublabel) : null
      ))
    ),
    items.map((it) => h("div", {
      key: it.id, role: "tabpanel", hidden: active !== it.id,
      className: cx("ds-tabpane", active === it.id && "is-active"),
    }, it.content))
  );
}

/* ---- Segmented (single-select) ------------------------------------------
   items: [{ value, label, dot? ("ok"|"ko") }] */
export function Segmented({ items = [], value, defaultValue, onChange, className }: SegmentedProps) {
  const first = items[0] && items[0].value;
  const [internal, setInternal] = React.useState(defaultValue ?? first);
  const active = value !== undefined ? value : internal;
  const select = (v: any) => { if (value === undefined) setInternal(v); onChange && onChange(v); };
  return h("div", { className: cx("ds-segmented", className) },
    items.map((it) => h("button", {
      key: it.value, type: "button",
      "aria-pressed": active === it.value,
      className: cx("ds-segmented__item", active === it.value && "is-active"),
      onClick: () => select(it.value),
    },
      it.dot ? h("span", { className: cx("ds-segmented__dot", `ds-segmented__dot--${it.dot}`) }) : null,
      it.label
    ))
  );
}

/* ---- Modal (portal to <body>) ------------------------------------------- */
export function Modal({ open, onClose, heading, footer, className, children }: ModalProps) {
  React.useEffect(() => {
    if (!open) return undefined;
    const onKey = (e: any) => { if (e.key === "Escape") onClose && onClose(); };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  if (!open) return null;
  const node = h("div", {
    className: "ds-overlay is-open",
    onClick: (e) => { if (e.target === e.currentTarget) onClose && onClose(); },
  },
    h("div", { className: cx("ds-modal", className), role: "dialog", "aria-modal": "true" },
      h("div", { className: "ds-modal__head" },
        h("h2", { className: "ds-modal__title" }, heading),
        h("button", {
          className: "ds-button ds-modal__close", type: "button",
          "aria-label": "Close", onClick: () => onClose && onClose(),
        }, "Close")
      ),
      h("div", { className: "ds-modal__body" }, children),
      footer != null ? h("div", { className: "ds-modal__foot" }, footer) : null
    )
  );
  return createPortal(node, document.body);
}

/* Wordmark moved to components/wordmark.tsx in 1.0.0-beta.3, when the real
   lockup replaced the placeholder mark. `name` and `sub` are unchanged. */

/* ---- Extended component library (separate modules) ----------------------- */
export * from "./components/Accordion.js";
export * from "./components/Alert.js";
export * from "./components/avatar.js";
export * from "./components/breadcrumb.js";
export * from "./components/ButtonExtras.js";
export * from "./components/DataGrid.js";
export * from "./components/description-list.js";
export * from "./components/Dropdown.js";
export * from "./components/empty.js";
export * from "./components/pagination.js";
export * from "./components/Popover.js";
export * from "./components/progress.js";
export * from "./components/Radio.js";
export * from "./components/skeleton.js";
export * from "./components/spinner.js";
export * from "./components/stepper.js";
export * from "./components/timeline.js";
export * from "./components/ToastProvider.js";
export * from "./components/tooltip.js";
export * from "./components/Tree.js";
export * from "./components/VerticalNav.js";
export * from "./components/Combobox.js";
export * from "./components/TagInput.js";
export * from "./components/NumberInput.js";
export * from "./components/DatePicker.js";
export * from "./components/FileUpload.js";
export * from "./components/toolbar.js";
export * from "./components/AppShell.js";
export * from "./components/Wizard.js";
/* Two symbols, one 1.0 merge: 0.11's single `Drawer` became the source's
   swipeable `Drawer` plus the edge-docked `Sheet` its `placement` prop meant.
   They export together because the merge only makes sense whole. */
export * from "./components/drawer.js";
export * from "./components/sheet.js";
export * from "./components/CommandPalette.js";
export * from "./components/StatCard.js";
export * from "./components/Rating.js";
export * from "./components/DateRangePicker.js";
export * from "./components/ColorPicker.js";
export * from "./components/CodeBlock.js";
export * from "./components/kbd.js";
export * from "./components/MultiSelect.js";
export * from "./components/TimePicker.js";
export * from "./components/DateTimePicker.js";
export * from "./components/Calendar.js";
export * from "./components/agenda.js";
export * from "./components/banner.js";
export * from "./components/table.js";
export * from "./components/kanban.js";
export * from "./components/page-header.js";
export * from "./components/ConsoleLayout.js";
export * from "./components/FormField.js";
export * from "./hooks/useForm.js";
export * from "./hooks/useResource.js";
export * from "./hooks/restLoadPage.js";
export * from "./components/Icon.js";
export * from "./components/icons.js";

/* ---- Batch 1 — net-new overlays and menus (1.0.0-beta.1) ----------------
   Absorbed from @diametral/ui. Behaviour is Base UI (ADR 0001), so these are
   React-only: the CSS ships for every binding, the keyboard contract does not. */
export * from "./components/context-menu.js";
export * from "./components/navigation-menu.js";
export * from "./components/menubar.js";
export * from "./components/autocomplete.js";
export * from "./components/speed-dial.js";
export * from "./components/hover-card.js";

/* ---- Batch 2 — net-new content and media (1.0.0-beta.2) -----------------
   `message-scroller` and `resizable` are stylesheet-only: their bindings wrap
   @shadcn/react and react-resizable-panels, and neither dependency is
   acquired. Their class contract is in css/components/, documented there. */
export * from "./components/separator.js";
export * from "./components/aspect-ratio.js";
export * from "./components/masonry.js";
export * from "./components/scroll-area.js";
export * from "./components/item.js";
export * from "./components/marker.js";
export * from "./components/message.js";
export * from "./components/bubble.js";
export * from "./components/attachment.js";
export * from "./components/snippet.js";
export * from "./components/qr-code.js";
export * from "./components/toc.js";
export * from "./components/theme-switcher.js";

/* Batch 3 — net-new form controls and primitives (1.0.0-beta.3) */
export * from "./components/label.js";
export * from "./components/form.js";
export * from "./components/button-group.js";
export * from "./components/icon-button.js";
export * from "./components/wordmark.js";
export * from "./components/toggle.js";
export * from "./components/meter.js";
export * from "./components/relative-time.js";
export * from "./components/editable.js";
export * from "./components/field-array.js";
export * from "./components/phone-input.js";
export * from "./components/collapsible.js";
export * from "./components/direction.js";
export * from "./hooks/useControllableValue.js";

/* Batch 4 — chart substrate and replacement charts (1.0.0-beta.4)
   `chart` is the substrate the six finished wrappers compose, so it leads. The
   axis charts are recharts-bound and React-only; `gauge` and `sparkline` stay
   library-free, so their markup is reproducible by any binding. recharts is a
   substrate dependency from here on — batch 5's eight net-new charts add no
   dependency of their own. */
export * from "./components/chart.js";
export * from "./components/line-chart.js";
export * from "./components/area-chart.js";
export * from "./components/bar-chart.js";
export * from "./components/stacked-bar.js";
export * from "./components/pie-chart.js";
export * from "./components/donut-chart.js";
export * from "./components/gauge.js";
export * from "./components/sparkline.js";
export * from "./lib/chart-series.js";

/* Batch 5 — net-new charts (1.0.0-beta.5)
   Eight forms 0.11 had no answer for, and no new dependency: six of them are
   recharts wrappers over batch 4's `ChartContainer`/`ChartTooltip`/
   `ChartLegend`, so recharts is substrate already paid for. `Heatmap` and
   `BulletChart` are the other two, and both are library-free CSS grid and divs
   — like `Gauge` and `Sparkline`, their markup is reproducible by any binding.
   `Treemap` is the chart, not the `Tree` navigation control. */
export * from "./components/radar-chart.js";
export * from "./components/combo-chart.js";
export * from "./components/funnel-chart.js";
export * from "./components/scatter-chart.js";
export * from "./components/treemap.js";
export * from "./components/waterfall-chart.js";
export * from "./components/heatmap.js";
export * from "./components/bullet-chart.js";

/* Batch 7 — frozen contracts and the form-controls split (1.0.0-beta.7)
   The sixteen components whose class names are fixed by a surface outside this
   package. Their CSS is absorbed *into* the existing contract rather than
   replacing it, so nothing a `<ds-*>` web component or a Streamlit page writes
   by hand has to change. Eight of them moved out of this file; the rest replace
   an applier module of their own.

   `Status` is the one export that changes hands: it is now the source's inline
   indicator, and 0.11's status panel is `StatusPanel`. `Range` becomes
   `Slider`, and `FieldHint` is replaced by `FieldDescription` / `FieldError`.
   Every removed prop has a replacement or a recipe in
   `docs/migration/from-0.11.md`. */
export * from "./components/button.js";
export * from "./components/badge.js";
export * from "./components/tag.js";
export * from "./components/card.js";
export * from "./components/panel.js";
export * from "./components/status.js";
export * from "./components/switch.js";
export * from "./components/input.js";
export * from "./components/textarea.js";
export * from "./components/checkbox.js";
export * from "./components/checkbox-group.js";
export * from "./components/slider.js";
export * from "./components/select.js";
export * from "./components/input-group.js";
export * from "./components/field.js";

/* Types several modules re-declare. Naming the canonical module here is what
   keeps `export *` unambiguous. */
export type { DateLike } from "./components/DatePicker.js";
export type { IconName } from "./components/Icon.js";
