import {
  Field,
  FieldDescription,
  FieldLabel,
} from "@diametral/ui/components/field"
import { Input } from "@diametral/ui/components/input"

export default function InputTypes() {
  return (
    <div className="flex w-full max-w-sm flex-col gap-6">
      <Field>
        <FieldLabel htmlFor="input-types-date">Release date</FieldLabel>
        <Input id="input-types-date" type="date" defaultValue="2026-09-01" />
      </Field>
      <Field>
        <FieldLabel htmlFor="input-types-seats">Seats</FieldLabel>
        <Input
          id="input-types-seats"
          type="number"
          min={1}
          max={50}
          defaultValue={12}
        />
        <FieldDescription>Billed monthly, per seat.</FieldDescription>
      </Field>
      <Field>
        <FieldLabel htmlFor="input-types-logo">Brand logo</FieldLabel>
        <Input
          id="input-types-logo"
          type="file"
          accept="image/svg+xml,image/png"
        />
      </Field>
    </div>
  )
}
