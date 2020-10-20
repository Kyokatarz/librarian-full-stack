
import { BookModal, BookModalActionType, CLOSE_MODAL, SHOW_MODAL } from "../../types/bookModalTypes";

const initState = {
  book: {
    _id: '',
    isbn: '',
    title: '',
    description: '',
    publisher: '',
  },
  show: false
}

export default function bookModal(state:BookModal = initState, action:BookModalActionType){
  switch(action.type){
    case SHOW_MODAL:
      return {...state, ...action.payload}
    case CLOSE_MODAL:
      return {...state, ...action.payload}
    default:
      return {...state}
  }
}