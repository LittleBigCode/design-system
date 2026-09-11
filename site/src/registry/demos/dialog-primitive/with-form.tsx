import {
  Button,
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  Field,
  FieldGroup,
  FieldLabel,
  Input,
} from "@diametral/design-system/react"

export default function DialogPrimitiveWithForm() {
  return (
    <Dialog>
      <DialogTrigger render={<Button variant="outline" />}>
        Rename project
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Rename project</DialogTitle>
          <DialogDescription>
            The name is what collaborators see; the slug appears in URLs.
          </DialogDescription>
        </DialogHeader>
        <FieldGroup>
          <Field>
            <FieldLabel htmlFor="dialog-form-name">Name</FieldLabel>
            <Input id="dialog-form-name" defaultValue="Design System 2" />
          </Field>
          <Field>
            <FieldLabel htmlFor="dialog-form-slug">Slug</FieldLabel>
            <Input id="dialog-form-slug" defaultValue="design-system-2" />
          </Field>
        </FieldGroup>
        <DialogFooter>
          <DialogClose render={<Button variant="outline" />}>
            Cancel
          </DialogClose>
          <DialogClose render={<Button />}>Save</DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
