import { ArrowRightIcon } from "@phosphor-icons/react"

import { Button } from "@diametral/ui/components/button"
import { DirectionProvider } from "@diametral/ui/components/direction"
import {
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemTitle,
} from "@diametral/ui/components/item"

// The provider tells Base UI which way its panels and arrow keys go; the `dir`
// attribute is what flips the CSS. Both are needed, so the same value drives each.
export default function DirectionPlayground({
  direction = "ltr",
  ...rest
}: {
  direction?: "ltr" | "rtl"
}) {
  const props = { direction, ...rest }

  return (
    <DirectionProvider {...props}>
      <div dir={direction} className="w-full max-w-sm">
        <Item variant="outline">
          <ItemContent>
            <ItemTitle>Charte graphique</ItemTitle>
            <ItemDescription>Mise à jour il y a deux jours</ItemDescription>
          </ItemContent>
          <ItemActions>
            <Button variant="outline" size="sm">
              Ouvrir <ArrowRightIcon />
            </Button>
          </ItemActions>
        </Item>
      </div>
    </DirectionProvider>
  )
}
