import { Book, BookActions, SET_FILTERED_BOOKS } from "../../types/bookTypes"


const initState:Book[] = []

export default  function filteredBooksReducer(state:Book[] = initState, action:BookActions){
  switch(action.type){
    case SET_FILTERED_BOOKS:
      return [...action.payload]

    default: 
      return state
  }
}