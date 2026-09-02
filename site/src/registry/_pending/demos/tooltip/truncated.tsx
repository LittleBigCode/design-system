import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@diametral/ui/components/tooltip"

const VIEWS = [
  "Charte graphique 2026 — tone token audit",
  "Revenue by acquisition channel, Q3",
  "Churn cohorts, EU accounts only",
]

export default function TooltipTruncated() {
  return (
    <TooltipProvider delay={400}>
      <ul className="w-56 border border-border">
        {VIEWS.map((view) => (
          <li key={view} className="border-b border-border last:border-b-0">
            <Tooltip>
              <TooltipTrigger
                render={
                  <button
                    type="button"
                    className="block w-full truncate px-3 py-2 text-start text-sm hover:bg-accent hover:text-accent-foreground"
                  />
                }
              >
                {view}
              </TooltipTrigger>
              <TooltipContent side="inline-end">{view}</TooltipContent>
            </Tooltip>
          </li>
        ))}
      </ul>
    </TooltipProvider>
  )
}
