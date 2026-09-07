import { Separator } from "@diametral/design-system/react"

export default function SeparatorVertical() {
  return (
    <div className="flex h-8 items-center gap-4 text-sm">
      <span>Docs</span>
      <Separator orientation="vertical" />
      <span>Playground</span>
      <Separator orientation="vertical" />
      <span>Tokens</span>
    </div>
  )
}
