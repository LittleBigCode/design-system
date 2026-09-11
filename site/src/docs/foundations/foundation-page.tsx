import { useParams } from "react-router"

import {
  Empty,
  EmptyDescription,
  EmptyHeader,
  EmptyTitle,
} from "@diametral/design-system/react"

import { Borders } from "@/docs/foundations/borders"
import { Color } from "@/docs/foundations/color"
import { Grid } from "@/docs/foundations/grid"
import { Iconography } from "@/docs/foundations/iconography"
import { Layout } from "@/docs/foundations/layout"
import { Logo } from "@/docs/foundations/logo"
import { Motion } from "@/docs/foundations/motion"
import { NoRadius } from "@/docs/foundations/no-radius"
import { Photography } from "@/docs/foundations/photography"
import { Spacing } from "@/docs/foundations/spacing"
import { Typography } from "@/docs/foundations/typography"

const TOPICS: Record<string, React.ComponentType> = {
  color: Color,
  typography: Typography,
  spacing: Spacing,
  layout: Layout,
  borders: Borders,
  grid: Grid,
  motion: Motion,
  "no-radius": NoRadius,
  logo: Logo,
  iconography: Iconography,
  photography: Photography,
}

/** No catch-all redirect, same rule as `App.tsx`'s own comment: an unknown
 * slug 404s visibly instead of silently landing somewhere else. */
export function FoundationPage() {
  const { slug = "" } = useParams()
  const Topic = TOPICS[slug]

  if (!Topic) {
    return (
      <Empty className="mt-12">
        <EmptyHeader>
          <EmptyTitle>Unknown foundation topic</EmptyTitle>
          <EmptyDescription>
            No foundation is registered under "{slug}".
          </EmptyDescription>
        </EmptyHeader>
      </Empty>
    )
  }

  return <Topic />
}
