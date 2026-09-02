import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@diametral/ui/components/card"
import {
  DescriptionDetail,
  DescriptionList,
  DescriptionTerm,
} from "@diametral/ui/components/description-list"

export default function DescriptionListInCard() {
  return (
    <Card className="w-full max-w-sm">
      <CardHeader>
        <CardTitle>Facture INV-2041</CardTitle>
      </CardHeader>
      <CardContent>
        <DescriptionList>
          <DescriptionTerm>Émise le</DescriptionTerm>
          <DescriptionDetail>3 juin 2026</DescriptionDetail>
          <DescriptionTerm>Échéance</DescriptionTerm>
          <DescriptionDetail>3 juillet 2026</DescriptionDetail>
          <DescriptionTerm>Montant</DescriptionTerm>
          <DescriptionDetail>4 200 €</DescriptionDetail>
        </DescriptionList>
      </CardContent>
    </Card>
  )
}
