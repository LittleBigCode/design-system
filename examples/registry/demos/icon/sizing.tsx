import { Icon } from "@diametral/design-system/react"

export default function IconSizing() {
  return (
    <div className="flex flex-col gap-4">
      {/* `size` is gone from the 1.0.0 API: the glyph is 1em square
          (`.ds-icon`'s CSS), so font-size is what sizes it now. */}
      <div className="flex items-baseline gap-6">
        <Icon name="sun" style={{ fontSize: 16 }} />
        <Icon name="sun" style={{ fontSize: 20 }} />
        <Icon name="sun" style={{ fontSize: 24 }} />
        <Icon name="sun" style={{ fontSize: 32 }} />
      </div>
      {/* No size override at all: the glyph follows whatever font-size and
          colour it lands in. */}
      <p className="text-lg text-[var(--ds-accent-ink)]">
        <Icon name="arrow-right" /> Follows the text
      </p>
    </div>
  )
}
