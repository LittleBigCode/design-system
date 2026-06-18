import type {
  HTMLAttributes,
  ReactNode,
  ForwardRefExoticComponent,
  RefAttributes,
} from "react";

export interface StatCardProps extends HTMLAttributes<HTMLDivElement> {
  /** Uppercase faint label above the figure. */
  label?: ReactNode;
  /** The headline figure. */
  value?: ReactNode;
  /** Signed change shown under the value. */
  delta?: ReactNode;
  /** Colors the delta (success/danger) and prepends a ▲/▼. */
  deltaDir?: "up" | "down";
  /** Rendered in a spark slot under the value (e.g. a Sparkline). */
  children?: ReactNode;
}

export declare const StatCard: ForwardRefExoticComponent<
  StatCardProps & RefAttributes<HTMLDivElement>
>;
