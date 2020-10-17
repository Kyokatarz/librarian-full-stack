import { BookModalActionType, CLOSE_MODAL, SHOW_MODAL } from "../../types/bookModalTypes"
import { Book } from "../../types/bookTypes"

export const showModal = (bookObj:Book):BookModalActionType => {
  return {
    type: SHOW_MODAL,
    payload: {
      book: bookObj,
      show: true
    }
  }
}
export const closeModal = ():BookModalActionType => {
  return {
    type: CLOSE_MODAL,
    payload: {
      show: false
    }
  }
}