"use client"

import * as React from "react"

import { Icon } from "./icon.js"
import { cx } from "../lib/cx.js"

// Terminal palette for the dark panel: the four brights read at AA against
// --ds-black, and are the same hues the docs app's dark shiki theme lands on, so
// a `code` block and an `html` block sit side by side without clashing.
const TOKEN_COLOR = {
  comment: "ds-code-block-token-comment",
  string: "ds-code-block-token-string",
  keyword: "ds-code-block-token-keyword",
  number: "ds-code-block-token-number",
  type: "ds-code-block-token-type",
} as const

const KEYWORDS =
  "import|from|export|default|const|let|var|function|return|await|async|class|extends|implements|interface|type|enum|new|delete|typeof|instanceof|as|in|of|if|else|switch|case|break|continue|for|while|do|try|catch|finally|throw|yield|void|this|super|null|undefined|true|false|satisfies"

/**
 * One pass, one regex: comments, then strings, then bare words. Order is the
 * whole disambiguation strategy — `// const x` must be claimed by the comment
 * branch before `const` can be seen as a keyword.
 *
 * Capitalized identifiers stand in for "type or component". That is a
 * convention rather than a parse, which is the right trade for a display-only
 * block: a wrong colour costs nothing, and a real parser costs megabytes. The
 * one case worth excluding is a word right after `>`, because that is JSX child
 * text — otherwise `<Button>Save changes</Button>` paints its own label cyan.
 */
const TOKEN_PATTERN = new RegExp(
  [
    "(?<comment>\\/\\/[^\\n]*|\\/\\*[\\s\\S]*?\\*\\/)",
    "(?<string>`(?:\\\\.|[^`\\\\])*`|\"(?:\\\\.|[^\"\\\\])*\"|'(?:\\\\.|[^'\\\\])*')",
    `(?<keyword>\\b(?:${KEYWORDS})\\b)`,
    "(?<number>\\b\\d+(?:\\.\\d+)?\\b)",
    "(?<type>(?<!>)\\b[A-Z][A-Za-z0-9_]*\\b)",
  ].join("|"),
  "g"
)

function highlight(code: string) {
  const nodes: React.ReactNode[] = []
  let last = 0

  for (const match of code.matchAll(TOKEN_PATTERN)) {
    const [kind] = Object.entries(match.groups ?? {}).find(
      ([, value]) => value !== undefined
    )!
    if (match.index > last) nodes.push(code.slice(last, match.index))
    nodes.push(
      <span
        key={match.index}
        className={TOKEN_COLOR[kind as keyof typeof TOKEN_COLOR]}
      >
        {match[0]}
      </span>
    )
    last = match.index + match[0].length
  }

  if (last < code.length) nodes.push(code.slice(last))
  return nodes
}

// A dark, flat panel for a code sample. `CodeBlockBody` takes plain `code` and
// colours it with the tiny tokenizer above, or pre-highlighted `html` (what a
// Shiki-powered docs app renders) when you want a real grammar. `children` is
// passed through untouched.
function CodeBlock({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="code-block"
      className={cx("ds-code-block", className)}
      {...props}
    />
  )
}

function CodeBlockHead({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="code-block-head"
      className={cx("ds-code-block-head", className)}
      {...props}
    />
  )
}

function CodeBlockFilename({
  className,
  ...props
}: React.ComponentProps<"span">) {
  return (
    <span
      data-slot="code-block-filename"
      className={cx("ds-code-block-filename", className)}
      {...props}
    />
  )
}

function CodeBlockBody({
  className,
  code,
  html,
  children,
  ...props
}: Omit<React.ComponentProps<"pre">, "children"> & {
  /** Plain code text, tokenized and coloured on the way in. */
  code?: string
  /**
   * Pre-highlighted markup, e.g. from the docs app's own Shiki pass. Rendered
   * via `dangerouslySetInnerHTML` — pass output from a trusted highlighter
   * over your own source, never unsanitized user input.
   */
  html?: string
  children?: React.ReactNode
}) {
  return (
    <pre
      data-slot="code-block-body"
      className={cx("ds-code-block-body", className)}
      {...props}
    >
      {html ? (
        <code dangerouslySetInnerHTML={{ __html: html }} />
      ) : (
        <code>{code === undefined ? children : highlight(code)}</code>
      )}
    </pre>
  )
}

function CodeBlockCopyButton({
  className,
  value,
  ...props
}: Omit<React.ComponentProps<"button">, "children"> & {
  /** The raw text to copy — independent of what's visually rendered. */
  value: string
}) {
  const [copied, setCopied] = React.useState(false)

  React.useEffect(() => {
    if (!copied) return
    const timeout = setTimeout(() => setCopied(false), 2000)
    return () => clearTimeout(timeout)
  }, [copied])

  return (
    <button
      type="button"
      data-slot="code-block-copy-button"
      aria-label={copied ? "Copied" : "Copy code"}
      onClick={() => {
        void navigator.clipboard.writeText(value)
        setCopied(true)
      }}
      className={cx("ds-code-block-copy-button", className)}
      {...props}
    >
      <Icon name={copied ? "check" : "copy"} />
    </button>
  )
}

export {
  CodeBlock,
  CodeBlockHead,
  CodeBlockFilename,
  CodeBlockBody,
  CodeBlockCopyButton,
}
