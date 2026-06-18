import type { ReactNode } from "react";

export interface FormFieldProps {
  /** Field label rendered by the DS `Field`. */
  label?: ReactNode;
  /** Forwarded to the `Field` label's `htmlFor` — point it at the control id. */
  htmlFor?: string;
  /**
   * Validation message. When set (non-empty), a `FieldHint status="error"` is
   * rendered under the control and the neutral `hint` is suppressed.
   */
  error?: ReactNode;
  /** Neutral helper text shown under the control when there is no `error`. */
  hint?: ReactNode;
  /** The form control, e.g. a DS `Input` / `Select` / `Textarea`. */
  children?: ReactNode;
}

/**
 * Labelled field row: a DS `Field` wrapping `children`, plus a `FieldHint`
 * carrying either the `error` (status="error") or the neutral `hint`.
 */
export declare function FormField(props: FormFieldProps): JSX.Element;
