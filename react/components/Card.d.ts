import type {
  HTMLAttributes,
  ReactNode,
  ForwardRefExoticComponent,
  RefAttributes,
} from "react";

export interface CardProps extends HTMLAttributes<HTMLDivElement> {
  /** Title-voiced heading rendered in the card header. */
  title?: ReactNode;
  /** Full-bleed media at the top: an image `src` string, or any node. */
  media?: ReactNode;
  /** Footer content set off by a top rule on the alt background. */
  footer?: ReactNode;
  /** Turn the whole card into a focusable, hover-highlighted affordance. */
  clickable?: boolean;
}
export declare const Card: ForwardRefExoticComponent<
  CardProps & RefAttributes<HTMLDivElement>
>;
