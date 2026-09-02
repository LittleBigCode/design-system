import { Button, Popover } from "@diametral/design-system/react"

export default function PopoverBasic() {
  return (
    <Popover
      trigger={<Button>Retention policy</Button>}
      placement="bottom"
      title="Retention"
      arrow
    >
      <p>
        Raw events are kept 30 days, then rolled up to daily aggregates and kept
        indefinitely. Deleting a project drops both.
      </p>
    </Popover>
  )
}
