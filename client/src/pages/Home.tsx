import React from 'react'
import axios from 'axios'
import { Redirect } from 'react-router-dom'

type JWTToken = {
  token: string
}
export default function Home() {
  const googleResponse = async () => {
    try {
      const res = await axios.get<any, JWTToken>('/api/v1/auth/google')
      const jwtToken = res.token
      localStorage.setItem(jwtToken, JSON.stringify(jwtToken))
      return <Redirect to="/" />
    } catch (err) {
      console.log(err)
    }
  }
  return (
    <>
      <h1>Home page</h1>
      <div onClick={googleResponse}>Google login</div>
    </>
  )
}
