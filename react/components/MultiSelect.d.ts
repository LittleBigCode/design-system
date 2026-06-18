import type {
  HTMLAttributes,
  ReactNode,
  ForwardRefExoticComponent,
  RefAttributes,
} from "react";

export interface MultiSelectOption {
  value: string;
  /** Display text. Defaults to `value`. */
  label?: ReactNode;
  disabled?: boolean;
}

export interface MultiSelectProps
  extends Omit<HTMLAttributes<HTMLDivElement>, "onChange" | "defaultValue"> {
  /** The selectable options — bare strings or `{ value, label?, disabled? }`. */
  options: Array<string | MultiSelectOption>;
  /** Controlled list of chosen values. */
  value?: string[];
  /** Uncontrolled initial list of chosen values. */
  defaultValue?: string[];
  /** Called with the next list whenever an option is toggled or a token removed. */
  onChange?: (value: string[]) => void;
  placeholder?: string;
  disabled?: boolean;
}

export declare const MultiSelect: ForwardRefExoticComponent<
  MultiSelectProps & RefAttributes<HTMLInputElement>
>;
