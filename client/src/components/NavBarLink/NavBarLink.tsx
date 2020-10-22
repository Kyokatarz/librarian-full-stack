import React from 'react'
import { Nav } from 'react-bootstrap'
import { Link } from 'react-router-dom'

import './NavBarLink.scss'

const NavBarLink = () => {
  return (
    <Nav
      as="ul"
      className=" NavbarLinkContainer NavbarLinkContainer--dark"
      variant="pills"
    >
      <Link to="/">
        <Nav.Item as="li" className="text-white">
          Home
        </Nav.Item>
      </Link>
      <Link to="/allbooks">
        <Nav.Item className="text-white">All Books</Nav.Item>
      </Link>
      <Link to="/author">
        <Nav.Item className="text-white">Authors</Nav.Item>
      </Link>
    </Nav>
  )
}

export default NavBarLink
