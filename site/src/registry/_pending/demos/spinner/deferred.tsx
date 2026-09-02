import * as React from "react"

import { Button } from "@diametral/ui/components/button"
import { Spinner } from "@diametral/ui/components/spinner"

export default function SpinnerDeferred() {
  const [pending, setPending] = React.useState(false)
  const [visible, setVisible] = React.useState(false)

  React.useEffect(() => {
    if (!pending) return
    const reveal = window.setTimeout(() => setVisible(true), 400)
    const settle = window.setTimeout(() => {
      setPending(false)
      setVisible(false)
    }, 1600)
    return () => {
      window.clearTimeout(reveal)
      window.clearTimeout(settle)
    }
  }, [pending])

  return (
    <div className="flex w-full max-w-sm items-center gap-4">
      <Button onClick={() => setPending(true)} disabled={pending}>
        {visible && <Spinner aria-label="Publishing" />}
        Publish
      </Button>
      <span className="text-sm text-muted-foreground">
        {pending ? "Publishing…" : "Draft saved"}
      </span>
    </div>
  )
}
