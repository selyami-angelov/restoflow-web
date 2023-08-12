import { Footer as FlowbiteFooter } from 'flowbite-react'
import { useNavigate } from 'react-router-dom'

export default function Footer() {
  const navigate = useNavigate()
  return (
    <FlowbiteFooter container className="rounded-none">
      <FlowbiteFooter.Copyright by="RestoFlow" href="#" year={new Date().getFullYear()} />
      <FlowbiteFooter.LinkGroup className="flowbite-footer-link-group">
        <FlowbiteFooter.Link onClick={() => navigate('/about')} href="">
          About
        </FlowbiteFooter.Link>
        <FlowbiteFooter.Link onClick={() => navigate('/privacy')} href="#">
          Privacy Policy
        </FlowbiteFooter.Link>
        <FlowbiteFooter.Link onClick={() => navigate('/contacts')} href="">
          Contact
        </FlowbiteFooter.Link>
      </FlowbiteFooter.LinkGroup>
    </FlowbiteFooter>
  )
}
