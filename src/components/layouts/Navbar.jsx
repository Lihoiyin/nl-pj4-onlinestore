import Link from 'next/link'
import Navbar from 'react-bootstrap/Navbar'
import Container from 'react-bootstrap/Container'
import Nav from 'react-bootstrap/Nav'
import { useSession, signIn, signOut } from 'next-auth/react'

export default function CompsLayoutsNavbar() {
  const { data: session } = useSession()

  return (
    <Navbar bg="light" expand="lg">
      <Container>
        <Navbar.Brand as={Link} href="/"><a className="navbar-brand">Online Store</a></Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={Link} href="/items"><a className="nav-link">Items</a></Nav.Link>

            {
              session?.user?.profile && (
                <>
                  <Nav.Link as={Link} href="/my/profile/orders"><a className="nav-link">My Orders</a></Nav.Link>
                  <Nav.Link as={Link} href="/my/profile"><a className="nav-link">My Profile</a></Nav.Link>
                </>
              )
            }

            {
              session?.user?.shop && (
                <>
                  <Nav.Link as={Link} href="/my/shop/items"><a className="nav-link">My Items</a></Nav.Link>
                  <Nav.Link as={Link} href="/my/shop/orders"><a className="nav-link">My Orders</a></Nav.Link>
                  <Nav.Link as={Link} href="/my/shop"><a className="nav-link">My Shop</a></Nav.Link>
                </>
              )
            }

            {
              session ? (
                <Nav.Link onClick={() => signOut({ callbackUrl: '/' })}>Sign Out</Nav.Link>
              ) : (
                <Nav.Link onClick={() => signIn()}>Sign In</Nav.Link>
              )
            }
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}

export const cart = []
