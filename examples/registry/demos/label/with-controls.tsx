import {
  Checkbox,
  Field,
  Label,
  RadioGroup,
  RadioGroupItem,
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
   for. `Checkbox` and `Switch` are each a `<label>` that wraps its own text,
   so a separate Label beside them would be a second label for one control:
   they take their words as children instead. What does need one is any
   control that is only the control — a select, a textarea, a range, or (since
   1.0.0) `RadioGroupItem`, which draws only the dot and pairs with a `Field`-
   wrapped `FieldLabel` the same way Select/Slider/Textarea do below. */
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

      {/* No Label on these two: each is already a label. */}
      <Checkbox>I accept the charter</Checkbox>
      <Switch>Send me release notes</Switch>

      <RadioGroup defaultValue="monthly" aria-label="Billing cadence">
        {[
          { value: "monthly", label: "Bill monthly" },
          { value: "yearly", label: "Bill yearly" },
        ].map((option) => (
          <Field key={option.value} orientation="horizontal">
            <RadioGroupItem id={`label-${option.value}`} value={option.value} />
            <Label htmlFor={`label-${option.value}`}>{option.label}</Label>
          </Field>
        ))}
      </RadioGroup>
    </div>
  )
}
