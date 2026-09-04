import { Alert } from "@diametral/design-system/react"

export default function AlertTypes() {
  return (
    <div className="flex w-full max-w-xl flex-col gap-3">
      <Alert type="info">
        The next deployment window opens Thursday at 14:00 UTC.
      </Alert>
      <Alert type="success">Migration applied to 1 284 rows.</Alert>
      <Alert type="warning">
        Two seats remain on this plan. Adding a third starts a new billing tier.
      </Alert>
      <Alert type="danger" dismissible>
        The export failed: the destination bucket rejected the credentials.
      </Alert>
    </div>
  )
}
