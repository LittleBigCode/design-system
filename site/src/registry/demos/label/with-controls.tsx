import {
  Checkbox,
  Label,
  RadioGroup,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  Slider,
  Switch,
  Textarea,
} from "@diametral/design-system/react"

/* Which controls need a `Label` at all — the distinction the component exists
   for. `Checkbox`, `Switch` and `Radio` in this package are each a `<label>`
   that wraps its own text, so a separate Label beside them would be a second
   label for one control: they take their words as children instead. What does
   need one is any control that is only the control — a select, a textarea, a
   range — where the name is a separate element pointed at it by `htmlFor`.

   The source's demo paired Label with a bare checkbox, switch and radio, which
   is right for its own five-part controls and wrong here. Batch 7 lands those,
   and label.css already carries the rule that drops the micro-caps voice when
   a Label sits next to one. */
export default function LabelWithControls() {
  return (
    <div className="flex w-full max-w-sm flex-col gap-6">
      <div className="flex flex-col gap-2">
        <Label htmlFor="label-cadence">Billing cadence</Label>
        <Select defaultValue="monthly">
          <SelectTrigger id="label-cadence">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="monthly">Bill monthly</SelectItem>
            <SelectItem value="yearly">Bill yearly</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="flex flex-col gap-2">
        <Label htmlFor="label-seats">Seats</Label>
        <Slider id="label-seats" defaultValue={12} min={1} max={50} />
      </div>
      <div className="flex flex-col gap-2">
        <Label htmlFor="label-brief">Brief</Label>
        <Textarea id="label-brief" rows={2} />
      </div>

      {/* No Label on these three: each is already a label. */}
      <Checkbox>I accept the charter</Checkbox>
      <Switch>Send me release notes</Switch>
      <RadioGroup
        defaultValue="monthly"
        options={[
          { value: "monthly", label: "Bill monthly" },
          { value: "yearly", label: "Bill yearly" },
        ]}
      />
    </div>
  )
}
