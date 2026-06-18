import type {
  HTMLAttributes,
  ReactNode,
  ForwardRefExoticComponent,
  RefAttributes,
} from "react";

export interface AppShellProps extends HTMLAttributes<HTMLDivElement> {
  /** Content of the full-width top header region (e.g. a Wordmark + actions). */
  header?: ReactNode;
  /** Content of the left sidebar region (typically a VerticalNav). Omit to render a header + main only. */
  sidebar?: ReactNode;
  /** The scrolling main content area. */
  children?: ReactNode;
  /** Controlled narrow-screen sidebar state: `true` hides the sidebar, `false` reveals it. */
  collapsed?: boolean;
  /** Uncontrolled initial narrow-screen state. Defaults to `true` (collapsed). */
  defaultCollapsed?: boolean;
  /** Fires when the in-header toggle is pressed, with the next collapsed value. */
  onToggle?: (collapsed: boolean) => void;
}

export declare const AppShell: ForwardRefExoticComponent<
  AppShellProps & RefAttributes<HTMLDivElement>
>;
