import { Dispatch } from "redux";
import axios from 'axios'

import { ADD_BOOK_TO_USER, LOGIN, LOGOUT,  NewUser,  REMOVE_BOOK_FROM_USER,  UPDATE_BOOK_INFO_IN_USER,  UserActions, UserInfo } from "../../types/userTypes";
import { Book } from "../../types/bookTypes";
import { clearUI, setErrorMsg, setLoading } from "./ui";



export const logUserIn = (jwtToken:string, userInfo: UserInfo):UserActions => {
  return {
    type: LOGIN,
    payload: {
      isLoggedIn: true,
      token: jwtToken,
      userInfo: userInfo
    }
  }
}

export const logUserOut = ():UserActions => {
  return {
    type: LOGOUT,
    payload: {
      isLoggedIn: false,
      token: '',
      userInfo: {
        isAdmin: false,
        username: '',
        email: '',
        lastName: '',
        firstName: '',
        imageUrl: '',
        borrowedBooks: []
      }
    }
  }
}

export const addBookToUser = (bookObj: Book):UserActions => {
  return {
    type: ADD_BOOK_TO_USER,
    payload: bookObj
  }

}

export const removeBookFromUser = (bookId: string):UserActions => {
  return {
    type: REMOVE_BOOK_FROM_USER,
    payload: bookId
  }
}

export const updateBookInfoInUser = (bookObj: Partial<Book>):UserActions => {
  return {
    type: UPDATE_BOOK_INFO_IN_USER,
    payload: bookObj
  }
}


/*==================+
|REDUX THUNK ACTION|
+==================*/
export const signUserUp = (userInfo: Partial<NewUser>) => {
  return async (dispatch:Dispatch) => {
    try {
      dispatch(setLoading())
      const resp = await axios.post('/api/v1/user/signUp', userInfo)
      if(resp.status === 200) {
      localStorage.setItem('token',resp.data.token)
      dispatch(getUserData(resp.data.token))
      dispatch(clearUI())
    }
      
    } catch (err) {
      dispatch(setErrorMsg(err.response.data.message || 'Unknown Error'))
    }    
  }
}

export const sendLogInRequest = (userName: string, password: string) => {
  return async (dispatch:Dispatch) => {
    try{
      dispatch(setLoading())
      const resp = await axios.post('/api/v1/usr/signIn', {
        username: userName,
        password
      })
    
    if(resp.status === 200) {
      localStorage.setItem('token', resp.data.token)
      dispatch(getUserData(resp.data.token))
    }
    
    } catch(err) {
      dispatch(setErrorMsg(err.response.data.message || 'Unknown Error'))
    }
  }
}

export const getUserData = (token:string):any => {
  return async (dispatch: Dispatch) => {
    try{
      const config = {
        headers:{
          'x-auth-token': token
        }
      }
      dispatch(setLoading())
      const resp = await axios.get('/api/v1/user', config)
      if(resp.status ===200) {
        dispatch(logUserIn(token, resp.data.userInfo))
        dispatch(clearUI())
      }
    } catch(err) {
      dispatch(setErrorMsg(err.response.data.message || 'Unknown Error'))
    }
  }
}

export const updateUserData = (token:string, newData:Partial<UserInfo>) => {
  return async (dispatch:Dispatch) => {
    try {
      const config = {
        headers:{
          'x-auth-token': token
        }
      }
      dispatch(setLoading())
      const resp = await axios.patch('/api/v1/user/', newData, config)
      if(resp.status === 200) {
        dispatch(logUserIn(token, resp.data))
        dispatch(clearUI())
      }
    } catch (err) {
      dispatch(setErrorMsg(err.response.data.message || 'Unknown Error'))
    }
    
  }
}
export const clearStorageAndLogOut = () => {
  return (dispatch:Dispatch) => {
    localStorage.removeItem('token')
    dispatch(logUserOut())
  }
}


