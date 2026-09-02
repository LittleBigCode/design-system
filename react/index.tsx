import { cx } from "./lib/cx.js";
/* ============================================================================
   Diametral Design System — React components
   ----------------------------------------------------------------------------
   Real React components (functions returning React elements via createElement —
   no JSX, so the module runs with NO build step: it works imported from npm in
   any React app, AND directly in the browser via an import map + esm.sh.

   Styling comes from the global stylesheet — make sure it is loaded:
       import "@diametral/design-system/css/diametral.css";

   Peer dependencies: react, react-dom (>=18).
   ============================================================================ */
import React from "react";
import { createPortal } from "react-dom";

import type {
  ButtonHTMLAttributes,
  InputHTMLAttributes,
  HTMLAttributes,
  ReactNode,
  ForwardRefExoticComponent,
  RefAttributes,
} from "react";


export type Status =
  | "success" | "warning" | "danger" | "critical" | "neutral" | "info";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  /** Visual variant. Omit for the default ghost button. */
  variant?: "primary" | "danger";
  size?: "sm" | "lg";
  /** Shows a spinner and disables the button. */
  loading?: boolean;
  /** Full-width. */
  block?: boolean;
}

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  /** Right-aligned, fixed-width numeric input. */
  number?: boolean;
}

export interface FieldProps {
  label?: ReactNode;
  htmlFor?: string;
  className?: string;
  children?: ReactNode;
}

export interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: "solid" | "accent";
}

export interface ChipProps extends HTMLAttributes<HTMLSpanElement> {
  warn?: boolean;
}


export interface CalloutProps extends HTMLAttributes<HTMLDivElement> {
  type?: "info" | "success" | "warning" | "danger";
  heading?: ReactNode;
}

export interface PanelProps extends Omit<HTMLAttributes<HTMLDivElement>, "title"> {
  title?: ReactNode;
  /** Tighten bottom padding for input-row content. */
  rows?: boolean;
}

export interface SectionHeadingProps extends HTMLAttributes<HTMLElement> {
  as?: keyof JSX.IntrinsicElements;
}

export interface StatusPanelProps extends HTMLAttributes<HTMLDivElement> {
  status?: Status;
  kicker?: ReactNode;
  heading?: ReactNode;
  subtitle?: ReactNode;
}

export interface MetricProps {
  label: ReactNode;
  value: ReactNode;
  variant?: "hero" | "sub";
  /** Sign of the value: > 0 colors it success, < 0 colors it danger. */
  sign?: number;
  className?: string;
}

