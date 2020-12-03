export const SET_LOADING = 'SET_LOADING'
export const SET_ERROR = 'SET_ERROR'
export const CLEAR_UI = 'CLEAR_UI'

export type UI = {
  isLoading: boolean,
  errMsg: string
}

export type SetLoadingActionTypes = {
  type: typeof SET_LOADING,
  payload: UI
}

export type SetErrorActionTypes = {
  type: typeof SET_ERROR,
  payload: UI
}

export type ClearErrorActionTypes = {
  type: typeof CLEAR_UI,
  payload: UI
}

export type UIActions = SetErrorActionTypes | SetLoadingActionTypes | ClearErrorActionTypes