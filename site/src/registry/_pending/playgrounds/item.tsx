import type { ComponentProps } from "react"
import { FileTextIcon } from "@phosphor-icons/react"

import { Button } from "@diametral/ui/components/button"
import {
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemFooter,
  ItemGroup,
  ItemHeader,
  ItemMedia,
  ItemSeparator,
  ItemTitle,
} from "@diametral/ui/components/item"

// The item wraps, which is what lets a header and a footer take their own rows
// beside the media / content / actions row.
export default function ItemPlayground({
  children,
  ...props
}: ComponentProps<typeof Item>) {
  return (
    <ItemGroup className="w-full max-w-md">
      <Item {...props}>
        <ItemHeader>
          <span className="text-xs font-semibold tracking-wider uppercase">
            Attachment
          </span>
          <span className="text-xs text-muted-foreground">PDF</span>
        </ItemHeader>
        <ItemSeparator />
        <ItemMedia>
          <FileTextIcon className="size-4" />
        </ItemMedia>
        <ItemContent>
          <ItemTitle>{children}</ItemTitle>
          <ItemDescription>2.4 MB · uploaded today</ItemDescription>
        </ItemContent>
        <ItemActions>
          <Button variant="ghost" size="sm">
            Open
          </Button>
        </ItemActions>
        <ItemFooter>
          <span className="text-xs text-muted-foreground">
            Shared with three people
          </span>
        </ItemFooter>
      </Item>
    </ItemGroup>
  )
}
