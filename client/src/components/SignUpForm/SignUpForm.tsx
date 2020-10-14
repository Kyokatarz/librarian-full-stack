import { group } from 'console'
import React from 'react'
import { Button, Col, Form } from 'react-bootstrap'

import './SignUpForm.scss'

const SignUpForm = () => {
  return (
    <div className="SignUpForm">
      <Form>
        <Form.Group>
          <Form.Label>Username*</Form.Label>
          <Form.Control
            type="text"
            placeholder="Username"
            required
          ></Form.Control>
        </Form.Group>

        <Form.Group>
          <Form.Label>Email*</Form.Label>
          <Form.Control
            type="email"
            placeholder="Email"
            required
          ></Form.Control>
        </Form.Group>

        <Form.Row>
          <Col>
            <Form.Group>
              <Form.Label>Password*</Form.Label>
              <Form.Control
                type="password"
                placeholder="Password"
                required
                pattern="/^.{6,}$/"
              ></Form.Control>
            </Form.Group>
          </Col>

          <Col>
            <Form.Group>
              <Form.Label>Confirm Password*</Form.Label>
              <Form.Control
                type="password"
                placeholder="Confirm Password"
                required
              ></Form.Control>
            </Form.Group>
          </Col>
        </Form.Row>

        <Form.Row>
          <Col>
            <Form.Group>
              <Form.Label>First Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="First Name (optional)"
              ></Form.Control>
            </Form.Group>
          </Col>

          <Col>
            <Form.Group>
              <Form.Label>Last Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Last Name (optional)"
              ></Form.Control>
            </Form.Group>
          </Col>
        </Form.Row>

        <Form.Check
          type="checkbox"
          required
          label="By signing up, you argee to sell us your soul."
        />

        <Button block type="submit">
          Sign Up
        </Button>
      </Form>
    </div>
  )
}

export default SignUpForm
