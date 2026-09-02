import { Badge } from "@diametral/ui/components/badge"
import {
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemGroup,
  ItemTitle,
} from "@diametral/ui/components/item"

const ROWS = [
  { name: "Charte graphique 2026", note: "12 pages", state: "Signed" },
  { name: "Audit technique", note: "4 pages", state: "In review" },
]

export default function BadgeInContext() {
  return (
    <ItemGroup className="max-w-md">
      {ROWS.map((row) => (
        <Item key={row.name} variant="outline">
          <ItemContent>
            <ItemTitle>{row.name}</ItemTitle>
            <ItemDescription>{row.note}</ItemDescription>
          </ItemContent>
          <ItemActions>
            <Badge variant={row.state === "Signed" ? "default" : "secondary"}>
              {row.state}
            </Badge>
          </ItemActions>
        </Item>
      ))}
    </ItemGroup>
  )
}
