import express from 'express'
import { validationResult } from 'express-validator'

import {
  adminAddAuthor,
  adminDeleteAuthor,
  adminUpdateAuthor,
} from '../controllers/author'
import {
  addAuthorValidatorWithAuth,
  updateAuthorValidatorWithAuth,
} from '../middlewares/validators'
import auth from '../middlewares/auth'

import Author from '../models/Author'

const router = express.Router()

router.post('/', addAuthorValidatorWithAuth, adminAddAuthor)
router.put('/:authorId', updateAuthorValidatorWithAuth, adminUpdateAuthor)
router.delete('/:authorId', auth, adminDeleteAuthor)

export default router
