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
            <Nav.Link as={Link} href="/createshop"><a className="nav-link">Create Shop</a></Nav.Link>
            <Nav.Link as={Link} href="/createprofile"><a className="nav-link">Create Profile</a></Nav.Link>
            <Nav.Link as={Link} href="/items"><a className="nav-link">Items</a></Nav.Link>
            <Nav.Link as={Link} href="/private"><a className="nav-link">Private</a></Nav.Link>
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
