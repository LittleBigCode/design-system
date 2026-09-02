import * as React from "react"

import { Button, Field, Input, Modal } from "@diametral/design-system/react"

export default function DialogBasic() {
  const [open, setOpen] = React.useState(false)

  return (
    <>
      <Button onClick={() => setOpen(true)}>Rename project</Button>
      <Modal
        open={open}
        onClose={() => setOpen(false)}
        heading="Rename project"
        footer={
          <>
            <Button onClick={() => setOpen(false)}>Cancel</Button>
            <Button variant="primary" onClick={() => setOpen(false)}>
              Save
            </Button>
          </>
        }
      >
        <Field label="Project name" htmlFor="dialog-project-name">
          <Input id="dialog-project-name" defaultValue="Atlas" />
        </Field>
      </Modal>
    </>
  )
}
