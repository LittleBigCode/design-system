import {
  Button,
  Field,
  FieldLabel,
  Input,
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  Textarea,
} from "@diametral/design-system/react"

export default function SheetWithForm() {
  return (
    <Sheet>
      <SheetTrigger render={<Button variant="outline" />}>
        Edit project
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Edit project</SheetTitle>
          <SheetDescription>
            Changes are saved when you close the panel.
          </SheetDescription>
        </SheetHeader>
        <div className="flex flex-col gap-6 px-8">
          <Field>
            <FieldLabel htmlFor="sheet-name">Name</FieldLabel>
            <Input id="sheet-name" defaultValue="Charte graphique 2026" />
          </Field>
          <Field>
            <FieldLabel htmlFor="sheet-brief">Brief</FieldLabel>
            <Textarea id="sheet-brief" rows={4} />
          </Field>
        </div>
        <SheetFooter>
          <SheetClose render={<Button />}>Save changes</SheetClose>
          <SheetClose render={<Button variant="ghost" />}>Cancel</SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  )
}
