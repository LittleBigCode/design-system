/* eslint-disable react-refresh/only-export-components */
import * as React from "react"
import { useSearchParams } from "react-router"
import { CheckIcon, CopyIcon } from "@phosphor-icons/react"

import { palette } from "virtual:demo-source"

import {
  Button,
  cx,
  Input,
  Select,
  Switch,
} from "@diametral/design-system/react"

import { formatJsx } from "@/docs/format-jsx"
import { tokenizeJsx, type Token, type TokenKind } from "@/docs/tokenize-jsx"
import { useCopy } from "@/docs/use-copy"
import { getPlayground, type Axis } from "@/registry/playground-registry"
import type { Control, SelectOption } from "@/registry/playgrounds"

const UNSET = "—"

const optionValue = (option: SelectOption) =>
  typeof option === "string" ? option : option.value
const optionLabel = (option: SelectOption) =>
  typeof option === "string" ? option : option.label

const TOKEN_ROLE: Record<TokenKind, keyof typeof palette.light> = {
  tag: "tag",
  attr: "attr",
  string: "string",
  punct: "faint",
  text: "fg",
}

/**
 * `rows={3}` reads better than `rows="3"`, and matches what you'd write.
 * Decimals count too: a ratio of `1.7778` is a number, and printing it quoted
 * would not compile against `ratio: number`.
 */
function serialize(prop: string, value: string | boolean) {
  if (value === true) return prop
  if (typeof value !== "string") return ""
  return /^\d+(\.\d+)?$/.test(value)
    ? `${prop}={${value}}`
    : `${prop}="${value}"`
}

function extraDefault(control: Control) {
  if (control.type === "boolean") return false
  if (control.type === "select") return optionValue(control.options[0])
  return control.default ?? ""
}

/**
 * The playground's control state and the rail that drives it, with no layout of
 * its own: the Workbench places the rail, and owns the preview and the code
 * strip that `renderProps` and `code` feed.
 */
export function usePlaygroundControls(slug: string) {
  const playground = getPlayground(slug)
  const [params, setParams] = useSearchParams()

  if (!playground) return null
  const { Subject, template, axes, extras, children, texts, note } = playground

  // `children` is just the conventional first entry — every text marker is
  // resolved and printed the same way.
  const textControls = [
    ...(children ? [{ key: "children", ...children }] : []),
    ...Object.entries(texts ?? {}).map(([key, config]) => ({ key, ...config })),
  ]

  const axisValue = (axis: Axis) =>
    params.get(axis.prop) ?? axis.default ?? UNSET

  const extraValue = (control: Control): string | boolean =>
    control.type === "boolean"
      ? params.get(control.prop) === "true"
      : (params.get(control.prop) ?? extraDefault(control))

  function set(prop: string, value: string | boolean) {
    const next = new URLSearchParams(params)
    // Defaults are omitted from the URL, so an untouched playground has no
    // query string and a shared link carries only real choices.
    if (value === false || value === "" || value === UNSET) next.delete(prop)
    else next.set(prop, String(value))
    setParams(next, { replace: true, preventScrollReset: true })
  }

  /**
   * Text markers can't use `set`: their default is real content, not "", so
   * dropping an emptied field would refill the box from the default and make it
   * impossible to clear one and type something else. An empty marker is a real
   * choice and stays in the URL; only typing the default back removes it.
   */
  function setText(key: string, value: string, fallback: string) {
    const next = new URLSearchParams(params)
    if (value === fallback) next.delete(key)
    else next.set(key, value)
    setParams(next, { replace: true, preventScrollReset: true })
  }

  // What renders: every resolved value. What we print: only what differs from
  // the component's own defaults.
  const renderProps: Record<string, unknown> = {}
  const printed: string[] = []
  const elementValues: Record<string, string> = {}

  for (const axis of axes) {
    const value = axisValue(axis)
    if (value === UNSET) continue
    renderProps[axis.prop] = value
    if (value !== axis.default) printed.push(serialize(axis.prop, value))
  }

  for (const control of extras) {
    const value = extraValue(control)
    if (value === false || value === "") continue
    renderProps[control.prop] = value
    if (control.type === "select" && control.marker === "element") {
      elementValues[control.prop] = String(value)
      continue
    }
    if (control.always || value !== extraDefault(control)) {
      printed.push(serialize(control.prop, value))
    }
  }

  const textValues: Record<string, string> = {}
  for (const control of textControls) {
    textValues[control.key] = params.get(control.key) ?? control.default
    renderProps[control.key] = textValues[control.key]
  }

  const code = formatJsx(template, printed, textValues, elementValues)

  const touched =
    axes.some((axis) => params.has(axis.prop)) ||
    extras.some((control) => params.has(control.prop)) ||
    textControls.some((control) => params.has(control.key))

  return {
    Subject,
    renderProps,
    code,
    note,
    touched,
    reset: () => setParams({}, { replace: true, preventScrollReset: true }),
    hasControls: axes.length > 0 || extras.length > 0,
    rail: (
      <>
        {textControls.map((control) => (
          <ControlRow key={control.key} label={control.label ?? control.key}>
            <Input
              value={textValues[control.key]}
              placeholder={control.default}
              onChange={(event) =>
                setText(control.key, event.target.value, control.default)
              }
              aria-label={control.label ?? control.key}
            />
          </ControlRow>
        ))}

        {axes.map((axis) => (
          <ControlRow key={axis.prop} label={axis.prop}>
            <PanelSelect
              label={axis.prop}
              value={axisValue(axis)}
              // UNSET is only offered when cva declares no default for this axis.
              options={axis.default ? axis.options : [UNSET, ...axis.options]}
              onValueChange={(value) => set(axis.prop, value)}
            />
          </ControlRow>
        ))}

        {extras.map((control) => {
          const label = control.label ?? control.prop
          const value = extraValue(control)

          if (control.type === "boolean") {
            return (
              <div
                key={control.prop}
                className="flex items-center justify-between gap-3"
              >
                <label
                  htmlFor={`pg-${control.prop}`}
                  className="font-mono text-xs text-muted-foreground"
                >
                  {label}
                </label>
                <Switch
                  checked={value === true}
                  onChange={(checked) => set(control.prop, checked)}
                />
              </div>
            )
          }

          if (control.type === "select") {
            return (
              <ControlRow key={control.prop} label={label}>
                <PanelSelect
                  label={label}
                  value={String(value)}
                  options={control.options}
                  onValueChange={(next) => set(control.prop, next)}
                />
              </ControlRow>
            )
          }

          return (
            <ControlRow key={control.prop} label={label}>
              <Input
                value={String(value)}
                placeholder={control.placeholder}
                onChange={(event) => set(control.prop, event.target.value)}
                aria-label={label}
              />
            </ControlRow>
          )
        })}

        {axes.length === 0 && extras.length === 0 ? (
          <p className="text-xs text-muted-foreground">No controls declared.</p>
        ) : null}
      </>
    ),
  }
}

