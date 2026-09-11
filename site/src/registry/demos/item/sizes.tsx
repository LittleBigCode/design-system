import {
  Item,
  ItemContent,
  ItemFooter,
  ItemGroup,
  ItemHeader,
  ItemSeparator,
  ItemTitle,
} from "@diametral/design-system/react"
import { Badge } from "@diametral/design-system/react"

export default function ItemSizes() {
  return (
    <div className="flex w-full max-w-md flex-col gap-8">
      <ItemGroup>
        <Item variant="outline" size="sm">
          <ItemContent>
            <ItemTitle>Small</ItemTitle>
          </ItemContent>
        </Item>
        <Item variant="outline" size="xs">
          <ItemContent>
            <ItemTitle>Extra small</ItemTitle>
          </ItemContent>
        </Item>
      </ItemGroup>

      <Item variant="outline">
        <ItemHeader>
          <ItemTitle>Sprint 24</ItemTitle>
          <Badge>Active</Badge>
        </ItemHeader>
        <ItemSeparator />
        <ItemFooter>
          <span className="text-sm text-muted-foreground">14 issues</span>
          <span className="text-sm text-muted-foreground">Ends 8 Aug</span>
        </ItemFooter>
      </Item>
    </div>
  )
}
