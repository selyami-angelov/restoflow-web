import { Footer as FlowbiteFooter } from 'flowbite-react'

export default function Footer() {
  return (
    <FlowbiteFooter container className="rounded-none">
      <FlowbiteFooter.Copyright by="Flowbite™" href="#" year={2022} />
      <FlowbiteFooter.LinkGroup className="flowbite-footer-link-group">
        <FlowbiteFooter.Link href="#">About</FlowbiteFooter.Link>
        <FlowbiteFooter.Link href="#">Privacy Policy</FlowbiteFooter.Link>
        <FlowbiteFooter.Link href="#">Licensing</FlowbiteFooter.Link>
        <FlowbiteFooter.Link href="#">Contact</FlowbiteFooter.Link>
      </FlowbiteFooter.LinkGroup>
    </FlowbiteFooter>
  )
}
