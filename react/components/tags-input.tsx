"use client"

import * as React from "react"
import { XIcon } from "@phosphor-icons/react"

import { cx } from "../lib/cx.js"
import { useControllableValue } from "../hooks/useControllableValue.js"
import { Button } from "./button.js"

// Free-text tokens, not a fixed list — see MultiSelect for choosing from
// options. The outer box is a plain group div, never a button, so the
// per-tag remove buttons are not nested inside an interactive ancestor.
function TagsInput({
  className,
  value,
  defaultValue = [],
  onValueChange,
  placeholder,
  disabled = false,
  max,
  // Routed to the inner input, not the wrapper: the input is the form control
  // axe checks for a name, and a label on the surrounding div doesn't give it
  // one. Same reason Slider forwards these down to its Base UI input.
  "aria-label": ariaLabel,
  "aria-labelledby": ariaLabelledBy,
  ...props
}: Omit<React.ComponentProps<"div">, "onChange" | "defaultValue"> & {
  value?: string[]
  defaultValue?: string[]
  onValueChange?: (value: string[]) => void
  placeholder?: string
  disabled?: boolean
  max?: number
}) {
  const [tags, setTags] = useControllableValue<string[]>({
    value,
    defaultValue,
    onChange: onValueChange,
  })
  const [draft, setDraft] = React.useState("")
  const inputRef = React.useRef<HTMLInputElement>(null)

  const addTag = (raw: string) => {
    const next = raw.trim()
    const atLimit = max !== undefined && tags.length >= max
    if (!next || tags.includes(next) || atLimit) {
      setDraft("")
      return
    }
    setTags([...tags, next])
    setDraft("")
  }

  const removeTag = (index: number) => {
    setTags(tags.filter((_, i) => i !== index))
  }

  return (
    <div
      data-slot="tags-input"
      data-disabled={disabled || undefined}
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) {
          event.preventDefault()
          inputRef.current?.focus()
        }
      }}
      className={cx("ds-tags-input", className)}
      {...props}
    >
      {tags.map((tag, index) => (
        <span
          key={`${tag}-${index}`}
          data-slot="tags-input-tag"
          className="ds-tags-input-tag"
        >
          {tag}
          <Button
            type="button"
            variant="ghost"
            size="icon-xs"
            tabIndex={-1}
            disabled={disabled}
            aria-label={`Remove ${tag}`}
            onClick={() => removeTag(index)}
            className="ds-tags-input-tag-remove"
          >
            <XIcon />
          </Button>
        </span>
      ))}
      <input
        ref={inputRef}
        data-slot="tags-input-field"
        type="text"
        aria-label={ariaLabel}
        aria-labelledby={ariaLabelledBy}
        value={draft}
        placeholder={tags.length === 0 ? placeholder : undefined}
        disabled={disabled}
        onChange={(event) => setDraft(event.target.value)}
        onKeyDown={(event) => {
          if (event.key === "Enter" || event.key === ",") {
            event.preventDefault()
            addTag(draft)
          } else if (event.key === "Backspace" && draft === "" && tags.length) {
            event.preventDefault()
            removeTag(tags.length - 1)
          }
        }}
        onBlur={() => addTag(draft)}
        className="ds-tags-input-field"
      />
    </div>
  )
}

export { TagsInput }
