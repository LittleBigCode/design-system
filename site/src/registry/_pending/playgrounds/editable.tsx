import type { ComponentProps } from "react"

import { Editable } from "@diametral/ui/components/editable"

export default function EditablePlayground(
  props: ComponentProps<typeof Editable>
) {
  return <Editable {...props} />
}
