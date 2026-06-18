import type {
  HTMLAttributes,
  ReactNode,
  ForwardRefExoticComponent,
  RefAttributes,
} from "react";

export interface GaugeChartThreshold {
  /** Value at or above which `color` applies (last matching wins). */
  at: number;
  /** Arc color once this threshold is reached. */
  color: string;
}

export interface GaugeChartProps extends HTMLAttributes<HTMLDivElement> {
  /** Current value, plotted as a fraction of `max`. */
  value: number;
  /** Full-scale value. Defaults to 100. */
  max?: number;
  /** SVG width/height in px (the gauge is square). Defaults to 180. */
  size?: number;
  /** Optional uppercase caption shown under the center number. */
  label?: ReactNode;
  /** Arc thickness in px. Defaults to 16. */
  thickness?: number;
  /** Arc color override. Defaults to var(--ds-chart-1). */
  color?: string;
  /** Value→color thresholds (last whose `at` the value reaches wins). */
  thresholds?: GaugeChartThreshold[];
  /** Formats the center number; receives the numeric value. */
  format?: (value: number) => ReactNode;
}

export declare const GaugeChart: ForwardRefExoticComponent<
  GaugeChartProps & RefAttributes<HTMLDivElement>
>;
