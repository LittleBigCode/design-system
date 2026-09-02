# Worked example: the four surfaces of a documented component

A complete snapshot of one component (Panel) documented to the house standard.
Match this register — the field discipline, the demo realism, the sparseness —
not the Panel-specific content. Where a convention is illustrated, the
annotation above the code names it.

## Surface 1 — Registry entry (`registry.ts`)

Note the field discipline: `description` positions against a sibling in one
line; `intro` paragraph 1 is when-to-use, paragraph 2 is the one architectural
fact; example titles name uses, descriptions name the non-obvious mechanism in
backticks; `parts` only speaks where nesting can't show the constraint.

```ts
{
  slug: "panel",
  name: "Panel",
  category: "Layout",
  description:
    "A flat, bordered section container — Card without the shadow, plus a row part for tightly-packed settings lists.",
  intro: [
    "Panel is the flat sibling of Card: the same header, content and footer skeleton, but a plain border instead of elevation. Reach for it when a region needs a boundary without needing to float — settings sections, form groups, tiles that sit inside the page rather than on top of it.",
    "The root owns `--panel-spacing`, which every part reads for its padding, so density changes in one place. For tightly-packed label-and-control lists, `PanelRow` replaces v1's `rows` boolean with a part you compose in.",
  ],
  examples: [
    {
      demo: "panel/basic",
      title: "Basic",
      description:
        "A self-contained summary block: header, prose content, one footer action. Rules are opt-in — PanelHeader and PanelFooter borrow Card's `.border-b`/`.border-t` convention, so add the utility yourself to draw them.",
    },
    {
      demo: "panel/rows",
      title: "Settings rows",
      description:
        "The settings-page shape: `PanelRow` packs each label-and-control pair into a divided list. Rows carry their own padding, so PanelContent passes `px-0` rather than stacking the two.",
    },
    {
      demo: "panel/form-section",
      title: "Form section",
      description:
        "A form group with its actions kept inside the boundary: fields in PanelContent, cancel/save in a ruled PanelFooter — the footer earns its keep instead of decorating.",
    },
  ],
  parts: {
    Panel:
      "Owns `--panel-spacing`, which every part reads for its padding — a part rendered outside a Panel comes out flush.",
    PanelHeader:
      "Bottom padding is keyed off `.border-b`, so a header with no rule stays tight.",
    PanelTitle:
      "Type styles only, with no padding of its own — that is why it sits inside PanelHeader. Add your own heading element when the level matters.",
    PanelContent:
      "Horizontal padding and nothing else. Pass `px-0` when the children carry their own, as PanelRow does.",
    PanelFooter: "Mirrors the header: top padding is keyed off `.border-t`.",
    PanelRow:
      "Carries its own padding and divider; `last:border-b-0` stops the trailing rule doubling up with the footer's.",
  },
},
```

## Surface 2 — Demo files (`demos/<slug>/*.tsx`)

Each demo: no comments (the file is shown verbatim in the Code tab — any
non-obvious *why* goes in the registry example `description`), realistic
content (real labels, working sub-components), width constrained on the demo
root, default export named `<Component><UseCase>`. The set covers shapes of
use — summary block, settings list, form group — not a prop matrix.

### `demos/panel/basic.tsx`

```tsx
import { Button } from "@diametral/design-system/react"
import {
  Panel,
  PanelContent,
  PanelFooter,
  PanelHeader,
  PanelTitle,
} from "@diametral/design-system/react"

export default function PanelBasic() {
  return (
    <Panel className="w-full max-w-sm">
      <PanelHeader className="border-b">
        <PanelTitle>Storage</PanelTitle>
      </PanelHeader>
      <PanelContent className="text-muted-foreground">
        6.2 GB of 10 GB used across 214 files.
      </PanelContent>
      <PanelFooter className="border-t">
        <Button size="sm" variant="outline">
          Manage
        </Button>
      </PanelFooter>
    </Panel>
  )
}
```

### `demos/panel/rows.tsx`

Data-driven list with a `const` above the component — the Code tab shows the
whole file, so the array reads as documentation too.

```tsx
import { Label } from "@diametral/design-system/react"
import {
  Panel,
  PanelContent,
  PanelHeader,
  PanelRow,
  PanelTitle,
} from "@diametral/design-system/react"
import { Switch } from "@diametral/design-system/react"

const SETTINGS = [
  { id: "email-alerts", label: "Email alerts", on: true },
  { id: "weekly-digest", label: "Weekly digest", on: false },
  { id: "mentions", label: "Mentions", on: true },
]

export default function PanelRows() {
  return (
    <Panel className="w-full max-w-sm">
      <PanelHeader className="border-b">
        <PanelTitle>Notifications</PanelTitle>
      </PanelHeader>
      <PanelContent className="px-0">
        {SETTINGS.map((setting) => (
          <PanelRow key={setting.id}>
            <Label htmlFor={setting.id}>{setting.label}</Label>
            <Switch id={setting.id} defaultChecked={setting.on} />
          </PanelRow>
        ))}
      </PanelContent>
    </Panel>
  )
}
```

### `demos/panel/form-section.tsx`

