import type { ReactNode } from "react";

export interface Command {
  /** Stable identity for the row. */
  id: string;
  /** Display text (also the field matched while filtering). */
  label: ReactNode;
  /** Optional group heading; consecutive commands sharing a group cluster under one label. */
  group?: string;
  /** Optional right-aligned hint or keyboard shortcut. */
  hint?: ReactNode;
  /** Invoked when the command is chosen (before onClose fires). */
  onRun?: () => void;
}

export interface CommandPaletteProps {
  /** Whether the palette is open. Controlled. */
  open: boolean;
  /** Called when the user requests close (Escape, backdrop click, or after running a command). */
  onClose?: () => void;
  /** The commands to show. */
  commands: Command[];
  /** Search input placeholder. */
  placeholder?: string;
  className?: string;
}
export declare function CommandPalette(props: CommandPaletteProps): JSX.Element | null;
