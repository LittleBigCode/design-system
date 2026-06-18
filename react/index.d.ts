import type {
  ButtonHTMLAttributes,
  InputHTMLAttributes,
  HTMLAttributes,
  ReactNode,
  ForwardRefExoticComponent,
  RefAttributes,
} from "react";

export declare function cx(...parts: Array<string | false | null | undefined>): string;

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
export declare const Button: ForwardRefExoticComponent<
  ButtonProps & RefAttributes<HTMLButtonElement>
>;

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  /** Right-aligned, fixed-width numeric input. */
  number?: boolean;
}
export declare const Input: ForwardRefExoticComponent<
  InputProps & RefAttributes<HTMLInputElement>
>;

export interface FieldProps {
  label?: ReactNode;
  htmlFor?: string;
  className?: string;
  children?: ReactNode;
}
export declare function Field(props: FieldProps): JSX.Element;

export interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: "solid" | "accent";
}
export declare function Badge(props: BadgeProps): JSX.Element;

export interface ChipProps extends HTMLAttributes<HTMLSpanElement> {
  warn?: boolean;
}
export declare function Chip(props: ChipProps): JSX.Element;

export declare function Banner(props: HTMLAttributes<HTMLDivElement>): JSX.Element;

export interface CalloutProps extends HTMLAttributes<HTMLDivElement> {
  type?: "info" | "success" | "warning" | "danger";
  heading?: ReactNode;
}
export declare function Callout(props: CalloutProps): JSX.Element;

export interface PanelProps extends HTMLAttributes<HTMLDivElement> {
  title?: ReactNode;
  /** Tighten bottom padding for input-row content. */
  rows?: boolean;
}
export declare function Panel(props: PanelProps): JSX.Element;

export interface SectionHeadingProps extends HTMLAttributes<HTMLElement> {
  as?: keyof JSX.IntrinsicElements;
}
export declare function SectionHeading(props: SectionHeadingProps): JSX.Element;

export interface StatusPanelProps extends HTMLAttributes<HTMLDivElement> {
  status?: Status;
  kicker?: ReactNode;
  heading?: ReactNode;
  subtitle?: ReactNode;
}
export declare function Status(props: StatusPanelProps): JSX.Element;

export interface MetricProps {
  label: ReactNode;
  value: ReactNode;
  variant?: "hero" | "sub";
  /** Sign of the value: > 0 colors it success, < 0 colors it danger. */
  sign?: number;
  className?: string;
}
export declare function Metric(props: MetricProps): JSX.Element;

export interface SwitchProps {
  checked?: boolean;
  defaultChecked?: boolean;
  onChange?: (checked: boolean, event: React.ChangeEvent<HTMLInputElement>) => void;
  disabled?: boolean;
  name?: string;
  className?: string;
  children?: ReactNode;
}
export declare function Switch(props: SwitchProps): JSX.Element;

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
export declare function Tabs(props: TabsProps): JSX.Element;

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
export declare function Segmented(props: SegmentedProps): JSX.Element;

export interface ModalProps {
  open: boolean;
  onClose?: () => void;
  heading?: ReactNode;
  footer?: ReactNode;
  className?: string;
  children?: ReactNode;
}
export declare function Modal(props: ModalProps): JSX.Element | null;

export interface WordmarkProps {
  name?: string;
  sub?: ReactNode;
  className?: string;
}
export declare function Wordmark(props: WordmarkProps): JSX.Element;

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
