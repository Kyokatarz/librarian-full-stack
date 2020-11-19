import axios from 'axios'
import React from 'react'
import { GoogleLogin } from 'react-google-login'
import { useDispatch } from 'react-redux'

import { getUserData } from '../../redux/actions/user'
import { url } from '../../App'
import { setErrorMsg } from '../../redux/actions'
import { LanguageContext } from '../../context/langContext'
import { languages } from '../../languages/languages'

const GOOGLE_CLIENT_ID =
  '966391822521-16klvao4ikgokq93vhvs0h6i58encvgk.apps.googleusercontent.com'

const GoogleLogInBtn = () => {
  const dispatch = useDispatch()
  const { language } = React.useContext(LanguageContext)
  const responseGoogle = async (resp: any) => {
    const res = await axios.post(url + '/api/v1/auth/google', {
      id_token: resp.tokenId,
    })
    localStorage.setItem('token', res.data.token)
    dispatch(getUserData(res.data.token))
  }

  const failedGoogle = (error: any) => {
    dispatch(setErrorMsg('Failed to login with Google'))
    console.error(error)
  }

  return (
    <GoogleLogin
      clientId={GOOGLE_CLIENT_ID}
      buttonText={languages[language].user.logInGoogle}
      onSuccess={responseGoogle}
      onFailure={failedGoogle}
      cookiePolicy={'single_host_origin'}
    />
  )
}

export default GoogleLogInBtn
