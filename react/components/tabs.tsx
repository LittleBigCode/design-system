"use client"

import { Tabs as TabsPrimitive } from "@base-ui/react/tabs"

import { cx, type WithClassName } from "../lib/cx.js"
import { variants } from "../lib/variants.js"

function Tabs({
  className,
  orientation = "horizontal",
  ...props
}: WithClassName<TabsPrimitive.Root.Props>) {
  return (
    <TabsPrimitive.Root
      data-slot="tabs"
      data-orientation={orientation}
      className={cx("ds-tabs", className)}
      {...props}
    />
  )
}

const tabsListVariants = variants("ds-tabs-list", {
  variants: {
    variant: {
      default: "ds-tabs-list--default",
      line: "ds-tabs-list--line",
    },
  },
  defaultVariants: {
    variant: "default",
  },
})

function TabsList({
  className,
  variant = "default",
  ...props
}: WithClassName<TabsPrimitive.List.Props> & { variant?: "default" | "line" }) {
  return (
    <TabsPrimitive.List
      data-slot="tabs-list"
      data-variant={variant}
      className={cx(tabsListVariants({ variant, className }))}
      {...props}
    />
  )
}

function TabsTrigger({ className, ...props }: WithClassName<TabsPrimitive.Tab.Props>) {
  return (
    <TabsPrimitive.Tab
      data-slot="tabs-trigger"
      className={cx("ds-tabs-trigger", className)}
      {...props}
    />
  )
}

function TabsContent({ className, ...props }: WithClassName<TabsPrimitive.Panel.Props>) {
  return (
    <TabsPrimitive.Panel
      data-slot="tabs-content"
      className={cx("ds-tabs-content text-sm", className)}
      {...props}
    />
  )
}

export { Tabs, TabsList, TabsTrigger, TabsContent, tabsListVariants }
