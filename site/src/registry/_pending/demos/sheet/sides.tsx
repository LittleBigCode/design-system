import { Button } from "@diametral/ui/components/button"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@diametral/ui/components/sheet"

const SIDES = ["right", "left", "top", "bottom"] as const

export default function SheetSides() {
  return (
    <div className="flex flex-wrap items-center gap-3">
      {SIDES.map((side) => (
        <Sheet key={side}>
          <SheetTrigger render={<Button variant="outline" size="sm" />}>
            {side}
          </SheetTrigger>
          <SheetContent side={side}>
            <SheetHeader>
              <SheetTitle>Opens from {side}</SheetTitle>
              <SheetDescription>
                Left and right sheets take three-quarters width, capped at
                24rem; top and bottom size to their content.
              </SheetDescription>
            </SheetHeader>
          </SheetContent>
        </Sheet>
      ))}
    </div>
  )
}
