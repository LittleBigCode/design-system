"use client"

import { Accordion as AccordionPrimitive } from "@base-ui/react/accordion"

import { cx, type WithClassName } from "../lib/cx.js"
import { CaretDownIcon, CaretUpIcon } from "@phosphor-icons/react"

function Accordion({ className, ...props }: WithClassName<AccordionPrimitive.Root.Props>) {
  return (
    <AccordionPrimitive.Root
      data-slot="accordion"
      className={cx("ds-accordion", className)}
      {...props}
    />
  )
}

function AccordionItem({ className, ...props }: WithClassName<AccordionPrimitive.Item.Props>) {
  return (
    <AccordionPrimitive.Item
      data-slot="accordion-item"
      className={cx("ds-accordion-item", className)}
      {...props}
    />
  )
}

function AccordionTrigger({
  className,
  children,
  ...props
}: WithClassName<AccordionPrimitive.Trigger.Props>) {
  return (
    <AccordionPrimitive.Header className="ds-accordion-header">
      <AccordionPrimitive.Trigger
        data-slot="accordion-trigger"
        className={cx("ds-accordion-trigger", className)}
        {...props}
      >
        {children}
        <CaretDownIcon data-slot="accordion-trigger-icon" className="ds-accordion-trigger-icon ds-accordion-trigger-icon--down" />
        <CaretUpIcon data-slot="accordion-trigger-icon" className="ds-accordion-trigger-icon ds-accordion-trigger-icon--up" />
      </AccordionPrimitive.Trigger>
    </AccordionPrimitive.Header>
  )
}

function AccordionContent({
  className,
  children,
  ...props
}: WithClassName<AccordionPrimitive.Panel.Props>) {
  return (
    <AccordionPrimitive.Panel
      data-slot="accordion-content"
      className="ds-accordion-content"
      {...props}
    >
      <div className={cx("ds-accordion-content-inner", className)}>
        {children}
      </div>
    </AccordionPrimitive.Panel>
  )
}

export { Accordion, AccordionItem, AccordionTrigger, AccordionContent }
