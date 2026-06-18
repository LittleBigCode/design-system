import type {
  SelectHTMLAttributes,
  ForwardRefExoticComponent,
  RefAttributes,
  ReactNode,
} from "react";

export interface SelectOption {
  value: string;
  label: ReactNode;
  disabled?: boolean;
}
export interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  /** Render these options instead of (or in place of) children. */
  options?: SelectOption[];
  /** Full-width select. */
  block?: boolean;
}
export declare const Select: ForwardRefExoticComponent<
  SelectProps & RefAttributes<HTMLSelectElement>
>;
