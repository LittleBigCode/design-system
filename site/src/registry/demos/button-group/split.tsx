import {
  Button,
  ButtonGroup,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  IconButton,
} from "@diametral/design-system/react"
import { CaretDownIcon } from "@phosphor-icons/react"

/* A main action joined to a caret that opens its variants — the shape
   `SplitButton` bakes in, built out of the parts so the menu is yours.

   `DropdownMenu`'s own parts since batch 13 (#46) — Dropdown/MenuItem retired.
   Its `Button size="icon"` trigger is an `IconButton`, whose `label` is the
   accessible name the caret needs. */
export default function ButtonGroupSplit() {
  return (
    <ButtonGroup>
      <Button variant="primary">Deploy to staging</Button>
      <DropdownMenu>
        <DropdownMenuTrigger
          render={
            <IconButton label="Other deploy targets" variant="primary">
              <CaretDownIcon />
            </IconButton>
          }
        />
        <DropdownMenuContent align="end">
          <DropdownMenuItem>Deploy to production</DropdownMenuItem>
          <DropdownMenuItem>Deploy a specific commit…</DropdownMenuItem>
          <DropdownMenuItem variant="destructive">
            Roll back last deploy
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </ButtonGroup>
  )
}
