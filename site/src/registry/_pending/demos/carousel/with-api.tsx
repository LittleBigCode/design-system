import * as React from "react"

import {
  Carousel,
  type CarouselApi,
  CarouselContent,
  CarouselItem,
} from "@diametral/ui/components/carousel"

const SLIDES = ["Charter", "Tokens", "Components", "Playground"]

export default function CarouselWithApi() {
  const [api, setApi] = React.useState<CarouselApi>()
  const [current, setCurrent] = React.useState(0)

  React.useEffect(() => {
    if (!api) return
    const update = () => setCurrent(api.selectedScrollSnap())
    update()
    api.on("select", update)
    return () => {
      api.off("select", update)
    }
  }, [api])

  return (
    <div className="flex w-full max-w-sm flex-col gap-3">
      <Carousel setApi={setApi}>
        <CarouselContent>
          {SLIDES.map((slide) => (
            <CarouselItem key={slide}>
              <div className="flex aspect-video items-center justify-center border border-border bg-muted/50 font-heading text-sm tracking-wider uppercase">
                {slide}
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>

      <div className="flex items-center gap-1.5">
        {SLIDES.map((slide, index) => (
          <button
            key={slide}
            type="button"
            aria-label={`Go to ${slide}`}
            aria-current={index === current}
            onClick={() => api?.scrollTo(index)}
            className="h-0.5 flex-1 bg-border aria-[current=true]:bg-foreground"
          />
        ))}
      </div>
    </div>
  )
}
