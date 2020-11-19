import React from 'react'
import { Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'

import { LanguageContext } from '../../context/langContext'
import { languages } from '../../languages/languages'

const SignInBtn = () => {
  const { language } = React.useContext(LanguageContext)
  return (
    <div className="SignInBtn">
      <Link to="/signin">
        <Button variant="primary">{languages[language].user.signIn}</Button>
      </Link>
    </div>
  )
}

export default SignInBtn
