import React from 'react'
import { Link } from 'react-router-dom'
import GoogleLogInBtn from '../GoogleLogInBtn'

import SignInForm from '../SignInForm'
import './SignInPage.scss'

const SignInPage = () => {
  return (
    <div className="SignInPage">
      <div className="SignInSection">
        <h2>Sign In</h2>
        <div className="SignInSection-wrapper">
          <SignInForm />
          <GoogleLogInBtn />
        </div>
        <div className="SignInSection__Bottom">
          <Link to="/signup">Sign Up</Link>
          <Link to="/forgetpassword">Forget Password?</Link>
        </div>
      </div>
    </div>
  )
}

export default SignInPage
