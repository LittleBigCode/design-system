import {
  Field,
  FieldDescription,
  FieldLabel,
} from "@diametral/ui/components/field"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@diametral/ui/components/select"

const TARGETS = {
  preview: "Preview",
  staging: "Staging",
  production: "Production",
}

export default function SelectWithField() {
  return (
    <div className="w-full max-w-sm">
      <Field>
        <FieldLabel>Deploy target</FieldLabel>
        <Select items={TARGETS} defaultValue="preview">
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Pick an environment" />
          </SelectTrigger>
          <SelectContent>
            {Object.entries(TARGETS).map(([value, label]) => (
              <SelectItem key={value} value={value}>
                {label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <FieldDescription>Production requires an approval.</FieldDescription>
      </Field>
    </div>
  )
}
