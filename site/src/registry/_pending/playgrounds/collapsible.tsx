import type { ComponentProps } from "react"
import { CaretDownIcon } from "@phosphor-icons/react"

import { Button } from "@diametral/ui/components/button"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@diametral/ui/components/collapsible"

export default function CollapsiblePlayground(
  props: ComponentProps<typeof Collapsible>
) {
  return (
    <Collapsible className="w-full max-w-md" {...props}>
      <CollapsibleTrigger
        render={
          <Button variant="ghost" size="sm" className="group/collapsible">
            Request details
            <CaretDownIcon className="transition-transform group-aria-expanded/collapsible:rotate-180" />
          </Button>
        }
      />
      <CollapsibleContent className="mt-2 border border-border p-3 font-mono text-xs text-muted-foreground">
        <p>POST /v1/quotes</p>
        <p>duration: 128 ms</p>
      </CollapsibleContent>
    </Collapsible>
  )
}
