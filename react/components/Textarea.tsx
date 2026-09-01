import { cx } from "../lib/cx.js";
import React from "react";

import type {
  TextareaHTMLAttributes,
  ForwardRefExoticComponent,
  RefAttributes,
} from "react";

export interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {}
const h = React.createElement;

/* ---- Textarea -----------------------------------------------------------
   A flat, vertically-resizable <textarea> with the .ds-textarea look.
   Forwards a ref to the element; all props (value, rows, placeholder, ...)
   spread straight onto it. */
export const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(function Textarea({ className, ...rest }, ref) {
  return h("textarea", { ref, className: cx("ds-textarea", className), ...rest });
});
