import React, { useEffect } from 'react'
import { toast, ToastContainer } from 'react-toastify'
import { useDispatch } from 'react-redux'

import Routes from './Routes'
import { getUserData, logUserIn } from './redux/actions/user'
import { getAllBooks } from './redux/actions/book'
import UIOverlay from './components/UIOverlay'
import './App.scss'
import 'react-toastify/dist/ReactToastify.css'

toast.configure()
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
      <UIOverlay />
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
