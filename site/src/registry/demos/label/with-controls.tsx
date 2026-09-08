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

/* Every control on this page is "only the control" and needs a `Label`
   wired by `htmlFor` — including `Checkbox` and `Switch`. 0.11's `children`
   became a label beside the box; batch 7 (1.0.0-beta.7) made the root
   *itself* the box/track, not a `<label>` around one, so the association is
   now an explicit `Label htmlFor` the caller writes, same as
   `RadioGroupItem` (since 1.0.0) draws only the dot. */
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
        {/* Slider's focusable element is a native <input> nested inside its
            Thumb, not the root Label/htmlFor pairs with elsewhere on this
            page — so it's labelled via aria-labelledby instead. */}
        <Label id="label-seats-label">Seats</Label>
        <Slider
          aria-labelledby="label-seats-label"
          defaultValue={12}
          min={1}
          max={50}
        />
      </div>
      <div className="flex flex-col gap-2">
        <Label htmlFor="label-brief">Brief</Label>
        <Textarea id="label-brief" rows={2} />
      </div>

      <div className="flex items-center gap-2">
        <Checkbox id="label-charter" />
        <Label htmlFor="label-charter">I accept the charter</Label>
      </div>
      <div className="flex items-center gap-2">
        <Switch id="label-release-notes" />
        <Label htmlFor="label-release-notes">Send me release notes</Label>
      </div>

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
