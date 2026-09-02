import {
  Status,
  StatusIndicator,
  StatusLabel,
} from "@diametral/ui/components/status"

const SERVICES = [
  { name: "API", tone: "success", state: "Operational", pulse: false },
  { name: "Webhooks", tone: "warning", state: "Degraded", pulse: false },
  { name: "Exports", tone: "info", state: "Deploying", pulse: true },
  { name: "Sandbox", tone: "neutral", state: "Paused", pulse: false },
] as const

export default function StatusInServiceList() {
  return (
    <div className="flex w-full max-w-sm flex-col">
      {SERVICES.map((service) => (
        <div
          key={service.name}
          className="flex items-center justify-between border-b border-border py-2.5 text-sm last:border-b-0"
        >
          <span>{service.name}</span>
          <Status tone={service.tone}>
            <StatusIndicator pulse={service.pulse} />
            <StatusLabel>{service.state}</StatusLabel>
          </Status>
        </div>
      ))}
    </div>
  )
}
