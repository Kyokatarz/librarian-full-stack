import React, { ChangeEvent, FormEvent, useState } from 'react'
import { Form, Button } from 'react-bootstrap'
import { useDispatch } from 'react-redux'

import './SignInForm.scss'
import { sendLogInRequest } from '../../redux/actions/user'
import UsernameInput from '../UsernameInput'
import PasswordInput from '../PasswordInput'
import FormSubmitButton from '../FormSubmitButton'

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
        <UsernameInput username={username} setUsername={setUsername} />
        <PasswordInput password={password} onChangeHandler={onPasswordChange} />
        <FormSubmitButton text="Sign In" />
        <br />
      </Form>
    </div>
  )
}

export default LoginForm
