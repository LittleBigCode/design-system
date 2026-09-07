import {
  Card,
  DescriptionDetail,
  DescriptionList,
  DescriptionTerm,
} from "@diametral/design-system/react"

/* Card is the incumbent until batch 7 lands the source's parts, so the heading
   arrives as `title` rather than as a CardHeader/CardTitle pair. */
export default function DescriptionListInCard() {
  return (
    <Card className="w-full max-w-sm" title="Facture INV-2041">
      <DescriptionList>
        <DescriptionTerm>Émise le</DescriptionTerm>
        <DescriptionDetail>3 juin 2026</DescriptionDetail>
        <DescriptionTerm>Échéance</DescriptionTerm>
        <DescriptionDetail>3 juillet 2026</DescriptionDetail>
        <DescriptionTerm>Montant</DescriptionTerm>
        <DescriptionDetail>4 200 €</DescriptionDetail>
      </DescriptionList>
    </Card>
  )
}
