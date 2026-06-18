import type {
  HTMLAttributes,
  ForwardRefExoticComponent,
  RefAttributes,
} from "react";

export interface SparklineProps extends HTMLAttributes<HTMLSpanElement> {
  /** Series to plot. Scaled to fit the width/height box. */
  data: number[];
  /** SVG width in px. Defaults to 120. */
  width?: number;
  /** SVG height in px. Defaults to 32. */
  height?: number;
  /** Line color. Overrides the default currentColor (accent). */
  stroke?: string;
  /** Add a faint area under the line. `true` uses currentColor; a string sets the fill. */
  fill?: boolean | string;
  /** Mark the last point with a dot. */
  showDot?: boolean;
}

export declare const Sparkline: ForwardRefExoticComponent<
  SparklineProps & RefAttributes<HTMLSpanElement>
>;
