import { Dispatch } from "redux";
import axios from 'axios'
import { toast } from "react-toastify";
import { AiFillWarning } from 'react-icons/ai'

import { Book, BookActions, CHANGE_BOOK_STATUS, SET_BOOKS, UPDATE_BOOK_INFO_IN_ALL_BOOKS } from "../../types/bookTypes";
import { addBookToUser, removeBookFromUser, updateBookInfoInUser } from "./user";
import { setLoading } from ".";
import { clearUI, setErrorMsg } from "./ui";
import { setFilteredBooks } from "./filteredBook";




export const setBooks = (books: Book[]):BookActions => {
  return {
    type: SET_BOOKS,
    payload: books
  }
}

export const changeBookStatus = (bookId:string):BookActions => {
  return {
    type: CHANGE_BOOK_STATUS,
    payload: bookId
  }
}

export const updateBookInfoInAllBooks = (bookObj:Partial<Book>):BookActions => {
  return {
    type: UPDATE_BOOK_INFO_IN_ALL_BOOKS,
    payload: bookObj
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
      dispatch(setFilteredBooks(resp.data))
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
        dispatch(clearUI())
        toast.info('Book returned successfully!')
      } else if (resp.status === 209) {
        setErrorMsg('Book borrowed by someone else! :(')
        dispatch(getAllBooks() as any)
      }
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
        toast.info('Book borrowed successfully!')
      }
    } catch(err) {
      dispatch(setErrorMsg(err.response.data.message || 'Unknown Error'))
    }
  }
}

export const requestBookUpdate = (token:string, bookObj:Partial<Book>) => {
  return async (dispatch:Dispatch) => {
    try {
      const config = {
        headers: {
          'x-auth-token': token
        }
      }
      const data = {...bookObj, author: bookObj.author?._id}
      console.log('data:', data)
      dispatch(setLoading())
      const resp = await axios.put(`/api/v1/book/${bookObj._id}`, data, config)
      if (resp.status ===200 ){
        dispatch(updateBookInfoInAllBooks(bookObj))
        dispatch(updateBookInfoInUser(bookObj))
        dispatch(clearUI())
        toast.info('Book updated successfully!')
      }
    } catch (err) {
      dispatch(setErrorMsg(err.response.data.message || 'Unknown Error'))
    }
  }
}

export const requestDeleteBook = (token:string, bookId: string) => {
  return async (dispatch:Dispatch) => {
    try {
      const config = {
        headers: {
          'x-auth-token': token
        }
      }
      dispatch(setLoading())
      const resp = await axios.delete(`/api/v1/book/${bookId}`, config)
      if (resp.status === 200) {
        dispatch(removeBookFromUser(bookId))
        dispatch(getAllBooks() as any)
        dispatch(clearUI())
        toast.error('Book deleted successfully!')
      } else throw new Error
    }  catch (err) {
      dispatch(setErrorMsg(err.response.data.message || 'Unknown Error'))
    }
  }
}

export const addNewBook = (token:string, bookObj:Partial<Book>) => {
  return async (dispatch:Dispatch) => {
    try {
      const config = {
        headers: {
          'x-auth-token': token
        }
      }

      dispatch(setLoading())
      const resp = await axios.post('/api/v1/book', bookObj, config)
      if(resp.status === 200) {
        dispatch(getAllBooks() as any)
        toast.info('Book added successfully!')
      }
    } catch(err) {
      dispatch(setErrorMsg(err.response.data.message || 'Unknown Error'))
    }
  }
}