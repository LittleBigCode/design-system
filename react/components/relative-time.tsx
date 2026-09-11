"use client";

import * as React from "react";

import { cx } from "../lib/cx.js";

const MINUTE = 60_000;
const HOUR = 3_600_000;
const DAY = 86_400_000;
const WEEK = 7 * DAY;

/* RelativeTime — a <time> reading "3 hours ago", advancing while mounted.
   ---------------------------------------------------------------------------
   Past a week the text becomes an absolute date, because "47 days ago" is
   information nobody wanted. The `title` is always the full date and time, so
   the precise value is one hover away and the `dateTime` attribute carries it
   for anything parsing the page. */

/**
 * A tag reaching this component comes from a user profile, a URL or an API —
 * any of which can hand over something malformed, and every `Intl` entry point
 * throws a RangeError on those rather than falling back.
 */
function safeLocale(locale?: string) {
  if (!locale) return undefined;
  try {
    Intl.getCanonicalLocales(locale);
    return locale;
  } catch {
    return undefined;
  }
}

/** What a `created_at` / `updated_at` column can hand over. */
export type DateInput = Date | string | number;

const TIMESTAMP =
  /^(\d{4}-\d{2}-\d{2})[ T](\d{2}:\d{2}(?::\d{2})?)(?:\.(\d+))?\s*(Z|z|[+-]\d{2}(?::?\d{2})?)?$/;

/**
 * Normalises a database timestamp into a form every engine parses identically.
 * A row rarely arrives as clean ISO: SQL separates date and time with a space,
 * Postgres writes microseconds where `Date` reads milliseconds, and zones come
 * abbreviated as `+02`. Each of those is parsed inconsistently across engines,
 * or not at all — Safari has historically returned an invalid date for the lot.
 *
 * A value carrying no zone is read as local time, which is what `Date` already
 * does with a bare ISO string. Columns storing UTC without a zone must append
 * `Z`, or they land hours off for anyone outside UTC.
 */
function toDate(value: DateInput): Date {
  if (value instanceof Date) return value;
  // Epoch milliseconds, matching `Date`'s own numeric contract.
  if (typeof value === "number") return new Date(value);

  const match = TIMESTAMP.exec(value.trim());
  if (!match) return new Date(value);

  const [, day, clock, fraction, zone] = match;
  const time = clock.length === 5 ? `${clock}:00` : clock;
  const millis = fraction ? `.${fraction.slice(0, 3).padEnd(3, "0")}` : "";
  const offset = !zone
    ? ""
    : zone.length === 3
      ? `${zone}:00`
      : zone.length === 5
        ? `${zone.slice(0, 3)}:${zone.slice(3)}`
        : zone.toUpperCase();

  return new Date(`${day}T${time}${millis}${offset}`);
}

/** The "time ago" string on its own, for anywhere a component cannot go. */
export function formatRelativeTime(value: DateInput, locale?: string): string {
  const date = toDate(value);
  if (Number.isNaN(date.getTime())) return "";
  const tag = safeLocale(locale);
  const diffSec = Math.round((date.getTime() - Date.now()) / 1000);
  const abs = Math.abs(diffSec);
  const rtf = new Intl.RelativeTimeFormat(tag, { numeric: "auto" });
  if (abs < 60) return rtf.format(diffSec, "second");
  if (abs < 3600) return rtf.format(Math.round(diffSec / 60), "minute");
  if (abs < 86_400) return rtf.format(Math.round(diffSec / 3600), "hour");
  if (abs < 604_800) return rtf.format(Math.round(diffSec / 86_400), "day");
  return date.toLocaleDateString(tag, {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

/**
 * How long the current text stays true, derived from the start date itself:
 * "5 seconds ago" is stale in a second, "3 hours ago" is not. `0` means the
 * text no longer changes — past a week the output is an absolute date, so the
 * timer stops rather than repainting forever.
 */
function tickInterval(date: Date) {
  const abs = Math.abs(date.getTime() - Date.now());
  if (abs < MINUTE) return 1_000;
  if (abs < HOUR) return 30_000;
  if (abs < DAY) return MINUTE;
  if (abs < WEEK) return HOUR;
  return 0;
}

export interface RelativeTimeProps
  extends Omit<React.ComponentProps<"time">, "dateTime" | "children"> {
  /** A `Date`, epoch milliseconds, or a database timestamp string. */
  date: DateInput;
  locale?: string;
  /** Re-renders on an interval so the text keeps advancing while mounted. */
  live?: boolean;
  /** Overrides the interval derived from `date`. */
  updateIntervalMs?: number;
}

function RelativeTime({
  className,
  date,
  locale,
  live = true,
  updateIntervalMs,
  ...props
}: RelativeTimeProps) {
  const parsed = React.useMemo(() => toDate(date), [date]);
  const valid = !Number.isNaN(parsed.getTime());
  const [, setTick] = React.useState(0);

  React.useEffect(() => {
    if (!live || !valid) return;
    // A chained timeout rather than an interval: the cadence is re-derived on
    // every tick, so an item crossing from seconds into minutes slows down
    // instead of keeping its original rate for as long as it stays mounted.
    let id: ReturnType<typeof setTimeout> | undefined;
    const schedule = () => {
      const delay = updateIntervalMs ?? tickInterval(parsed);
      if (!delay) return;
      id = setTimeout(() => {
        setTick((n) => n + 1);
        schedule();
      }, delay);
    };
    schedule();
    return () => clearTimeout(id);
  }, [live, valid, updateIntervalMs, parsed]);

  // An unparseable date is shown as it arrived rather than crashing the tree on
  // `toISOString()` — a bad API value stays visible instead of taking the page
  // down or blanking out.
  if (!valid) {
    return (
      <time
        data-slot="relative-time"
        data-invalid=""
        className={cx("ds-relative-time", className)}
        {...props}
      >
        {String(date)}
      </time>
    );
  }

  const tag = safeLocale(locale);

  return (
    <time
      data-slot="relative-time"
      dateTime={parsed.toISOString()}
      title={parsed.toLocaleString(tag, {
        dateStyle: "long",
        timeStyle: "short",
      })}
      className={cx("ds-relative-time", className)}
      {...props}
    >
      {formatRelativeTime(parsed, locale)}
    </time>
  );
}

export { RelativeTime };
