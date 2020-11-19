import React, { useEffect, useState } from 'react'
import { toast, ToastContainer } from 'react-toastify'
import { useDispatch } from 'react-redux'

import Routes from './Routes'
import { getUserData } from './redux/actions/user'
import { getAllBooks } from './redux/actions/book'
import UIOverlay from './components/UIOverlay'
import { requestAllAuthors } from './redux/actions'
import HamburgerOverlay from './components/HamburgerOverlay'
import {
  LanguageContext,
  LangContextObj,
  Languages,
} from './context/langContext'

import 'react-toastify/dist/ReactToastify.css'
import './App.scss'

const checkEnv = process.env.NODE_ENV === 'production'

export const url = checkEnv
  ? 'https://integrify-librarian.herokuapp.com'
  : 'http://localhost:3000'

toast.configure()
export default function App() {
  const dispatch = useDispatch()
  const [languageContext, setLanguageContext] = useState<LangContextObj>({
    language: 'en',
    switchLanguage: (newLang: Languages) =>
      setLanguageContext((prev) => ({ ...prev, language: newLang })),
  })
  useEffect(() => {
    console.log('App rendered!')
    const token = localStorage.getItem('token')

    if (token) dispatch(getUserData(token))
    dispatch(getAllBooks())
    dispatch(requestAllAuthors())
  }, [dispatch])
  return (
    <>
      <LanguageContext.Provider value={languageContext}>
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
      </LanguageContext.Provider>
    </>
  )
}
