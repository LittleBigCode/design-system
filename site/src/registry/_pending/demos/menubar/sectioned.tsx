import {
  Menubar,
  MenubarContent,
  MenubarGroup,
  MenubarItem,
  MenubarLabel,
  MenubarMenu,
  MenubarSeparator,
  MenubarShortcut,
  MenubarTrigger,
} from "@diametral/ui/components/menubar"

export default function MenubarSectioned() {
  return (
    <Menubar>
      <MenubarMenu>
        <MenubarTrigger>Insert</MenubarTrigger>
        <MenubarContent>
          <MenubarGroup>
            <MenubarLabel>Blocks</MenubarLabel>
            <MenubarItem>
              Heading <MenubarShortcut>⌘⌥1</MenubarShortcut>
            </MenubarItem>
            <MenubarItem>
              Code block <MenubarShortcut>⌘⌥C</MenubarShortcut>
            </MenubarItem>
            <MenubarItem>Table</MenubarItem>
          </MenubarGroup>
          <MenubarSeparator />
          <MenubarGroup>
            <MenubarLabel>Media</MenubarLabel>
            <MenubarItem>Image…</MenubarItem>
            <MenubarItem disabled>Embed — Pro plan</MenubarItem>
          </MenubarGroup>
        </MenubarContent>
      </MenubarMenu>

      <MenubarMenu>
        <MenubarTrigger>Format</MenubarTrigger>
        <MenubarContent>
          <MenubarItem>
            Bold <MenubarShortcut>⌘B</MenubarShortcut>
          </MenubarItem>
          <MenubarItem>
            Italic <MenubarShortcut>⌘I</MenubarShortcut>
          </MenubarItem>
          <MenubarSeparator />
          <MenubarItem>Clear formatting</MenubarItem>
        </MenubarContent>
      </MenubarMenu>
    </Menubar>
  )
}
