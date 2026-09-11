import { IconButton } from "@diametral/design-system/react"
import { PencilSimpleIcon } from "@phosphor-icons/react"

const SIZES = ["icon-xs", "icon-sm", "icon", "icon-lg"] as const

export default function IconButtonSizes() {
  return (
    <div className="flex items-center gap-3">
      {SIZES.map((size) => (
        <IconButton key={size} label={`Rename (${size})`} size={size}>
          <PencilSimpleIcon />
        </IconButton>
      ))}
    </div>
  )
}
