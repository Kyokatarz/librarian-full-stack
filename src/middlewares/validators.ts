import { check } from 'express-validator'

export const signUpValidator = [
  check('username', 'Username cannot be empty').not().isEmpty(),
  check('email', 'Please enter a valid email').isEmail(),
  check('password', 'Password length must be more than 6 characters').isLength({
    min: 6,
  }),
]

export const signInValidator = [
  check('username', 'Username must be provided').not().isEmpty(),
  check('password', 'Password must be provided').not().isEmpty(),
]

export const userInfoUpdateValidator = [
  check('email', 'Please enter a valid email').isEmail(),
]

export const userPasswordChangeValidator = [
  check(
    'newPassword',
    'Password length must be more than 6 characters'
  ).isLength({
    min: 6,
  }),
  check('oldPassword', 'Password must be provided').notEmpty(),
]

export const forgetPasswordValidator = [
  check('email', 'Email must be provided').notEmpty(),
  check('email', 'Please enter a valid email').isEmail(),
]
