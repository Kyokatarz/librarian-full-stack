import express from 'express'

import * as controller from '../controllers/user'
import auth from '../middlewares/auth'
import {
  forgetPasswordValidator,
  recoverPasswordValidatorWithAuth,
  signInValidator,
  signUpValidator,
  userInfoUpdateValidator,
  userPasswordChangeValidator,
} from '../middlewares/validators'

const router = express.Router()

router.get('/', auth, controller.getUserInfo)
router.post('/signUp', signUpValidator, controller.createUser)
router.post('/signIn', signInValidator, controller.signUserIn)
router.patch('/:userId', userInfoUpdateValidator, controller.updateUserInfo)
router.patch(
  '/:userId/password',
  userPasswordChangeValidator,
  controller.updateUserPassword
)
router.post('/password', forgetPasswordValidator, controller.forgetPassword)
router.post('/password/:hashedString',recoverPasswordValidatorWithAuth, controller.recoverPassword)
export default router
