import { Button } from "@diametral/ui/components/button"
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@diametral/ui/components/drawer"

const DIRECTIONS = ["down", "up", "left", "right"] as const

export default function DrawerDirections() {
  return (
    <div className="flex flex-wrap items-center gap-3">
      {DIRECTIONS.map((direction) => (
        <Drawer key={direction} swipeDirection={direction} showSwipeHandle>
          <DrawerTrigger render={<Button variant="outline" size="sm" />}>
            {direction}
          </DrawerTrigger>
          <DrawerContent>
            <DrawerHeader>
              <DrawerTitle>Swipes {direction}</DrawerTitle>
              <DrawerDescription>
                Horizontal drawers take 75% width, capped at 24rem on wider
                screens; vertical ones stop 6rem short of the viewport height.
              </DrawerDescription>
            </DrawerHeader>
          </DrawerContent>
        </Drawer>
      ))}
    </div>
  )
}
