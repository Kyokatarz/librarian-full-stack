import express from 'express'

import * as controller from '../controllers/user'
import {
  forgetPasswordValidator,
  signInValidator,
  signUpValidator,
  userInfoUpdateValidator,
  userPasswordChangeValidator,
} from '../middlewares/validators'

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
