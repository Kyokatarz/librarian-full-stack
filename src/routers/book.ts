import express from 'express'

import * as controller from '../controllers/book'
import auth from '../middlewares/auth'
import { addBookValidatorWithAuth } from '../middlewares/validators'

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
router.put('/:bookId', auth, controller.adminUpdateBook)
router.delete('/:bookId', auth, controller.deleteBook)
export default router
