import React from 'react'
import { Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'

const SignUpBtn = () => {
  return (
    <Link to="/signup">
      <Button variant="secondary">Sign Up</Button>
    </Link>
  )
}

export default SignUpBtn
