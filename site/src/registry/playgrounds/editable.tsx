import { Editable } from "@diametral/design-system/react"
import type { ComponentProps } from "react"

export default function EditablePlayground(
  props: ComponentProps<typeof Editable>
) {
  return <Editable {...props} />
}
