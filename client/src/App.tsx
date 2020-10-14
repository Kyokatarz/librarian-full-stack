import React, { useEffect } from 'react'

import Routes from './Routes'
import './App.scss'
import { getUserData, logUserIn } from './redux/actions/user'
import { useDispatch } from 'react-redux'

export default function App() {
  const dispatch = useDispatch()
  useEffect(() => {
    const token = localStorage.getItem('token')
    if (token) dispatch(getUserData(token))
  })
  return (
    <>
      <Routes />
    </>
  )
}
