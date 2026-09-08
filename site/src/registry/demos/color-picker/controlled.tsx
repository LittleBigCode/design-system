import { useState } from "react"

import { ColorPicker } from "@diametral/design-system/react"

const PRESETS = ["#161616", "#2e7d4f", "#1488a6", "#7b5ea7"]

export default function ColorPickerControlled() {
  const [colour, setColour] = useState("#2e7d4f")

  return (
    <div className="flex w-full max-w-sm flex-col gap-3">
      <ColorPicker
        value={colour}
        onChange={setColour}
        swatches={PRESETS}
        aria-label="Chart colour"
      />
      <div
        className="flex h-16 items-end p-2 text-xs font-semibold tracking-wider uppercase"
        style={{ background: colour, color: "#ffffff" }}
      >
        {colour}
      </div>
    </div>
  )
}
