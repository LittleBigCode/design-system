import {
  Toc,
  TocItem,
  TocLabel,
  TocLink,
  TocList,
} from "@diametral/ui/components/toc"

export default function TocBasic() {
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
        <TocItem>
          <TocLink href="#toc">Usage</TocLink>
        </TocItem>
        <TocItem>
          <TocLink href="#toc">API reference</TocLink>
        </TocItem>
      </TocList>
    </Toc>
  )
}
