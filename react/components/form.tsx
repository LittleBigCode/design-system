"use client";

import { Form as FormPrimitive } from "@base-ui/react/form";

import { bcx } from "../lib/baseClass.js";

/* Form — the <form> root, with validation context.
   ---------------------------------------------------------------------------
   Base UI's form root: it owns the element, the submit path and the `errors`
   map its fields read, so a server-side validation response can be handed back
   to the right field without the consumer wiring each one. `FormField` is the
   row inside it and is unrelated — it holds a label, a control and a hint, and
   this holds the rows. */
function Form({ className, ...props }: FormPrimitive.Props) {
  return (
    <FormPrimitive
      data-slot="form"
      className={bcx("ds-form", className)}
      {...props}
    />
  );
}

export { Form };
