import type { ChangeEvent, ReactNode } from "react";

export interface CheckboxProps {
  /** Controlled checked state. */
  checked?: boolean;
  /** Initial checked state (uncontrolled). */
  defaultChecked?: boolean;
  onChange?: (checked: boolean, event: ChangeEvent<HTMLInputElement>) => void;
  disabled?: boolean;
  name?: string;
  className?: string;
  children?: ReactNode;
}
export declare function Checkbox(props: CheckboxProps): JSX.Element;
