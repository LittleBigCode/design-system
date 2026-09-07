import {
  Button,
  Popover,
  PopoverContent,
  PopoverDescription,
  PopoverHeader,
  PopoverTitle,
  PopoverTrigger,
} from "@diametral/design-system/react"

export default function PopoverBasic() {
  return (
    <Popover>
      <PopoverTrigger render={<Button>Retention policy</Button>} />
      <PopoverContent side="bottom">
        <PopoverHeader>
          <PopoverTitle>Retention</PopoverTitle>
        </PopoverHeader>
        <PopoverDescription>
          Raw events are kept 30 days, then rolled up to daily aggregates and
          kept indefinitely. Deleting a project drops both.
        </PopoverDescription>
      </PopoverContent>
    </Popover>
  )
}
