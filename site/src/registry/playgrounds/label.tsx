import { Input, Label } from "@diametral/design-system/react"
import type { ComponentProps } from "react"

export default function LabelPlayground({
  children,
  ...props
}: ComponentProps<typeof Label>) {
  return (
    <div className="flex w-full max-w-3xs flex-col gap-2">
      <Label htmlFor="pg-label-email" {...props}>
        {children}
      </Label>
      <Input id="pg-label-email" type="email" placeholder="you@diametral.com" />
    </div>
  )
}
