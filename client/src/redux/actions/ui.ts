import {  CLEAR_UI, SET_ERROR, SET_LOADING, UIActions } from "../../types/uiTypes"

export const setLoading = ():UIActions => {
  return {
    type: SET_LOADING,
    payload: {
      isLoading: true,
      errMsg: ''
    }
  }
}

export const setErrorMsg = (message: string):UIActions => {
  return {
    type: SET_ERROR,
    payload:{
      isLoading: false,
      errMsg: message
    }
  }
}

export const clearUI = ():UIActions => {
  return {
    type: CLEAR_UI,
    payload: {
      isLoading: false,
      errMsg: ''
    }
  }
}
