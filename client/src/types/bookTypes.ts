import { Author } from "./authorTypes"

export const SET_BOOKS = 'SET_BOOKS'
export const CHANGE_BOOK_STATUS = 'CHANGE_BOOK_STATUS'
export const UPDATE_BOOK_INFO_IN_ALL_BOOKS = 'UPDATE_BOOK_INFO_IN_ALL_BOOKS'
export const DELETE_BOOK = 'DELETE_BOOK'
export const SET_FILTERED_BOOKS = 'SET_FILLTERED_BOOKS'

export type Book = {
  _id: string
  isbn: string
  title: string
  description?: string
  publisher?: string
  author: Partial<Author>
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


export type DeleteBookAction = {
  type: typeof DELETE_BOOK,
  payload: string 
}

export type SetFilteredBookAction = {
  type: typeof SET_FILTERED_BOOKS,
  payload: Book[]
}

export type BookActions = SetFilteredBookAction | changeBookStatusAction | setBooksAction | updateBookInfoAction | DeleteBookAction
