import { Dispatch } from "redux";
import axios from 'axios'

import { Book, BookActions, CHANGE_BOOK_STATUS, SET_BOOKS } from "../../types/bookTypes";
import { addBookToUser, removeBookFromUser } from "./user";
import { setLoading } from ".";
import { clearUI, setErrorMsg } from "./ui";




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
    try{
      dispatch(setLoading())
      const resp = await axios.get('/api/v1/book')
      if (resp.status === 200){
      dispatch(setBooks(resp.data))
      dispatch(clearUI())
    }
    } catch(err){
      dispatch(setErrorMsg(err.response.data.message || 'Unknown Error'))
    }
  }
}

export const requestCheckin = (token:string, bookId:string) => {
  
  return async (dispatch:Dispatch) => {
    try{
      const config = {
        headers:{
          'x-auth-token': token
        }
      }
      dispatch(setLoading())
      const resp = await axios.patch(`/api/v1/book/${bookId}/checkin`, undefined, config)
      if (resp.status === 200) {
        dispatch(removeBookFromUser(bookId))
        dispatch(clearUI())}
    } catch(err) {
      dispatch(setErrorMsg(err.response.data.message || 'Unknown Error'))
    }
  }
}

export const requestCheckout = (token:string, bookObj: Book) => {
  return async (dispatch:Dispatch) => {
    try{
      const config = {
        headers:{
          'x-auth-token': token
        }
      }
      dispatch(setLoading())
      const resp = await axios.patch(`/api/v1/book/${bookObj._id}/checkout`, undefined, config)
      if (resp.status === 200) {
        dispatch(addBookToUser(bookObj))
        dispatch(clearUI())
      }
    } catch(err) {
      dispatch(setErrorMsg(err.response.data.message || 'Unknown Error'))
    }
  }
}
