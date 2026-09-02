import type { ComponentProps } from "react"

import { Textarea } from "@diametral/ui/components/textarea"

export default function TextareaPlayground(
  props: ComponentProps<typeof Textarea>
) {
  return (
    <div className="w-full max-w-sm">
      <Textarea aria-label="Textarea preview" {...props} />
    </div>
  )
}
