import { Button, DarkThemeToggle, Navbar } from 'flowbite-react'
import { useNavigate } from 'react-router-dom'
import { Logo } from './logo'

const SubNavbar = () => {
  const navigate = useNavigate()

  return (
    <Navbar fluid>
      <Navbar.Brand href="https://flowbite-react.com">
        <Logo />
        <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">RestoFlow</span>
      </Navbar.Brand>
      <div className="flex md:order-2 space-x-3">
        <Button onClick={() => navigate('/products')}>Make Order</Button>
        <Button onClick={() => navigate('/register')}>Register</Button>
        <Button onClick={() => navigate('/login')}>Login</Button>
        <DarkThemeToggle />
        <Navbar.Toggle />
      </div>
      <Navbar.Collapse>
        <Navbar.Link active href="#">
          <p>Home</p>
        </Navbar.Link>
        <Navbar.Link onClick={() => navigate('/orders')}>Orders</Navbar.Link>
        <Navbar.Link onClick={() => navigate('/my-orders')}>My Orders</Navbar.Link>
        <Navbar.Link onClick={() => navigate('/create-product')}>Create Product</Navbar.Link>
        <Navbar.Link onClick={() => navigate('/edit-product')}>Edit Product</Navbar.Link>
        <Navbar.Link onClick={() => navigate('/my-tables')}>My Tables</Navbar.Link>
        <Navbar.Link onClick={() => navigate('/my-bills')}>My Bills</Navbar.Link>
        <Navbar.Link onClick={() => navigate('/all-bills')}>All Bills</Navbar.Link>
      </Navbar.Collapse>
    </Navbar>
  )
}

export { Navbar, SubNavbar }
