import type {
  InputHTMLAttributes,
  ChangeEvent,
  ForwardRefExoticComponent,
  RefAttributes,
} from "react";

export interface RangeProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, "onChange" | "type"> {
  /** Controlled value. */
  value?: number | string;
  /** Initial value (uncontrolled). */
  defaultValue?: number | string;
  onChange?: (value: number, event: ChangeEvent<HTMLInputElement>) => void;
  min?: number | string;
  max?: number | string;
  step?: number | string;
}
export declare const Range: ForwardRefExoticComponent<
  RangeProps & RefAttributes<HTMLInputElement>
>;
