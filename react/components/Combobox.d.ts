import type {
  HTMLAttributes,
  ReactNode,
  ForwardRefExoticComponent,
  RefAttributes,
} from "react";

export interface ComboboxOption {
  value: string;
  /** Display text. Defaults to `value`. */
  label?: ReactNode;
  disabled?: boolean;
}

export interface ComboboxProps
  extends Omit<HTMLAttributes<HTMLDivElement>, "onChange" | "defaultValue"> {
  /** The selectable options — bare strings or `{ value, label?, disabled? }`. */
  options: Array<string | ComboboxOption>;
  /** Controlled selected value. */
  value?: string;
  /** Uncontrolled initial selected value. */
  defaultValue?: string;
  /** Called with the chosen value when an option (or custom text) is selected. */
  onChange?: (value: string) => void;
  placeholder?: string;
  /** Allow committing free text that does not match any option (via Enter). */
  allowCustom?: boolean;
  disabled?: boolean;
}

export declare const Combobox: ForwardRefExoticComponent<
  ComboboxProps & RefAttributes<HTMLInputElement>
>;
