import type { ComponentProps } from "react"

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@diametral/ui/components/navigation-menu"

// `navigationMenuTriggerStyle` is a cva with no variants object, so there is no
// axis to extract — `align` on the root is the real knob, and it is forwarded to
// the positioner the root mounts itself.
export default function NavigationMenuPlayground(
  props: ComponentProps<typeof NavigationMenu>
) {
  return (
    <NavigationMenu {...props}>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger>Components</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid w-56 gap-0.5">
              {["Actions", "Forms", "Overlays"].map((section) => (
                <li key={section}>
                  <NavigationMenuLink
                    href="#playground"
                    className="block px-3 py-2 text-sm hover:bg-muted"
                  >
                    {section}
                  </NavigationMenuLink>
                </li>
              ))}
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  )
}
