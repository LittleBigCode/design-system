import type {
  HTMLAttributes,
  ReactNode,
  ForwardRefExoticComponent,
  RefAttributes,
} from "react";

export interface StackedBarSegment {
  /** Segment label, shown in the legend and the hover title. */
  label?: ReactNode;
  /** Segment value; width is value / row-total. */
  value: number;
  /** Segment color. Defaults to a slot from the shared series palette. */
  color?: string;
}

export interface StackedBarRow {
  /** Row label, shown to the left of the track. */
  label?: ReactNode;
  /** Segments stacked across the row. */
  segments: StackedBarSegment[];
}

export interface StackedBarProps extends HTMLAttributes<HTMLDivElement> {
  /** Rows of stacked segments. Provide this OR `segments`. */
  data?: StackedBarRow[];
  /** A single row's segments (shorthand for one-row `data`). */
  segments?: StackedBarSegment[];
  /** Render the segment-label legend below the bars. Defaults to true. */
  showLegend?: boolean;
}

export declare const StackedBar: ForwardRefExoticComponent<
  StackedBarProps & RefAttributes<HTMLDivElement>
>;
