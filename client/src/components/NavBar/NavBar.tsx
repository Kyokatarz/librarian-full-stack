import React from 'react'
import { Navbar } from 'react-bootstrap'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

import { RootState } from '../../types/rootState'
import { User } from '../../types/userTypes'
import HamburgerIcon from '../HamburgerIcon'
import NavbarIcon from '../NavbarIcon'
import NavBarLink from '../NavBarLink'
import SignInBtn from '../SignInBtn'
import SignUpBtn from '../SignUpBtn/'
import UserIcon from '../UserIcon'

import './NavBar.scss'

const NavBar = () => {
  const user = useSelector<RootState, User>((state) => state.user)
  return (
    <Navbar className="Navbar" variant="dark">
      <div className="Navbar__Start">
        <NavbarIcon />
        <Link to="/">
          <Navbar.Brand>Librarian</Navbar.Brand>
        </Link>
      </div>
      <div className="Navbar__End">
        <NavBarLink />

        {!user.isLoggedIn && (
          <div className="Navbar__Buttons">
            <SignInBtn />
            <SignUpBtn />
          </div>
        )}
      </div>

      {user.isLoggedIn && <UserIcon />}
      <HamburgerIcon />
    </Navbar>
  )
}

export default NavBar
