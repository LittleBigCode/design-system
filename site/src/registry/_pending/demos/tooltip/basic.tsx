import { TrashIcon } from "@phosphor-icons/react"

import { Button } from "@diametral/ui/components/button"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@diametral/ui/components/tooltip"

export default function TooltipBasic() {
  return (
    <TooltipProvider>
      <div className="flex items-center gap-3">
        <Tooltip>
          <TooltipTrigger
            render={
              <Button variant="ghost" size="icon-sm" aria-label="Delete" />
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
