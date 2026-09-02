import * as React from "react"
import { EyeIcon, EyeSlashIcon } from "@phosphor-icons/react"

import { Toggle } from "@diametral/ui/components/toggle"

export default function ToggleControlled() {
  const [revealed, setRevealed] = React.useState(false)

  return (
    <div className="flex items-center gap-4">
      <Toggle
        variant="outline"
        pressed={revealed}
        onPressedChange={setRevealed}
      >
        {revealed ? <EyeSlashIcon /> : <EyeIcon />}
        {revealed ? "Hide" : "Reveal"}
      </Toggle>
      <span className="font-mono text-sm tabular-nums">
        {revealed ? "48 200,00 €" : "•••••••••"}
      </span>
    </div>
  )
}
