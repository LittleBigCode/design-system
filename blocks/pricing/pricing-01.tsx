import {
  Badge,
  Button,
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@diametral/design-system/react"

const PLANS = [
  {
    name: "Starter",
    price: "€0",
    features: ["1 pricing matrix", "3 seats", "Manual export"],
    cta: "Start free",
    featured: false,
  },
  {
    name: "Growth",
    price: "€49",
    features: [
      "Unlimited matrices",
      "20 seats",
      "Live margin engine",
      "API access",
    ],
    cta: "Choose Growth",
    featured: true,
  },
  {
    name: "Scale",
    price: "€199",
    features: [
      "Everything in Growth",
      "Unlimited seats",
      "SSO & audit log",
      "Dedicated support",
    ],
    cta: "Contact sales",
    featured: false,
  },
]

export default function Pricing01() {
  return (
    <div className="grid w-full sm:grid-cols-3">
      {PLANS.map((plan) => (
        <Card
          key={plan.name}
          className={
            plan.featured ? "ds-frame--accent" : "border-s-0 first:border-s"
          }
        >
          <CardHeader>
            {plan.featured ? (
              <Badge variant="accent">Most popular</Badge>
            ) : (
              <span className="ds-gridlabel">{plan.name}</span>
            )}
            <p className="font-heading mt-1 text-4xl tracking-tight">
              {plan.price}
              <small className="ms-1 text-sm text-muted-foreground">/ mo</small>
            </p>
          </CardHeader>
          <CardContent>
            <ul className="divide-y divide-border text-sm text-muted-foreground">
              {plan.features.map((feature) => (
                <li key={feature} className="py-2.5">
                  {feature}
                </li>
              ))}
            </ul>
          </CardContent>
          <CardFooter>
            <Button variant="primary" block render={<a href="#pricing-01" />}>
              {plan.cta}
            </Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  )
}
