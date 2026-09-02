import React from "react";
import { Field } from "../index.js";
import { FieldHint } from "./FieldHint.js";

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
const h = React.createElement;

/* ---- FormField ----------------------------------------------------------
   A labelled field row that pairs a DS `Field` (label + control) with the
   right helper text underneath. Drop a DS Input / Select / Textarea as the
   `children` and pass the matching `error` from a form hook (e.g. useForm):

       <FormField label="Name" htmlFor="name" hint="Shown to your team"
                  error={form.errors.name}>
         <Input id="name" {...form.register("name")} />
       </FormField>

   When `error` is set it renders a `<FieldHint status="error">` with the
   message; otherwise, if `hint` is provided, it renders a neutral
   `<FieldHint>` with the hint. `htmlFor` is forwarded to the `Field` label so
   it points at the control's `id`. */
export function FormField({ label, htmlFor, error, hint, children }: FormFieldProps) {
  const message = error != null && error !== "" ? error : null;
  return h(Field, { label, htmlFor },
    children,
    message != null
      ? h(FieldHint, { status: "error" }, message)
      : hint != null
        ? h(FieldHint, null, hint)
        : null
  );
}
