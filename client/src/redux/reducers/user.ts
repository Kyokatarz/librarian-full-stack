import { userInfo } from "os";
import { ADD_BOOK_TO_USER, LOGIN, LOGOUT, REMOVE_BOOK_FROM_USER, User, UserActions } from "../../types/userTypes";

const initialState:User = {
  isLoggedIn: false,
  token: '',
  userInfo: {
    isAdmin: false,
    username: '',
    email: '',
    lastName: '',
    firstName: '',
    imageUrl: '',
   borrowedBooks: []
  }
 }


export default function(state: User = initialState, action:UserActions) {
  const {userInfo} = state
  const {borrowedBooks} = userInfo

  switch(action.type){
    case LOGIN:
      return {...state, ...action.payload}

    case LOGOUT: 
      return {...action.payload}

    case ADD_BOOK_TO_USER: 
      const tempArray = [...borrowedBooks, action.payload]
      return {...state, userInfo: {...userInfo, borrowedBooks: tempArray}}

    case REMOVE_BOOK_FROM_USER:
      console.log('Reducer')
      const newBooks = userInfo.borrowedBooks.filter(bookObj => bookObj._id !== action.payload)
      return {...state, userInfo: {...userInfo, borrowedBooks: newBooks}}
    default: 
      return state;
  }
}