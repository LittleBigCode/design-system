import type { ReactNode } from "react";
import type { Command } from "./CommandPalette";

export interface ConsoleNavItem {
  id: string;
  label: ReactNode;
  badge?: ReactNode;
}
export interface ConsoleNavGroup {
  group?: string;
  items: ConsoleNavItem[];
}
export interface ConsoleUser {
  initials?: ReactNode;
  name?: ReactNode;
  onSignOut?: () => void;
  signOutLabel?: string;
}
export interface ConsoleLayoutProps {
  /** Wordmark element, or `{ name, sub }` to build one. */
  brand?: ReactNode | { name?: string; sub?: ReactNode };
  /** Grouped sidebar navigation. */
  nav?: ConsoleNavGroup[];
  /** Active item id (highlights the matching nav button). */
  active?: string;
  /** Fired with the chosen item id. */
  onNavigate?: (id: string) => void;
  /** ⌘K commands. Defaults to one "Go to" entry per nav item. */
  commands?: Command[];
  /** Right-aligned user avatar + sign-out. */
  user?: ConsoleUser;
  /** Extra app-bar action elements. */
  actions?: ReactNode;
  /** Show the ⌘K search trigger + command palette. Default true. */
  search?: boolean;
  searchPlaceholder?: string;
  /** Render a Light/Dark/Sepia switcher that drives `data-theme` on <html>. */
  themes?: boolean;
  /** Force the top load bar on (it also flashes briefly on every navigation). */
  loading?: boolean;
  children?: ReactNode;
  className?: string;
}
export declare function ConsoleLayout(props: ConsoleLayoutProps): JSX.Element;
