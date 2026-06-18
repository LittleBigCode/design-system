import type {
  HTMLAttributes,
  ReactNode,
  ForwardRefExoticComponent,
  RefAttributes,
} from "react";

export interface BarChartDatum {
  label?: ReactNode;
  value: number;
  /** Status family that recolors this bar. */
  status?: "success" | "warning" | "danger" | "critical" | "neutral" | "info";
}

export interface BarChartProps extends HTMLAttributes<HTMLDivElement> {
  /** Bars to plot. */
  data: BarChartDatum[];
  /** Value mapped to a full-length bar. Defaults to the largest value. */
  max?: number;
  /** Lay bars out as rows instead of columns. */
  horizontal?: boolean;
}

export declare const BarChart: ForwardRefExoticComponent<
  BarChartProps & RefAttributes<HTMLDivElement>
>;
