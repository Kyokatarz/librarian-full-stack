import express from 'express'
import mongoose from 'mongoose'

import {
  signInValidator,
  signUpValidator,
  userInfoUpdateValidator,
  userPasswordChangeValidator,
  forgetPasswordValidator,
} from '../middlewares/validators'

import * as controller from '../controllers/user'

import User from '../models/User'

const router = express.Router()

router.post('/signUp', signUpValidator, controller.createUser)

router.post('/signIn', signInValidator, controller.signUserIn)
router.patch('/:userId', userInfoUpdateValidator, controller.updateUserInfo)
router.patch(
  '/:userId/password',
  userPasswordChangeValidator,
  controller.updateUserPassword
)
router.post('/password', forgetPasswordValidator, controller.forgetPassword)
export default router
