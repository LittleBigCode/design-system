import {
  Button,
  Input,
  InputGroup,
  Kbd,
  KbdGroup,
} from "@diametral/design-system/react"
import { MagnifyingGlassIcon } from "@phosphor-icons/react"

/* The cap drops to a wash of its own ink inside an input group — kbd.css
   carries that as a plain rule, where the source relied on a Tailwind utility
   in a layer outranking it. InputGroup is the incumbent until batch 7. */
export default function KbdInContext() {
  return (
    <div className="flex w-full max-w-sm flex-col gap-4">
      <InputGroup
        before={<MagnifyingGlassIcon />}
        after={
          <KbdGroup>
            <Kbd>⌘</Kbd>
            <Kbd>K</Kbd>
          </KbdGroup>
        }
      >
        <Input placeholder="Search the system…" />
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
