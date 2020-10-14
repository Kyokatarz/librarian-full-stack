import { Dispatch } from "redux";
import axios from 'axios'

import { Book, BookActions, GET_ALL_BOOKS, SET_BOOKS } from "../../types/bookTypes";

export const getAllBooks = () => {
  return async (dispatch: Dispatch) => {
    const resp = await axios.get('/api/v1/book')
    dispatch(setBooks(resp.data))
  }
}

export const setBooks = (books: Book[]):BookActions => {
  return {
    type: SET_BOOKS,
    payload: books
  }
}