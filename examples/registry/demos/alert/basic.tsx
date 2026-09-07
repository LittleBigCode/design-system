import * as React from "react"
import {
  Alert,
  AlertDescription,
  AlertDismiss,
} from "@diametral/design-system/react"

export default function AlertTypes() {
  const [dismissed, setDismissed] = React.useState(false)

  return (
    <div className="flex w-full max-w-xl flex-col gap-3">
      <Alert tone="info">
        <AlertDescription>
          The next deployment window opens Thursday at 14:00 UTC.
        </AlertDescription>
      </Alert>
      <Alert tone="success">
        <AlertDescription>Migration applied to 1 284 rows.</AlertDescription>
      </Alert>
      <Alert tone="warning">
        <AlertDescription>
          Two seats remain on this plan. Adding a third starts a new billing
          tier.
        </AlertDescription>
      </Alert>
      {!dismissed && (
        <Alert tone="danger">
          <AlertDescription>
            The export failed: the destination bucket rejected the
            credentials.
          </AlertDescription>
          <AlertDismiss onClick={() => setDismissed(true)} />
        </Alert>
      )}
    </div>
  )
}
