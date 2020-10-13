import React from 'react'
import { Form, Button } from 'react-bootstrap'

import './SignInForm.scss'

const LoginForm = () => {
  return (
    <div className="SignInForm-container">
      <Form className="SignInForm">
        <Form.Group>
          <Form.Label>Username</Form.Label>
          <Form.Control type="text" placeholder="Enter username..." />
        </Form.Group>

        <Form.Group>
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" placeholder="Enter password..." />
        </Form.Group>

        <Button type="submit" variant="primary" block>
          Sign In
        </Button>
        <br />
      </Form>
    </div>
  )
}

export default LoginForm
