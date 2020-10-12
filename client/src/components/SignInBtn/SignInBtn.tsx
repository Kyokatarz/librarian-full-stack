import React from 'react'
import { Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'

const SignInBtn = () => {
  return (
    <div className="SignInBtn">
      <Link to="/signin">
        <Button variant="primary">Sign In</Button>
      </Link>
    </div>
  )
}

export default SignInBtn
