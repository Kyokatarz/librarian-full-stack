import { Dispatch } from "redux";
import axios from 'axios'

import { ADD_BOOK_TO_USER, LOGIN, LOGOUT,  NewUser,  REMOVE_BOOK_FROM_USER,  UserActions, UserInfo } from "../../types/userTypes";
import { Book } from "../../types/bookTypes";



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



/*==================+
|REDUX THUNK ACTION|
+==================*/
export const signUserUp = (userInfo: Partial<NewUser>) => {
  return async (dispatch:Dispatch) => {
    try {
      const resp = await axios.post('/api/v1/user/signUp', userInfo)
      localStorage.setItem('token',resp.data.token)
      dispatch(getUserData(resp.data.token))
    } catch (err) {
      console.log(err.response.data.message)
    }    
  }
}

export const sendLogInRequest = (userName: string, password: string) => {
  return async (dispatch:Dispatch) => {
    try{
      const resp = await axios.post('/api/v1/user/signIn', {
        username: userName,
        password
      })
    
    if(resp.status === 200) {
      localStorage.setItem('token', resp.data.token)
      dispatch(getUserData(resp.data.token))
    }
    
    } catch(err) {
      console.log('response:', err.response.data.message)
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
      const resp = await axios.get('/api/v1/user', config)
      dispatch(logUserIn(token, resp.data.userInfo))
    } catch(err) {
      console.log(err.response)
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
      const resp = await axios.patch('/api/v1/user/', newData, config)
      dispatch(logUserIn(token, resp.data))
    } catch (err) {
      console.log(err.response)
    }
    
  }
}
export const clearStorageAndLogOut = () => {
  return (dispatch:Dispatch) => {
    localStorage.removeItem('token')
    dispatch(logUserOut())
  }
}


