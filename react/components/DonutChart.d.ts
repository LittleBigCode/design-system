import type {
  HTMLAttributes,
  ReactNode,
  ForwardRefExoticComponent,
  RefAttributes,
} from "react";

export interface DonutChartDatum {
  /** Segment label, shown in the legend. */
  label?: ReactNode;
  /** Segment value; arc length is value / total. */
  value: number;
  /** Segment color. Defaults to a slot from the shared series palette. */
  color?: string;
}

export interface DonutChartProps extends HTMLAttributes<HTMLDivElement> {
  /** Segments to plot. */
  data: DonutChartDatum[];
  /** SVG width/height in px (the donut is square). Defaults to 180. */
  size?: number;
  /** Ring thickness in px. Defaults to 28. */
  thickness?: number;
  /** Big number rendered in the center of the ring. */
  centerLabel?: ReactNode;
}

export declare const DonutChart: ForwardRefExoticComponent<
  DonutChartProps & RefAttributes<HTMLDivElement>
>;
