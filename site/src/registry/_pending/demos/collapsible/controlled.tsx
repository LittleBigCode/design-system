import * as React from "react"

import { Button } from "@diametral/ui/components/button"
import {
  Collapsible,
  CollapsibleContent,
} from "@diametral/ui/components/collapsible"
import {
  Item,
  ItemContent,
  ItemGroup,
  ItemTitle,
} from "@diametral/ui/components/item"

const HIDDEN = ["Régie Ouest", "Atelier Nord", "Studio Sud"]

export default function CollapsibleControlled() {
  const [open, setOpen] = React.useState(false)

  return (
    <div className="w-full max-w-md">
      <Collapsible open={open} onOpenChange={setOpen}>
        <CollapsibleContent>
          <ItemGroup>
            {HIDDEN.map((name) => (
              <Item key={name} variant="outline" size="sm">
                <ItemContent>
                  <ItemTitle>{name}</ItemTitle>
                </ItemContent>
              </Item>
            ))}
          </ItemGroup>
        </CollapsibleContent>
      </Collapsible>
      <Button
        variant="ghost"
        size="sm"
        className="mt-2"
        onClick={() => setOpen((value) => !value)}
      >
        {open ? "Show less" : `Show ${HIDDEN.length} more`}
      </Button>
    </div>
  )
}
