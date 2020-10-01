import { Request, Response, NextFunction } from 'express'
import { validationResult } from 'express-validator'
import bcrypt from 'bcrypt'

import { stringifyError } from '../util/stringifyError'
import {
  BadRequestError,
  InternalServerError,
  NotFoundError,
} from '../helpers/apiError'
import User from '../models/User'

/*******************************
 * @ROUTE POST /v1/user/signUp *
 * @DESC Create New User       *
 * @ACCESS PUBLIC              *
 *******************************/
export const createUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { email, username, password, lastName, firstName } = req.body
  const errors = validationResult(req)

  try {
    //Validation error
    if (!errors.isEmpty()) {
      throw 'ValidationError'
    }

    //Check if email existed
    const user = await User.findOne({ $or: [{ email }, { username }] })
    if (user) throw 'IdentificationDuplicated'

    //Hashing password
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)

    const newUser = new User({
      email,
      password: hashedPassword,
      username,
      lastName,
      firstName,
    })

    //Save and return user
    await newUser.save()
    res.status(200).json(newUser)
  } catch (err) {
    if (err === 'ValidationError') {
      let errorString: string = stringifyError(errors.array())
      next(
        new BadRequestError('Request Validation Failed: ' + errorString, err)
      )
    } else if (err === 'IdentificationDuplicated') {
      next(new BadRequestError('Email or Username existed', err))
    } else {
      next(new InternalServerError(err))
    }
  }
}

/*******************************
 * @ROUTE POST /v1/user/signIn *
 * @DESC Sign user in          *
 * @ACCESS PUBLIC              *
 *******************************/
export const signUserIn = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { username, password } = req.body
  const errors = validationResult(req)

  try {
    //Validation error
    if (!errors.isEmpty()) {
      throw 'ValidationError'
    }
    const user = await User.findOne({ username })
    if (!user) throw 'CredentialError'
    //Check password
    const compare = await bcrypt.compare(password, user.password)
    if (!compare) throw 'CredentialError'
    res.status(200).json(user)
  } catch (err) {
    if (err === 'ValidationError') {
      let errorString: string = stringifyError(errors.array())
      next(
        new BadRequestError('Request Validation Failed: ' + errorString, err)
      )
    } else if (err === 'CredentialError')
      next(new BadRequestError('Incorrect Username or Password', err))
  }
}

/*********************************
 * @ROUTE PATCH /v1/user/:userId *
 * @DESC Update user info        *
 * @ACCESS private               *
 *********************************/

export const updateUserInfo = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { userId } = req.params
  const { lastName, firstName, email } = req.body
  const errors = validationResult(req)

  //Build a new user info object
  let newUserInfo: {
    lastName?: string
    firstName?: string
    email?: string
  } = {}

  if (lastName) newUserInfo.lastName = lastName
  if (firstName) newUserInfo.firstName = firstName
  if (email) newUserInfo.email = email

  try {
    if (!errors.isEmpty()) throw 'ValidationError'
    const user = await User.findById(userId)
    if (!user) throw 'UserNotFound'
    const newUser = await User.findByIdAndUpdate(userId, newUserInfo, {
      new: true,
    })
    console.log(newUser)
    // await newUser?.save()
    res.status(200).json(newUser)
  } catch (err) {
    if (err === 'ValidationError')
      next(
        new BadRequestError(
          'Bad Request: ' + stringifyError(errors.array()),
          err
        )
      )
    if (err.kind === 'ObjectId' || err === 'UserNotFound')
      next(new NotFoundError('No user found with this Id', err))
    else next(new InternalServerError(err))
  }
}

/******************************************
 * @ROUTE PATCH /v1/user/:userId/password *
 * @DESC Update user pasword              *
 * @ACCESS Private                        *
 ******************************************/
export const updateUserPassword = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { userId } = req.params
  const { oldPassword, newPassword } = req.body
  const errors = validationResult(req)

  try {
    if (!errors.isEmpty()) throw 'ValidationError'
    const user = await User.findById(userId)
    if (user?.password !== oldPassword) throw 'CredentialError'

    const userWithNewPassword = await User.findByIdAndUpdate(
      userId,
      { password: newPassword },
      { new: true }
    )
    res.status(200).json(userWithNewPassword)
  } catch (err) {
    if (err.kind === 'ObjectId')
      next(new NotFoundError('No user found with this Id', err))
    switch (err) {
      case 'ValidationError':
        next(
          new BadRequestError(
            'Bad Request: ' + stringifyError(errors.array()),
            err
          )
        )
      case 'CredentialError':
        next(new BadRequestError('Incorrect Password', err))
      default:
        next(new InternalServerError(err))
    }
  }
}

/******************************************
 * @ROUTE POST /v1/user/password          *
 * @DESC Order a "Forget Password"        *
 * @ACCESS Public                         *
 ******************************************/
export const forgetPassword = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const errors = validationResult(req)

  try {
    if (!errors.isEmpty()) throw 'ValidationError'
    res.status(200).json({
      msg:
        'A recover email has been sent to your email address if you have an account associated with it.',
    })
  } catch (err) {
    if (err === 'ValidationError')
      next(
        new BadRequestError(
          'Bad Request: ' + stringifyError(errors.array()),
          err
        )
      )
    next(new InternalServerError(err))
  }
}
