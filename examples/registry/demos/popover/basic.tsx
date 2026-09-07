import {
  Button,
  Popover,
  PopoverContent,
  PopoverTitle,
  PopoverTrigger,
} from "@diametral/design-system/react"

export default function PopoverBasic() {
  return (
    <Popover>
      <PopoverTrigger render={<Button>Retention policy</Button>} />
      <PopoverContent side="bottom">
        <PopoverTitle>Retention</PopoverTitle>
        <p>
          Raw events are kept 30 days, then rolled up to daily aggregates and kept
          indefinitely. Deleting a project drops both.
        </p>
      </PopoverContent>
    </Popover>
  )
}
