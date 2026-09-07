/* ============================================================================
   Workbench runtime (issue #32) — mounts a component live with a controls rail
   that edits its props and prints the generated JSX. Ported from
   site/src/docs/playground.tsx and site/src/docs/format-jsx.ts: the substitution
   rules (always-present props, prop markers, children insertion) match those
   exactly, minus the anatomy/part-highlighting tree (explicitly out of scope).
   ============================================================================ */
import { createElement as h } from "react"
import { createRoot } from "react-dom/client"

const UNSET = "—"
const PRINT_WIDTH = 80
const INDENT = 2
const PROPS_MARKER = "{...props}"

/* -- prop-value formatting -------------------------------------------------- */

function serialize(prop, value) {
  if (value === true) return prop
  if (typeof value !== "string") return ""
  return /^\d+(\.\d+)?$/.test(value) ? `${prop}={${value}}` : `${prop}="${value}"`
}

function optionValue(option) {
  return typeof option === "string" ? option : option.value
}
function optionLabel(option) {
  return typeof option === "string" ? option : option.label
}

function extraDefault(control) {
  if (control.type === "boolean") return false
  if (control.type === "select") return optionValue(control.options[0])
  return control.default ?? ""
}

/* -- JSX template substitution, ported from site/src/docs/format-jsx.ts ----- */

