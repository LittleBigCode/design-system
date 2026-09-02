import { CaretDownIcon } from "@phosphor-icons/react"

import { Button } from "@diametral/ui/components/button"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@diametral/ui/components/collapsible"

export default function CollapsibleBasic() {
  return (
    <Collapsible className="w-full max-w-md">
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
        <p>x-request-id: 4f2c-91ab</p>
        <p>duration: 128 ms</p>
      </CollapsibleContent>
    </Collapsible>
  )
}
