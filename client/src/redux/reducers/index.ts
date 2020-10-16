import { combineReducers } from 'redux'

import user from './user'
import books from './books'
import ui from './ui'


const createRootReducer = () =>
  combineReducers({
    books,
    user,
    ui
  })

export default createRootReducer
