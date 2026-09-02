import type { ComponentProps } from "react"

import { QrCode } from "@diametral/ui/components/qr-code"

export default function QrCodePlayground({
  value = "https://diametral.com",
  ...props
}: Omit<ComponentProps<typeof QrCode>, "value"> & { value?: string }) {
  return <QrCode value={value} size={160} {...props} />
}
