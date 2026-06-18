import type {
  HTMLAttributes,
  ReactNode,
  ForwardRefExoticComponent,
  RefAttributes,
} from "react";

export interface PieChartDatum {
  /** Slice label, shown in the legend and the hover title. */
  label?: ReactNode;
  /** Slice value; the wedge angle is value / total. */
  value: number;
  /** Slice color. Defaults to a slot from the shared series palette. */
  color?: string;
}

export interface PieChartProps extends HTMLAttributes<HTMLDivElement> {
  /** Slices to plot. */
  data: PieChartDatum[];
  /** SVG width/height in px (the pie is square). Defaults to 180. */
  size?: number;
  /** Render the label + value legend below the pie. Defaults to true. */
  legend?: boolean;
}

export declare const PieChart: ForwardRefExoticComponent<
  PieChartProps & RefAttributes<HTMLDivElement>
>;
