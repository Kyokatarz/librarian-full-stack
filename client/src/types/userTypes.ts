import { Book } from './bookTypes'

export const LOGIN = 'LOGIN'
export const LOGOUT = 'LOGOUT'
export const ADD_BOOK_TO_USER = 'ADD_BOOK_TO_USER'
export const REMOVE_BOOK_FROM_USER = 'REMOVE_BOOK_FROM_USER'
export const UPDATE_BOOK_INFO_IN_USER = 'UPDATE_BOOK_INFO_IN_USER'
export const CHANGE_USER_PASSWORD = 'CHANGE_USER_PASSWORD'

export type UserInfo = {
  isGoogleUser: boolean
  isAdmin: boolean
  username: string
  email: string
  lastName: string
  firstName: string
  imageUrl: string
  borrowedBooks: Book[]
}
export type User = {
  isLoggedIn: boolean
  token: string
  userInfo: UserInfo
}

export type NewUser = Partial<UserInfo> & {
  password: string
}
export type UserLogInAction = {
  type: typeof LOGIN
  payload: User
}

export type UserLogOutAction = {
  type: typeof LOGOUT
  payload: Partial<User>
}

export type AddBookToUser = {
  type: typeof ADD_BOOK_TO_USER
  payload: Book
}

export type RemoveBookFromUser = {
  type: typeof REMOVE_BOOK_FROM_USER
  payload: string
}

export type UpdateBookInfoInUser = {
  type: typeof UPDATE_BOOK_INFO_IN_USER
  payload: Partial<Book>
}

export type UserActions =
  | UserLogInAction
  | UserLogOutAction
  | AddBookToUser
  | RemoveBookFromUser
  | UpdateBookInfoInUser
