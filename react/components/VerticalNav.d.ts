import type {
  HTMLAttributes,
  ReactNode,
  ForwardRefExoticComponent,
  RefAttributes,
} from "react";

export interface VerticalNavItem {
  label: ReactNode;
  href?: string;
  /** Marks the current item (accent bar + alt background). */
  active?: boolean;
  /** Nested links; their presence renders a collapsible group. */
  children?: VerticalNavItem[];
}

export interface VerticalNavProps extends HTMLAttributes<HTMLElement> {
  items: VerticalNavItem[];
}

export declare const VerticalNav: ForwardRefExoticComponent<
  VerticalNavProps & RefAttributes<HTMLElement>
>;
