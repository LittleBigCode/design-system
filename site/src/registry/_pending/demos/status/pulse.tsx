import {
  Status,
  StatusIndicator,
  StatusLabel,
} from "@diametral/ui/components/status"

export default function StatusPulse() {
  return (
    <div className="flex flex-col gap-3">
      <Status tone="info">
        <StatusIndicator pulse />
        <StatusLabel>Deploying</StatusLabel>
      </Status>
      <Status tone="success">
        <StatusIndicator />
        <StatusLabel>Live</StatusLabel>
      </Status>
    </div>
  )
}
