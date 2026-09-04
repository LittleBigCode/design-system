import { Button, useToast } from "@diametral/design-system/react"

/**
 * `useToast` reads the context ToastProvider mounts in `main.tsx` — the portal
 * and viewport live once at the app root rather than in this page.
 */
export default function ToastBasic() {
  const toast = useToast()

  return (
    <div className="flex flex-wrap gap-2">
      <Button
        onClick={() =>
          toast.show({
            type: "success",
            title: "Deployed",
            message: "rollup-daily is live on eu-west-3.",
          })
        }
      >
        Success
      </Button>
      <Button
        onClick={() =>
          toast.show({
            type: "danger",
            title: "Export failed",
            message: "The destination bucket rejected the credentials.",
          })
        }
      >
        Danger
      </Button>
    </div>
  )
}
