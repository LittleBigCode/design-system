"use client"

/* Direction — the RTL/LTR provider.
   ---------------------------------------------------------------------------
   A straight re-export of Base UI's direction provider, and the only component
   in this batch that renders nothing and styles nothing. It exists because
   several absorbed components read the ambient direction to decide which way
   an axis runs — `carousel`'s vertical controls and `button-group`'s shared
   edge both mirror under `dir="rtl"` — and Base UI's own primitives read it
   too. Wrapping a subtree in it is how you get an RTL island inside an LTR
   document without setting `dir` on <html>. */
export {
  DirectionProvider,
  useDirection,
} from "@base-ui/react/direction-provider";