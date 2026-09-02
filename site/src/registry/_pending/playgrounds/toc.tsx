import {
  Toc,
  TocItem,
  TocLabel,
  TocLink,
  TocList,
} from "@diametral/ui/components/toc"

// `level` is typed `1 | 2` while the control panel drives strings, so it is
// resolved outside the returned JSX — the same move aspect-ratio makes, and what
// keeps the generated snippet free of a ternary no consumer would write.
export default function TocPlayground({
  children,
  label = "On this page",
  level = "1",
  ...rest
}: {
  children?: string
  label?: string
  level?: "1" | "2"
  className?: string
}) {
  const props = { ...rest, level: level === "2" ? (2 as const) : (1 as const) }

  return (
    <Toc className="w-52">
      <TocLabel>{label}</TocLabel>
      <TocList>
        <TocItem>
          <TocLink
            href="#playground"
            aria-current="location"
            className="border-foreground text-foreground"
          >
            Installation
          </TocLink>
        </TocItem>
        <TocItem {...props}>
          <TocLink href="#playground">{children}</TocLink>
        </TocItem>
      </TocList>
    </Toc>
  )
}
