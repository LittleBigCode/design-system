import { Button, toast } from "@diametral/design-system/react"

const TYPES = ["success", "info", "warning", "error", "loading"] as const

export default function ToastTypes() {
  return (
    <div className="flex flex-wrap items-center gap-3">
      {TYPES.map((type) => (
        <Button
          key={type}
          variant="outline"
          onClick={() =>
            toast.add({
              type,
              title: type.charAt(0).toUpperCase() + type.slice(1),
              description: `A ${type} notification.`,
            })
          }
        >
          {type}
        </Button>
      ))}
    </div>
  )
}
