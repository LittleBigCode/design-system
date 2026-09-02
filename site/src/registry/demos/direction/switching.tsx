import {
  Checkbox,
  DirectionProvider,
  Input,
  InputGroup,
  Segmented,
} from "@diametral/design-system/react"
import * as React from "react"
import { MagnifyingGlassIcon } from "@phosphor-icons/react"

/* Direction switched at runtime, which is the case a `dir` attribute on
   <html> cannot serve: an app whose locale changes without a reload. Every
   descendant re-reads the provider, so the search addon jumps to the other end
   and the checkbox row reverses, with no per-component work.

   Re-wired onto the incumbents: `ToggleGroup` is `Segmented`; the source's
   three-part `InputGroup` is this package's one-element version, which takes
   its addon as a `before` prop; and `Checkbox` is itself a <label> that wraps
   its own text, so it needs no separate `Label` beside it. */
export default function DirectionSwitching() {
  const [direction, setDirection] = React.useState<"ltr" | "rtl">("rtl")

  return (
    <div className="flex w-full max-w-sm flex-col gap-5">
      <Segmented
        value={direction}
        onChange={(value) => setDirection(value as "ltr" | "rtl")}
        items={[
          { value: "ltr", label: "ltr" },
          { value: "rtl", label: "rtl" },
        ]}
      />

      <DirectionProvider direction={direction}>
        <div dir={direction} className="flex flex-col gap-4">
          <InputGroup before={<MagnifyingGlassIcon />}>
            <Input placeholder="بحث…" aria-label="بحث" />
          </InputGroup>
          <Checkbox defaultChecked>أوافق على الشروط</Checkbox>
        </div>
      </DirectionProvider>
    </div>
  )
}
