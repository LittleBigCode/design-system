import {
  Item,
  ItemContent,
  ItemDescription,
  ItemGroup,
  ItemTitle,
} from "@diametral/ui/components/item"

export default function ItemVariants() {
  return (
    <ItemGroup className="max-w-md">
      <Item>
        <ItemContent>
          <ItemTitle>Default</ItemTitle>
          <ItemDescription>Transparent border, no fill.</ItemDescription>
        </ItemContent>
      </Item>
      <Item variant="outline">
        <ItemContent>
          <ItemTitle>Outline</ItemTitle>
          <ItemDescription>A visible border on all sides.</ItemDescription>
        </ItemContent>
      </Item>
      <Item variant="muted">
        <ItemContent>
          <ItemTitle>Muted</ItemTitle>
          <ItemDescription>
            A tinted surface instead of a border.
          </ItemDescription>
        </ItemContent>
      </Item>
    </ItemGroup>
  )
}
