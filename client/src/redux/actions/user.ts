import { LOGIN, LOGOUT, UserActions } from "../../types/userTypes";

export const logUserIn = (jwtToken:string):UserActions => {
  return {
    type: LOGIN,
    payload: {
      isLoggedIn: true,
      token: jwtToken
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