import { Button } from "@diametral/design-system/react"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@diametral/design-system/react"
import { Wordmark } from "@diametral/design-system/react"

const RESOURCES = ["Documentation", "Figma library", "Release notes"]

export default function NavigationMenuInHeader() {
  return (
    <header className="flex w-full items-center gap-6 border-b border-border pb-3">
      <Wordmark />
      <NavigationMenu align="center">
        <NavigationMenuList>
          <NavigationMenuItem>
            <NavigationMenuLink
              href="#navigation-menu"
              className={navigationMenuTriggerStyle()}
            >
              Components
            </NavigationMenuLink>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <NavigationMenuTrigger>Resources</NavigationMenuTrigger>
            <NavigationMenuContent>
              <ul className="grid w-52 gap-0.5">
                {RESOURCES.map((resource) => (
                  <li key={resource}>
                    <NavigationMenuLink
                      href="#navigation-menu"
                      className="ds-navigation-menu-link--block"
                    >
                      {resource}
                    </NavigationMenuLink>
                  </li>
                ))}
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
      <Button size="sm" className="ms-auto">
        Sign in
      </Button>
    </header>
  )
}
