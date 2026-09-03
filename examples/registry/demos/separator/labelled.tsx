import { Button } from "@diametral/design-system/react"
import { Separator } from "@diametral/design-system/react"

export default function SeparatorLabelled() {
  return (
    <div className="flex w-full max-w-xs flex-col gap-4">
      <Button>Continue with email</Button>
      <div className="relative flex justify-center">
        <Separator className="absolute top-1/2" />
        <span className="relative bg-background px-2 text-xs tracking-widest text-muted-foreground uppercase">
          or
        </span>
      </div>
      <Button>Continue with SSO</Button>
    </div>
  )
}
