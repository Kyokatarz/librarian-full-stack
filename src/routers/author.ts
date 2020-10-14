import express from 'express'

import {
  adminAddAuthor,
  adminDeleteAuthor,
  adminUpdateAuthor,
  getAuthor
} from '../controllers/author'
import auth from '../middlewares/auth'
import {
  addAuthorValidatorWithAuth,
  updateAuthorValidatorWithAuth,
} from '../middlewares/validators'

const router = express.Router()

router.post('/', addAuthorValidatorWithAuth, adminAddAuthor)
router.put('/:authorId', updateAuthorValidatorWithAuth, adminUpdateAuthor)
router.delete('/:authorId', auth, adminDeleteAuthor)
router.get('/:authorId', getAuthor)

export default router
