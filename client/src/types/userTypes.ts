export const LOGIN = 'LOGIN'
export const LOGOUT = 'LOGOUT'

export type User = {
  isLoggedIn: boolean,
  token: string
}


export type UserLogInAction = {
  type: typeof LOGIN,
  payload: User
}

export type UserLogOutAction =  {
  type: typeof LOGOUT,
  payload: User
}


export type UserActions = UserLogInAction | UserLogOutAction