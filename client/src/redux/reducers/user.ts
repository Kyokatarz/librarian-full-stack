import { LOGIN, LOGOUT, User, UserActions } from "../../types/userTypes";

const initialState:User = {
  isLoggedIn: false,
  token: '',
  userInfo: {
    isAdmin: false,
    username: '',
    email: '',
    lastName: '',
    firstName: '',
   borrowedBooks: []
  }
 }


export default function(state: User = initialState, action:UserActions) {
  switch(action.type){
    case LOGIN:
      return {...state, ...action.payload}

    case LOGOUT: 
      return {...action.payload}
    default: 
      return state;
  }
}