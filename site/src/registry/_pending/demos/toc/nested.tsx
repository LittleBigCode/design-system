import {
  Toc,
  TocItem,
  TocLabel,
  TocLink,
  TocList,
} from "@diametral/ui/components/toc"

export default function TocNested() {
  return (
    <Toc className="static">
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
