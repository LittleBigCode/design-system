import { CaretRightIcon } from "@phosphor-icons/react"

import {
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemGroup,
  ItemTitle,
} from "@diametral/ui/components/item"

const SECTIONS = [
  { href: "#profile", title: "Profile", detail: "Name, handle and avatar" },
  {
    href: "#billing",
    title: "Billing",
    detail: "Plan, invoices and VAT number",
  },
  {
    href: "#members",
    title: "Members",
    detail: "8 people, 2 invitations pending",
  },
]

export default function ItemAsLink() {
  return (
    <nav aria-label="Settings" className="w-full max-w-md">
      <ItemGroup>
        {SECTIONS.map((section) => (
          <Item
            key={section.href}
            variant="outline"
            render={<a href={section.href} />}
          >
            <ItemContent>
              <ItemTitle>{section.title}</ItemTitle>
              <ItemDescription>{section.detail}</ItemDescription>
            </ItemContent>
            <ItemActions>
              <CaretRightIcon className="size-4 text-muted-foreground" />
            </ItemActions>
          </Item>
        ))}
      </ItemGroup>
    </nav>
  )
}
