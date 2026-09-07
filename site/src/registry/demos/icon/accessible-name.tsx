import { Button, Icon } from "@diametral/design-system/react"

export default function IconAccessibleName() {
  return (
    <div className="flex flex-wrap items-center gap-4">
      {/* Meaningful on its own: role="img" + aria-label makes it a named
          image. `title` is gone from the 1.0.0 API. */}
      <Icon name="bell" role="img" aria-label="Notifications" style={{ fontSize: 24 }} />

      {/* Decorative: the button's own text is the name, so the glyph is
          aria-hidden and must stay that way — two names read as two things. */}
      <Button>
        <Icon name="download" aria-hidden /> Export
      </Button>

      {/* Icon-only: the name belongs to the control, not the glyph. */}
      <Button size="icon" aria-label="Delete">
        <Icon name="trash" aria-hidden />
      </Button>
    </div>
  )
}
