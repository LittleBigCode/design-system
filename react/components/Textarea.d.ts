import type {
  TextareaHTMLAttributes,
  ForwardRefExoticComponent,
  RefAttributes,
} from "react";

export interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {}
export declare const Textarea: ForwardRefExoticComponent<
  TextareaProps & RefAttributes<HTMLTextAreaElement>
>;
