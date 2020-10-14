import React, { ChangeEvent, FormEvent, useState } from 'react'
import { Form, Button } from 'react-bootstrap'
import { useDispatch } from 'react-redux'
import axios from 'axios'

import './SignInForm.scss'
import { sendLogInRequest } from '../../redux/actions/user'

const LoginForm = () => {
  const dispatch = useDispatch()
  const [userName, setUserName] = useState<string>('')
  const [password, setPassWord] = useState<string>('')

  const submitHandler = async (event: FormEvent) => {
    event.preventDefault()
    dispatch(sendLogInRequest(userName, password))
  }

  const onChangeUsername = (event: ChangeEvent<HTMLInputElement>) => {
    setUserName(event.target.value)
  }
  const onChangePassword = (event: ChangeEvent<HTMLInputElement>) => {
    setPassWord(event.target.value)
  }

  return (
    <div className="SignInForm-container">
      <Form as="form" className="SignInForm" onSubmit={submitHandler}>
        <Form.Group>
          <Form.Label>Username</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter username..."
            onChange={onChangeUsername}
            value={userName}
            required
          />
        </Form.Group>

        <Form.Group>
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Enter password..."
            onChange={onChangePassword}
            value={password}
            required
          />
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
