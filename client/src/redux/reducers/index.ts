import { combineReducers } from 'redux'

import user from './user'
import books from './books'
import ui from './ui'
import bookModal from './bookModal'
import filteredBooks from './filteredBooks'

const createRootReducer = () =>
  combineReducers({
    filteredBooks, 
    books,
    user,
    ui,
    bookModal
  })

export default createRootReducer
