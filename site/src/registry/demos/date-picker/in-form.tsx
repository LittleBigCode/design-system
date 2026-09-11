import * as React from "react"
import {
  Button,
  Calendar,
  DatePicker,
  DatePickerContent,
  DatePickerTrigger,
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  Form,
  Input,
} from "@diametral/design-system/react"

function toInputValue(date: Date | undefined) {
  if (!date) return ""

  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, "0")
  const day = String(date.getDate()).padStart(2, "0")
  return `${year}-${month}-${day}`
}

export default function DatePickerInForm() {
  const [date, setDate] = React.useState<Date | undefined>(new Date(2026, 6, 6))
  const [open, setOpen] = React.useState(false)
  const [sent, setSent] = React.useState<string>()

  return (
    <Form
      className="max-w-sm"
      onSubmit={(event) => {
        event.preventDefault()
        const data = new FormData(event.currentTarget)
        setSent(`${data.get("reason")} — ${data.get("leave-date")}`)
      }}
    >
      <FieldGroup>
        <Field>
          <FieldLabel htmlFor="date-picker-form-reason">Reason</FieldLabel>
          <Input
            id="date-picker-form-reason"
            name="reason"
            defaultValue="Congés"
          />
        </Field>

        <Field>
          <FieldLabel>Day off</FieldLabel>
          <DatePicker open={open} onOpenChange={setOpen}>
            <DatePickerTrigger value={date} />
            <DatePickerContent>
              <Calendar
                mode="single"
                selected={date}
                defaultMonth={date}
                onSelect={(value) => {
                  setDate(value)
                  setOpen(false)
                }}
              />
            </DatePickerContent>
          </DatePicker>
          <input type="hidden" name="leave-date" value={toInputValue(date)} />
          <FieldDescription>
            Submitted as an ISO date alongside the other fields.
          </FieldDescription>
        </Field>
      </FieldGroup>

      <Button type="submit" className="self-start">
        Request
      </Button>

      {sent && (
        <output className="text-sm text-muted-foreground">{sent}</output>
      )}
    </Form>
  )
}
