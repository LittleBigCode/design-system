import {
  Avatar,
  AvatarBadge,
  AvatarFallback,
} from "@diametral/ui/components/avatar"
import {
  Item,
  ItemContent,
  ItemDescription,
  ItemGroup,
  ItemMedia,
  ItemTitle,
} from "@diametral/ui/components/item"

const REVIEWERS = [
  {
    initials: "CR",
    name: "Camille Roux",
    detail: "Design lead · online",
    online: true,
  },
  {
    initials: "AM",
    name: "Augustin Morval",
    detail: "Engineering",
    online: false,
  },
  {
    initials: "DT",
    name: "Diane Tessier",
    detail: "Client · last seen Friday",
    online: false,
  },
]

export default function AvatarInRow() {
  return (
    <ItemGroup className="max-w-md">
      {REVIEWERS.map((reviewer) => (
        <Item key={reviewer.initials} variant="outline">
          <ItemMedia>
            <Avatar>
              <AvatarFallback>{reviewer.initials}</AvatarFallback>
              {reviewer.online ? <AvatarBadge /> : null}
            </Avatar>
          </ItemMedia>
          <ItemContent>
            <ItemTitle>{reviewer.name}</ItemTitle>
            <ItemDescription>{reviewer.detail}</ItemDescription>
          </ItemContent>
        </Item>
      ))}
    </ItemGroup>
  )
}
