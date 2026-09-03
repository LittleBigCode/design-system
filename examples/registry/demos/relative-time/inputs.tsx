import * as React from "react"
import {
  DescriptionDetail,
  DescriptionList,
  DescriptionTerm,
  RelativeTime,
} from "@diametral/design-system/react"

const UPDATED = new Date(Date.now() - 26 * 3_600_000)

/* Every shape a `created_at` column actually arrives in. The last two are why
   the component normalises rather than handing the string to `Date`: a SQL
   timestamp separates date and time with a space and writes microseconds where
   `Date` reads milliseconds, and engines disagree on both — Safari has
   historically returned an invalid date for the lot.

   The unparseable row is the other half of the contract: it renders the value
   as it arrived rather than crashing the tree on `toISOString()`, so a bad API
   value stays visible instead of blanking the page.

   `DescriptionList` renders its rows as `dt`/`dd` pairs. */
const ROWS = [
  { term: "Date", detail: <RelativeTime date={UPDATED} /> },
  { term: "Epoch milliseconds", detail: <RelativeTime date={UPDATED.getTime()} /> },
  { term: "ISO 8601", detail: <RelativeTime date={UPDATED.toISOString()} /> },
  {
    term: "SQL, microseconds",
    detail: (
      <RelativeTime
        date={UPDATED.toISOString()
          .replace("T", " ")
          .replace(/\.\d+Z$/, ".123456+00")}
      />
    ),
  },
  { term: "Unparseable", detail: <RelativeTime date="last tuesday-ish" /> },
]

export default function RelativeTimeInputs() {
  return (
    <DescriptionList className="w-full max-w-md">
      {ROWS.map((row) => (
        <React.Fragment key={row.term}>
          <DescriptionTerm>{row.term}</DescriptionTerm>
          <DescriptionDetail>{row.detail}</DescriptionDetail>
        </React.Fragment>
      ))}
    </DescriptionList>
  )
}
