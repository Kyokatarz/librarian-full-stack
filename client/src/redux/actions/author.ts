import { Dispatch } from 'redux'
import axios from 'axios'
import { toast } from 'react-toastify'

import { setLoading } from '.'
import { clearUI, setErrorMsg } from './ui'
import {
  ADD_AUTHOR,
  Author,
  AuthorActions,
  DELETE_AUTHOR,
} from '../../types/authorTypes'

export const addAuthor = (authors: Author[]): AuthorActions => {
  return {
    type: ADD_AUTHOR,
    payload: authors,
  }
}

export const deleteAuthor = (authorId: string) => {
  return {
    type: DELETE_AUTHOR,
    payload: authorId,
  }
}
/*============+
 |REDUX THUNK |
 +============*/
export const requestNewAuthor = (token: string, authorName: string) => {
  return async (dispatch: Dispatch) => {
    try {
      const config = {
        headers: {
          'x-auth-token': token,
        },
      }

      dispatch(setLoading())
      const resp = await axios.post(
        '/api/v1/author',
        { name: authorName },
        config
      )
      if (resp.status === 200) {
        dispatch(requestAllAuthors() as any)
        toast.info('Author added successfully!')
      }
    } catch (err) {
      console.error(err)
      dispatch(setErrorMsg(err.response?.data?.message || 'Unknown Error'))
    }
  }
}

export const requestAllAuthors = () => {
  return async (dispatch: Dispatch) => {
    try {
      dispatch(setLoading())
      const resp = await axios.get('/api/v1/author')
      if (resp.status === 200) {
        dispatch(addAuthor(resp.data))
        dispatch(clearUI())
      }
    } catch (err) {
      console.error(err)
      dispatch(setErrorMsg(err.response?.data?.message || 'Unknown Error'))
    }
  }
}

export const requestDeleteAuthor = (token: string, authorId: string) => {
  return async (dispatch: Dispatch) => {
    try {
      const config = {
        headers: {
          'x-auth-token': token,
        },
      }
      dispatch(setLoading())
      const resp = await axios.delete(`/api/v1/author/${authorId}`, config)
      if (resp.status === 200) {
        dispatch(deleteAuthor(authorId))
        dispatch(clearUI())
      }
    } catch (err) {
      console.error(err)
      dispatch(setErrorMsg(err.response?.data?.message || 'Unknown Error'))
    }
  }
}
