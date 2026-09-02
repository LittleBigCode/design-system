import type { ComponentProps } from "react"

import { PhoneInput } from "@diametral/ui/components/phone-input"

export default function PhoneInputPlayground(
  props: ComponentProps<typeof PhoneInput>
) {
  return <PhoneInput defaultValue="+33612345678" {...props} />
}
