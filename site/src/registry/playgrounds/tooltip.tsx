import {
  Button,
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@diametral/design-system/react"

import type { ComponentProps } from "react"

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
