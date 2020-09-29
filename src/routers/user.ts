import express from 'express'
import mongoose from 'mongoose'
import { check } from 'express-validator'
import User from '../models/User'

import { createUser } from '../controllers/user'

const router = express.Router()

router.post(
  '/signUp',
  [
    check('username', 'Username cannot be empty').not().isEmpty(),
    check('email', 'Please enter a valid email').isEmail(),
    check(
      'password',
      'Password length must be more than 6 characters'
    ).isLength({
      min: 6,
    }),
  ],
  createUser
)
export default router
