import { combineReducers } from 'redux'

import user from './user'
import books from './books'
import ui from './ui'
import bookModal from './bookModal'

const createRootReducer = () =>
  combineReducers({
    books,
    user,
    ui,
    bookModal,
  })

export default createRootReducer
