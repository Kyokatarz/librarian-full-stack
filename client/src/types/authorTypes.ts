import { Book } from './bookTypes'

export const ADD_AUTHOR = 'ADD_AUTHOR'
export const DELETE_AUTHOR = 'DELETE_AUTHOR'

export type Author = {
  _id?: string
  name?: string
  writtenBooks?: Book[]
}

export type addAuthorAction = {
  type: typeof ADD_AUTHOR
  payload: Author[]
}

export type deleteAuthorAction = {
  type: typeof DELETE_AUTHOR
  payload: string
}

export type AuthorActions = addAuthorAction | deleteAuthorAction
