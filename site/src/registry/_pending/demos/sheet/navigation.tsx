import {
  BuildingsIcon,
  ChartLineIcon,
  GearIcon,
  HouseIcon,
  ListIcon,
  ReceiptIcon,
} from "@phosphor-icons/react"

import { Button } from "@diametral/ui/components/button"
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@diametral/ui/components/sheet"

const LINKS = [
  { href: "#overview", label: "Overview", icon: HouseIcon },
  { href: "#clients", label: "Clients", icon: BuildingsIcon },
  { href: "#invoices", label: "Invoices", icon: ReceiptIcon },
  { href: "#reports", label: "Reports", icon: ChartLineIcon },
  { href: "#settings", label: "Settings", icon: GearIcon },
]

export default function SheetNavigation() {
  return (
    <Sheet>
      <SheetTrigger
        render={<Button variant="outline" size="icon" aria-label="Open menu" />}
      >
        <ListIcon />
      </SheetTrigger>
      <SheetContent side="left">
        <SheetHeader>
          <SheetTitle>Régie Ouest</SheetTitle>
        </SheetHeader>
        <nav className="flex flex-col">
          {LINKS.map((link) => (
            <SheetClose
              key={link.href}
              nativeButton={false}
              render={<a href={link.href} />}
              className="flex items-center gap-3 px-8 py-3 text-sm text-foreground hover:bg-muted"
            >
              <link.icon className="size-4 text-muted-foreground" />
              {link.label}
            </SheetClose>
          ))}
        </nav>
      </SheetContent>
    </Sheet>
  )
}
