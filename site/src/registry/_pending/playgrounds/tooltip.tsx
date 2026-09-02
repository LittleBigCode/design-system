import type { ComponentProps } from "react"

import { Button } from "@diametral/ui/components/button"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@diametral/ui/components/tooltip"

// The panel drives the content's positioning, so hover the trigger to see it.
// The provider is what shares one delay across every tooltip in a view; it wraps
// the app in real use, and one tooltip here stands in for that.
export default function TooltipPlayground({
  children,
  ...props
}: ComponentProps<typeof TooltipContent>) {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger render={<Button variant="outline" />}>
          Hover me
        </TooltipTrigger>
        <TooltipContent {...props}>{children}</TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}
