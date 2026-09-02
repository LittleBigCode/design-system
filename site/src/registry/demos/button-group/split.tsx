import {
  Button,
  ButtonGroup,
  Dropdown,
  IconButton,
  MenuItem,
} from "@diametral/design-system/react"
import { CaretDownIcon } from "@phosphor-icons/react"

/* A main action joined to a caret that opens its variants — the shape
   `SplitButton` bakes in, built out of the parts so the menu is yours.

   The source's held `dropdown-menu` is re-composed onto this package's
   `Dropdown`/`MenuItem`, the same re-wiring batches 1 and 2 made, and its
   `Button size="icon"` trigger is an `IconButton`, whose `label` is the
   accessible name the caret needs. */
export default function ButtonGroupSplit() {
  return (
    <ButtonGroup>
      <Button variant="primary">Deploy to staging</Button>
      <Dropdown
        align="end"
        trigger={
          <IconButton label="Other deploy targets" variant="primary">
            <CaretDownIcon />
          </IconButton>
        }
      >
        <MenuItem>Deploy to production</MenuItem>
        <MenuItem>Deploy a specific commit…</MenuItem>
        <MenuItem danger>Roll back last deploy</MenuItem>
      </Dropdown>
    </ButtonGroup>
  )
}
