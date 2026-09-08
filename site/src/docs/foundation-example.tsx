import { CheckIcon, CopyIcon } from "@phosphor-icons/react"

import { Button, cx } from "@diametral/design-system/react"

import { useCopy } from "@/docs/use-copy"

/**
 * The foundations pages' recurring unit: a label, a live preview, and the
 * copyable snippet that produced it. Ported from `site/legacy/foundations/`'s
 * `.ds-example` widget — unhighlighted like `installation.tsx`'s `Snippet`,
 * same reason (hand-typed reference text, not a file shiki runs over).
 */
export function Example({
  label,
  code,
  children,
  center = true,
}: {
  label: string
  code: string
  children: React.ReactNode
  center?: boolean
}) {
  const { copied, copy } = useCopy(code)
  return (
    <div className="border border-border">
      <div className="flex items-center justify-between gap-2 border-b border-border bg-muted/40 px-3 py-1.5">
        <span className="font-mono text-xs text-muted-foreground">
          {label}
        </span>
        <Button
          size="icon-sm"
          variant="ghost"
          aria-label={copied ? "Copied" : "Copy"}
          onClick={copy}
        >
          {copied ? <CheckIcon /> : <CopyIcon />}
        </Button>
      </div>
      <div
        className={cx(
          "flex flex-wrap gap-4 p-6",
          center && "items-center justify-center"
        )}
      >
        {children}
      </div>
      <pre
        tabIndex={0}
        role="region"
        aria-label={label}
        className="overflow-x-auto border-t border-border bg-muted/40 p-4 font-mono text-[13px] leading-relaxed"
      >
        <code>{code}</code>
      </pre>
    </div>
  )
}

export function Section({
  title,
  children,
}: {
  title: string
  children: React.ReactNode
}) {
  return (
    <section className="flex flex-col gap-3">
      <h2 className="font-heading text-lg font-semibold tracking-wider uppercase">
        {title}
      </h2>
      {children}
    </section>
  )
}

export const P = "text-sm text-muted-foreground"
export const C = "font-mono text-xs text-foreground"
