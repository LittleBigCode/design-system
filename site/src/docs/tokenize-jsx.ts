export type TokenKind = "tag" | "attr" | "string" | "punct" | "text"
export type Token = { text: string; kind: TokenKind }

/**
 * A deliberately small JSX tokenizer for the playground's generated snippet.
 *
 * This is reliable where a general highlighter would be overkill because we
 * *generate* the string being tokenized: a template of known JSX plus serialized
 * props. Shiki stays in the Vite process (see plugins/demo-source.ts), so
 * runtime highlighting needs something that costs ~1 kB rather than megabytes.
 */
export function tokenizeJsx(code: string): Token[] {
  const tokens: Token[] = []
  const push = (text: string, kind: TokenKind) => {
    if (text) tokens.push({ text, kind })
  }

  let index = 0
  let inTag = false

  while (index < code.length) {
    if (!inTag) {
      const next = code.indexOf("<", index)
      push(code.slice(index, next === -1 ? code.length : next), "text")
      if (next === -1) break

      inTag = true
      if (code[next + 1] === "/") {
        push("</", "punct")
        index = next + 2
      } else {
        push("<", "punct")
        index = next + 1
      }

      const name = /^[A-Za-z][\w.]*/.exec(code.slice(index))
      if (name) {
        push(name[0], "tag")
        index += name[0].length
      }
      continue
    }

    const char = code[index]

    if (char === "/" && code[index + 1] === ">") {
      push("/>", "punct")
      index += 2
      inTag = false
      continue
    }

    if (char === ">") {
      push(">", "punct")
      index += 1
      inTag = false
      continue
    }

    if (char === "=") {
      push("=", "punct")
      index += 1
      continue
    }

    if (char === '"' || char === "'") {
      const close = code.indexOf(char, index + 1)
      const stop = close === -1 ? code.length : close + 1
      push(code.slice(index, stop), "string")
      index = stop
      continue
    }

    if (char === "{") {
      let depth = 0
      let cursor = index
      for (; cursor < code.length; cursor += 1) {
        if (code[cursor] === "{") depth += 1
        else if (code[cursor] === "}") {
          depth -= 1
          if (depth === 0) {
            cursor += 1
            break
          }
        }
      }
      push("{", "punct")
      push(code.slice(index + 1, cursor - 1), "attr")
      push("}", "punct")
      index = cursor
      continue
    }

    const whitespace = /^\s+/.exec(code.slice(index))
    if (whitespace) {
      push(whitespace[0], "text")
      index += whitespace[0].length
      continue
    }

    const word = /^[\w:.-]+/.exec(code.slice(index))
    if (word) {
      push(word[0], "attr")
      index += word[0].length
      continue
    }

    push(char, "punct")
    index += 1
  }

  return tokens
}
