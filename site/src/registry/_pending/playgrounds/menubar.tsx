import type { ComponentProps } from "react"

import {
  Menubar,
  MenubarCheckboxItem,
  MenubarContent,
  MenubarGroup,
  MenubarItem,
  MenubarLabel,
  MenubarMenu,
  MenubarRadioGroup,
  MenubarRadioItem,
  MenubarSeparator,
  MenubarShortcut,
  MenubarSub,
  MenubarSubContent,
  MenubarSubTrigger,
  MenubarTrigger,
} from "@diametral/ui/components/menubar"

export default function MenubarPlayground(
  props: ComponentProps<typeof Menubar>
) {
  return (
    <Menubar {...props}>
      <MenubarMenu>
        <MenubarTrigger>File</MenubarTrigger>
        <MenubarContent>
          <MenubarGroup>
            <MenubarLabel>Project</MenubarLabel>
            <MenubarItem>
              New project <MenubarShortcut>⌘N</MenubarShortcut>
            </MenubarItem>
          </MenubarGroup>
          <MenubarSeparator />
          <MenubarSub>
            <MenubarSubTrigger>Export as</MenubarSubTrigger>
            <MenubarSubContent>
              <MenubarItem>DXF</MenubarItem>
              <MenubarItem>PDF</MenubarItem>
            </MenubarSubContent>
          </MenubarSub>
          <MenubarSeparator />
          <MenubarItem variant="destructive">Close project</MenubarItem>
        </MenubarContent>
      </MenubarMenu>
      <MenubarMenu>
        <MenubarTrigger>View</MenubarTrigger>
        <MenubarContent>
          <MenubarCheckboxItem defaultChecked>Show grid</MenubarCheckboxItem>
          <MenubarSeparator />
          <MenubarRadioGroup defaultValue="fit">
            <MenubarLabel>Zoom</MenubarLabel>
            <MenubarRadioItem value="fit">Fit to sheet</MenubarRadioItem>
            <MenubarRadioItem value="full">Actual size</MenubarRadioItem>
          </MenubarRadioGroup>
        </MenubarContent>
      </MenubarMenu>
    </Menubar>
  )
}
