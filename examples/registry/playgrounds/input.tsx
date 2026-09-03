import type { ComponentProps } from "react"
import { Input } from "@diametral/design-system/react"

export default function InputPlayground(props: ComponentProps<typeof Input>) {
  return (
    <div className="w-full max-w-sm">
      <Input aria-label="Input preview" {...props} />
    </div>
  )
}
