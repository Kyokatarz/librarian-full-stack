import React from 'react'
import { Navbar } from 'react-bootstrap'
import { Link } from 'react-router-dom'

import HamburgerIcon from '../HamburgerIcon'
import NavBarLink from '../NavBarLink'
import SignInBtn from '../SignInBtn'
import SignUpBtn from '../SignUpBtn/'

import './NavBar.scss'

const NavBar = () => {
  return (
    <Navbar className="Navbar" variant="dark">
      <Link to="/">
        <Navbar.Brand>Librarian</Navbar.Brand>
      </Link>
      <div className="Navbar__End">
        <NavBarLink />
        <div className="Navbar__Buttons">
          <SignInBtn />
          <SignUpBtn />
        </div>
      </div>

      {/* <UserIcon /> */}
      <HamburgerIcon />
    </Navbar>
  )
}

export default NavBar
