import express from 'express'

import Book from '../models/Book'
import * as controller from '../controllers/book'
import auth from '../middlewares/auth'
import {
  addBookValidatorWithAuth,
  updateBookValidatorWithAuth,
} from '../middlewares/validators'
const router = express.Router()

router.get('/', controller.getAllBooks)
router.get('/:isbn', controller.getBookByIsbn)

/*=========+
 |PROTECTED|
 +=========*/
router.patch('/:bookId/checkout', auth, controller.checkoutBook)
router.patch('/:bookId/checkin', auth, controller.checkinBook)

/*=====+
 |ADMIN|
 +=====*/
router.post('/', addBookValidatorWithAuth, controller.adminAddBook)
router.put('/:bookId', updateBookValidatorWithAuth, controller.adminUpdateBook)
router.delete('/:bookId', auth, controller.deleteBook)
export default router