function findTagEnd(source, from) {
  let depth = 0
  let quote
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

function splitAttributes(region) {
  const attributes = []
  let current = ""
  let depth = 0
  let quote
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

function serializeChildren(text) {
  if (!/[<>{}]/.test(text)) return text
  return `{${JSON.stringify(text)}}`
}

function formatJsx(template, attributes, texts, elements) {
  let source = template

  for (const [key, value] of Object.entries(elements ?? {})) {
    const marker = `{${key}}`
    if (source.includes(marker)) source = source.replace(marker, `<${value} />`)
  }

  for (const [key, value] of Object.entries(texts ?? {})) {
    const marker = `{${key}}`
    if (source.includes(marker)) source = source.replace(marker, serializeChildren(value))
  }

  const markerIndex = source.indexOf(PROPS_MARKER)
  if (markerIndex === -1) return source

  const openStart = source.lastIndexOf("<", markerIndex)
  const openEnd = findTagEnd(source, openStart)
  const openTag = source.slice(openStart, openEnd + 1)
  const selfClosing = source[openEnd - 1] === "/"

  const tagName = /^<([A-Za-z][\w.]*)/.exec(openTag)?.[1]
  if (!tagName) return source

  const region = openTag.slice(1 + tagName.length, selfClosing ? openTag.length - 2 : openTag.length - 1)
  const all = [...splitAttributes(region).filter((attr) => attr !== PROPS_MARKER), ...attributes]

  const lineStart = source.lastIndexOf("\n", openStart) + 1
  const indent = source.slice(lineStart, openStart)
  const lineEnd = source.indexOf("\n", openEnd) === -1 ? source.length : source.indexOf("\n", openEnd)
  const tail = source.slice(openEnd + 1, lineEnd)

  const openInline = `<${tagName}${all.length ? ` ${all.join(" ")}` : ""}${selfClosing ? " />" : ">"}`
  const pad = indent + " ".repeat(INDENT)
  const closing = `</${tagName}>`
  const hasInlineChildren = !selfClosing && tail.endsWith(closing)

  const canHugChildren = !hasInlineChildren || all.length <= 1
  if (canHugChildren && (indent + openInline + tail).length <= PRINT_WIDTH) {
    return source.slice(0, openStart) + openInline + source.slice(openEnd + 1)
  }

  if (hasInlineChildren && (indent + openInline).length <= PRINT_WIDTH) {
    const inner = tail.slice(0, -closing.length).trim()
    const lines = [openInline]
    if (inner) lines.push(pad + inner)
    lines.push(indent + closing)
    return source.slice(0, openStart) + lines.join("\n") + source.slice(lineEnd)
  }

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

/* -- controls rail ------------------------------------------------------- */

function row(labelText, controlEl) {
  const el = document.createElement("div")
  el.className = "ds-workbench__row"
  const label = document.createElement("span")
  label.className = "ds-label"
  label.textContent = labelText
  el.append(label, controlEl)
  return el
}

function selectControl(options, value, onChange, ariaLabel) {
  const wrap = document.createElement("div")
  wrap.className = "ds-select ds-select--block"
  const select = document.createElement("select")
  select.setAttribute("aria-label", ariaLabel)
  for (const option of options) {
    const opt = document.createElement("option")
    opt.value = optionValue(option)
    opt.textContent = optionLabel(option)
    select.append(opt)
  }
  select.value = value
  select.addEventListener("change", () => onChange(select.value))
  wrap.append(select)
  return wrap
}

function textControl(value, placeholder, onChange, ariaLabel) {
  const wrap = document.createElement("div")
  wrap.className = "ds-input"
  const input = document.createElement("input")
  input.type = "text"
  input.value = value
  if (placeholder) input.placeholder = placeholder
  input.setAttribute("aria-label", ariaLabel)
  input.addEventListener("input", () => onChange(input.value))
  wrap.append(input)
  return wrap
}

/** `label` doubles as the switch's own text node, matching how `.ds-switch`
 *  is written everywhere else in this system — see examples/css/toggle.html. */
function switchControl(checked, onChange, labelText) {
  const wrap = document.createElement("div")
  wrap.className = "ds-workbench__row ds-workbench__row--switch"
  const label = document.createElement("label")
  label.className = "ds-switch"
  const input = document.createElement("input")
  input.type = "checkbox"
  input.checked = checked
  input.addEventListener("change", () => onChange(input.checked))
  const track = document.createElement("span")
  track.className = "ds-switch__track"
  const text = document.createElement("span")
  text.textContent = labelText
  label.append(input, track, text)
  wrap.append(label)
  return wrap
}

/**
 * Builds the controls rail and re-renders the subject + generated code on every
 * change. `payload` is the JSON scripts/build-docs.mjs emits per slug: template,
 * variant axes, extra props, children/texts — see buildWorkbenchPayload() there.
 */
export function mountWorkbench({ Subject, payload, preview, rail, code }) {
  const { template, axes = [], extras = [], children, texts = {} } = payload
  const textControls = [
    ...(children ? [{ key: "children", ...children }] : []),
    ...Object.entries(texts).map(([key, config]) => ({ key, ...config })),
  ]

  const axisState = {}
  for (const axis of axes) axisState[axis.prop] = axis.default ?? UNSET
  const extraState = {}
  for (const control of extras) extraState[control.prop] = extraDefault(control)
  const textState = {}
  for (const control of textControls) textState[control.key] = control.default

  const root = createRoot(preview)

  function render() {
    const renderProps = {}
    const printed = []
    const elementValues = {}

    for (const axis of axes) {
      const value = axisState[axis.prop]
      if (value === UNSET) continue
      renderProps[axis.prop] = value
      if (value !== axis.default) printed.push(serialize(axis.prop, value))
    }

    for (const control of extras) {
      const value = extraState[control.prop]
      if (value === false || value === "") continue
      renderProps[control.prop] = value
      if (control.type === "select" && control.marker === "element") {
        elementValues[control.prop] = String(value)
        continue
      }
      if (control.always || value !== extraDefault(control)) printed.push(serialize(control.prop, value))
    }

    const textValues = {}
    for (const control of textControls) {
      textValues[control.key] = textState[control.key]
      renderProps[control.key] = textValues[control.key]
    }

    root.render(h(Subject, renderProps))
    code.textContent = formatJsx(template, printed, textValues, elementValues)
  }

  for (const control of textControls) {
    rail.append(
      row(
        control.label ?? control.key,
        textControl(textState[control.key], control.default, (value) => { textState[control.key] = value; render() }, control.label ?? control.key)
      )
    )
  }

  for (const axis of axes) {
    const options = axis.default ? axis.options : [UNSET, ...axis.options]
    rail.append(
      row(
        axis.prop,
        selectControl(options, axisState[axis.prop], (value) => { axisState[axis.prop] = value; render() }, axis.prop)
      )
    )
  }

  for (const control of extras) {
    const label = control.label ?? control.prop
    if (control.type === "boolean") {
      rail.append(switchControl(extraState[control.prop] === true, (checked) => { extraState[control.prop] = checked; render() }, label))
      continue
    }
    if (control.type === "select") {
      rail.append(
        row(
          label,
          selectControl(control.options, String(extraState[control.prop]), (value) => { extraState[control.prop] = value; render() }, label)
        )
      )
      continue
    }
    rail.append(
      row(
        label,
        textControl(String(extraState[control.prop]), control.placeholder, (value) => { extraState[control.prop] = value; render() }, label)
      )
    )
  }

  if (axes.length === 0 && extras.length === 0 && textControls.length === 0) {
    const note = document.createElement("p")
    note.className = "docs-note"
    note.style.margin = "0"
    note.textContent = "No controls declared."
    rail.append(note)
  }

  render()
}
