import { Icon } from "@diametral/design-system/react"

export default function IconSizing() {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-baseline gap-6">
        <Icon name="sun" size={16} />
        <Icon name="sun" size={20} />
        <Icon name="sun" size={24} />
        <Icon name="sun" size={32} />
      </div>
      {/* No `size` at all: the glyph is 1em square, so it follows whatever
          font-size and colour it lands in. */}
      <p className="text-lg text-[var(--ds-accent-ink)]">
        <Icon name="arrow-right" /> Follows the text
      </p>
    </div>
  )
}
