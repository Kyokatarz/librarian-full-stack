import { CLEAR_UI, SET_ERROR, SET_LOADING, UI, UIActions } from "../../types/uiTypes"


const defaultState: UI = {
  isLoading: false,
  errMsg: ''
}

export default function ui(
  state: UI = defaultState,
  action: UIActions
): UI {
  switch (action.type) {
  case SET_LOADING:
    return {...state, isLoading: true}
  case SET_ERROR:
    return {...state, ...action.payload}
  case CLEAR_UI:
    return {...state, isLoading: false, errMsg: ''}
  default:
    return state
  }
}
