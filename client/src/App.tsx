import React, { useEffect } from 'react'

import Routes from './Routes'
import './App.scss'
import { getUserData, logUserIn } from './redux/actions/user'
import { useDispatch } from 'react-redux'
import { getAllBooks } from './redux/actions/book'

export default function App() {
  const dispatch = useDispatch()
  useEffect(() => {
    console.log('App rendered!')
    const token = localStorage.getItem('token')

    if (token) dispatch(getUserData(token))
    dispatch(getAllBooks())
  }, [])
  return (
    <>
      <Routes />
    </>
  )
}
