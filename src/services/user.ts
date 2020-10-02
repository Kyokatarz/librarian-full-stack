import bcrypt from 'bcrypt'
import { Result, ValidationError } from 'express-validator'
import {
  BadRequestError,
  InternalServerError,
  NotFoundError,
} from '../helpers/apiError'

import User, { UserDocument } from '../models/User'

import stringifyError from '../util/stringifyError'

/*===========+
 |Create User|
 +===========*/
export const create = async (
  userObj: Partial<UserDocument>
): Promise<UserDocument> => {
  const { email, username, password, lastName, firstName } = userObj

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
  })

  return user.save()
}

/*================+
 |Update user info|
 +================*/
export const updateUser = async (
  userId: Partial<UserDocument>,
  newInfo: Partial<UserDocument>
) => {
  const { lastName, firstName, email } = newInfo

  const user = await User.findById(userId)
  if (!user) throw 'UserNotFound'

  if (lastName) user.lastName = lastName
  if (firstName) user.firstName = firstName
  if (email) user.email = email

  return user.save()
}

/*====================+
 |Update user password|
 +====================*/
type passwordType = {
  oldPassword: string
  newPassword: string
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
      new NotFoundError('No user found with this Id', err)
    default:
      return new InternalServerError(err)
  }
}
