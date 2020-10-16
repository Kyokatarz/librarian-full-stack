import { Book, BookActions, CHANGE_BOOK_STATUS, SET_BOOKS } from "../../types/bookTypes";

const initState:Book[] = []

export default function(state = initState, action:BookActions){
  switch(action.type){
    case SET_BOOKS:
      return [...action.payload]
    
    case CHANGE_BOOK_STATUS:
      const payloadBookId = action.payload
      const tempArray = [...state]
      const modifyingIndex = tempArray.map(bookObj => bookObj._id).indexOf(payloadBookId)
      let status = tempArray[modifyingIndex].status 
      const newStatus = status === 'available' ? 'borrowed' : 'available'

      tempArray[modifyingIndex].status = newStatus
      return [...tempArray]
      
      return [...tempArray]
    default:
      return state
  }
}