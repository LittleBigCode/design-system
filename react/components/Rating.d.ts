import type { HTMLAttributes, ReactNode } from "react";

export interface RatingProps extends Omit<HTMLAttributes<HTMLDivElement>, "onChange" | "defaultValue"> {
  /** Controlled rating (number of filled stars). */
  value?: number;
  /** Initial rating (uncontrolled). */
  defaultValue?: number;
  /** Number of stars. Defaults to 5. */
  max?: number;
  /** Called with the new rating when a star is chosen. */
  onChange?: (value: number) => void;
  /** Render display-only (non-interactive) stars. */
  readOnly?: boolean;
}

export declare function Rating(props: RatingProps): JSX.Element;
