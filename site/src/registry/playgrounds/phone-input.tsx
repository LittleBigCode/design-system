import { PhoneInput } from "@diametral/design-system/react"
import type { ComponentProps } from "react"

export default function PhoneInputPlayground(
  props: ComponentProps<typeof PhoneInput>
) {
  return <PhoneInput defaultValue="+33612345678" {...props} />
}
