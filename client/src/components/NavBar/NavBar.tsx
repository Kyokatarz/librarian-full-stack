import React from 'react'
import { Navbar, Nav } from 'react-bootstrap'

import HamburgerIcon from '../HamburgerIcon/index'
import './NavBar.scss'

const NavBar = () => {
  return (
    <Navbar className="Navbar" variant="dark">
      <Navbar.Brand>Librarian</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav"></Navbar.Toggle>
      <Nav className=" NavbarLinkContainer NavbarLinkContainer--dark">
        <Nav.Link>Home</Nav.Link>
        <Nav.Link>Books</Nav.Link>
      </Nav>
      <HamburgerIcon />
    </Navbar>
  )
}

export default NavBar
