import * as React from "react"
import { CaretDownIcon } from "@phosphor-icons/react"

import {
  Button,
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@diametral/design-system/react"

export default function DropdownMenuSelection() {
  const [columns, setColumns] = React.useState(["name", "status"])
  const [density, setDensity] = React.useState("comfortable")

  return (
    <DropdownMenu>
      <DropdownMenuTrigger render={<Button variant="outline" size="sm" />}>
        View <CaretDownIcon />
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuGroup>
          <DropdownMenuLabel>Columns</DropdownMenuLabel>
          {["name", "status", "owner"].map((column) => (
            <DropdownMenuCheckboxItem
              key={column}
              checked={columns.includes(column)}
              onCheckedChange={(checked) =>
                setColumns((current) =>
                  checked
                    ? [...current, column]
                    : current.filter((item) => item !== column)
                )
              }
            >
              {column}
            </DropdownMenuCheckboxItem>
          ))}
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuRadioGroup value={density} onValueChange={setDensity}>
          <DropdownMenuLabel>Density</DropdownMenuLabel>
          <DropdownMenuRadioItem value="comfortable">
            Comfortable
          </DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="compact">Compact</DropdownMenuRadioItem>
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
