import { LOGIN, LOGOUT, User, UserActions } from "../../types/userTypes";

const initialState:Partial<User> = {
    isLoggedIn: false,
    token: ''
}

export default function(state = initialState, action:UserActions) {
  switch(action.type){
    case LOGIN:
      return {...state, ...action.payload}

    case LOGOUT: 
      return {...action.payload}
    default: 
      return state;
  }
}