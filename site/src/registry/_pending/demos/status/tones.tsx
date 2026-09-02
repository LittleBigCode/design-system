import {
  Status,
  StatusIndicator,
  StatusLabel,
} from "@diametral/ui/components/status"

const ROWS = [
  { tone: "success", label: "Operational" },
  { tone: "warning", label: "Degraded" },
  { tone: "danger", label: "Down" },
  { tone: "critical", label: "Outage" },
  { tone: "neutral", label: "Paused" },
  { tone: "info", label: "Scheduled" },
] as const

export default function StatusTones() {
  return (
    <div className="flex flex-col gap-3">
      {ROWS.map((row) => (
        <Status key={row.tone} tone={row.tone}>
          <StatusIndicator />
          <StatusLabel>{row.label}</StatusLabel>
        </Status>
      ))}
    </div>
  )
}
