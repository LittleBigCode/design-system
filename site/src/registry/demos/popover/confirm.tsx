import * as React from "react"

import {
  Button,
  Popover,
  PopoverContent,
  PopoverDescription,
  PopoverHeader,
  PopoverTitle,
  PopoverTrigger,
} from "@diametral/design-system/react"

export default function PopoverConfirm() {
  const [open, setOpen] = React.useState(false)
  const [status, setStatus] = React.useState(
    "2 unpublished revisions since 12 March."
  )

  return (
    <div className="flex w-full max-w-sm flex-col items-start gap-3">
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger render={<Button variant="outline" size="sm" />}>
          Discard draft
        </PopoverTrigger>
        <PopoverContent align="start">
          <PopoverHeader>
            <PopoverTitle>Discard this draft?</PopoverTitle>
            <PopoverDescription>
              Both revisions are removed. The published page is untouched.
            </PopoverDescription>
          </PopoverHeader>
          <div className="flex justify-end gap-2">
            <Button variant="ghost" size="sm" onClick={() => setOpen(false)}>
              Keep editing
            </Button>
            <Button
              variant="destructive"
              size="sm"
              onClick={() => {
                setStatus("Draft discarded.")
                setOpen(false)
              }}
            >
              Discard
            </Button>
          </div>
        </PopoverContent>
      </Popover>
      <p className="text-xs text-muted-foreground">{status}</p>
    </div>
  )
}
