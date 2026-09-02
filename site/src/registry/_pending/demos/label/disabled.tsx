import { Checkbox } from "@diametral/ui/components/checkbox"
import { Input } from "@diametral/ui/components/input"
import { Label } from "@diametral/ui/components/label"

export default function LabelDisabled() {
  return (
    <div className="flex w-full max-w-sm flex-col gap-6">
      <div className="flex items-center gap-2.5">
        <Checkbox id="label-disabled-invite" disabled />
        <Label htmlFor="label-disabled-invite">
          Let members invite by link
        </Label>
      </div>
      <div className="group flex flex-col gap-2" data-disabled="true">
        <Label htmlFor="label-disabled-domain">Verified domain</Label>
        <Input
          id="label-disabled-domain"
          defaultValue="diametral.com"
          disabled
        />
      </div>
    </div>
  )
}
