import React, { useContext } from 'react'
import { Nav } from 'react-bootstrap'
import { Link } from 'react-router-dom'

import { languages } from '../../languages/languages'
import { LanguageContext } from '../../context/langContext'

import './NavBarLink.scss'
import LanguageButton from '../LanguageButton'

const NavBarLink = () => {
  const { language } = useContext(LanguageContext)
  return (
    <Nav
      as="ul"
      className=" NavbarLinkContainer NavbarLinkContainer--dark"
      variant="pills"
    >
      <Link to="/">
        <Nav.Item as="li" className="text-white">
          {languages[language].homePage}
        </Nav.Item>
      </Link>
      <Link to="/allbooks">
        <Nav.Item className="text-white">
          {languages[language].library}
        </Nav.Item>
      </Link>
      <Link to="/author">
        <Nav.Item className="text-white">{languages[language].author}</Nav.Item>
      </Link>
      <LanguageButton />
    </Nav>
  )
}

export default NavBarLink
