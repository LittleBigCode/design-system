import React from "react";
import { Field } from "../index.js";
import { FieldHint } from "./FieldHint.js";
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
export function FormField({ label, htmlFor, error, hint, children }) {
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
