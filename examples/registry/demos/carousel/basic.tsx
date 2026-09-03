import { IconButton } from "@diametral/design-system/react"
import { CaretLeftIcon, CaretRightIcon } from "@phosphor-icons/react"

/* Stylesheet-only component: `carousel`'s React binding wraps
   embla-carousel-react, which this package does not depend on, so there are no
   Carousel* exports to import. The classes below are the whole contract — this
   is the markup a binding has to produce, and `.ds-carousel-*` styles it either
   way. The slides are static here; the drag, the snap and the wrap are the
   binding's job.

   `--third` is the modifier that replaced the source's literal `basis-1/3`
   override: three slides at a time instead of one. `--half` is the other. */
export default function CarouselBasic() {
  return (
    <div className="ds-carousel w-full max-w-md px-12">
      {/* The viewport clips; the track inside it is what a binding translates. */}
      <div className="ds-carousel-viewport">
        <div className="ds-carousel-content" data-orientation="horizontal">
          {Array.from({ length: 6 }, (_, index) => (
            <div
              key={index}
              className="ds-carousel-item ds-carousel-item--third"
              data-orientation="horizontal"
              role="group"
              aria-roledescription="slide"
              aria-label={`Slide ${index + 1} of 6`}
            >
              <div className="flex aspect-square items-center justify-center border border-border bg-muted/50 font-mono text-sm text-muted-foreground">
                {index + 1}
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* The controls are IconButtons parked outside the viewport. The source
          hid their names in an `sr-only` span; this package has no such
          utility, and `IconButton` requires `label`, so the name is the prop. */}
      <IconButton
        label="Previous slide"
        className="ds-carousel-control"
        data-slot="carousel-previous"
        data-orientation="horizontal"
        disabled
      >
        <CaretLeftIcon className="ds-carousel-control-icon" />
      </IconButton>
      <IconButton
        label="Next slide"
        className="ds-carousel-control"
        data-slot="carousel-next"
        data-orientation="horizontal"
      >
        <CaretRightIcon className="ds-carousel-control-icon" />
      </IconButton>
    </div>
  )
}
