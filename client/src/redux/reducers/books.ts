import { Book, BookActions, GET_ALL_BOOKS, SET_BOOKS } from "../../types/bookTypes";

const initState:Book[] = []

export default function(state = initState, action:BookActions){
  switch(action.type){
    case SET_BOOKS:
      return [...action.payload]
      
    default:
      return state
  }
}