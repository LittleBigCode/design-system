import type {
  HTMLAttributes,
  ForwardRefExoticComponent,
  RefAttributes,
} from "react";

export interface SpinnerProps extends HTMLAttributes<HTMLSpanElement> {
  /** Size variant. Omit for the default (20px) size. */
  size?: "sm" | "lg";
  /** Align to the surrounding text baseline (sits beside a label). */
  inline?: boolean;
  /** Accessible label exposed via aria-label. Defaults to "Loading". */
  label?: string;
}

export declare const Spinner: ForwardRefExoticComponent<
  SpinnerProps & RefAttributes<HTMLSpanElement>
>;
