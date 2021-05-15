import React, { useContext } from 'react'
import { Navbar } from 'react-bootstrap'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

import { RootState } from '../../types/rootState'
import { User } from '../../types/userTypes'
import HamburgerIcon from './components/HamburgerIcon'
import NavbarIcon from './components/NavbarIcon'
import NavBarLink from './components/NavBarLink'
import CustomButton from '../CustomButton'
import UserIcon from '../UserIcon'

import './NavBar.scss'
import { LanguageContext } from '../../context/langContext'
import { languages } from '../../languages/languages'

const NavBar = () => {
  const user = useSelector<RootState, User>((state) => state.user)
  const { language } = useContext(LanguageContext)
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
            <Link to="/signin">
              <CustomButton label={languages[language].user.signIn} />
            </Link>

            <Link to="/signup">
              <CustomButton
                label={languages[language].user.signUp}
                variant="secondary"
              />
            </Link>
          </div>
        )}
      </div>

      {user.isLoggedIn && <UserIcon />}
      <HamburgerIcon />
    </Navbar>
  )
}

export default NavBar
