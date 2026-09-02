import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@diametral/ui/components/hover-card"

const METRICS = [
  {
    label: "Activation",
    value: "68%",
    rule: "Workspaces that published a page within seven days of signup.",
    source: "warehouse.activation_daily · refreshed 04:00 UTC",
  },
  {
    label: "Net retention",
    value: "112%",
    rule: "Expansion minus contraction and churn, on the trailing twelve months.",
    source: "warehouse.arr_movements · refreshed 04:00 UTC",
  },
]

export default function HoverCardDefinition() {
  return (
    <div className="flex items-start gap-10">
      {METRICS.map((metric) => (
        <div key={metric.label} className="flex flex-col gap-1">
          <HoverCard>
            <HoverCardTrigger
              delay={150}
              render={
                <button
                  type="button"
                  className="text-xs font-semibold tracking-wider text-muted-foreground uppercase underline decoration-dotted underline-offset-4"
                />
              }
            >
              {metric.label}
            </HoverCardTrigger>
            <HoverCardContent align="start">
              <p className="text-xs font-semibold tracking-wider uppercase">
                How it is measured
              </p>
              <p className="mt-1.5 text-sm text-muted-foreground">
                {metric.rule}
              </p>
              <p className="mt-3 font-mono text-xs text-muted-foreground">
                {metric.source}
              </p>
            </HoverCardContent>
          </HoverCard>
          <p className="text-2xl font-semibold">{metric.value}</p>
        </div>
      ))}
    </div>
  )
}
