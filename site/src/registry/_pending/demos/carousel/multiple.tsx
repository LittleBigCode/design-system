import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@diametral/ui/components/carousel"

export default function CarouselMultiple() {
  return (
    <div className="w-full max-w-md px-12">
      <Carousel opts={{ align: "start" }}>
        <CarouselContent>
          {Array.from({ length: 7 }, (_, index) => (
            <CarouselItem key={index} className="basis-1/3">
              <div className="flex aspect-square items-center justify-center border border-border bg-muted/50 font-mono text-sm text-muted-foreground">
                {index + 1}
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  )
}
