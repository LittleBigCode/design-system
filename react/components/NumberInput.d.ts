import type {
  HTMLAttributes,
  ForwardRefExoticComponent,
  RefAttributes,
} from "react";

export interface NumberInputProps
  extends Omit<HTMLAttributes<HTMLDivElement>, "onChange" | "defaultValue"> {
  /** Controlled value (null when the field is cleared). */
  value?: number | null;
  /** Uncontrolled initial value. */
  defaultValue?: number | null;
  /** Called with the next value (null when cleared) on step or edit. */
  onChange?: (value: number | null) => void;
  /** Lower bound — clamps and disables the minus button. */
  min?: number;
  /** Upper bound — clamps and disables the plus button. */
  max?: number;
  /** Increment applied by the ± buttons. Default 1. */
  step?: number;
  disabled?: boolean;
}

export declare const NumberInput: ForwardRefExoticComponent<
  NumberInputProps & RefAttributes<HTMLInputElement>
>;
