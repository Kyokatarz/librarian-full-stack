import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { Link, Redirect } from 'react-router-dom'
import { LanguageContext } from '../../context/langContext'
import { languages } from '../../languages/languages'

import { RootState } from '../../types/rootState'
import { User } from '../../types/userTypes'
import GoogleLogInBtn from '../../components/GoogleLogInBtn'
import SignInForm from '../../components/SignInForm'

import './SignInPage.scss'

const SignInPage: React.FC = () => {
  const user = useSelector<RootState, User>((state) => state.user)
  const [redirect, setRedirect] = useState<string>('')
  const { language } = React.useContext(LanguageContext)

  useEffect(() => {
    if (user.isLoggedIn) {
      setRedirect('/')
    }
  }, [user])

  if (redirect) return <Redirect to={redirect} />

  return (
    <div className="SignInPage">
      {!user.isLoggedIn && (
        <div className="SignInSection">
          <h2>{languages[language].user.signIn}</h2>
          <div className="SignInSection-wrapper">
            <SignInForm />
            <span className="SignInSection__Or"></span>
            <GoogleLogInBtn />
          </div>
          <div className="SignInSection__Bottom">
            <Link to="/signup">{languages[language].user.signUp}</Link>
            <Link to="/forgetpassword">
              {languages[language].user.forgetPassword}
            </Link>
          </div>
        </div>
      )}
    </div>
  )
}

export default SignInPage
