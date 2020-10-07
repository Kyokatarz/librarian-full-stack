import { combineReducers } from 'redux'

import product from './product'
import ui from './ui'

const createRootReducer = () =>
  combineReducers({
    product,
    ui,
  })

export default createRootReducer
