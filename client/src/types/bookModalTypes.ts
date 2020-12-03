import { Book } from "./bookTypes"

export const SHOW_MODAL = 'SHOW_MODAL'
export const CLOSE_MODAL = 'CLOSE_MODAL'


export type BookModal = {
  book: Partial<Book>,
  show: boolean
}

export type ShowModalActionType = {
  type: typeof SHOW_MODAL
  payload: BookModal
}

export type CloseModalACtionType  = {
  type: typeof CLOSE_MODAL
  payload: Partial<BookModal>
}

export type BookModalActionType = ShowModalActionType | CloseModalACtionType