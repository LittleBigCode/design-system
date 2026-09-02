import type { ComponentProps } from "react"

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
} from "@diametral/ui/components/select"

// `items` is what resolves a value to its label in the closed trigger, so the
// map has to hold every option the groups below render.
const ITEMS = {
  vite: "Vite",
  rolldown: "Rolldown",
  next: "Next.js",
  astro: "Astro",
}

export default function SelectPlayground(props: ComponentProps<typeof Select>) {
  return (
    <Select items={ITEMS} {...props}>
      <SelectTrigger>
        <SelectValue placeholder="Pick a tool" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Bundlers</SelectLabel>
          <SelectItem value="vite">Vite</SelectItem>
          <SelectItem value="rolldown">Rolldown</SelectItem>
        </SelectGroup>
        <SelectSeparator />
        <SelectGroup>
          <SelectLabel>Frameworks</SelectLabel>
          <SelectItem value="next">Next.js</SelectItem>
          <SelectItem value="astro">Astro</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  )
}
