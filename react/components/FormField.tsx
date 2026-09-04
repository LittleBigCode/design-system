"use client"

import {
  Field,
  FieldDescription,
  FieldError,
  FieldLabel,
} from "./field.js";

import type { ReactNode } from "react";

export interface FormFieldProps {
  /** Field label, rendered as a `FieldLabel`. */
  label?: ReactNode;
  /** Forwarded to the label's `htmlFor` — point it at the control id. */
  htmlFor?: string;
  /**
   * Validation message. When set (non-empty), a `FieldError` is rendered under
   * the control and the neutral `hint` is suppressed.
   */
  error?: ReactNode;
  /** Neutral helper text shown under the control when there is no `error`. */
  hint?: ReactNode;
  /** The form control, e.g. a DS `Input` / `Select` / `Textarea`. */
  children?: ReactNode;
}

/* ---- FormField ----------------------------------------------------------
   A labelled field row that pairs a DS `Field` (label + control) with the
   right helper text underneath. Drop a DS Input / Select / Textarea as the
   `children` and pass the matching `error` from a form hook (e.g. useForm):

       <FormField label="Name" htmlFor="name" hint="Shown to your team"
                  error={form.errors.name}>
         <Input id="name" {...form.register("name")} />
       </FormField>

   Re-wired onto the absorbed `Field` parts in 1.0.0-beta.7. `Field` no longer
   takes a `label` prop — the label is a `FieldLabel` element — and `FieldHint`
   is replaced by `FieldDescription` and `FieldError`. This composer exists so
   that swap costs a `useForm` caller nothing: its own props are unchanged.

   The upgrade a caller gets for free is that the error is now announced.
   `FieldHint` was a bare span, so a screen reader never heard a validation
   message appear; `FieldError` carries `role="alert"`. */
export function FormField({ label, htmlFor, error, hint, children }: FormFieldProps) {
  const message = error != null && error !== "" ? error : null;
  return (
    <Field data-invalid={message != null ? true : undefined}>
      {label != null ? <FieldLabel htmlFor={htmlFor}>{label}</FieldLabel> : null}
      {children}
      {message != null ? (
        <FieldError>{message}</FieldError>
      ) : hint != null ? (
        <FieldDescription>{hint}</FieldDescription>
      ) : null}
    </Field>
  );
}