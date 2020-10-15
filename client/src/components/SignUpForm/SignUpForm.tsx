import React, { ChangeEvent, FormEvent, useState } from 'react'
import { Form } from 'react-bootstrap'
import { useDispatch } from 'react-redux'

import { signUserUp } from '../../redux/actions/user'
import ConfirmPasswordInput from '../ConfirmPasswordInput'
import EmailInput from '../EmailInput'
import FirstNameInput from '../FirstNameInput'
import FormSubmitButton from '../FormSubmitButton'
import LastNameInput from '../LastNameInput'
import PasswordInput from '../PasswordInput'
import UsernameInput from '../UsernameInput'

import './SignUpForm.scss'

const SignUpForm = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [email, setEmail] = useState('')
  const [lastName, setLastName] = useState('')
  const [firstName, setFirstName] = useState('')
  const [passwordMatch, setPasswordMatch] = useState(true)
  const [redirect, setRedirect] = useState('')

  const dispatch = useDispatch()

  const onPasswordChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (!passwordMatch) setPasswordMatch(true)
    setPassword(event.target.value)
  }
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
        <UsernameInput username={username} setUsername={setUsername} />
        <EmailInput inputEmail={email} setInputEmail={setEmail} />
        <div className="SignUpForm__Row">
          <PasswordInput
            password={password}
            onChangeHandler={onPasswordChange}
          />
          <ConfirmPasswordInput
            confirmPassword={confirmPassword}
            setConfirmPassword={setConfirmPassword}
            passwordMatch={passwordMatch}
            setPasswordMatch={setPasswordMatch}
          />
        </div>

        <div className="SignUpForm__Row">
          <FirstNameInput inputFN={firstName} setInputFN={setFirstName} />
          <LastNameInput inputLN={lastName} setInputLN={setLastName} />
        </div>

        <Form.Check
          type="checkbox"
          required
          label="By signing up, you argee to sell us your soul."
        />

        <FormSubmitButton text="Sign Up" />
      </Form>
    </div>
  )
}

export default SignUpForm
