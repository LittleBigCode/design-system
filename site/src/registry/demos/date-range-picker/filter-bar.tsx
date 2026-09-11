import * as React from "react"
import {
  Button,
  DateRangePicker,
  type DateRange,
} from "@diametral/design-system/react"

const INVOICES = [
  { id: "F-2041", issued: new Date(2026, 5, 28) },
  { id: "F-2042", issued: new Date(2026, 6, 3) },
  { id: "F-2043", issued: new Date(2026, 6, 11) },
  { id: "F-2044", issued: new Date(2026, 6, 19) },
  { id: "F-2045", issued: new Date(2026, 7, 2) },
]

const EMPTY: DateRange = { from: undefined, to: undefined }

export default function DateRangePickerFilterBar() {
  const [range, setRange] = React.useState<DateRange>(EMPTY)

  const matches = INVOICES.filter(
    (invoice) =>
      (!range.from || invoice.issued >= range.from) &&
      (!range.to || invoice.issued <= range.to)
  )

  return (
    <div className="flex w-full max-w-lg flex-col gap-3">
      <div className="flex flex-wrap items-center gap-2">
        <DateRangePicker
          value={range}
          onValueChange={setRange}
          placeholder="All time"
          dateFormat="P"
          numberOfMonths={1}
          className="w-56"
        />
        <Button
          variant="ghost"
          size="sm"
          disabled={!range.from}
          onClick={() => setRange(EMPTY)}
        >
          Clear
        </Button>
      </div>
      <p className="text-sm text-muted-foreground">
        {matches.length} of {INVOICES.length} invoices
      </p>
    </div>
  )
}
