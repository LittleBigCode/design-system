import { DescriptionList, RelativeTime } from "@diametral/design-system/react"

const UPDATED = new Date(Date.now() - 26 * 3_600_000)

/* Every shape a `created_at` column actually arrives in. The last two are why
   the component normalises rather than handing the string to `Date`: a SQL
   timestamp separates date and time with a space and writes microseconds where
   `Date` reads milliseconds, and engines disagree on both — Safari has
   historically returned an invalid date for the lot.

   The unparseable row is the other half of the contract: it renders the value
   as it arrived rather than crashing the tree on `toISOString()`, so a bad API
   value stays visible instead of blanking the page.

   `DescriptionList` here takes its rows as an `items` array — the incumbent's
   shape, in place of the source's term/detail children. */
export default function RelativeTimeInputs() {
  return (
    <DescriptionList
      className="w-full max-w-md"
      items={[
        { term: "Date", desc: <RelativeTime date={UPDATED} /> },
        {
          term: "Epoch milliseconds",
          desc: <RelativeTime date={UPDATED.getTime()} />,
        },
        {
          term: "ISO 8601",
          desc: <RelativeTime date={UPDATED.toISOString()} />,
        },
        {
          term: "SQL, microseconds",
          desc: (
            <RelativeTime
              date={UPDATED.toISOString()
                .replace("T", " ")
                .replace(/\.\d+Z$/, ".123456+00")}
            />
          ),
        },
        { term: "Unparseable", desc: <RelativeTime date="last tuesday-ish" /> },
      ]}
    />
  )
}
