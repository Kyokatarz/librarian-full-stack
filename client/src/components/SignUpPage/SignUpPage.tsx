import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { Redirect } from 'react-router-dom'

import { RootState } from '../../types/rootState'
import { User } from '../../types/userTypes'
import SignUpForm from '../SignUpForm'

import './SignUpPage.scss'

const SignUpPage = () => {
  const user = useSelector<RootState, User>((state) => state.user)
  const [redirect, setRedirect] = useState('')

  useEffect(() => {
    if (user.isLoggedIn) setRedirect('/')
  }, [user])
  if (redirect) return <Redirect to={redirect} />

  return (
    <div className="SignUpPage">
      <div className="SignUpSection">
        <h2>Sign Up</h2>
        <SignUpForm />
      </div>
    </div>
  )
}

export default SignUpPage
