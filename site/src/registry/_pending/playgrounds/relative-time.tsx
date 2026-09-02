import type { ComponentProps } from "react"

import { RelativeTime } from "@diametral/ui/components/relative-time"

import { TWELVE_MINUTES_AGO } from "@/registry/playgrounds"

// The raw stamp goes straight to the component — parsing a row value is the
// component's job, so the panel hands it over untouched.
export default function RelativeTimePlayground({
  date = TWELVE_MINUTES_AGO,
  locale,
  ...rest
}: Omit<ComponentProps<typeof RelativeTime>, "date"> & { date?: string }) {
  const props = {
    ...rest,
    date,
    // The panel's first option is the em dash, meaning "follow the browser".
    ...(locale && locale !== "—" ? { locale } : {}),
  }

  return <RelativeTime {...props} />
}
