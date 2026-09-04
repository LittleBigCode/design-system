import { FileUpload } from "@diametral/design-system/react"

export default function FileUploadBasic() {
  return (
    <FileUpload
      accept=".csv,.tsv"
      multiple
      hint="CSV or TSV, up to 20 MB each."
    />
  )
}
