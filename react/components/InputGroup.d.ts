import type { HTMLAttributes, ReactNode } from "react";

export interface InputGroupProps extends HTMLAttributes<HTMLDivElement> {
  /** Addon rendered before the control. */
  before?: ReactNode;
  /** Addon rendered after the control. */
  after?: ReactNode;
  /** The control (Input, native input/select, ...). */
  children?: ReactNode;
}
export declare function InputGroup(props: InputGroupProps): JSX.Element;
