import type {
  HTMLAttributes,
  ReactNode,
  MouseEvent,
  ForwardRefExoticComponent,
  RefAttributes,
} from "react";

export interface TagProps extends HTMLAttributes<HTMLSpanElement> {
  /** Status family — colored border, matching text and tinted background. */
  status?: "info" | "success" | "warning" | "danger";
  /** Render a trailing × button; called when it is clicked. */
  onRemove?: (event: MouseEvent<HTMLButtonElement>) => void;
  children?: ReactNode;
}

export declare const Tag: ForwardRefExoticComponent<
  TagProps & RefAttributes<HTMLSpanElement>
>;
