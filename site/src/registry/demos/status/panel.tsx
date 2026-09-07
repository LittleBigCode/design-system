import { Metric, StatusPanel } from "@diametral/design-system/react"

export default function StatusPanelDemo() {
  return (
    <StatusPanel
      className="w-full max-w-sm"
      status="warning"
      kicker="Audit 2026-03"
      heading="Conforme sous réserve"
      subtitle="Two findings need a fix before the next review."
    >
      <div className="ds-status__body">
        <Metric variant="hero" label="Score" value="72 / 100" />
        <Metric label="Findings" value="2" sign={-1} />
        <Metric label="Resolved since last audit" value="9" sign={1} />
      </div>
      <div className="ds-status__note">
        Re-audit scheduled for June. Findings older than one cycle escalate.
      </div>
    </StatusPanel>
  )
}
