import { useState } from "react"
import { WarningIcon } from "@phosphor-icons/react"

import {
  Alert,
  AlertDescription,
  AlertDismiss,
  AlertTitle,
  Button,
} from "@diametral/design-system/react"

export default function AlertDismissible() {
  const [open, setOpen] = useState(true)

  if (!open) {
    return (
      <Button size="sm" variant="outline" onClick={() => setOpen(true)}>
        Bring it back
      </Button>
    )
  }

  return (
    <Alert className="max-w-md">
      <WarningIcon />
      <AlertTitle>Billing details are out of date</AlertTitle>
      <AlertDescription>
        Your card expires at the end of the month.
      </AlertDescription>
      <AlertDismiss onClick={() => setOpen(false)} />
    </Alert>
  )
}
