import React, { ChangeEvent, FormEvent, useState } from 'react'
import { Form } from 'react-bootstrap'
import { useDispatch } from 'react-redux'

import { sendLogInRequest } from '../../redux/actions/user'
import FormInputGroup from '../FormInputGroup'
import FormSubmitButton from '../FormSubmitButton'
import './SignInForm.scss'

const LoginForm = () => {
  const dispatch = useDispatch()
  const [username, setUsername] = useState<string>('')
  const [password, setPassWord] = useState<string>('')

  const submitHandler = (event: FormEvent) => {
    event.preventDefault()
    dispatch(sendLogInRequest(username, password))
  }

  const onPasswordChange = (event: ChangeEvent<HTMLInputElement>) => {
    setPassWord(event.target.value)
  }
  return (
    <div className="SignInForm-container">
      <Form onSubmit={submitHandler}>
        <FormInputGroup
          value={username}
          label="Username"
          onChangeHandler={(event: ChangeEvent<any>) =>
            setUsername(event.target.value)
          }
          type="text"
          placeholder="Enter your username..."
        />
        <FormInputGroup
          value={password}
          label="Password"
          onChangeHandler={(event: ChangeEvent<any>) =>
            setPassWord(event.target.value)
          }
          type="password"
          placeholder="Enter your password..."
        />
        <FormSubmitButton text="Sign In" />
        <br />
      </Form>
    </div>
  )
}

export default LoginForm
