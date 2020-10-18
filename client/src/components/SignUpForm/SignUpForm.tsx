import React, { ChangeEvent, FormEvent, useState } from 'react'
import { Form } from 'react-bootstrap'
import { useDispatch } from 'react-redux'

import { signUserUp } from '../../redux/actions/user'
import FormInputGroup from '../FormInputGroup'
import FormSubmitButton from '../FormSubmitButton'
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

  const onConfirmPasswordChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (!passwordMatch) setPasswordMatch(true)
    setConfirmPassword(event.target.value)
  }
  const handleSubmit = (event: FormEvent) => {
    event.preventDefault()
    if (password !== confirmPassword) {
      setPasswordMatch(false)
      return
    }

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
        <FormInputGroup
          value={username}
          label="Username"
          onChangeHandler={(event: ChangeEvent<any>) =>
            setUsername(event.target.value)
          }
          type="type"
          placeholder="Enter your username..."
        />
        <FormInputGroup
          value={email}
          label="Password"
          onChangeHandler={(event: ChangeEvent<any>) =>
            setEmail(event.target.value)
          }
          type="email"
          placeholder="Enter your email..."
        />
        <div className="SignUpForm__Row">
          <FormInputGroup
            value={password}
            label="Password"
            onChangeHandler={onPasswordChange}
            type="password"
            placeholder="Enter your password..."
          />
          <FormInputGroup
            value={confirmPassword}
            label="Confirm Password"
            onChangeHandler={onConfirmPasswordChange}
            type="password"
            placeholder="Confirm your password..."
          />
        </div>
        {!passwordMatch && (
          <Form.Text className="text-danger">Passwords don't match</Form.Text>
        )}

        <div className="SignUpForm__Row">
          <FormInputGroup
            value={firstName}
            label="First Name"
            onChangeHandler={(event: ChangeEvent<any>) =>
              setFirstName(event.target.value)
            }
            type="text"
            placeholder="Enter your First Name (optional)..."
          />
          <FormInputGroup
            value={lastName}
            label="Last Name"
            onChangeHandler={(event: ChangeEvent<any>) =>
              setLastName(event.target.value)
            }
            type="text"
            placeholder="Enter your Last Name (optional)..."
          />
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
