import React from 'react'
import { Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'

import { LanguageContext } from '../../context/langContext'
import { languages } from '../../languages/languages'

const SignUpBtn = () => {
  const { language } = React.useContext(LanguageContext)
  return (
    <Link to="/signup">
      <Button variant="secondary">{languages[language].user.signUp}</Button>
    </Link>
  )
}

export default SignUpBtn
