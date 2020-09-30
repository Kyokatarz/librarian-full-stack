import express from 'express'
import { validationResult } from 'express-validator'
import { adminAddAuthor } from '../controllers/author'
import { addNewAuthorValidator } from '../middlewares/validators'

import Author from '../models/Author'

const router = express.Router()

router.post('/', addNewAuthorValidator, adminAddAuthor)
export default router
