import React from 'react'
import SignUpForm from '../SignUpForm'

import './SignUpPage.scss'

const SignUpPage = () => {
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
