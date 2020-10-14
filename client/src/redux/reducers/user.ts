import { LOGIN, UserActions, UserLogInAction } from "../../types/userTypes";

const initialState = {
    isLoggedIn: false,
    userId: ''
}

export default function(state = initialState, action:UserActions) {
  switch(action.type){
    case LOGIN:
      return {...state, isLoggedIn: true}

    default: 
      return {...state};
  }
}