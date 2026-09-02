import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@diametral/ui/components/navigation-menu"

const SECTIONS = [
  { title: "Actions", description: "Buttons, toggles and toolbars." },
  { title: "Forms", description: "Inputs, selects and validation." },
  { title: "Overlays", description: "Dialogs, sheets and menus." },
]

export default function NavigationMenuBasic() {
  return (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger>Components</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid w-72 gap-1">
              {SECTIONS.map((section) => (
                <li key={section.title}>
                  <NavigationMenuLink
                    href="#navigation-menu"
                    className="block p-3 hover:bg-muted"
                  >
                    <span className="text-xs font-semibold tracking-wider uppercase">
                      {section.title}
                    </span>
                    <p className="mt-1 text-sm text-muted-foreground">
                      {section.description}
                    </p>
                  </NavigationMenuLink>
                </li>
              ))}
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>

        <NavigationMenuItem>
          <NavigationMenuLink
            href="#navigation-menu"
            className={navigationMenuTriggerStyle()}
          >
            Tokens
          </NavigationMenuLink>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  )
}
