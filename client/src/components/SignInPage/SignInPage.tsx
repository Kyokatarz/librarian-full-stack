import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { Link, Redirect } from 'react-router-dom'
import { RootState } from '../../types/rootState'
import { User } from '../../types/userTypes'
import GoogleLogInBtn from '../GoogleLogInBtn'

import SignInForm from '../SignInForm'
import './SignInPage.scss'

const SignInPage: React.FC = () => {
  const user = useSelector<RootState, User>((state) => state.user)
  const [redirect, setRedirect] = useState<string>('')

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
          <h2>Sign In</h2>
          <div className="SignInSection-wrapper">
            <SignInForm />
            <span className="SignInSection__Or">Or</span>
            <GoogleLogInBtn />
          </div>
          <div className="SignInSection__Bottom">
            <Link to="/signup">Sign Up</Link>
            <Link to="/forgetpassword">Forget Password?</Link>
          </div>
        </div>
      )}
    </div>
  )
}

export default SignInPage
