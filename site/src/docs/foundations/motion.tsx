import * as React from "react"
import { ArrowCounterClockwiseIcon } from "@phosphor-icons/react"

import { Button } from "@diametral/design-system/react"

import { Example, P, Section } from "@/docs/foundation-example"

export function Motion() {
  const [replayKey, setReplayKey] = React.useState(0)

  return (
    <div className="flex max-w-3xl flex-col gap-12">
      <header>
        <p className="font-mono text-xs uppercase tracking-wider text-muted-foreground">
          Foundations
        </p>
        <h1 className="font-heading text-4xl font-light tracking-tight">
          Motion
        </h1>
        <p className={`mt-3 ${P}`}>
          Motion is restrained — short .2–.25s ease transitions on state
          changes, and a single subtle fade-in for entering content. Nothing
          bounces, nothing lingers.
        </p>
      </header>

      <Section title="Transitions">
        <Example
          label="--ds-transition · .2s ease"
          code="transition: background-color var(--ds-transition), color var(--ds-transition);"
        >
          <button className="ds-button">Hover me</button>
        </Example>
      </Section>

      <Section title="Fade-in">
        <div className="border border-border">
          <div className="flex items-center justify-between gap-2 border-b border-border bg-muted/40 px-3 py-1.5">
            <span className="font-mono text-xs text-muted-foreground">
              .ds-fade-in · ds-fadein keyframe
            </span>
            <Button
              size="icon-sm"
              variant="ghost"
              aria-label="Replay"
              onClick={() => setReplayKey((n) => n + 1)}
            >
              <ArrowCounterClockwiseIcon />
            </Button>
          </div>
          <div className="p-6">
            <div key={replayKey} className="ds-fade-in bg-muted p-4">
              Fades in (ds-fadein keyframe)
            </div>
          </div>
          <pre className="overflow-x-auto border-t border-border bg-muted/40 p-4 font-mono text-[13px] leading-relaxed">
            <code>{'<div class="ds-fade-in">Fades in</div>'}</code>
          </pre>
        </div>
        <p className={P}>
          All motion honours{" "}
          <code className="font-mono text-xs">prefers-reduced-motion</code>:
          when reduced, transitions and the fade-in collapse to a near-instant
          duration.
        </p>
      </Section>
    </div>
  )
}
