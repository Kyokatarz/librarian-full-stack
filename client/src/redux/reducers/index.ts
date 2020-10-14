import { combineReducers } from 'redux'

import user from './user'
import books from './books'

const createRootReducer = () =>
  combineReducers({
    books,
    user,
  })

export default createRootReducer
