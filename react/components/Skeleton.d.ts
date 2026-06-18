import type {
  HTMLAttributes,
  ForwardRefExoticComponent,
  RefAttributes,
} from "react";

export interface SkeletonProps extends HTMLAttributes<HTMLSpanElement> {
  /** Shape of the placeholder. Defaults to "line". */
  variant?: "text" | "line" | "circle" | "block";
  /** Inline width override (e.g. "12rem" or 200). */
  width?: number | string;
  /** Inline height override (e.g. "1em" or 40). */
  height?: number | string;
  /** Render N stacked lines (> 1). Defaults to 1. */
  count?: number;
}
export declare const Skeleton: ForwardRefExoticComponent<
  SkeletonProps & RefAttributes<HTMLSpanElement>
>;