Composes sibling components (`Field`, `Input`, `Button`) rather than
placeholders; the footer actions are plausible (`Cancel`/`Save`), not
`<Button>Action</Button>`.

```tsx
import { Button } from "@diametral/design-system/react"
import {
  Field,
  FieldDescription,
  FieldLabel,
} from "@diametral/design-system/react"
import { Input } from "@diametral/design-system/react"
import {
  Panel,
  PanelContent,
  PanelFooter,
  PanelHeader,
  PanelTitle,
} from "@diametral/design-system/react"

export default function PanelFormSection() {
  return (
    <Panel className="w-full max-w-sm">
      <PanelHeader className="border-b">
        <PanelTitle>Profile</PanelTitle>
      </PanelHeader>
      <PanelContent className="flex flex-col gap-4">
        <Field>
          <FieldLabel htmlFor="panel-form-name">Display name</FieldLabel>
          <Input id="panel-form-name" defaultValue="Augustin Morval" />
        </Field>
        <Field>
          <FieldLabel htmlFor="panel-form-handle">Handle</FieldLabel>
          <Input id="panel-form-handle" defaultValue="amorval" />
          <FieldDescription>Shown on shared dashboards.</FieldDescription>
        </Field>
      </PanelContent>
      <PanelFooter className="justify-end gap-2 border-t">
        <Button size="sm" variant="ghost">
          Cancel
        </Button>
        <Button size="sm">Save</Button>
      </PanelFooter>
    </Panel>
  )
}
```

## Surface 3 — Playground template (`playgrounds/panel.tsx`)

Renders **every exported part** (the code strip is the anatomy navigator).
Extra text props beyond `children` become typed props with defaults matching
the `texts` config; `{...props}` passes the control-panel prop bag through.

```tsx
import type { ComponentProps } from "react"

import { Button } from "@diametral/design-system/react"
import { Label } from "@diametral/design-system/react"
import {
  Panel,
  PanelContent,
  PanelFooter,
  PanelHeader,
  PanelRow,
  PanelTitle,
} from "@diametral/design-system/react"
import { Switch } from "@diametral/design-system/react"

// The template renders every Panel part: the Workbench's code strip doubles as
// the anatomy navigator, so a part missing here would not be selectable.
export default function PanelPlayground({
  children,
  description = "Choose which updates land in your inbox.",
  row = "Email alerts",
  action = "Manage",
  ...props
}: ComponentProps<typeof Panel> & {
  description?: string
  row?: string
  action?: string
}) {
  return (
    <Panel {...props} className="w-full max-w-sm">
      <PanelHeader className="border-b">
        <PanelTitle>{children}</PanelTitle>
      </PanelHeader>
      <PanelContent className="px-0">
        <p className="px-(--panel-spacing) pb-3 text-muted-foreground">
          {description}
        </p>
        <PanelRow>
          <Label htmlFor="panel-playground-switch">{row}</Label>
          <Switch id="panel-playground-switch" defaultChecked />
        </PanelRow>
      </PanelContent>
      <PanelFooter className="border-t">
        <Button size="sm" variant="outline">
          {action}
        </Button>
      </PanelFooter>
    </Panel>
  )
}
```

## Surface 4 — `PLAYGROUNDS` entry (`playgrounds.ts`)

Only what cva cannot know. Panel has no `variantsFrom` because its `size` is
not a cva axis (it rewrites `--panel-spacing`), so it's exposed as an `extras`
select and the `note` explains why. Every key in `texts` matches a `{key}`
marker prop in the template above.

```ts
panel: {
  children: { default: "Notifications", label: "title" },
  texts: {
    description: { default: "Choose which updates land in your inbox." },
    row: { default: "Email alerts", label: "row label" },
    action: { default: "Manage", label: "footer action" },
  },
  note: "`size` is not a cva axis — it rewrites `--panel-spacing`, so it retunes the padding of every part at once.",
  extras: [{ prop: "size", type: "select", options: ["default", "sm"] }],
},
```

A typical variant-driven component is simpler — `variantsFrom` names the cva
const and the axes come free:

```ts
button: {
  children: { default: "Save changes" },
  variantsFrom: "buttonVariants",
  extras: [{ prop: "disabled", type: "boolean" }],
},
```

## The `PlaygroundConfig` contract (from `playgrounds.ts`)

```ts
export type SelectOption = string | { value: string; label: string }

export type Control =
  | { prop: string; type: "boolean"; label?: string; always?: boolean }
  | { prop: string; type: "text"; label?: string; placeholder?: string; always?: boolean }
  | {
      prop: string
      type: "select"
      options: SelectOption[]
      label?: string
      always?: boolean
      // "element": the value is substituted into the template's `{prop}`
      // marker as `<Value />` instead of printed as an attribute.
      marker?: "element"
    }

export type PlaygroundConfig = {
  variantsFrom?: string // cva const name; validated at build time
  extras?: Control[] // props the cva block has no knowledge of
  children?: { default: string; label?: string } // needs a literal {children} marker
  texts?: Record<string, { default: string; label?: string }> // each key needs a {key} marker
  note?: string // shown above the controls
}
```

`always: true` prints the prop even at its default — only for props the
component *requires* (an `AspectRatio`'s `ratio`), where omitting it would
emit code that does not compile.
