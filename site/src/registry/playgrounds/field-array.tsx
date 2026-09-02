import {
  FieldArray,
  FieldArrayAdd,
  FieldArrayItem,
  FieldArrayItemContent,
  FieldArrayRemove,
  FormField,
  Input,
} from "@diametral/design-system/react"
import type { ComponentProps } from "react"

const SESSIONS = [
  { id: "spring", value: "Spring cohort" },
  { id: "autumn", value: "Autumn cohort" },
]

// Renders every Field Array part: the code strip doubles as the anatomy
// navigator, so a part missing here would not be selectable.
export default function FieldArrayPlayground({
  label = "Session",
  add = "Add a session",
  ...props
}: ComponentProps<typeof FieldArray> & {
  label?: string
  add?: string
}) {
  return (
    <FieldArray {...props} className="w-full max-w-sm">
      {SESSIONS.map((session, index) => (
        <FieldArrayItem key={session.id}>
          <FieldArrayItemContent>
            <FormField
              label={`${label} ${index + 1}`}
              htmlFor={`field-array-playground-${session.id}`}
            >
              <Input
                id={`field-array-playground-${session.id}`}
                name={`sessions[${index}].name`}
                defaultValue={session.value}
              />
            </FormField>
          </FieldArrayItemContent>
          <FieldArrayRemove label={`Remove entry ${index + 1}`} />
        </FieldArrayItem>
      ))}
      <FieldArrayAdd>{add}</FieldArrayAdd>
    </FieldArray>
  )
}
