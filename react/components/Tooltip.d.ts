import type { HTMLAttributes, ReactNode } from "react";

export type TooltipPlacement = "top" | "bottom" | "left" | "right";

export interface TooltipProps extends Omit<HTMLAttributes<HTMLSpanElement>, "children"> {
  /** The tooltip text shown on hover / focus of the wrapped trigger. */
  label: ReactNode;
  /** Where the tooltip sits relative to the trigger. Defaults to "top". */
  placement?: TooltipPlacement;
  /** The trigger element the tooltip is attached to. */
  children?: ReactNode;
}
export declare function Tooltip(props: TooltipProps): JSX.Element;
