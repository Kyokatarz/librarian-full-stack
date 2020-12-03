import { combineReducers } from 'redux'

import user from './user'
import books from './books'
import ui from './ui'
import bookModal from './bookModal'
import authors from './authors'

const createRootReducer = () =>
  combineReducers({
    books,
    user,
    ui,
    bookModal,
    authors,
  })

export default createRootReducer
