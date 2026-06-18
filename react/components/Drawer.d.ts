import type { ReactNode } from "react";

export type DrawerPlacement = "right" | "left" | "top" | "bottom";

export interface DrawerProps {
  /** Whether the drawer is open. Controlled. */
  open: boolean;
  /** Called when the user requests close (Escape or backdrop click). */
  onClose?: () => void;
  /** Which edge the panel docks to. Defaults to "right". */
  placement?: DrawerPlacement;
  /** Title shown in the head. */
  heading?: ReactNode;
  /** Optional footer content (rendered with a top rule). */
  footer?: ReactNode;
  className?: string;
  children?: ReactNode;
}
export declare function Drawer(props: DrawerProps): JSX.Element | null;
