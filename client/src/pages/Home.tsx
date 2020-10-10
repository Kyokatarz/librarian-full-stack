import React, { useEffect, useState } from 'react'
import { Redirect, useHistory, useLocation } from 'react-router-dom'

import {GoogleLogin} from 'react-google-login'
import axios from 'axios'


type JWTToken = {
  token: string
}

const GOOGLE_CLIENT_ID =
  '966391822521-16klvao4ikgokq93vhvs0h6i58encvgk.apps.googleusercontent.com'

export default function Home() {
  const [redirect, setRedirect] = useState('');
  const [loggedIn, setLoggedIn] = useState(false)
  const history = useHistory()

  type jwtToken = {
    token: string
  }

  const responseGoogle = async (resp:any) => {
    const res = await axios.post('/api/v1/auth/google', {id_token: resp.tokenId})
    console.log('res:', res.data.token);
    //TODO: Do something with token
    history.push('/')
    setLoggedIn(true)

  }

  useEffect(()=> {
    
  })
  if (redirect) return <Redirect to={redirect}/>


  return (
    <>
     <h1>Home page</h1>

     <GoogleLogin
        clientId={GOOGLE_CLIENT_ID}
        buttonText="Login with Google"
        onSuccess={responseGoogle}
        onFailure={responseGoogle}
        cookiePolicy={'single_host_origin'}
      />
      
    </>
  )
}
