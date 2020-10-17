import { Author } from "./authorTypes"

export const SET_BOOKS = 'SET_BOOKS'
export const CHANGE_BOOK_STATUS = 'CHANGE_BOOK_STATUS'
export const UPDATE_BOOK_INFO_IN_ALL_BOOKS = 'UPDATE_BOOK_INFO_IN_ALL_BOOKS'

export type Book = {
  _id: string
  isbn: string
  title: string
  description?: string
  publisher?: string
  author: Author[]
  status: 'available' | 'borrowed'
}


export type setBooksAction = {
  type: typeof SET_BOOKS
  payload: Book[]
}

export type changeBookStatusAction = {
  type: typeof CHANGE_BOOK_STATUS
  payload: string
}

export type updateBookInfoAction = {
  type: typeof UPDATE_BOOK_INFO_IN_ALL_BOOKS
  payload: Partial<Book>
}

export type BookActions = changeBookStatusAction | setBooksAction | updateBookInfoAction
