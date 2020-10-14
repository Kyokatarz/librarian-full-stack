export const GET_ALL_BOOKS = 'GET_ALL_BOOKS'
export const SET_BOOKS = 'SET_BOOKS'

export type Book = {
  _id: string
  isbn: string
  title: string
  description?: string
  publisher?: string
  author: any
  status: 'available' | 'borrowed'
}

export type getAllBooksAction = {
  type: typeof GET_ALL_BOOKS
  payload: Book[]
}
export type setBooksAction = {
  type: typeof SET_BOOKS
  payload: Book[]
}

export type BookActions = getAllBooksAction | setBooksAction
