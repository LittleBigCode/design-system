import { Button } from "@diametral/ui/components/button"
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@diametral/ui/components/drawer"
import {
  Item,
  ItemContent,
  ItemGroup,
  ItemTitle,
} from "@diametral/ui/components/item"

export default function DrawerSnapPoints() {
  return (
    <Drawer snapPoints={["30%", "60%", 1]} showSwipeHandle>
      <DrawerTrigger render={<Button variant="outline" />}>
        Open with snap points
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>Nearby sites</DrawerTitle>
          <DrawerDescription>
            Drag the handle between 30%, 60% and full height.
          </DrawerDescription>
        </DrawerHeader>
        <div className="overflow-y-auto px-8 pb-8">
          <ItemGroup>
            {["Régie Ouest", "Atelier Nord", "Studio Sud", "Dépôt Est"].map(
              (site) => (
                <Item key={site} variant="outline" size="sm">
                  <ItemContent>
                    <ItemTitle>{site}</ItemTitle>
                  </ItemContent>
                </Item>
              )
            )}
          </ItemGroup>
        </div>
      </DrawerContent>
    </Drawer>
  )
}
