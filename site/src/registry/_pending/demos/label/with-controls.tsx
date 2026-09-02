import { Checkbox } from "@diametral/ui/components/checkbox"
import { Label } from "@diametral/ui/components/label"
import {
  RadioGroup,
  RadioGroupItem,
} from "@diametral/ui/components/radio-group"
import { Switch } from "@diametral/ui/components/switch"

export default function LabelWithControls() {
  return (
    <div className="flex w-full max-w-sm flex-col gap-4">
      <div className="flex items-center gap-2.5">
        <Checkbox id="label-terms" />
        <Label htmlFor="label-terms">I accept the charter</Label>
      </div>
      <div className="flex items-center gap-2.5">
        <Switch id="label-emails" />
        <Label htmlFor="label-emails">Send me release notes</Label>
      </div>
      <RadioGroup defaultValue="monthly" className="gap-2.5">
        <div className="flex items-center gap-2.5">
          <RadioGroupItem id="label-monthly" value="monthly" />
          <Label htmlFor="label-monthly">Bill monthly</Label>
        </div>
        <div className="flex items-center gap-2.5">
          <RadioGroupItem id="label-yearly" value="yearly" />
          <Label htmlFor="label-yearly">Bill yearly</Label>
        </div>
      </RadioGroup>
    </div>
  )
}
