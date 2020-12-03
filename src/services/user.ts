import bcrypt from 'bcrypt'
import crypto from 'crypto'
import { Result, ValidationError } from 'express-validator'

import {
  BadRequestError,
  InternalServerError,
  NotFoundError,
} from '../helpers/apiError'
import User, { UserDocument } from '../models/User'
import sendEmail from '../nodemailer'
import stringifyError from '../util/stringifyError'

/*===========+
 |Create User|
 +===========*/
export const create = async (
  userObj: Partial<UserDocument>
): Promise<UserDocument> => {
  const { email, username, password, lastName, firstName, isAdmin } = userObj

  //Check if email existed
  const checkDuplicated = await User.findOne({ $or: [{ email }, { username }] })
  if (checkDuplicated) throw 'IdentificationDuplicated'

  //Hashing password
  const salt = await bcrypt.genSalt(10)
  const hashedPassword = await bcrypt.hash(password, salt)

  const user = new User({
    email,
    password: hashedPassword,
    username,
    lastName,
    firstName,
    isAdmin,
  })

  return user.save()
}

/*================+
 |Get user info   |
 +================*/
export const getUserInfo = async (userId: string): Promise<UserDocument> => {
  const user = await User.findById(userId)
    .select('-password')
    .populate('borrowedBooks')
    .exec()

  console.log(user)
  if (!user) throw 'UserNotFound'
  await user.populate('borrowedBooks.author', 'name').execPopulate()

  return user
}

/*================+
 |Update user info|
 +================*/
export const updateUser = async (
  userId: Partial<UserDocument>,
  newInfo: Partial<UserDocument>
) => {
  const { lastName, firstName, email } = newInfo

  const user = await User.findById(userId).select('-password -id')
  if (!user) throw 'UserNotFound'

  if (lastName) user.lastName = lastName
  if (firstName) user.firstName = firstName
  if (email) user.email = email
  await user.save()

  const { isAdmin, username, borrowedBooks, imageUrl } = user
  return {
    lastName: user.lastName,
    firstName: user.firstName,
    email: user.email,
    isAdmin,
    username,
    borrowedBooks,
    imageUrl,
  }
}

/*====================+
|Update user password|
+====================*/
type passwordType = {
  oldPassword: string;
  newPassword: string;
}
export const updatePassword = async (
  userId: Partial<UserDocument>,
  password: passwordType
): Promise<UserDocument> => {
  const { oldPassword, newPassword } = password

  const user = await User.findById(userId)
  if (!user) throw 'UserNotFound'

  const compare = await bcrypt.compare(oldPassword, user.password)

  if (!compare) throw 'ChangingPasswordError'

  //Hash new password
  const salt = await bcrypt.genSalt(10)
  const hashedPassword = await bcrypt.hash(newPassword, salt)

  user.password = hashedPassword
  return user.save()
}

/*========================+
 | Forget Password Handler|
 +=======================*/
export const forgetPassword = async (email: string) => {
  const now = Date.now()
  const duration = 600 // mins
  const later = now + duration * 1000 * 60

  const user = await User.findOne({ email })
  if (!user)
    return {
      msg:
        'A recover email has been sent to your email address if you have an account associated with it. ',
    }

  if (user.isGoogleUser)
    return {
      msg:
        'Your account was created with Google. Please use Login with Google to sign in.',
    }

  const hashedString = crypto.randomBytes(16).toString('hex')
  user.resetToken = {
    token: hashedString,
    expirationDate: later,
  }
  await user.save()
  sendEmail(email, hashedString)
  return {
    msg:
      'A recover email has been sent to your email address if you have an account associated with it. ',
  }
}

/*================+
 |RECOVER PASSWORD|
 +================*/
export const recoverPassword = async (
  resetToken: string,
  newPassword: string
): Promise<UserDocument> => {
  const user = await User.findOne({
    'resetToken.token': resetToken,
  }).exec()
  console.log('user: ', user)
  if (!user) throw 'ResetTokenInvalid'

  const now = Date.now()
  const expired = now > user.resetToken.expirationDate
  if (expired) throw 'ResetTokenInvalid'

  const salt = await bcrypt.genSalt(10)
  const hashedPassword = await bcrypt.hash(newPassword, salt)

  user.password = hashedPassword
  user.resetToken = {
    token: '',
    expirationDate: 0,
  }
  return await user.save()
}

/*=============+
 |Error Handler|
 +=============*/
export const errorHandler = (
  err: any,
  validationErrors?: Result<ValidationError>
) => {
  if (err.kind === 'ObjectId')
    return new NotFoundError('No user found with this Id')
  switch (err) {
    case 'ValidationError':
      return new BadRequestError(
        'Bad Request: ' + stringifyError(validationErrors!.array())
      )
    case 'IdentificationDuplicated':
      return new BadRequestError('Email or Username existed', err)
    case 'CredentialError':
      return new BadRequestError('Incorrect Username or Password', err)
    case 'ChangingPasswordError':
      return new BadRequestError('Incorrect Password')
    case 'UserNotFound':
      return new NotFoundError('No user found with this Id', err)
    case 'ResetTokenInvalid':
      return new BadRequestError('Reset token invalid or expired', err)
    default:
      console.log(err)
      return new InternalServerError(err)
  }
}
