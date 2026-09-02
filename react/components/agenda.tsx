"use client"

import * as React from "react"

import { cx } from "../lib/cx.js"
import { Empty, EmptyDescription, EmptyHeader } from "./empty.js"

export interface AgendaEvent {
  /** A `Date` or an ISO `yyyy-mm-dd` string. Unparseable rows are dropped. */
  date: Date | string
  title: React.ReactNode
  /** Free text, sorted as a string — `09:00` rather than `9am`. */
  time?: string
  meta?: React.ReactNode
  /** Recolours the row's status dot. */
  status?:
    | "neutral"
    | "info"
    | "success"
    | "warning"
    | "danger"
    | "critical"
}

const pad = (value: number) => String(value).padStart(2, "0")
const isoDay = (date: Date) =>
  `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}`

/** A `Date`, an ISO `yyyy-mm-dd`, or null when neither parses. */
function toDate(input: Date | string): Date | null {
  if (input instanceof Date) {
    return Number.isNaN(input.getTime()) ? null : input
  }
  // A bare yyyy-mm-dd is parsed by hand rather than by `new Date`, which reads
  // it as UTC and shifts the day for anyone west of Greenwich.
  const parts = /^(\d{4})-(\d{2})-(\d{2})/.exec(input)
  if (parts) {
    return new Date(Number(parts[1]), Number(parts[2]) - 1, Number(parts[3]))
  }
  const parsed = new Date(input)
  return Number.isNaN(parsed.getTime()) ? null : parsed
}

/* Agenda — a chronological list of events grouped by day.
   ---------------------------------------------------------------------------
   Sorts by day then by time, buckets consecutive rows into a day group, and
   renders each group as a <section> under an <h3> — where 0.11 emitted a flat
   run of divs, so a screen reader had no way to skip a day.

   `locale` is the other thing 0.11 could not do: it hardcoded English weekday
   and month tables, and this defers to `toLocaleDateString`.

   SCOPE (source issue #70): event display lives here and NOT on `calendar`.
   Calendar is a date-selection control; a month cell can show maybe two events
   before it lies about the rest. A list has no such ceiling, and the two
   compose — select a day there, list it here.

   CROSS-BATCH: the source renders the status dot as <Status><StatusIndicator/>,
   which arrives in batch 7. The incumbent `Status` in react/index.tsx is a
   different component entirely — a status *panel* with a kicker and a heading —
   so there is nothing here to compose onto. The dot is a span carrying its own
   tone class until batch 7 re-wires it. */
function Agenda({
  className,
  events,
  emptyMessage = "No events scheduled.",
  locale,
  ...props
}: React.ComponentProps<"div"> & {
  events: AgendaEvent[]
  emptyMessage?: React.ReactNode
  /** BCP-47 tag for the day headings. Defaults to the browser's. */
  locale?: string
}) {
  const groups = React.useMemo(() => {
    const rows = events
      .map((event) => ({ event, date: toDate(event.date) }))
      .filter(
        (row): row is { event: AgendaEvent; date: Date } => row.date !== null,
      )
      .sort(
        (a, b) =>
          a.date.getTime() - b.date.getTime() ||
          (a.event.time ?? "").localeCompare(b.event.time ?? ""),
      )

    const out: { key: string; date: Date; items: AgendaEvent[] }[] = []
    for (const row of rows) {
      const key = isoDay(row.date)
      const last = out[out.length - 1]
      if (last?.key === key) last.items.push(row.event)
      else out.push({ key, date: row.date, items: [row.event] })
    }
    return out
  }, [events])

  if (!groups.length) {
    return (
      <div data-slot="agenda" className={cx("ds-agenda", className)} {...props}>
        <Empty>
          <EmptyHeader>
            <EmptyDescription>{emptyMessage}</EmptyDescription>
          </EmptyHeader>
        </Empty>
      </div>
    )
  }

  return (
    <div
      data-slot="agenda"
      className={cx("ds-agenda ds-agenda-list", className)}
      {...props}
    >
      {groups.map((group) => (
        <section key={group.key}>
          <h3 data-slot="agenda-day" className="ds-agenda-day">
            <span className="ds-agenda-day-weekday">
              {group.date.toLocaleDateString(locale, { weekday: "long" })}
            </span>
            <time dateTime={group.key}>
              {group.date.toLocaleDateString(locale, {
                day: "numeric",
                month: "short",
                year: "numeric",
              })}
            </time>
          </h3>
          {group.items.map((event, index) => (
            <div
              key={index}
              data-slot="agenda-event"
              className="ds-agenda-event"
            >
              <span className="ds-agenda-event-time">{event.time}</span>
              <span
                aria-hidden
                className={cx(
                  "ds-agenda-event-status",
                  `ds-agenda-event-status--${event.status ?? "neutral"}`,
                )}
              />
              <div className="ds-agenda-event-body">
                <div className="ds-agenda-event-title">{event.title}</div>
                {event.meta != null ? (
                  <div className="ds-agenda-event-meta">{event.meta}</div>
                ) : null}
              </div>
            </div>
          ))}
        </section>
      ))}
    </div>
  )
}

export { Agenda }
