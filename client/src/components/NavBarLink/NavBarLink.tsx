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
        <Nav.Item className="text-white">Home</Nav.Item>
      </Link>
      <Nav.Item className="text-white">Something</Nav.Item>
    </Nav>
  )
}

export default NavBarLink