export interface SwitchProps {
  checked?: boolean;
  defaultChecked?: boolean;
  onChange?: (checked: boolean, event: React.ChangeEvent<HTMLInputElement>) => void;
  disabled?: boolean;
  name?: string;
  className?: string;
  children?: ReactNode;
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

export interface WordmarkProps {
  name?: string;
  sub?: ReactNode;
  className?: string;
}

/* ---- Extended component library (separate modules) ----------------------- */
export * from "./components/Accordion.js";
export * from "./components/Alert.js";
export * from "./components/Avatar.js";
export * from "./components/Breadcrumb.js";
export * from "./components/ButtonExtras.js";
export * from "./components/Card.js";
export * from "./components/Checkbox.js";
export * from "./components/DataGrid.js";
export * from "./components/DescriptionList.js";
export * from "./components/Dropdown.js";
export * from "./components/EmptyState.js";
export * from "./components/FieldHint.js";
export * from "./components/InputGroup.js";
export * from "./components/Pagination.js";
export * from "./components/Popover.js";
export * from "./components/Progress.js";
export * from "./components/Radio.js";
export * from "./components/Range.js";
export * from "./components/Select.js";
export * from "./components/Skeleton.js";
export * from "./components/Spinner.js";
export * from "./components/Stepper.js";
export * from "./components/Tag.js";
export * from "./components/Textarea.js";
export * from "./components/Timeline.js";
export * from "./components/ToastProvider.js";
export * from "./components/Tooltip.js";
export * from "./components/Tree.js";
export * from "./components/VerticalNav.js";
export * from "./components/Combobox.js";
export * from "./components/TagInput.js";
export * from "./components/NumberInput.js";
export * from "./components/DatePicker.js";
export * from "./components/FileUpload.js";
export * from "./components/Toolbar.js";
export * from "./components/AppShell.js";
export * from "./components/Wizard.js";
export * from "./components/Drawer.js";
export * from "./components/CommandPalette.js";
export * from "./components/Sparkline.js";
export * from "./components/BarChart.js";
export * from "./components/StatCard.js";
export * from "./components/Rating.js";
export * from "./components/DateRangePicker.js";
export * from "./components/ColorPicker.js";
export * from "./components/CodeBlock.js";
export * from "./components/Kbd.js";
export * from "./components/MultiSelect.js";
export * from "./components/TimePicker.js";
export * from "./components/DateTimePicker.js";
export * from "./components/LineChart.js";
export * from "./components/AreaChart.js";
export * from "./components/DonutChart.js";
export * from "./components/Calendar.js";
export * from "./components/Agenda.js";
export * from "./components/PieChart.js";
export * from "./components/GaugeChart.js";
export * from "./components/StackedBar.js";
export * from "./components/Kanban.js";
export * from "./components/PageHeader.js";
export * from "./components/ConsoleLayout.js";
export * from "./components/FormField.js";
export * from "./hooks/useForm.js";
export * from "./hooks/useResource.js";
export * from "./hooks/restLoadPage.js";
export * from "./components/Icon.js";
export * from "./components/icons.js";

const h = React.createElement;
export { cx } from "./lib/cx.js";
export type { ClassValue } from "./lib/cx.js";

/* ---- Button -------------------------------------------------------------- */
export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(function Button(
  { variant, size, loading, block, className, type = "button", disabled, children, ...rest }, ref
) {
  return h("button", {
    ref, type,
    disabled: disabled || loading || undefined,
    "aria-busy": loading || undefined,
    className: cx("ds-button",
      variant && `ds-button--${variant}`,
      size && `ds-button--${size}`,
      loading && "ds-button--loading",
      block && "ds-button--block",
      className),
    ...rest,
  }, children);
});

/* ---- Form: Input + Field ------------------------------------------------- */
export const Input = React.forwardRef<HTMLInputElement, InputProps>(function Input(
  { number, className, ...rest }, ref
) {
  return h("input", {
    ref,
    className: cx("ds-input", number && "ds-input--number", className),
    ...rest,
  });
});

export function Field({ label, htmlFor, className, children }: FieldProps) {
  return h("div", { className: cx("ds-field", className) },
    label != null ? h("label", { htmlFor }, label) : null,
    children
  );
}

/* ---- Badge / Chip / Banner ---------------------------------------------- */
export function Badge({ variant, className, children, ...rest }: BadgeProps) {
  return h("span", {
    className: cx("ds-badge", variant && `ds-badge--${variant}`, className), ...rest,
  }, children);
}

export function Chip({ warn, className, children, ...rest }: ChipProps) {
  return h("span", {
    className: cx("ds-chip", warn && "ds-chip--warn", className), ...rest,
  }, children);
}

export function Banner({ className, children, ...rest }: HTMLAttributes<HTMLDivElement>) {
  return h("div", { className: cx("ds-banner", className), ...rest }, children);
}

/* ---- Callout ------------------------------------------------------------- */
export function Callout({ type, heading, className, children, ...rest }: CalloutProps) {
  return h("div", {
    className: cx("ds-callout", type && `ds-callout--${type}`, className), ...rest,
  },
    heading != null ? h("div", { className: "ds-callout__title" }, heading) : null,
    children
  );
}

/* ---- Panel / SectionHeading --------------------------------------------- */
export function Panel({ title, rows, className, children, ...rest }: PanelProps) {
  return h("div", {
    className: cx("ds-panel", rows && "ds-panel--rows", className), ...rest,
  },
    title != null ? h("div", { className: "ds-panel__title" }, title) : null,
    children
  );
}

export function SectionHeading({ as = "h3", className, children, ...rest }: SectionHeadingProps) {
  return h(as, { className: cx("ds-section-heading", className), ...rest }, children);
}

/* ---- Status panel + Metric ---------------------------------------------- */
export function Status({ status = "neutral", kicker, heading, subtitle, className, children, ...rest }: StatusPanelProps) {
  return h("div", {
    className: cx("ds-status", `ds-status--${status}`, className), ...rest,
  },
    h("div", { className: "ds-status__head" },
      kicker != null ? h("div", { className: "ds-status__kicker" }, kicker) : null,
      heading != null ? h("div", { className: "ds-status__title" }, heading) : null,
      subtitle != null ? h("div", { className: "ds-status__subtitle" }, subtitle) : null
    ),
    children
  );
}

export function Metric({ label, value, variant, sign, className }: MetricProps) {
  const tone = (sign ?? 0) > 0 ? "is-pos" : (sign ?? 0) < 0 ? "is-neg" : null;
  return h("div", { className: cx("ds-metric", variant && `ds-metric--${variant}`, className) },
    h("span", { className: "ds-metric__k" }, label),
    h("span", { className: cx("ds-metric__v", tone) }, value)
  );
}

/* ---- Switch (controlled or uncontrolled) -------------------------------- */
export function Switch({ checked, defaultChecked, onChange, disabled, name, className, children }: SwitchProps) {
  const props: Record<string, any> = { type: "checkbox", disabled, name,
    onChange: (e: any) => onChange && onChange(e.target.checked, e) };
  if (checked !== undefined) props.checked = checked;
  else props.defaultChecked = defaultChecked;
  return h("label", { className: cx("ds-switch", className) },
    h("input", props),
    h("span", { className: "ds-switch__track" }),
    children != null ? h("span", null, children) : null
  );
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

/* ---- Wordmark ------------------------------------------------------------ */
export function Wordmark({ name = "Diametral", sub, className }: WordmarkProps) {
  return h("span", { className: cx("ds-wordmark", className) },
    h("svg", {
      className: "ds-wordmark__mark", viewBox: "0 0 56 56", fill: "none",
      stroke: "currentColor", strokeWidth: 1.5, "aria-hidden": "true",
    },
      h("circle", { cx: 28, cy: 28, r: 24 }),
      h("rect", { x: 12, y: 12, width: 32, height: 32 }),
      h("line", { x1: 12, y1: 44, x2: 44, y2: 12 })
    ),
    h("span", { className: "ds-wordmark__name" }, name),
    sub != null ? h("span", { className: "ds-wordmark__sub" }, sub) : null
  );
}

/* ---- Extended component library (separate modules) ----------------------- */
export * from "./components/Accordion.js";
export * from "./components/Alert.js";
export * from "./components/Avatar.js";
export * from "./components/Breadcrumb.js";
export * from "./components/ButtonExtras.js";
export * from "./components/Card.js";
export * from "./components/Checkbox.js";
export * from "./components/DataGrid.js";
export * from "./components/DescriptionList.js";
export * from "./components/Dropdown.js";
export * from "./components/EmptyState.js";
export * from "./components/FieldHint.js";
export * from "./components/InputGroup.js";
export * from "./components/Pagination.js";
export * from "./components/Popover.js";
export * from "./components/Progress.js";
export * from "./components/Radio.js";
export * from "./components/Range.js";
export * from "./components/Select.js";
export * from "./components/Skeleton.js";
export * from "./components/Spinner.js";
export * from "./components/Stepper.js";
export * from "./components/Tag.js";
export * from "./components/Textarea.js";
export * from "./components/Timeline.js";
export * from "./components/ToastProvider.js";
export * from "./components/Tooltip.js";
export * from "./components/Tree.js";
export * from "./components/VerticalNav.js";
export * from "./components/Combobox.js";
export * from "./components/TagInput.js";
export * from "./components/NumberInput.js";
export * from "./components/DatePicker.js";
export * from "./components/FileUpload.js";
export * from "./components/Toolbar.js";
export * from "./components/AppShell.js";
export * from "./components/Wizard.js";
export * from "./components/Drawer.js";
export * from "./components/CommandPalette.js";
export * from "./components/Sparkline.js";
export * from "./components/BarChart.js";
export * from "./components/StatCard.js";
export * from "./components/Rating.js";
export * from "./components/DateRangePicker.js";
export * from "./components/ColorPicker.js";
export * from "./components/CodeBlock.js";
export * from "./components/Kbd.js";
export * from "./components/MultiSelect.js";
export * from "./components/TimePicker.js";
export * from "./components/DateTimePicker.js";
export * from "./components/LineChart.js";
export * from "./components/AreaChart.js";
export * from "./components/DonutChart.js";
export * from "./components/Calendar.js";
export * from "./components/Agenda.js";
export * from "./components/PieChart.js";
export * from "./components/GaugeChart.js";
export * from "./components/StackedBar.js";
export * from "./components/Kanban.js";
export * from "./components/PageHeader.js";
export * from "./components/ConsoleLayout.js";
export * from "./components/FormField.js";
export * from "./hooks/useForm.js";
export * from "./hooks/useResource.js";
export * from "./hooks/restLoadPage.js";
export * from "./components/Icon.js";
export * from "./components/icons.js";

/* Types several modules re-declare. Naming the canonical module here is what
   keeps `export *` unambiguous. */
export type { DateLike } from "./components/DatePicker.js";
export type { IconName } from "./components/Icon.js";
