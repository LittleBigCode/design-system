import { Button, toast } from "@diametral/design-system/react"

function publish(reference: string, fails: boolean) {
  return new Promise<string>((resolve, reject) => {
    setTimeout(() => {
      if (fails) {
        reject(new Error("The July ledger is closed."))
      } else {
        resolve(reference)
      }
    }, 1500)
  })
}

export default function ToastPromise() {
  function run(fails: boolean) {
    toast
      .promise(publish("INV-014", fails), {
        loading: { title: "Publishing INV-014" },
        success: (reference) => ({
          title: "Invoice published",
          description: `${reference} is now visible to the client.`,
        }),
        error: (error: Error) => ({
          title: "Could not publish",
          description: error.message,
        }),
      })
      .catch(() => {})
  }

  return (
    <div className="flex flex-wrap items-center gap-3">
      <Button variant="outline" onClick={() => run(false)}>
        Publish invoice
      </Button>
      <Button variant="outline" onClick={() => run(true)}>
        Publish and fail
      </Button>
    </div>
  )
}
