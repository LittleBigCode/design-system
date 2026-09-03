import { Button, Icon } from "@diametral/design-system/react"

export default function IconAccessibleName() {
  return (
    <div className="flex flex-wrap items-center gap-4">
      {/* Meaningful on its own: `title` makes it role="img" with a name. */}
      <Icon name="bell" title="Notifications" size={24} />

      {/* Decorative: the button's own text is the name, so the glyph is
          aria-hidden and must stay that way — two names read as two things. */}
      <Button>
        <Icon name="download" /> Export
      </Button>

      {/* Icon-only: the name belongs to the control, not the glyph. */}
      <Button size="icon" aria-label="Delete">
        <Icon name="trash" />
      </Button>
    </div>
  )
}
