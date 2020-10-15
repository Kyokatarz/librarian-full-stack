import { Book } from "./bookTypes"

export const LOGIN = 'LOGIN'
export const LOGOUT = 'LOGOUT'

export type UserInfo = {
  isAdmin: boolean,
  username: string,
  email: string,
  lastName?: string,
  firstName?: string
  borrowedBooks: Book[]
}
export type User = {
  isLoggedIn: boolean,
  token: string,
  userInfo: UserInfo
}

export type NewUser = Partial<UserInfo> & {
  password: string,
}
export type UserLogInAction = {
  type: typeof LOGIN,
  payload: User
}

export type UserLogOutAction =  {
  type: typeof LOGOUT,
  payload: Partial<User>
}


export type UserActions = UserLogInAction | UserLogOutAction