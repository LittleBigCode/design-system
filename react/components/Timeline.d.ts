import type { HTMLAttributes, ReactNode } from "react";

export interface TimelineItem {
  /** Timestamp / label, rendered above the title in faint uppercase. */
  time?: ReactNode;
  /** The event title. */
  title?: ReactNode;
  /** Supporting description. */
  body?: ReactNode;
  /** Recolors the dot. Omit for the default neutral rule color. */
  status?: "success" | "warning" | "danger" | "info" | "neutral";
}

export interface TimelineProps extends HTMLAttributes<HTMLOListElement> {
  /** The events to render, oldest or newest first as you supply them. */
  items: TimelineItem[];
}

export declare function Timeline(props: TimelineProps): JSX.Element;
