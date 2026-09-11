import * as React from "react"
import {
  Alert,
  AlertAction,
  AlertDescription,
  AlertDismiss,
  AlertTitle,
  Button,
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
        <AlertTitle>Two seats remain</AlertTitle>
        <AlertDescription>
          Adding a third starts a new billing tier.
        </AlertDescription>
      </Alert>
      {!dismissed && (
        <Alert tone="danger">
          <AlertTitle>Export failed</AlertTitle>
          <AlertDescription>
            The destination bucket rejected the credentials.
          </AlertDescription>
          <AlertAction>
            <Button size="sm" variant="outline">
              Retry
            </Button>
          </AlertAction>
          <AlertDismiss onClick={() => setDismissed(true)} />
        </Alert>
      )}
    </div>
  )
}
