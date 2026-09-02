import type { ComponentProps } from "react"

import { Button } from "@diametral/ui/components/button"
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@diametral/ui/components/drawer"

// The geometry props live on the root here, not the content: `swipeDirection` is
// what the content derives its axis, edge and closed transform from.
// `children` is narrowed to the string the panel supplies: Drawer's own children
// type also allows a render function, which cannot flow into DrawerTitle.
export default function DrawerPlayground({
  children,
  ...props
}: Omit<ComponentProps<typeof Drawer>, "children"> & { children?: string }) {
  return (
    <Drawer showSwipeHandle {...props}>
      <DrawerTrigger render={<Button variant="outline" />}>
        Open drawer
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>{children}</DrawerTitle>
          <DrawerDescription>
            Swipe the handle or press Escape to dismiss.
          </DrawerDescription>
        </DrawerHeader>
        <DrawerFooter>
          <DrawerClose render={<Button />}>Apply</DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  )
}
