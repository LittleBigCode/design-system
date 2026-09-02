import { CheckIcon, CopyIcon } from "@phosphor-icons/react"

import { Button, cx } from "@diametral/design-system/react"

import { useCopy } from "@/docs/use-copy"

import "@/styles/code.css"

export function CodeBlock({
  html,
  code,
  className,
}: {
  html: string
  code: string
  className?: string
}) {
  const { copied, copy } = useCopy(code)

  return (
    <div className={cx("group/code relative", className)}>
      <div
        // Long lines scroll rather than wrap, so this is a scrollable region and
        // must be focusable for keyboard users to pan it.
        tabIndex={0}
        role="region"
        aria-label="Example source"
        className="overflow-x-auto bg-muted/40 p-4 font-mono text-[13px] leading-relaxed"
        // The markup comes from shiki running over our own repo files at build
        // time — there is no user-supplied input in this string.
        dangerouslySetInnerHTML={{ __html: html }}
      />
      <Button
        size="sm"
        aria-label={copied ? "Copied" : "Copy code"}
        onClick={copy}
        className="absolute end-2 top-2 opacity-0 transition-opacity group-hover/code:opacity-100 focus-visible:opacity-100"
      >
        {copied ? <CheckIcon /> : <CopyIcon />}
      </Button>
    </div>
  )
}
