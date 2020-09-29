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
