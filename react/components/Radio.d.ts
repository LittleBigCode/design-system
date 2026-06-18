import type { ChangeEvent, ReactNode } from "react";

export interface RadioProps {
  /** Controlled checked state (usually set by RadioGroup). */
  checked?: boolean;
  /** Initial checked state (uncontrolled, standalone use). */
  defaultChecked?: boolean;
  name?: string;
  value?: string;
  onChange?: (value: string, event: ChangeEvent<HTMLInputElement>) => void;
  disabled?: boolean;
  className?: string;
  children?: ReactNode;
}
export declare function Radio(props: RadioProps): JSX.Element;

export interface RadioOption {
  value: string;
  label: ReactNode;
  disabled?: boolean;
}
export interface RadioGroupProps {
  /** Controlled selected value. */
  value?: string;
  /** Initial selected value (uncontrolled). */
  defaultValue?: string;
  onChange?: (value: string, event: ChangeEvent<HTMLInputElement>) => void;
  /** Shared name applied to every radio in the group. */
  name?: string;
  options: RadioOption[];
  className?: string;
}
export declare function RadioGroup(props: RadioGroupProps): JSX.Element;
