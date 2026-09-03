import {
  Button,
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@diametral/design-system/react"

import { TrashIcon } from "@phosphor-icons/react"

export default function TooltipBasic() {
  return (
    <TooltipProvider>
      <div className="flex items-center gap-3">
        <Tooltip>
          {/* The label and the tooltip say the same thing on purpose. The
              popup is visual-only — Base UI wires no aria-describedby — so the
              trigger's own name is all a screen reader gets, and a name that
              disagrees with the visible tooltip gives the two audiences two
              different answers. */}
          <TooltipTrigger
            render={
              <Button variant="ghost" size="icon-sm" aria-label="Move to archive" />
            }
          >
            <TrashIcon />
          </TooltipTrigger>
          <TooltipContent>Move to archive</TooltipContent>
        </Tooltip>

        <Tooltip>
          <TooltipTrigger render={<Button variant="outline" />}>
            Hover me
          </TooltipTrigger>
          <TooltipContent>Positioned above by default</TooltipContent>
        </Tooltip>
      </div>
    </TooltipProvider>
  )
}
