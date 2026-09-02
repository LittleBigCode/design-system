import type { ComponentProps } from "react"

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@diametral/ui/components/carousel"

export default function CarouselPlayground(
  props: ComponentProps<typeof Carousel>
) {
  return (
    <Carousel className="w-full max-w-3xs px-12" {...props}>
      <CarouselContent>
        {[1, 2, 3, 4].map((slide) => (
          <CarouselItem key={slide}>
            <div className="flex aspect-video items-center justify-center border border-border bg-muted/50 font-mono text-sm text-muted-foreground">
              {slide} / 4
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  )
}
