import { Button } from "@diametral/ui/components/button"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@diametral/ui/components/navigation-menu"
import { Wordmark } from "@diametral/ui/components/wordmark"

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
                      className="block px-3 py-2 text-sm"
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
      <Button size="sm" variant="outline" className="ms-auto">
        Sign in
      </Button>
    </header>
  )
}
