import { Button } from "@diametral/ui/components/button"
import { Kbd, KbdGroup } from "@diametral/ui/components/kbd"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@diametral/ui/components/tooltip"

const SIDES = ["top", "inline-end", "bottom", "inline-start"] as const

export default function TooltipSides() {
  return (
    <TooltipProvider delay={200}>
      <div className="flex flex-col items-start gap-6">
        <div className="flex flex-wrap items-center gap-3">
          {SIDES.map((side) => (
            <Tooltip key={side}>
              <TooltipTrigger render={<Button variant="outline" size="sm" />}>
                {side}
              </TooltipTrigger>
              <TooltipContent side={side}>Anchored {side}</TooltipContent>
            </Tooltip>
          ))}
        </div>

        <Tooltip>
          <TooltipTrigger render={<Button variant="outline" />}>
            Save
          </TooltipTrigger>
          <TooltipContent>
            Save changes
            <KbdGroup>
              <Kbd>⌘</Kbd>
              <Kbd>S</Kbd>
            </KbdGroup>
          </TooltipContent>
        </Tooltip>
      </div>
    </TooltipProvider>
  )
}
