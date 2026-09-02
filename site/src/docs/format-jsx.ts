/**
 * Prints the playground's subject element the way Prettier would, so a copied
 * snippet drops into a file without reformatting.
 *
 * Only the element carrying `{...props}` is reprinted — every other line of the
 * template already came from a Prettier-formatted source file and is left byte
 * for byte as it was. The rules modelled here are Prettier's JSX ones: keep the
 * open tag on one line while it fits `printWidth`, otherwise put every
 * attribute on its own line and drop the bracket to the tag's indentation.
 */

const PRINT_WIDTH = 80
const INDENT = 2
const PROPS_MARKER = "{...props}"

/** Index of the `>` closing the tag that starts at `from`. */
function findTagEnd(source: string, from: number) {
  let depth = 0
  let quote: string | undefined

  for (let index = from; index < source.length; index += 1) {
    const char = source[index]
    if (quote) {
      if (char === quote) quote = undefined
      continue
    }
    if (char === '"' || char === "'") {
      quote = char
      continue
    }
    if (char === "{") depth += 1
    else if (char === "}") depth -= 1
    else if (char === ">" && depth === 0) return index
  }
  return source.length - 1
}

/** Splits an attribute region, keeping `a={{ x: 1 }}` and `a="b c"` intact. */
function splitAttributes(region: string) {
  const attributes: string[] = []
  let current = ""
  let depth = 0
  let quote: string | undefined

  for (const char of region) {
    if (quote) {
      current += char
      if (char === quote) quote = undefined
      continue
    }
    if (char === '"' || char === "'") {
      quote = char
      current += char
      continue
    }
    if (char === "{") depth += 1
    if (char === "}") depth -= 1
    if (/\s/.test(char) && depth === 0) {
      if (current.trim()) attributes.push(current.trim())
      current = ""
      continue
    }
    current += char
  }
  if (current.trim()) attributes.push(current.trim())
  return attributes
}

/**
 * JSX text children can't contain braces or angle brackets, so anything that
 * would break the syntax is emitted as a string expression — which is what you
 * would have written by hand.
 */
export function serializeChildren(text: string) {
  if (!/[<>{}]/.test(text)) return text
  return `{${JSON.stringify(text)}}`
}

/**
 * Every entry replaces its own `{key}` marker — `{children}` is just the
 * conventional name for the first one. A playground can declare more (e.g.
 * `{description}`, `{action}`) as long as its JSX contains the matching marker.
 */
export function formatJsx(
  template: string,
  attributes: string[],
  texts?: Record<string, string>,
  elements?: Record<string, string>
) {
  let source = template

  // Elements first: these insert real JSX, so they must not be escaped the way
  // text is.
  for (const [key, value] of Object.entries(elements ?? {})) {
    const marker = `{${key}}`
    if (source.includes(marker)) source = source.replace(marker, `<${value} />`)
  }

  for (const [key, value] of Object.entries(texts ?? {})) {
    const marker = `{${key}}`
    if (source.includes(marker)) {
      source = source.replace(marker, serializeChildren(value))
    }
  }

  const markerIndex = source.indexOf(PROPS_MARKER)
  if (markerIndex === -1) return source

  const openStart = source.lastIndexOf("<", markerIndex)
  const openEnd = findTagEnd(source, openStart)
  const openTag = source.slice(openStart, openEnd + 1)
  const selfClosing = source[openEnd - 1] === "/"

  const tagName = /^<([A-Za-z][\w.]*)/.exec(openTag)?.[1]
  if (!tagName) return source

  const region = openTag.slice(
    1 + tagName.length,
    selfClosing ? openTag.length - 2 : openTag.length - 1
  )
  // Attributes already in the template (aria-label, className) keep their place
  // ahead of the ones the controls produced.
  const all = [
    ...splitAttributes(region).filter((attr) => attr !== PROPS_MARKER),
    ...attributes,
  ]

  const lineStart = source.lastIndexOf("\n", openStart) + 1
  const indent = source.slice(lineStart, openStart)
  const lineEnd =
    source.indexOf("\n", openEnd) === -1
      ? source.length
      : source.indexOf("\n", openEnd)
  const tail = source.slice(openEnd + 1, lineEnd)

  const openInline = `<${tagName}${all.length ? ` ${all.join(" ")}` : ""}${
    selfClosing ? " />" : ">"
  }`
  const pad = indent + " ".repeat(INDENT)
  const closing = `</${tagName}>`
  const hasInlineChildren = !selfClosing && tail.endsWith(closing)

  // Stage 1 — everything on one line. Prettier only lets an element hug text
  // children when it has at most one attribute: `<Badge variant="x">Text</Badge>`
  // stays inline, but add a second attribute and the children break out even
  // though the line still fits. Self-closing tags have no children to hug and
  // are governed by width alone. (Verified against prettier 3.8.3.)
  const canHugChildren = !hasInlineChildren || all.length <= 1
  if (canHugChildren && (indent + openInline + tail).length <= PRINT_WIDTH) {
    return source.slice(0, openStart) + openInline + source.slice(openEnd + 1)
  }

  // Stage 2 — Prettier breaks the *children* first and leaves the attributes on
  // the tag line, as long as the open tag itself still fits.
  if (hasInlineChildren && (indent + openInline).length <= PRINT_WIDTH) {
    const inner = tail.slice(0, -closing.length).trim()
    const lines = [openInline]
    if (inner) lines.push(pad + inner)
    lines.push(indent + closing)
    return source.slice(0, openStart) + lines.join("\n") + source.slice(lineEnd)
  }

  // Stage 3 — the open tag overflows too, so every attribute gets its own line
  // and the bracket drops to the tag's indentation.
  const lines = [`<${tagName}`, ...all.map((attr) => pad + attr)]

  if (selfClosing) {
    lines.push(`${indent}/>`)
  } else {
    lines.push(`${indent}>`)
    if (hasInlineChildren) {
      const inner = tail.slice(0, -closing.length).trim()
      if (inner) lines.push(pad + inner)
      lines.push(indent + closing)
    } else if (tail.trim()) {
      lines.push(pad + tail.trim())
    }
  }

  return source.slice(0, openStart) + lines.join("\n") + source.slice(lineEnd)
}
