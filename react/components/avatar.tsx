"use client"

import * as React from "react"
import { Avatar as AvatarPrimitive } from "@base-ui/react/avatar"

import { bcx } from "../lib/baseClass.js"
import { cx } from "../lib/cx.js"

/* Avatar — a square portrait with an image, a fallback and a corner badge.
   ---------------------------------------------------------------------------
   Base UI's Avatar underneath, which is the part 0.x's applier did not have:
   the fallback appears only once the image has actually failed or is still
   loading, rather than sitting under a transparent <img> that never arrives.

   Sizing moves from --sm/--lg modifier classes to `size`, which lands as
   data-size — so a group can size its overflow count off its members with a
   `:has()` rule instead of the caller restating the size twice. */
function Avatar({
  className,
  size = "default",
  ...props
}: AvatarPrimitive.Root.Props & { size?: "default" | "sm" | "lg" }) {
  return (
    <AvatarPrimitive.Root
      data-slot="avatar"
      data-size={size}
      className={bcx("ds-avatar", className)}
      {...props}
    />
  )
}

function AvatarImage({ className, ...props }: AvatarPrimitive.Image.Props) {
  return (
    <AvatarPrimitive.Image
      data-slot="avatar-image"
      className={bcx("ds-avatar-image", className)}
      {...props}
    />
  )
}

function AvatarFallback({ className, ...props }: AvatarPrimitive.Fallback.Props) {
  return (
    <AvatarPrimitive.Fallback
      data-slot="avatar-fallback"
      className={bcx("ds-avatar-fallback", className)}
      {...props}
    />
  )
}

function AvatarBadge({ className, ...props }: React.ComponentProps<"span">) {
  return (
    <span
      data-slot="avatar-badge"
      className={cx("ds-avatar-badge", className)}
      {...props}
    />
  )
}

function AvatarGroup({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="avatar-group"
      className={cx("ds-avatar-group", className)}
      {...props}
    />
  )
}

function AvatarGroupCount({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="avatar-group-count"
      className={cx("ds-avatar-group-count", className)}
      {...props}
    />
  )
}

export {
  Avatar,
  AvatarImage,
  AvatarFallback,
  AvatarBadge,
  AvatarGroup,
  AvatarGroupCount,
}
