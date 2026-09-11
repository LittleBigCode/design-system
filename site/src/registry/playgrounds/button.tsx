import type { ComponentProps } from "react"
import { Button } from "@diametral/design-system/react"

export default function ButtonPlayground({
  children,
  ...props
}: ComponentProps<typeof Button>) {
  return <Button {...props}>{children}</Button>
}
