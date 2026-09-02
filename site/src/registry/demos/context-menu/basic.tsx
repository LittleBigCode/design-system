import {
  Button,
  Dropdown,
  MenuDivider,
  MenuHeader,
  MenuItem,
} from "@diametral/design-system/react"

/**
 * Right-click is not a trigger the incumbent Dropdown exposes, so the same menu
 * body hangs off an explicit "Actions" button instead. The rows are what a
 * context menu would have carried.
 */
export default function ContextMenuBasic() {
  return (
    <Dropdown trigger={<Button>Actions</Button>} align="start">
      <MenuHeader>report-q3.csv</MenuHeader>
      <MenuItem>Open</MenuItem>
      <MenuItem>Rename</MenuItem>
      <MenuItem>Duplicate</MenuItem>
      <MenuDivider />
      <MenuItem disabled>Move to archive</MenuItem>
      <MenuItem>Delete</MenuItem>
    </Dropdown>
  )
}
