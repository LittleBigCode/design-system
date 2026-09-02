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

function Row() {
  return (
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
  )
}

export default function DirectionRtl() {
  return (
    <div className="grid w-full gap-6 sm:grid-cols-2">
      <div dir="ltr">
        <p className="mb-2 text-xs font-semibold tracking-widest text-muted-foreground uppercase">
          ltr
        </p>
        <DirectionProvider direction="ltr">
          <Row />
        </DirectionProvider>
      </div>
      <div dir="rtl">
        <p className="mb-2 text-xs font-semibold tracking-widest text-muted-foreground uppercase">
          rtl
        </p>
        <DirectionProvider direction="rtl">
          <Row />
        </DirectionProvider>
      </div>
    </div>
  )
}
