import * as React from "react"

import { Button, Modal } from "@diametral/design-system/react"

export default function AlertDialogBasic() {
  const [open, setOpen] = React.useState(false)

  return (
    <>
      <Button variant="danger" onClick={() => setOpen(true)}>
        Delete workspace
      </Button>
      <Modal
        open={open}
        onClose={() => setOpen(false)}
        heading="Delete this workspace?"
        footer={
          <>
            <Button onClick={() => setOpen(false)}>Cancel</Button>
            <Button variant="danger" onClick={() => setOpen(false)}>
              Delete
            </Button>
          </>
        }
      >
        <p>
          Every project, dataset and audit record under it goes with it. This
          cannot be undone.
        </p>
      </Modal>
    </>
  )
}
