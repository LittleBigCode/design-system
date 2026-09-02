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

const ITEMS = {
  vite: "Vite",
  rolldown: "Rolldown",
  next: "Next.js",
  astro: "Astro",
}

export default function SelectGrouped() {
  return (
    <Select items={ITEMS} defaultValue="vite">
      <SelectTrigger>
        <SelectValue placeholder="Pick a tool" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Bundlers</SelectLabel>
          <SelectItem value="vite">{ITEMS.vite}</SelectItem>
          <SelectItem value="rolldown">{ITEMS.rolldown}</SelectItem>
        </SelectGroup>
        <SelectSeparator />
        <SelectGroup>
          <SelectLabel>Frameworks</SelectLabel>
          <SelectItem value="next">{ITEMS.next}</SelectItem>
          <SelectItem value="astro">{ITEMS.astro}</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  )
}