function ControlRow({
  label,
  children,
}: {
  label: string
  children: React.ReactNode
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <span className="font-mono text-xs text-muted-foreground">{label}</span>
      {children}
    </div>
  )
}

/**
 * A plain string option is both its own value and label; `{ value, label }`
 * splits them so the code the panel prints can differ from what it shows.
 */
function PanelSelect({
  label,
  value,
  options,
  onValueChange,
}: {
  label: string
  value: string
  options: readonly SelectOption[]
  onValueChange: (value: string) => void
}) {
  return (
    <Select
      block
      aria-label={label}
      value={value}
      onChange={(event) => onValueChange(event.target.value)}
      options={options.map((option) => ({
        value: optionValue(option),
        label: optionLabel(option),
      }))}
    />
  )
}

/**
 * Every token span of the element written as `part`, from its `<` through its
 * matching `>`. A part written more than once yields a range each time, so a
 * selection never implies there is only one of it.
 *
 * The tokenizer is flat, so nesting is recovered here with a stack: `</` arrives
 * as its own punct token, and a `/>` before the next tag marks a self-closing
 * element.
 */
function partRanges(tokens: Token[], part: string) {
  const ranges: Array<[number, number]> = []
  const open: Array<{ name: string; from: number }> = []

  for (let index = 0; index < tokens.length; index += 1) {
    if (tokens[index].kind !== "tag") continue
    const name = tokens[index].text

    if (tokens[index - 1]?.text === "</") {
      const element = open.pop()
      if (element?.name !== part) continue
      // Include the closing `>` that follows the tag name.
      let end = index
      while (end < tokens.length && tokens[end].text !== ">") end += 1
      ranges.push([element.from, Math.min(end, tokens.length - 1)])
      continue
    }

    let cursor = index + 1
    while (
      cursor < tokens.length &&
      tokens[cursor].text !== ">" &&
      tokens[cursor].text !== "/>"
    ) {
      cursor += 1
    }
    // `index - 1` is the `<` that opened this tag.
    if (tokens[cursor]?.text === "/>") {
      if (name === part) ranges.push([index - 1, cursor])
    } else {
      open.push({ name, from: index - 1 })
    }
  }

  return ranges
}

/**
 * A passive view that answers the index beside it: the selected part's tags are
 * tinted and everything outside that element is blurred, the same isolation the
 * preview does. Nothing here is clickable — the snippet stays a snippet, so
 * selecting text to copy it still works.
 */
export function GeneratedCode({
  code,
  selected,
  hovered,
}: {
  code: string
  selected?: string | null
  hovered?: string | null
}) {
  const { copied, copy } = useCopy(code)
  const tokens = React.useMemo(() => tokenizeJsx(code), [code])
  const focus = selected ?? hovered ?? null
  const ranges = React.useMemo(
    () => (focus ? partRanges(tokens, focus) : []),
    [tokens, focus]
  )
  const inFocus = (index: number) =>
    ranges.some(([from, to]) => index >= from && index <= to)

  return (
    <div className="group/code relative border border-t-0 border-border">
      {/* .code-tokens picks up the same light/dark colour switching as the
          build-time highlighted blocks, without shiki's line-grid rule.
          Long lines scroll rather than wrap, so the block is a scrollable
          region: it needs to be focusable, or a keyboard user cannot pan it. */}
      <pre
        tabIndex={0}
        role="region"
        aria-label="Generated JSX"
        className="code-tokens overflow-x-auto bg-muted/40 p-4 font-mono text-[13px] leading-relaxed"
      >
        <code>
          {tokens.map((token, index) => (
            <span
              key={index}
              className={cx(
                focus && "transition-[filter,opacity] duration-200",
                focus &&
                  !inFocus(index) &&
                  // Whitespace carries no meaning to dim, and blurring it only
                  // makes the indentation shimmer.
                  token.text.trim() !== "" &&
                  "opacity-30 blur-[1.5px]",
                focus &&
                  inFocus(index) &&
                  token.kind === "tag" &&
                  token.text === focus &&
                  "rounded-[2px] bg-muted-foreground/25"
              )}
              style={
                {
                  "--shiki-light": palette.light[TOKEN_ROLE[token.kind]],
                  "--shiki-dark": palette.dark[TOKEN_ROLE[token.kind]],
                } as React.CSSProperties
              }
            >
              {token.text}
            </span>
          ))}
        </code>
      </pre>
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
