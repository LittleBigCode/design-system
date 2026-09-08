import * as React from "react"

import {
  Button,
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  Spinner,
} from "@diametral/design-system/react"

export default function DialogPrimitiveControlled() {
  const [open, setOpen] = React.useState(false)
  const [saving, setSaving] = React.useState(false)

  function save() {
    setSaving(true)
    window.setTimeout(() => {
      setSaving(false)
      setOpen(false)
    }, 1200)
  }

  return (
    <>
      <Button variant="outline" onClick={() => setOpen(true)}>
        Publish release
      </Button>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Publish release</DialogTitle>
            <DialogDescription>
              The dialog closes once the request resolves.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setOpen(false)}
              disabled={saving}
            >
              Cancel
            </Button>
            <Button onClick={save} disabled={saving}>
              {saving ? <Spinner /> : null}
              {saving ? "Publishing…" : "Publish"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}
