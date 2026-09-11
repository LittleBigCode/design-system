import {
  Toc,
  TocItem,
  TocLabel,
  TocLink,
  TocList,
} from "@diametral/design-system/react"

export default function TocNested() {
  return (
    <Toc className="ds-toc--static">
      <TocLabel>On this page</TocLabel>
      <TocList>
        <TocItem>
          <TocLink href="#toc">Overview</TocLink>
        </TocItem>
        <TocItem>
          <TocLink href="#toc">Installation</TocLink>
        </TocItem>
        <TocItem level={2}>
          <TocLink href="#toc">Package manager</TocLink>
        </TocItem>
        <TocItem level={2}>
          <TocLink href="#toc">Manual</TocLink>
        </TocItem>
        <TocItem>
          <TocLink href="#toc">API reference</TocLink>
        </TocItem>
      </TocList>
    </Toc>
  )
}
