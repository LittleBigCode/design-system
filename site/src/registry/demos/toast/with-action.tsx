import { Button, toast } from "@diametral/design-system/react"

export default function ToastWithAction() {
  return (
    <Button
      variant="outline"
      onClick={() =>
        toast.add({
          type: "success",
          title: "Invoice deleted",
          description: "INV-003 was moved to the archive.",
          actionProps: {
            children: "Undo",
            onClick: () => toast.add({ title: "Restored INV-003" }),
          },
        })
      }
    >
      Delete with undo
    </Button>
  )
}
