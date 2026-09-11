import {
  Button,
  DirectionProvider,
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemTitle,
} from "@diametral/design-system/react"
import { ArrowRightIcon } from "@phosphor-icons/react"

function Row() {
  return (
    <Item variant="outline">
      <ItemContent>
        <ItemTitle>Charte graphique</ItemTitle>
        <ItemDescription>Mise à jour il y a deux jours</ItemDescription>
      </ItemContent>
      <ItemActions>
        <Button size="sm">
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
