import React, { useEffect } from 'react'
import { toast, ToastContainer } from 'react-toastify'
import { useDispatch } from 'react-redux'

import Routes from './Routes'
import { getUserData } from './redux/actions/user'
import { getAllBooks } from './redux/actions/book'
import UIOverlay from './components/UIOverlay'
import './App.scss'
import 'react-toastify/dist/ReactToastify.css'
import { requestAllAuthors } from './redux/actions'
import HamburgerOverlay from './components/HamburgerOverlay'

toast.configure()
export default function App() {
  const dispatch = useDispatch()
  useEffect(() => {
    console.log('App rendered!')
    const token = localStorage.getItem('token')

    if (token) dispatch(getUserData(token))
    dispatch(getAllBooks())
    dispatch(requestAllAuthors())
  }, [dispatch])
  return (
    <>
      <Routes />
      <UIOverlay />
      <HamburgerOverlay />
      <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar={true}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
      />
    </>
  )
}
