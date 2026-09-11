import { SlidersHorizontalIcon } from "@phosphor-icons/react"

import {
  Button,
  Field,
  FieldLabel,
  Input,
  Popover,
  PopoverContent,
  PopoverHeader,
  PopoverTitle,
  PopoverTrigger,
  Switch,
} from "@diametral/design-system/react"

export default function PopoverWithForm() {
  return (
    <Popover>
      <PopoverTrigger render={<Button variant="outline" size="sm" />}>
        <SlidersHorizontalIcon /> Display
      </PopoverTrigger>
      <PopoverContent align="start" className="w-80">
        <PopoverHeader>
          <PopoverTitle>Display options</PopoverTitle>
        </PopoverHeader>
        <Field>
          <FieldLabel htmlFor="popover-rows">Rows per page</FieldLabel>
          <Input id="popover-rows" type="number" defaultValue={25} />
        </Field>
        <Field orientation="horizontal">
          <Switch id="popover-dense" defaultChecked />
          <FieldLabel htmlFor="popover-dense">Dense rows</FieldLabel>
        </Field>
      </PopoverContent>
    </Popover>
  )
}
