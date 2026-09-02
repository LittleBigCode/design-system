import type { ComponentProps } from "react"

import { Button } from "@diametral/ui/components/button"
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@diametral/ui/components/sheet"

export default function SheetPlayground({
  children,
  ...props
}: ComponentProps<typeof SheetContent>) {
  return (
    <Sheet>
      <SheetTrigger render={<Button variant="outline" />}>
        Open sheet
      </SheetTrigger>
      <SheetContent {...props}>
        <SheetHeader>
          <SheetTitle>{children}</SheetTitle>
          <SheetDescription>
            Left and right sheets cap at 24rem; top and bottom size to their
            content.
          </SheetDescription>
        </SheetHeader>
        <SheetFooter>
          <SheetClose render={<Button />}>Save changes</SheetClose>
          <SheetClose render={<Button variant="ghost" />}>Cancel</SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  )
}
