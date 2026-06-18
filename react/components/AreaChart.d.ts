import type {
  HTMLAttributes,
  ReactNode,
  ForwardRefExoticComponent,
  RefAttributes,
} from "react";

export interface AreaChartSeries {
  /** Series name, shown in the legend when there is more than one series. */
  name?: ReactNode;
  /** Y values to plot. */
  data: number[];
  /** Line + area color. Defaults to a slot from the shared series palette. */
  color?: string;
}

export interface AreaChartProps extends HTMLAttributes<HTMLDivElement> {
  /** Multi-series data. Takes precedence over `data` when non-empty. */
  series?: AreaChartSeries[];
  /** Single-series shorthand for `series={[{ data }]}`. */
  data?: number[];
  /** SVG width in px. Defaults to 480. */
  width?: number;
  /** SVG height in px. Defaults to 200. */
  height?: number;
  /** X-axis tick labels, one per x position. */
  labels?: ReactNode[];
  /** Draw faint horizontal gridlines. Defaults to true. */
  grid?: boolean;
  /** Mark every data point with a dot. Defaults to true. */
  dots?: boolean;
}

export declare const AreaChart: ForwardRefExoticComponent<
  AreaChartProps & RefAttributes<HTMLDivElement>
>;
