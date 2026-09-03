import {
  Button,
  Collapsible,
  CollapsibleContent,
  Item,
  ItemContent,
  ItemGroup,
  ItemTitle,
} from "@diametral/design-system/react"
import * as React from "react"

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
        size="sm"
        className="mt-2"
        onClick={() => setOpen((value) => !value)}
      >
        {open ? "Show less" : `Show ${HIDDEN.length} more`}
      </Button>
    </div>
  )
}
