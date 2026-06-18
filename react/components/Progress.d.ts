import type {
  HTMLAttributes,
  ReactNode,
  ForwardRefExoticComponent,
  RefAttributes,
} from "react";

export interface ProgressProps extends HTMLAttributes<HTMLDivElement> {
  /** Current value. Ignored when `indeterminate`. Defaults to 0. */
  value?: number;
  /** Maximum value. Defaults to 100. */
  max?: number;
  /** Status family that recolors the bar. */
  status?: "success" | "warning" | "danger";
  /** Animate a sliding segment instead of a fixed fill. */
  indeterminate?: boolean;
  /** Optional caption row above the track (with the percentage). */
  label?: ReactNode;
}

export declare const Progress: ForwardRefExoticComponent<
  ProgressProps & RefAttributes<HTMLDivElement>
>;
