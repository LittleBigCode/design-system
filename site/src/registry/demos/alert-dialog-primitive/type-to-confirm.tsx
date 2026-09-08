import * as React from "react"

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
  Button,
  Field,
  FieldLabel,
  Input,
} from "@diametral/design-system/react"

const WORKSPACE = "regie-ouest"

export default function AlertDialogPrimitiveTypeToConfirm() {
  const [open, setOpen] = React.useState(false)
  const [typed, setTyped] = React.useState("")

  function close() {
    setTyped("")
    setOpen(false)
  }

  return (
    <AlertDialog
      open={open}
      onOpenChange={(next) => (next ? setOpen(true) : close())}
    >
      <AlertDialogTrigger render={<Button variant="outline" />}>
        Delete workspace
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Delete this workspace?</AlertDialogTitle>
          <AlertDialogDescription>
            Every project, invoice and member of {WORKSPACE} is removed. This
            cannot be undone.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <Field>
          <FieldLabel htmlFor="alert-dialog-confirm">
            Type {WORKSPACE} to confirm
          </FieldLabel>
          <Input
            id="alert-dialog-confirm"
            value={typed}
            onChange={(event) => setTyped(event.target.value)}
            autoComplete="off"
          />
        </Field>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            variant="destructive"
            disabled={typed !== WORKSPACE}
            onClick={close}
          >
            Delete
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
