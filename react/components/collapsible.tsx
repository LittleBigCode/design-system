import { Collapsible as CollapsiblePrimitive } from "@base-ui/react/collapsible";

/* Collapsible — a trigger and the panel it shows or hides.
   ---------------------------------------------------------------------------
   Behaviour only: no stylesheet ships, because there is nothing to paint. The
   panel is a plain block that is present or absent, and the parts a consumer
   wants to style — the trigger's chevron, the panel's inset — belong to
   whatever the collapsible is wrapping, not to the collapsible.

   Not an Accordion: Accordion is a set of these with one-open-at-a-time
   coordination and its own surface. Reach for Collapsible when a single region
   folds — a filter group, an "advanced" block of optional fields, a long log. */
function Collapsible({ ...props }: CollapsiblePrimitive.Root.Props) {
  return <CollapsiblePrimitive.Root data-slot="collapsible" {...props} />;
}

function CollapsibleTrigger({ ...props }: CollapsiblePrimitive.Trigger.Props) {
  return (
    <CollapsiblePrimitive.Trigger data-slot="collapsible-trigger" {...props} />
  );
}

function CollapsibleContent({ ...props }: CollapsiblePrimitive.Panel.Props) {
  return (
    <CollapsiblePrimitive.Panel data-slot="collapsible-content" {...props} />
  );
}

export { Collapsible, CollapsibleTrigger, CollapsibleContent };
