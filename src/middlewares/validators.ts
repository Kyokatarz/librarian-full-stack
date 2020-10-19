import { check, oneOf } from 'express-validator';

import auth from '../middlewares/auth';

/************************
 * USER ROUTE VALIDATOR *
 ************************/
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

export const userInfoUpdateValidatorWithAuth = [
  auth,
  check('email', 'Please enter a valid email').isEmail().optional(),
]

export const userPasswordChangeValidatorWithAuth = [
  auth,
  check(
    'newPassword',
    'Password length must be more than 6 characters'
  ).isLength({
    min: 6,
  }),
  check('oldPassword', 'Password must be provided').notEmpty(),
  check('newPassword', 'Password must be provided').notEmpty(),
]

export const forgetPasswordValidator = [
  check('email', 'Email must be provided').notEmpty(),
  check('email', 'Please enter a valid email').isEmail(),
]

export const recoverPasswordValidatorWithAuth = [
  auth,
  check('newPassword', 'Password must be provided').notEmpty(),
  check(
    'newPassword',
    'Password length must be more than 6 characters'
  ).isLength({
    min: 6,
  })
]
/*====================+
 |BOOK ROUTE VALIDATOR|
 +====================*/
export const addBookValidatorWithAuth = [
  auth,
  check('title', 'Title must be provided').notEmpty(),
  check('status', 'Status must be provided').notEmpty(),
  oneOf(
    [check('status').equals('available'), check('status').equals('borrowed')],
    "Status must be either 'available' or 'borrowed' "
  ),
]

export const updateBookValidatorWithAuth = [
  auth,
  check('title', 'Title must be provided').notEmpty(),
  check('author', 'Author must be provided').notEmpty(),
  check('status', 'Status must be provided').notEmpty(),
  oneOf(
    [check('status').equals('available'), check('status').equals('borrowed')],
    "Status must be either 'available' or 'borrowed' "
  ),
]

/*======================+
 |AUTHOR ROUTE VALIDATOR|
 +======================*/
export const addAuthorValidatorWithAuth = [
  auth,
  check('name', 'Author name must be provided').notEmpty(),
]
export const updateAuthorValidatorWithAuth = [
  auth,
  check('name', 'Author name must be provided').notEmpty(),
]
