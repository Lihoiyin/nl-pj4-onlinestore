import Link from 'next/link'
import Navbar from 'react-bootstrap/Navbar'
import Container from 'react-bootstrap/Container'
import Nav from 'react-bootstrap/Nav'
import { useSession, signIn, signOut } from 'next-auth/react'
import { BsBagCheck, BsGift, BsMinecartLoaded, BsPersonX, BsPersonPlus, BsPlusSquare, BsTags } from 'react-icons/bs'

export default function CompsLayoutsNavbar() {
  const { data: session } = useSession()

  return (
    <Navbar bg="dark" expand="lg" variant="dark">
      <Container>
        <Navbar.Brand as={Link} href="/"><a className="navbar-brand"><BsTags />Online Store</a></Navbar.Brand>

        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={Link} href="/items"><a className="nav-link"><BsGift />Items</a></Nav.Link>

            {
              session?.user?.profile && (
                <>
                  <Nav.Link as={Link} href="/my/orders"><a className="nav-link"><BsBagCheck />My Orders</a></Nav.Link>
                  <Nav.Link as={Link} href="/my/cart"><a className="nav-link"><BsMinecartLoaded />My Cart</a></Nav.Link>
                </>
              )
            }

            {
              session?.user?.shop && (
                <>
                  <Nav.Link as={Link} href="/my/shop/items"><a className="nav-link"><BsGift />My Items</a></Nav.Link>
                  <Nav.Link as={Link} href="/my/shop/createitem"><a className="nav-link"><BsPlusSquare />Create Items</a></Nav.Link>
                </>
              )
            }

            {
              session ? (
                <Nav.Link onClick={() => signOut({ callbackUrl: '/' })}><BsPersonX />Sign Out</Nav.Link>
              ) : (
                <Nav.Link onClick={() => signIn()}><BsPersonPlus />Sign In</Nav.Link>
              )
            }
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}

export const cart = []
