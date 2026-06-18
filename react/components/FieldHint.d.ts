import type { HTMLAttributes, ReactNode } from "react";

export interface FieldHintProps extends HTMLAttributes<HTMLSpanElement> {
  /** Color modifier for validation state. */
  status?: "error" | "success";
  children?: ReactNode;
}
export declare function FieldHint(props: FieldHintProps): JSX.Element;
