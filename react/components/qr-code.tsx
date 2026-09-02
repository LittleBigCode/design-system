import * as React from "react"

import { encodeQr, type QrErrorCorrectionLevel } from "../lib/qr-encode.js"
import { cx } from "../lib/cx.js"

// A QR code needs a light quiet zone and dark modules to scan reliably
// regardless of the surrounding theme, so the fill colors below are fixed
// rather than drawn from the token system — the one deliberate exception to
// "always use tokens" in this package.
function QrCode({
  className,
  value,
  level = "M",
  size = 200,
  margin = 4,
  ...props
}: Omit<React.ComponentProps<"svg">, "viewBox" | "children"> & {
  /** The text or URL to encode. */
  value: string
  /** Error-correction level: higher survives more damage but holds less data. */
  level?: QrErrorCorrectionLevel
  /** Rendered width/height in px (the code is square). */
  size?: number
  /** Quiet-zone width in modules on each side. */
  margin?: number
}) {
  let matrix
  try {
    matrix = encodeQr(value, level)
  } catch (error) {
    return (
      <div
        data-slot="qr-code"
        role="img"
        aria-label="QR code unavailable"
        className={cx("ds-qr-code-error", className)}
        style={{ width: size, height: size }}
      >
        {error instanceof Error ? error.message : "QR encoding failed"}
      </div>
    )
  }

  const { modules, size: modulesPerSide } = matrix
  const dim = modulesPerSide + margin * 2

  let path = ""
  for (let r = 0; r < modulesPerSide; r++) {
    for (let c = 0; c < modulesPerSide; c++) {
      if (modules[r][c]) path += `M${c + margin},${r + margin}h1v1h-1z`
    }
  }

  return (
    <svg
      data-slot="qr-code"
      role="img"
      aria-label={`QR code for ${value}`}
      viewBox={`0 0 ${dim} ${dim}`}
      width={size}
      height={size}
      shapeRendering="crispEdges"
      className={cx("ds-qr-code", className)}
      {...props}
    >
      <rect width={dim} height={dim} fill="#fff" />
      <path d={path} fill="#000" />
    </svg>
  )
}

export { QrCode }
