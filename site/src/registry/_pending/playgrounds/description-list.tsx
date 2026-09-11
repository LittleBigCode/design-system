import type { ComponentProps } from "react"

import {
  DescriptionDetail,
  DescriptionList,
  DescriptionTerm,
} from "@diametral/ui/components/description-list"

// The parts are plain dt/dd elements with no variant axis — composition is
// the API, so only the first term's label is worth editing here.
export default function DescriptionListPlayground({
  children,
  ...props
}: ComponentProps<typeof DescriptionList>) {
  return (
    <DescriptionList className="w-full max-w-sm" {...props}>
      <DescriptionTerm>{children}</DescriptionTerm>
      <DescriptionDetail>Diametral SAS</DescriptionDetail>
      <DescriptionTerm>Statut</DescriptionTerm>
      <DescriptionDetail>Actif</DescriptionDetail>
    </DescriptionList>
  )
}
