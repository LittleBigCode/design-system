"use client"

import * as React from "react"
import useEmblaCarousel, {
  type UseEmblaCarouselType,
} from "embla-carousel-react"

import { cx } from "../lib/cx.js"
import { IconButton } from "./icon-button.js"
import { CaretLeftIcon, CaretRightIcon } from "@phosphor-icons/react"

type CarouselApi = UseEmblaCarouselType[1]
type UseCarouselParameters = Parameters<typeof useEmblaCarousel>
type CarouselOptions = UseCarouselParameters[0]
type CarouselPlugin = UseCarouselParameters[1]

type CarouselProps = {
  opts?: CarouselOptions
  plugins?: CarouselPlugin
  orientation?: "horizontal" | "vertical"
  setApi?: (api: CarouselApi) => void
}

type CarouselContextProps = {
  carouselRef: ReturnType<typeof useEmblaCarousel>[0]
  api: ReturnType<typeof useEmblaCarousel>[1]
  scrollPrev: () => void
  scrollNext: () => void
  canScrollPrev: boolean
  canScrollNext: boolean
} & CarouselProps

const CarouselContext = React.createContext<CarouselContextProps | null>(null)

function useCarousel() {
  const context = React.useContext(CarouselContext)

  if (!context) {
    throw new Error("useCarousel must be used within a <Carousel />")
  }

  return context
}

function Carousel({
  orientation = "horizontal",
  opts,
  setApi,
  plugins,
  className,
  children,
  ...props
}: React.ComponentProps<"div"> & CarouselProps) {
  const [carouselRef, api] = useEmblaCarousel(
    {
      ...opts,
      axis: orientation === "horizontal" ? "x" : "y",
    },
    plugins
  )
  const [canScrollPrev, setCanScrollPrev] = React.useState(false)
  const [canScrollNext, setCanScrollNext] = React.useState(false)

  const onSelect = React.useCallback((api: CarouselApi) => {
    if (!api) return
    setCanScrollPrev(api.canScrollPrev())
    setCanScrollNext(api.canScrollNext())
  }, [])

  const scrollPrev = React.useCallback(() => {
    api?.scrollPrev()
  }, [api])

  const scrollNext = React.useCallback(() => {
    api?.scrollNext()
  }, [api])

  const handleKeyDown = React.useCallback(
    (event: React.KeyboardEvent<HTMLDivElement>) => {
      if (event.key === "ArrowLeft") {
        event.preventDefault()
        scrollPrev()
      } else if (event.key === "ArrowRight") {
        event.preventDefault()
        scrollNext()
      }
    },
    [scrollPrev, scrollNext]
  )

  React.useEffect(() => {
    if (!api || !setApi) return
    setApi(api)
  }, [api, setApi])

  React.useEffect(() => {
    if (!api) return
    onSelect(api)
    api.on("reInit", onSelect)
    api.on("select", onSelect)

    return () => {
      api?.off("select", onSelect)
    }
  }, [api, onSelect])

  return (
    <CarouselContext.Provider
      value={{
        carouselRef,
        api: api,
        opts,
        orientation:
          orientation || (opts?.axis === "y" ? "vertical" : "horizontal"),
        scrollPrev,
        scrollNext,
        canScrollPrev,
        canScrollNext,
      }}
    >
      <div
        onKeyDownCapture={handleKeyDown}
        className={cx("ds-carousel", className)}
        role="region"
        aria-roledescription="carousel"
        data-slot="carousel"
        {...props}
      >
        {children}
      </div>
    </CarouselContext.Provider>
  )
}

function CarouselContent({ className, ...props }: React.ComponentProps<"div">) {
  const { carouselRef, orientation } = useCarousel()

  return (
    <div
      ref={carouselRef}
      className="ds-carousel-viewport"
      data-slot="carousel-content"
    >
      <div
        data-orientation={orientation}
        className={cx("ds-carousel-content", className)}
        {...props}
      />
    </div>
  )
}

function CarouselItem({ className, ...props }: React.ComponentProps<"div">) {
  const { orientation } = useCarousel()

  return (
    <div
      role="group"
      aria-roledescription="slide"
      data-slot="carousel-item"
      data-orientation={orientation}
      className={cx("ds-carousel-item basis-full", className)}
      {...props}
    />
  )
}

/**
 * `IconButton` makes `label` required — the accessible name is the whole
 * component. Both controls already supply one, so re-exporting the prop as
 * required made `<CarouselPrevious />` a type error at every call site while
 * rendering correctly; the four carousel demos were failing `tsc -p
 * tsconfig.docs.json` on exactly that.
 */
type CarouselControlProps = Omit<
  React.ComponentProps<typeof IconButton>,
  "label"
> & { label?: string }

function CarouselPrevious({
  className,
  variant = "outline",
  size = "icon-sm",
  label = "Previous slide",
  ...props
}: CarouselControlProps) {
  const { orientation, scrollPrev, canScrollPrev } = useCarousel()

  return (
    <IconButton
      data-slot="carousel-previous"
      data-orientation={orientation}
      variant={variant}
      size={size}
      label={label}
      className={cx("ds-carousel-control", className)}
      disabled={!canScrollPrev}
      onClick={scrollPrev}
      {...props}
    >
      <CaretLeftIcon className="ds-carousel-control-icon" />
    </IconButton>
  )
}

function CarouselNext({
  className,
  variant = "outline",
  size = "icon-sm",
  label = "Next slide",
  ...props
}: CarouselControlProps) {
  const { orientation, scrollNext, canScrollNext } = useCarousel()

  return (
    <IconButton
      data-slot="carousel-next"
      data-orientation={orientation}
      variant={variant}
      size={size}
      label={label}
      className={cx("ds-carousel-control", className)}
      disabled={!canScrollNext}
      onClick={scrollNext}
      {...props}
    >
      <CaretRightIcon className="ds-carousel-control-icon" />
    </IconButton>
  )
}

export {
  type CarouselApi,
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
  useCarousel,
}
