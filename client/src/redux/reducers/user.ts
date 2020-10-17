import { userInfo } from "os";
import { ADD_BOOK_TO_USER, LOGIN, LOGOUT, REMOVE_BOOK_FROM_USER, UPDATE_BOOK_INFO_IN_USER, User, UserActions } from "../../types/userTypes";

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
      const newBooks = userInfo.borrowedBooks.filter(bookObj => bookObj._id !== action.payload)
      return {...state, userInfo: {...userInfo, borrowedBooks: newBooks}}
    
    case UPDATE_BOOK_INFO_IN_USER:
      {
        const tempArray = [...state.userInfo.borrowedBooks]
        
        if (!action.payload._id) return state
        const index = tempArray.map(bookObj => bookObj._id).indexOf(action.payload._id)
        tempArray[index] = {...tempArray[index], ...action.payload}
        return {...state, userInfo: {...userInfo, borrowedBooks: [...tempArray]}}
      }
    default: 
      return state;
  }
}