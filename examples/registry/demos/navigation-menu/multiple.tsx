import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@diametral/design-system/react"

const MENUS = [
  { label: "Product", items: ["Design system", "Playground", "Tokens"] },
  { label: "Company", items: ["About", "Careers", "Contact"] },
]

export default function NavigationMenuMultiple() {
  return (
    <NavigationMenu>
      <NavigationMenuList>
        {MENUS.map((menu) => (
          <NavigationMenuItem key={menu.label}>
            <NavigationMenuTrigger>{menu.label}</NavigationMenuTrigger>
            <NavigationMenuContent>
              <ul className="grid w-56 gap-0.5">
                {menu.items.map((item) => (
                  <li key={item}>
                    <NavigationMenuLink
                      href="#navigation-menu"
                      className="ds-navigation-menu-link--block hover:bg-muted"
                    >
                      {item}
                    </NavigationMenuLink>
                  </li>
                ))}
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>
        ))}
      </NavigationMenuList>
    </NavigationMenu>
  )
}
