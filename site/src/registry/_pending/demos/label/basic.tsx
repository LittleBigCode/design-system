import { Input } from "@diametral/ui/components/input"
import { Label } from "@diametral/ui/components/label"

export default function LabelBasic() {
  return (
    <div className="flex w-full max-w-sm flex-col gap-2">
      <Label htmlFor="label-email">Email</Label>
      <Input id="label-email" type="email" placeholder="you@diametral.com" />
    </div>
  )
}
