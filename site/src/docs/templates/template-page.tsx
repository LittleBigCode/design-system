import { useParams } from "react-router"

import {
  Empty,
  EmptyDescription,
  EmptyHeader,
  EmptyTitle,
} from "@diametral/design-system/react"

import { Dashboard } from "@/docs/templates/dashboard"
import { Error404 } from "@/docs/templates/error-404"
import { Login } from "@/docs/templates/login"

const TEMPLATES: Record<string, React.ComponentType> = {
  dashboard: Dashboard,
  login: Login,
  "error-404": Error404,
}

/** Same "no catch-all redirect" rule as the other section index pages. */
export function TemplatePage() {
  const { slug = "" } = useParams()
  const Template = TEMPLATES[slug]

  if (!Template) {
    return (
      <Empty className="mt-12">
        <EmptyHeader>
          <EmptyTitle>Unknown template</EmptyTitle>
          <EmptyDescription>
            No template is registered under "{slug}".
          </EmptyDescription>
        </EmptyHeader>
      </Empty>
    )
  }

  return <Template />
}
