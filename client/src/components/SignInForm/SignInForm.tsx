import React, { ChangeEvent, FormEvent, useState } from 'react'
import { Form } from 'react-bootstrap'
import { useDispatch } from 'react-redux'

import { LanguageContext } from '../../context/langContext'
import { languages } from '../../languages/languages'
import { sendLogInRequest } from '../../redux/actions/user'
import FormInputGroup from '../FormInputGroup'
import FormSubmitButton from '../FormSubmitButton'

import './SignInForm.scss'

const LoginForm = () => {
  const dispatch = useDispatch()
  const { language } = React.useContext(LanguageContext)
  const [username, setUsername] = useState<string>('')
  const [password, setPassWord] = useState<string>('')

  const submitHandler = (event: FormEvent) => {
    event.preventDefault()
    dispatch(sendLogInRequest(username, password))
  }

  return (
    <div className="SignInForm-container">
      <Form onSubmit={submitHandler}>
        <FormInputGroup
          value={username}
          label={languages[language].user.username}
          onChangeHandler={(event: ChangeEvent<any>) =>
            setUsername(event.target.value)
          }
          type="text"
          placeholder={languages[language].inputPlaceholder.username}
        />
        <FormInputGroup
          value={password}
          label={languages[language].user.password}
          onChangeHandler={(event: ChangeEvent<any>) =>
            setPassWord(event.target.value)
          }
          type="password"
          placeholder={languages[language].inputPlaceholder.password}
        />
        <FormSubmitButton text={languages[language].user.signIn} />
        <br />
      </Form>
    </div>
  )
}

export default LoginForm
