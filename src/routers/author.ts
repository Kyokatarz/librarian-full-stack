import express from 'express'
import { validationResult } from 'express-validator'
import {
  adminAddAuthor,
  adminDeleteAuthor,
  adminUpdateAuthor,
} from '../controllers/author'
import {
  addNewAuthorValidator,
  updateAuthorInfoValidator,
} from '../middlewares/validators'

import Author from '../models/Author'

const router = express.Router()

router.post('/', addNewAuthorValidator, adminAddAuthor)
router.put('/:authorId', updateAuthorInfoValidator, adminUpdateAuthor)
router.delete('/:authorId', adminDeleteAuthor)

export default router
