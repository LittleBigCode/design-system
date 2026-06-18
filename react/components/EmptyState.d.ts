import type {
  HTMLAttributes,
  ReactNode,
  ForwardRefExoticComponent,
  RefAttributes,
} from "react";

export interface EmptyStateProps extends HTMLAttributes<HTMLDivElement> {
  /** Large faint icon (glyph or SVG node). */
  icon?: ReactNode;
  /** Title-voiced heading. */
  title?: ReactNode;
  /** Soft, width-constrained supporting copy. */
  description?: ReactNode;
  /** Action row rendered beneath the description. */
  actions?: ReactNode;
}
export declare const EmptyState: ForwardRefExoticComponent<
  EmptyStateProps & RefAttributes<HTMLDivElement>
>;
