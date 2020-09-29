import express from 'express'
import mongoose from 'mongoose'

import {
  signInValidator,
  signUpValidator,
  userInfoUpdateValidator,
} from '../middlewares/validators'
import { createUser, signUserIn, updateUserInfo } from '../controllers/user'
import User from '../models/User'

const router = express.Router()

router.post('/signUp', signUpValidator, createUser)

router.post('/signIn', signInValidator, signUserIn)
router.patch('/:userId', userInfoUpdateValidator, updateUserInfo)
export default router
