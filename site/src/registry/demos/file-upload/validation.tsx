import * as React from "react"

import {
  Field,
  FieldDescription,
  FieldError,
  FieldLabel,
  FileUpload,
  FileUploadDescription,
  FileUploadIcon,
  FileUploadTitle,
} from "@diametral/design-system/react"

const MAX_BYTES = 2_000_000

export default function FileUploadValidation() {
  const [accepted, setAccepted] = React.useState<string[]>([])
  const [rejected, setRejected] = React.useState<string[]>([])

  function receive(files: File[]) {
    const tooBig = files.filter((file) => file.size > MAX_BYTES)
    const notPdf = files.filter((file) => file.type !== "application/pdf")
    const bad = [...new Set([...tooBig, ...notPdf].map((file) => file.name))]

    setRejected(bad)
    setAccepted(
      files.filter((file) => !bad.includes(file.name)).map((file) => file.name)
    )
  }

  return (
    <Field className="max-w-sm">
      <FieldLabel>Devis signé</FieldLabel>
      <FileUpload
        accept="application/pdf"
        multiple
        onFiles={receive}
        aria-label="Upload the signed quote"
      >
        <FileUploadIcon />
        <FileUploadTitle>Drop the signed quote</FileUploadTitle>
        <FileUploadDescription>PDF only, 2 Mo maximum.</FileUploadDescription>
      </FileUpload>
      <FieldError
        errors={rejected.map((name) => ({
          message: `${name} is not a PDF under 2 Mo.`,
        }))}
      />
      {accepted.length > 0 && (
        <FieldDescription>Kept: {accepted.join(", ")}.</FieldDescription>
      )}
    </Field>
  )
}
