import {
  FileUpload,
  FileUploadDescription,
  FileUploadIcon,
  FileUploadTitle,
} from "@diametral/design-system/react"

export default function FileUploadBasic() {
  return (
    <FileUpload accept=".csv,.tsv" multiple>
      <FileUploadIcon />
      <FileUploadTitle>Drop files or click to browse</FileUploadTitle>
      <FileUploadDescription>
        CSV or TSV, up to 20 MB each.
      </FileUploadDescription>
    </FileUpload>
  )
}
