import type { HTMLAttributes, ReactNode } from "react";

export type DateLike = Date | string;

export type AgendaStatus = "success" | "warning" | "danger" | "info";

export interface AgendaEvent {
  /** Day the event lands on — a Date or an ISO `yyyy-mm-dd` string. */
  date: DateLike;
  /** Time label shown in the left column (e.g. "09:30"). */
  time?: ReactNode;
  /** Event title. */
  title: ReactNode;
  /** Optional secondary line under the title. */
  meta?: ReactNode;
  /** Recolors the row's status marker. */
  status?: AgendaStatus;
}

export interface AgendaProps extends HTMLAttributes<HTMLDivElement> {
  /** Events to list; sorted and grouped by day. */
  events?: AgendaEvent[];
  /** Shown when there are no events. Defaults to "No events scheduled.". */
  emptyMessage?: ReactNode;
}

export declare function Agenda(props: AgendaProps): JSX.Element;
