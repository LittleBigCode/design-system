import { Button } from "@diametral/ui/components/button"
import { Separator } from "@diametral/ui/components/separator"

export default function SeparatorLabelled() {
  return (
    <div className="flex w-full max-w-xs flex-col gap-4">
      <Button variant="outline">Continue with email</Button>
      <div className="relative flex justify-center">
        <Separator className="absolute top-1/2" />
        <span className="relative bg-background px-2 text-xs tracking-widest text-muted-foreground uppercase">
          or
        </span>
      </div>
      <Button variant="outline">Continue with SSO</Button>
    </div>
  )
}
