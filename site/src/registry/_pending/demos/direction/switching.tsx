import * as React from "react"
import { MagnifyingGlassIcon } from "@phosphor-icons/react"

import { Checkbox } from "@diametral/ui/components/checkbox"
import { DirectionProvider } from "@diametral/ui/components/direction"
import { Field, FieldLabel } from "@diametral/ui/components/field"
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@diametral/ui/components/input-group"
import {
  ToggleGroup,
  ToggleGroupItem,
} from "@diametral/ui/components/toggle-group"

export default function DirectionSwitching() {
  const [direction, setDirection] = React.useState<"ltr" | "rtl">("rtl")

  return (
    <div className="flex w-full max-w-sm flex-col gap-5">
      <ToggleGroup
        variant="outline"
        spacing={0}
        value={[direction]}
        onValueChange={(value) => {
          if (value[0]) setDirection(value[0] as "ltr" | "rtl")
        }}
      >
        <ToggleGroupItem value="ltr">ltr</ToggleGroupItem>
        <ToggleGroupItem value="rtl">rtl</ToggleGroupItem>
      </ToggleGroup>

      <DirectionProvider direction={direction}>
        <div dir={direction} className="flex flex-col gap-4">
          <InputGroup>
            <InputGroupAddon>
              <MagnifyingGlassIcon />
            </InputGroupAddon>
            <InputGroupInput placeholder="بحث…" />
          </InputGroup>
          <Field orientation="horizontal">
            <Checkbox id="direction-consent" defaultChecked />
            <FieldLabel htmlFor="direction-consent">
              أوافق على الشروط
            </FieldLabel>
          </Field>
        </div>
      </DirectionProvider>
    </div>
  )
}
