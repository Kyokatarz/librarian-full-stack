import React from 'react'
import { GoogleLogin } from 'react-google-login'
import axios from 'axios'
import { useDispatch } from 'react-redux'
import { getUserData } from '../../redux/actions/user'

const GOOGLE_CLIENT_ID =
  '966391822521-16klvao4ikgokq93vhvs0h6i58encvgk.apps.googleusercontent.com'

const GoogleLogInBtn = () => {
  const dispatch = useDispatch()
  const responseGoogle = async (resp: any) => {
    const res = await axios.post('/api/v1/auth/google', {
      id_token: resp.tokenId,
    })
    localStorage.setItem('token', res.data.token)
    dispatch(getUserData(res.data.token))
  }

  const failedGoogle = async (resp: any) => {}

  return (
    <GoogleLogin
      clientId={GOOGLE_CLIENT_ID}
      buttonText="Login with Google"
      onSuccess={responseGoogle}
      onFailure={failedGoogle}
      cookiePolicy={'single_host_origin'}
    />
  )
}

export default GoogleLogInBtn
