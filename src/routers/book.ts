import express from 'express'

import Book from '../models/Book'
import * as controller from '../controllers/book'
import {
  addNewBookValidator,
  updateBookInfoValidator,
} from '../middlewares/validators'
const router = express.Router()

router.get('/', controller.getAllBooks)
router.get('/:isbn', controller.getBookByIsbn)
router.patch('/:isbn/checkout', controller.checkoutBook)
router.patch('/:isbn/checkin', controller.checkinBook)

/*=====+
 |ADMIN|
 +=====*/
router.post('/', addNewBookValidator, controller.adminAddBook)
router.put('/:bookId', updateBookInfoValidator, controller.adminUpdateBook)
router.delete('/:bookId', controller.deleteBook)
export default router
