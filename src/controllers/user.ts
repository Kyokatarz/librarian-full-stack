import { Request, Response, NextFunction } from 'express'
import { validationResult } from 'express-validator'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

import { JWT_SECRET } from '../util/secrets'
import stringifyError from '../util/stringifyError'
import {
  BadRequestError,
  InternalServerError,
  NotFoundError,
} from '../helpers/apiError'
import * as service from '../services/user'

import User from '../models/User'
import errorHandler from 'errorhandler'

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
  const { email, username, password, lastName, firstName, isAdmin } = req.body
  const errors = validationResult(req)

  try {
    //Validation error
    if (!errors.isEmpty()) {
      throw 'ValidationError'
    }

    //Save user
    const newUser = await service.create({
      email,
      username,
      password,
      lastName,
      firstName,
      isAdmin,
    })

    //Return JWT
    const payload = {
      user: {
        id: newUser.id,
      },
    }
    const token = jwt.sign(
      payload,
      JWT_SECRET //TODO: Add token expiration  === 1 day
    )

    res.status(200).json({ token })
  } catch (err) {
    next(service.errorHandler(err, errors))
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

    const payload = {
      user: {
        id: user.id,
      },
    }
    const token = jwt.sign(
      payload,
      JWT_SECRET //TODO: Add token expiration  === 1 day
    )

    console.log('Token:', token)
    res.status(200).json({ token })
  } catch (err) {
    next(service.errorHandler(err, errors))
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
  try {
    if (!errors.isEmpty()) throw 'ValidationError'

    const newUser = await service.updateUser(userId, {
      lastName,
      firstName,
      email,
    })
    res.status(200).json(newUser)
  } catch (err) {
    next(service.errorHandler(err, errors))
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
    const newUser = await service.updatePassword(userId, {
      oldPassword,
      newPassword,
    })
    res.status(200).json(newUser)
  } catch (err) {
    next(service.errorHandler(err, errors))
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
    next(service.errorHandler(err, errors))
  }
}
