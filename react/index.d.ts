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
