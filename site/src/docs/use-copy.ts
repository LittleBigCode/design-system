import * as React from "react"

/** Copy-to-clipboard with a self-clearing "copied" flag. */
export function useCopy(text: string) {
  const [copied, setCopied] = React.useState(false)

  React.useEffect(() => {
    if (!copied) return
    const timer = window.setTimeout(() => setCopied(false), 2000)
    return () => window.clearTimeout(timer)
  }, [copied])

  const copy = React.useCallback(async () => {
    await navigator.clipboard.writeText(text)
    setCopied(true)
  }, [text])

  return { copied, copy }
}
