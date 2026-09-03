import {
  Button,
  Dropdown,
  MenuDivider,
  MenuHeader,
  MenuItem,
} from "@diametral/design-system/react"

export default function DropdownMenuBasic() {
  return (
    <Dropdown trigger={<Button>Account</Button>} align="end">
      <MenuHeader>amorval@diametral.com</MenuHeader>
      <MenuItem>Profile</MenuItem>
      <MenuItem>Preferences</MenuItem>
      <MenuDivider />
      <MenuItem as="a" href="#docs">
        Documentation
      </MenuItem>
      <MenuItem>Sign out</MenuItem>
    </Dropdown>
  )
}
