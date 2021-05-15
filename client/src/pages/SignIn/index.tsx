import React, { ChangeEvent, FormEvent, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, Redirect } from 'react-router-dom'
import { LanguageContext } from '../../context/langContext'
import { languages } from '../../languages/languages'

import { RootState } from '../../types/rootState'
import { User } from '../../types/userTypes'
import GoogleLogInBtn from '../../components/GoogleLogInBtn'

import './SignInPage.scss'
import { Form } from 'react-bootstrap'
import CustomButton from '../../components/CustomButton'
import FormInputGroup from '../../components/FormInputGroup'
import { sendLogInRequest } from '../../redux/actions'

const SignInPage: React.FC = () => {
  const user = useSelector<RootState, User>((state) => state.user)
  const { language } = React.useContext(LanguageContext)
  const dispatch = useDispatch()

  const [redirect, setRedirect] = useState<string>('')
  const [username, setUsername] = useState<string>('')
  const [password, setPassWord] = useState<string>('')

  const submitHandler = (event: FormEvent) => {
    event.preventDefault()
    dispatch(sendLogInRequest(username, password))
  }

  useEffect(() => {
    if (user.isLoggedIn) {
      setRedirect('/')
    }
  }, [user])

  if (redirect) return <Redirect to={redirect} />

  return (
    <div className="SignInPage">
      {!user.isLoggedIn && (
        <div className="SignInSection">
          <h2>{languages[language].user.signIn}</h2>
          <div className="SignInSection-wrapper">
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
                <CustomButton
                  label={languages[language].user.signIn}
                  type="submit"
                />
                <br />
              </Form>
            </div>
            <span className="SignInSection__Or"></span>
            <GoogleLogInBtn />
          </div>
          <div className="SignInSection__Bottom">
            <Link to="/signup">{languages[language].user.signUp}</Link>
            <Link to="/forgetpassword">
              {languages[language].user.forgetPassword}
            </Link>
          </div>
        </div>
      )}
    </div>
  )
}

export default SignInPage
