import type {
  HTMLAttributes,
  ForwardRefExoticComponent,
  RefAttributes,
} from "react";

export interface ToolbarProps extends HTMLAttributes<HTMLDivElement> {
  /** Render a fully boxed bar (1px all around) instead of just a bottom rule. */
  bordered?: boolean;
}
export declare const Toolbar: ForwardRefExoticComponent<
  ToolbarProps & RefAttributes<HTMLDivElement>
>;

export declare const ToolbarGroup: ForwardRefExoticComponent<
  HTMLAttributes<HTMLDivElement> & RefAttributes<HTMLDivElement>
>;

export declare const ToolbarSpacer: ForwardRefExoticComponent<
  HTMLAttributes<HTMLDivElement> & RefAttributes<HTMLDivElement>
>;
