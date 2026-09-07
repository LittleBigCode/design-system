"use client"

import * as React from "react"
import {
  DayPicker,
  getDefaultClassNames,
  type DayButton,
  type Locale,
} from "react-day-picker"

import { cx } from "../lib/cx.js"
import { Button, buttonVariants } from "./button.js"
import {
  CaretLeftIcon,
  CaretRightIcon,
  CaretDownIcon,
} from "@phosphor-icons/react"

function Calendar({
  className,
  classNames,
  showOutsideDays = true,
  captionLayout = "label",
  buttonVariant = "ghost",
  locale,
  formatters,
  components,
  ...props
}: React.ComponentProps<typeof DayPicker> & {
  buttonVariant?: React.ComponentProps<typeof Button>["variant"]
}) {
  const defaultClassNames = getDefaultClassNames()

  return (
    <DayPicker
      showOutsideDays={showOutsideDays}
      className={cx("ds-calendar", className)}
      captionLayout={captionLayout}
      locale={locale}
      formatters={{
        formatMonthDropdown: (date) =>
          date.toLocaleString(locale?.code, { month: "short" }),
        ...formatters,
      }}
      classNames={{
        root: cx("ds-calendar-root", defaultClassNames.root),
        months: cx("ds-calendar-months", defaultClassNames.months),
        month: cx("ds-calendar-month", defaultClassNames.month),
        nav: cx("ds-calendar-nav", defaultClassNames.nav),
        button_previous: cx(
          buttonVariants({ variant: buttonVariant }),
          "ds-calendar-nav-button size-(--cell-size) p-0",
          defaultClassNames.button_previous
        ),
        button_next: cx(
          buttonVariants({ variant: buttonVariant }),
          "ds-calendar-nav-button size-(--cell-size) p-0",
          defaultClassNames.button_next
        ),
        month_caption: cx(
          "ds-calendar-month-caption",
          defaultClassNames.month_caption
        ),
        dropdowns: cx("ds-calendar-dropdowns", defaultClassNames.dropdowns),
        dropdown_root: cx(
          "ds-calendar-dropdown-root",
          defaultClassNames.dropdown_root
        ),
        dropdown: cx("ds-calendar-dropdown", defaultClassNames.dropdown),
        caption_label: cx(
          "ds-calendar-caption-label",
          captionLayout !== "label" && "ds-calendar-caption-label--dropdown",
          defaultClassNames.caption_label
        ),
        month_grid: cx("ds-calendar-month-grid", defaultClassNames.month_grid),
        weekdays: cx("ds-calendar-weekdays", defaultClassNames.weekdays),
        weekday: cx("ds-calendar-weekday", defaultClassNames.weekday),
        week: cx("ds-calendar-week", defaultClassNames.week),
        week_number_header: cx(
          "ds-calendar-week-number-header",
          defaultClassNames.week_number_header
        ),
        week_number: cx(
          "ds-calendar-week-number",
          defaultClassNames.week_number
        ),
        day: cx(
          "ds-calendar-day",
          props.showWeekNumber
            ? "ds-calendar-day--round-start-second"
            : "ds-calendar-day--round-start-first",
          defaultClassNames.day
        ),
        range_start: cx(
          "ds-calendar-range-start",
          defaultClassNames.range_start
        ),
        range_middle: cx(
          "ds-calendar-range-middle",
          defaultClassNames.range_middle
        ),
        range_end: cx("ds-calendar-range-end", defaultClassNames.range_end),
        today: cx("ds-calendar-today", defaultClassNames.today),
        outside: cx("ds-calendar-outside", defaultClassNames.outside),
        disabled: cx("ds-calendar-disabled", defaultClassNames.disabled),
        hidden: cx("ds-calendar-hidden", defaultClassNames.hidden),
        ...classNames,
      }}
      components={{
        Root: ({ className, rootRef, ...props }) => {
          return (
            <div
              data-slot="calendar"
              ref={rootRef}
              className={cx(className)}
              {...props}
            />
          )
        },
        Chevron: ({ className, orientation, ...props }) => {
          if (orientation === "left") {
            return (
              <CaretLeftIcon
                className={cx(
                  "ds-calendar-chevron ds-calendar-chevron--directional",
                  className
                )}
                {...props}
              />
            )
          }

          if (orientation === "right") {
            return (
              <CaretRightIcon
                className={cx(
                  "ds-calendar-chevron ds-calendar-chevron--directional",
                  className
                )}
                {...props}
              />
            )
          }

          return (
            <CaretDownIcon
              className={cx("ds-calendar-chevron", className)}
              {...props}
            />
          )
        },
        DayButton: ({ ...props }) => (
          <CalendarDayButton locale={locale} {...props} />
        ),
        WeekNumber: ({ children, ...props }) => {
          return (
            <td {...props}>
              <div className="ds-calendar-week-number-cell">{children}</div>
            </td>
          )
        },
        ...components,
      }}
      {...props}
    />
  )
}

function CalendarDayButton({
  className,
  day,
  modifiers,
  locale,
  ...props
}: React.ComponentProps<typeof DayButton> & { locale?: Partial<Locale> }) {
  const defaultClassNames = getDefaultClassNames()

  const ref = React.useRef<HTMLButtonElement>(null)
  React.useEffect(() => {
    if (modifiers.focused) ref.current?.focus()
  }, [modifiers.focused])

  return (
    <Button
      ref={ref}
      variant="ghost"
      size="icon"
      data-day={day.date.toLocaleDateString(locale?.code)}
      data-selected-single={
        modifiers.selected &&
        !modifiers.range_start &&
        !modifiers.range_end &&
        !modifiers.range_middle
      }
      data-range-start={modifiers.range_start}
      data-range-end={modifiers.range_end}
      data-range-middle={modifiers.range_middle}
      className={cx(
        "ds-calendar-day-button aspect-square size-auto w-full min-w-(--cell-size)",
        defaultClassNames.day,
        className
      )}
      {...props}
    />
  )
}

export { Calendar, CalendarDayButton }
