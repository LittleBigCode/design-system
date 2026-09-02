import { Fragment } from "react"

import {
  DescriptionDetail,
  DescriptionList,
  DescriptionTerm,
} from "@diametral/ui/components/description-list"
import { RelativeTime } from "@diametral/ui/components/relative-time"

const UPDATED = new Date(Date.now() - 26 * 3_600_000)

const COLUMN_VALUES = [
  { source: "Date", value: UPDATED },
  { source: "Epoch milliseconds", value: UPDATED.getTime() },
  { source: "ISO 8601", value: UPDATED.toISOString() },
  {
    source: "SQL, microseconds",
    value: UPDATED.toISOString()
      .replace("T", " ")
      .replace(/\.\d+Z$/, ".123456+00"),
  },
  { source: "Unparseable", value: "last tuesday-ish" },
]

export default function RelativeTimeInputs() {
  return (
    <DescriptionList className="w-full max-w-md">
      {COLUMN_VALUES.map((row) => (
        <Fragment key={row.source}>
          <DescriptionTerm>{row.source}</DescriptionTerm>
          <DescriptionDetail>
            <RelativeTime date={row.value} />
          </DescriptionDetail>
        </Fragment>
      ))}
    </DescriptionList>
  )
}
