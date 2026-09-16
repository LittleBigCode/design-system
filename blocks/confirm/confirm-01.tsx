"use client"

import * as React from "react"

import {
  Button,
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  Modal,
} from "@diametral/design-system/react"

export default function Confirm01() {
  const [open, setOpen] = React.useState(false)

  return (
    <div className="mx-auto w-full max-w-2xl p-6">
      <Card>
        <CardHeader>
          <CardTitle>Danger zone</CardTitle>
          <CardDescription>
            Deleting a mission removes its rate, margin, and activity history.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Button variant="danger" onClick={() => setOpen(true)}>
            Delete mission
          </Button>
        </CardContent>
      </Card>

      <Modal
        open={open}
        onClose={() => setOpen(false)}
        heading="Delete mission"
        footer={
          <>
            <Button onClick={() => setOpen(false)}>Cancel</Button>
            <Button variant="danger" onClick={() => setOpen(false)}>
              Delete mission
            </Button>
          </>
        }
      >
        <p>
          Deleting <strong>Acme — Senior data engineer</strong> removes its
          rate, margin, and activity history. This cannot be undone.
        </p>
      </Modal>
    </div>
  )
}
