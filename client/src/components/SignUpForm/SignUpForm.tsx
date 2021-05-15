import React, { ChangeEvent, FormEvent, useState } from 'react'
import { Form } from 'react-bootstrap'
import { useDispatch } from 'react-redux'

import { LanguageContext } from '../../context/langContext'
import { languages } from '../../languages/languages'
import { signUserUp } from '../../redux/actions/user'
import CustomButton from '../CustomButton'
import FormInputGroup from '../FormInputGroup'

import './SignUpForm.scss'

const SignUpForm = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [email, setEmail] = useState('')
  const [lastName, setLastName] = useState('')
  const [firstName, setFirstName] = useState('')
  const [passwordMatch, setPasswordMatch] = useState(true)

  const dispatch = useDispatch()
  const { language } = React.useContext(LanguageContext)

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
          label={languages[language].user.username}
          onChangeHandler={(event: ChangeEvent<any>) =>
            setUsername(event.target.value)
          }
          type="type"
          placeholder={languages[language].inputPlaceholder.username}
        />
        <FormInputGroup
          value={email}
          label="Email"
          onChangeHandler={(event: ChangeEvent<any>) =>
            setEmail(event.target.value)
          }
          type="email"
          placeholder={languages[language].inputPlaceholder.email}
        />
        <div className="SignUpForm__Row">
          <FormInputGroup
            value={password}
            label={languages[language].user.password}
            onChangeHandler={onPasswordChange}
            type="password"
            placeholder={languages[language].inputPlaceholder.password}
          />
          <FormInputGroup
            value={confirmPassword}
            label={languages[language].user.confirmPassword}
            onChangeHandler={onConfirmPasswordChange}
            type="password"
            placeholder={languages[language].inputPlaceholder.confirmPassword}
          />
        </div>
        {!passwordMatch && (
          <Form.Text className="text-danger">
            {languages[language].user.passwordNoMatch}
          </Form.Text>
        )}

        <div className="SignUpForm__Row">
          <FormInputGroup
            value={firstName}
            label={languages[language].user.firstName}
            onChangeHandler={(event: ChangeEvent<any>) =>
              setFirstName(event.target.value)
            }
            type="text"
            placeholder={languages[language].inputPlaceholder.firstName}
          />
          <FormInputGroup
            value={lastName}
            label={languages[language].user.lastName}
            onChangeHandler={(event: ChangeEvent<any>) =>
              setLastName(event.target.value)
            }
            type="text"
            placeholder={languages[language].inputPlaceholder.lastName}
          />
        </div>

        <Form.Check
          type="checkbox"
          required
          label={languages[language].user.checkbox}
        />

        <CustomButton label={languages[language].user.signUp} type="submit" />
      </Form>
    </div>
  )
}

export default SignUpForm
