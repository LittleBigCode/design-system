import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@diametral/ui/components/field"
import { Input } from "@diametral/ui/components/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@diametral/ui/components/select"

const FRAMEWORKS = { vite: "Vite", next: "Next.js", astro: "Astro" }

export default function FieldGroupDemo() {
  return (
    <div className="w-full max-w-sm">
      <FieldGroup>
        <Field>
          <FieldLabel htmlFor="field-group-name">Project name</FieldLabel>
          <Input id="field-group-name" defaultValue="design-system2" />
        </Field>
        <Field>
          <FieldLabel>Framework</FieldLabel>
          <Select items={FRAMEWORKS} defaultValue="vite">
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Pick one" />
            </SelectTrigger>
            <SelectContent>
              {Object.entries(FRAMEWORKS).map(([value, label]) => (
                <SelectItem key={value} value={value}>
                  {label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <FieldDescription>Used to scaffold the preview app.</FieldDescription>
        </Field>
      </FieldGroup>
    </div>
  )
}
