import React, { useContext, useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { LanguageContext } from '../../context/langContext'

import { RootState } from '../../types/rootState'
import { User } from '../../types/userTypes'
import SignUpForm from '../SignUpForm'
import { languages } from '../../languages/languages'
import './SignUpPage.scss'

const SignUpPage = () => {
  const user = useSelector<RootState, User>((state) => state.user)
  const [redirect, setRedirect] = useState('')
  const { language } = useContext(LanguageContext)

  useEffect(() => {
    if (user.isLoggedIn) setRedirect('/')
  }, [user])
  if (redirect) return <Redirect to={redirect} />

  return (
    <div className="SignUpPage">
      <div className="SignUpSection">
        <h2>{languages[language].user.signUp}</h2>
        <SignUpForm />
      </div>
    </div>
  )
}

export default SignUpPage
