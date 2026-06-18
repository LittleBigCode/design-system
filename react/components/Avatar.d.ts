import type {
  HTMLAttributes,
  ReactNode,
  ForwardRefExoticComponent,
  RefAttributes,
} from "react";

export interface AvatarProps extends HTMLAttributes<HTMLSpanElement> {
  /** Image source. When set, renders a cover-fit image clipped to the square. */
  src?: string;
  /** Alt text for the image. */
  alt?: string;
  /** Fallback content shown when there is no `src` (uppercased by CSS). */
  initials?: ReactNode;
  /** Size of the tile. Omit for the default 36px. */
  size?: "sm" | "lg";
}
export declare const Avatar: ForwardRefExoticComponent<
  AvatarProps & RefAttributes<HTMLSpanElement>
>;

export interface AvatarGroupProps extends HTMLAttributes<HTMLDivElement> {
  /** Cap the number of visible avatars; the rest collapse into a "+N" tile. */
  max?: number;
  children?: ReactNode;
}
export declare function AvatarGroup(props: AvatarGroupProps): JSX.Element;
