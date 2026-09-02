import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@diametral/ui/components/navigation-menu"

const LINKS = [
  { title: "Components", description: "94 primitives on Base UI." },
  { title: "Tokens", description: "Three tiers, one pipeline." },
  { title: "Icons", description: "The Phosphor set, weighted." },
  { title: "Changelog", description: "Shipped in the last release." },
]

export default function NavigationMenuFeatured() {
  return (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger>Product</NavigationMenuTrigger>
          <NavigationMenuContent>
            <div className="grid w-[30rem] grid-cols-2 gap-2">
              <NavigationMenuLink
                href="#navigation-menu"
                className="flex h-full flex-col items-start justify-end bg-muted/50 p-4"
              >
                <span className="font-heading text-base">Diametral 2.0</span>
                <span className="mt-1 text-sm text-muted-foreground">
                  The system rebuilt on Base UI, flat by default.
                </span>
              </NavigationMenuLink>
              <ul className="grid gap-0.5">
                {LINKS.map((link) => (
                  <li key={link.title}>
                    <NavigationMenuLink
                      href="#navigation-menu"
                      className="flex flex-col items-start"
                    >
                      <span className="text-sm">{link.title}</span>
                      <span className="text-xs text-muted-foreground">
                        {link.description}
                      </span>
                    </NavigationMenuLink>
                  </li>
                ))}
              </ul>
            </div>
          </NavigationMenuContent>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  )
}
