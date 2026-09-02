import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  MenubarShortcut,
  MenubarTrigger,
} from "@diametral/ui/components/menubar"

export default function MenubarAppFrame() {
  return (
    <div className="w-full max-w-2xl border border-border bg-card">
      <Menubar className="border-0 border-b">
        <MenubarMenu>
          <MenubarTrigger>File</MenubarTrigger>
          <MenubarContent>
            <MenubarItem>
              Save <MenubarShortcut>⌘S</MenubarShortcut>
            </MenubarItem>
            <MenubarItem>Export as DXF…</MenubarItem>
            <MenubarSeparator />
            <MenubarItem variant="destructive">Discard changes</MenubarItem>
          </MenubarContent>
        </MenubarMenu>

        <MenubarMenu>
          <MenubarTrigger>View</MenubarTrigger>
          <MenubarContent>
            <MenubarItem>
              Zoom to fit <MenubarShortcut>⇧1</MenubarShortcut>
            </MenubarItem>
            <MenubarItem>Toggle grid</MenubarItem>
          </MenubarContent>
        </MenubarMenu>

        <MenubarMenu>
          <MenubarTrigger>Help</MenubarTrigger>
          <MenubarContent>
            <MenubarItem>Keyboard shortcuts</MenubarItem>
          </MenubarContent>
        </MenubarMenu>
      </Menubar>

      <div className="flex h-36 flex-col justify-center gap-1 px-4">
        <p className="text-sm font-medium">planches-atelier.dxf</p>
        <p className="text-sm text-muted-foreground">
          Sheet 2 of 6 — last saved four minutes ago.
        </p>
      </div>

      <p className="border-t px-4 py-2 text-xs text-muted-foreground">
        1:20 · 840 × 594 mm
      </p>
    </div>
  )
}
