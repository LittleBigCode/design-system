import type { ComponentProps } from "react"

import {
  Status,
  StatusIndicator,
  StatusLabel,
} from "@diametral/ui/components/status"

// `pulse` belongs to StatusIndicator, not Status, so it is routed there
// rather than spread onto the root.
export default function StatusPlayground({
  children,
  pulse,
  ...props
}: ComponentProps<typeof Status> & { pulse?: boolean }) {
  return (
    <Status {...props}>
      <StatusIndicator pulse={pulse} />
      <StatusLabel>{children}</StatusLabel>
    </Status>
  )
}
