import { Dispatch } from "redux";
import axios from 'axios'

import { Book, BookActions, CHANGE_BOOK_STATUS, SET_BOOKS } from "../../types/bookTypes";



export const setBooks = (books: Book[]):BookActions => {
  return {
    type: SET_BOOKS,
    payload: books
  }
}

export const changeBookStatus = (bookId:string) => {
  return {
    type: CHANGE_BOOK_STATUS,
    payload: bookId
  }
}

/*===========+
 |REDUX THUNK|
 +===========*/
export const getAllBooks = () => {
  return async (dispatch: Dispatch) => {
    const resp = await axios.get('/api/v1/book')
    dispatch(setBooks(resp.data))
  }
}

