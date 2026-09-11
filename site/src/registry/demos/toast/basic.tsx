import { Button, toast } from "@diametral/design-system/react"

/**
 * `toast` is a standalone manager — `add()` queues a toast onto the
 * `Toaster` mounted once in `main.tsx`, no hook or context read needed here.
 */
export default function ToastBasic() {
  return (
    <div className="flex flex-wrap gap-2">
      <Button
        onClick={() =>
          toast.add({
            type: "success",
            title: "Deployed",
            description: "rollup-daily is live on eu-west-3.",
          })
        }
      >
        Success
      </Button>
      <Button
        onClick={() =>
          toast.add({
            type: "error",
            title: "Export failed",
            description: "The destination bucket rejected the credentials.",
          })
        }
      >
        Danger
      </Button>
    </div>
  )
}
