import React, { FormEvent, useState } from 'react'
import { Button, Col, Form } from 'react-bootstrap'
import { useDispatch } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { signUserUp } from '../../redux/actions/user'

import './SignUpForm.scss'

const SignUpForm = () => {
  const [username, setUserName] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [email, setEmail] = useState('')
  const [lastName, setLastName] = useState('')
  const [firstName, setFirstName] = useState('')
  const [passwordMatch, setPasswordMatch] = useState(true)
  const [redirect, setRedirect] = useState('')

  const dispatch = useDispatch()

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault()
    // if (password !== confirmPassword) {
    //   setPasswordMatch(false)
    //   return
    // } //TODO: Uncomment this

    dispatch(
      signUserUp({
        username,
        password,
        email,
        lastName,
        firstName,
      })
    )
  }

  return (
    <div className="SignUpForm">
      <Form as="form" onSubmit={(event) => handleSubmit(event)}>
        <Form.Group>
          <Form.Label>Username*</Form.Label>
          <Form.Control
            type="text"
            placeholder="Username"
            required
            onChange={(event) => {
              setUserName(event.target.value)
            }}
            value={username}
          ></Form.Control>
        </Form.Group>

        <Form.Group>
          <Form.Label>Email*</Form.Label>
          <Form.Control
            type="email"
            placeholder="Email"
            required
            onChange={(event) => {
              setEmail(event.target.value)
            }}
            value={email}
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
                onChange={(event) => {
                  if (!passwordMatch) setPasswordMatch(true)
                  setPassword(event.target.value)
                }}
                value={password}
              ></Form.Control>
              {!passwordMatch && (
                <Form.Text className="text-danger">
                  Passwords don't match
                </Form.Text>
              )}
            </Form.Group>
          </Col>

          <Col>
            <Form.Group>
              <Form.Label>Confirm Password*</Form.Label>
              <Form.Control
                type="password"
                placeholder="Confirm Password"
                required
                onChange={(event) => {
                  if (!passwordMatch) setPasswordMatch(true)
                  setConfirmPassword(event.target.value)
                }}
                value={confirmPassword}
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
                onChange={(event) => {
                  setFirstName(event.target.value)
                }}
                value={firstName}
              ></Form.Control>
            </Form.Group>
          </Col>

          <Col>
            <Form.Group>
              <Form.Label>Last Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Last Name (optional)"
                onChange={(event) => {
                  setLastName(event.target.value)
                }}
                value={lastName}
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
