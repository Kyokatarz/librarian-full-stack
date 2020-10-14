import { Dispatch } from "redux";
import axios from 'axios'

import { LOGIN, LOGOUT,  UserActions, UserInfo } from "../../types/userTypes";


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
      token: ''
    }
  }
}

export const sendLogInRequest = (userName: string, password: string) => {
  return async (dispatch:Dispatch) => {
    try{
      const resp = await axios.post('api/v1/user/signIn', {
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
      const resp = await axios.get('api/v1/user', config)
      console.log(resp.data)
      dispatch(logUserIn(token, resp.data.userInfo))
    } catch(err) {
      console.log(err.response.data.message)
    }
  }
}

export const clearStorageAndLogOut = () => {
  return (dispatch:Dispatch) => {
    localStorage.removeItem('token')
    dispatch(logUserOut())
  }
}