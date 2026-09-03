import {
  Button,
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
  Kbd,
  KbdGroup,
} from "@diametral/design-system/react"
import { MagnifyingGlassIcon } from "@phosphor-icons/react"

/* The cap drops to a wash of its own ink inside an input group — kbd.css
   carries that as a plain rule, where the source relied on a Tailwind utility
   in a layer outranking it. The rule names both grammars, so it reached the
   incumbent group in beta.6 and reaches the absorbed parts here. */
export default function KbdInContext() {
  return (
    <div className="flex w-full max-w-sm flex-col gap-4">
      <InputGroup>
        <InputGroupAddon>
          <MagnifyingGlassIcon />
        </InputGroupAddon>
        <InputGroupInput placeholder="Search the system…" />
        <InputGroupAddon align="inline-end">
          <KbdGroup>
            <Kbd>⌘</Kbd>
            <Kbd>K</Kbd>
          </KbdGroup>
        </InputGroupAddon>
      </InputGroup>

      <Button className="justify-between">
        Save changes
        <KbdGroup>
          <Kbd>⌘</Kbd>
          <Kbd>S</Kbd>
        </KbdGroup>
      </Button>
    </div>
  )
}
