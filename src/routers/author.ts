import express from 'express'

import {
  adminAddAuthor,
  adminDeleteAuthor,
  adminUpdateAuthor,
  getAllAuthor,
  getAuthor,
} from '../controllers/author'
import auth from '../middlewares/auth'
import {
  addAuthorValidatorWithAuth,
  updateAuthorValidatorWithAuth,
} from '../middlewares/validators'

const router = express.Router()

router.get('/', getAllAuthor)
router.get('/:authorId', getAuthor)
/*=========+
 |PROTECTED|
 +=========*/
router.post('/', addAuthorValidatorWithAuth, adminAddAuthor)
router.put('/:authorId', updateAuthorValidatorWithAuth, adminUpdateAuthor)
router.delete('/:authorId', auth, adminDeleteAuthor)

export default router
