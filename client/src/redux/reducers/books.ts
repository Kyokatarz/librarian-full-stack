import { Book, BookActions, CHANGE_BOOK_STATUS,  SET_BOOKS, UPDATE_BOOK_INFO_IN_ALL_BOOKS } from "../../types/bookTypes";

const initState:Book[] = []

export default function(state = initState, action:BookActions){
  switch(action.type){
  case SET_BOOKS:
    return [...action.payload]
    
  case CHANGE_BOOK_STATUS:
  {
    const payloadBookId = action.payload
    const tempArray = [...state]
    const modifyingIndex = tempArray.map(bookObj => bookObj._id).indexOf(payloadBookId)
    let status = tempArray[modifyingIndex].status 
    const newStatus = status === 'available' ? 'borrowed' : 'available'

    tempArray[modifyingIndex].status = newStatus
    return [...tempArray]
  }

  case UPDATE_BOOK_INFO_IN_ALL_BOOKS:
  {
    const tempArray = [...state]
      
    if (!action.payload._id) return state
    const index = tempArray.map(bookObj => bookObj._id).indexOf(action.payload._id)
    tempArray[index] = {...tempArray[index], ...action.payload}
    return [...tempArray]
  }
  default:
    return state
  }
}