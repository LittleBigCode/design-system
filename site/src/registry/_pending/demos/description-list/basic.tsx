import {
  DescriptionDetail,
  DescriptionList,
  DescriptionTerm,
} from "@diametral/ui/components/description-list"

export default function DescriptionListBasic() {
  return (
    <DescriptionList className="w-full max-w-sm">
      <DescriptionTerm>Client</DescriptionTerm>
      <DescriptionDetail>Régie Ouest</DescriptionDetail>
      <DescriptionTerm>Mission</DescriptionTerm>
      <DescriptionDetail>Refonte du design system</DescriptionDetail>
      <DescriptionTerm>Statut</DescriptionTerm>
      <DescriptionDetail>Actif</DescriptionDetail>
    </DescriptionList>
  )
}
