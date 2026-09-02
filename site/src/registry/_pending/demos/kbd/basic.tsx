import { Kbd, KbdGroup } from "@diametral/ui/components/kbd"

export default function KbdBasic() {
  return (
    <div className="flex flex-wrap items-center gap-4">
      <Kbd>⏎</Kbd>
      <Kbd>Esc</Kbd>
      <Kbd>⇧</Kbd>
      <KbdGroup>
        <Kbd>⌘</Kbd>
        <Kbd>K</Kbd>
      </KbdGroup>
    </div>
  )
}
