import bcrypt from 'bcrypt'
import { NextFunction, Request, Response } from 'express'
import { validationResult } from 'express-validator'
import jwt from 'jsonwebtoken'

import { InternalServerError } from '../helpers/apiError'
import { PayloadType } from '../middlewares/auth'
import User from '../models/User'
import * as service from '../services/user'
import { JWT_SECRET } from '../util/secrets'

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

/*******************************
 * @ROUTE GET /v1/user/signOut *
 * @DESC Sign user out         *
 * @ACCESS Private             *
 *******************************/

export const signUserOut = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  req.logOut()
  res.redirect('http://localhost:5000/')
}

/********************************
 * @ROUTE GET /v1/user/         *
 * @DESC Get User Info by token *
 * @ACCESS PRIVATE              *
 ********************************/

export const getUserInfo = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const userReq = req.user as PayloadType
  try {
    const user = await service.getUserInfo(userReq.id)
    const {
      username,
      email,
      lastName,
      firstName,
      imageUrl,
      borrowedBooks,
      isAdmin,
      isGoogleUser,
    } = user
    return res.status(200).json({
      userInfo: {
        username,
        email,
        lastName,
        firstName,
        imageUrl,
        borrowedBooks,
        isAdmin,
        isGoogleUser,
      },
    })
  } catch (err) {
    next(service.errorHandler(err))
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
  const userReq = req.user as PayloadType
  const { lastName, firstName, email } = req.body
  const errors = validationResult(req)
  try {
    if (!errors.isEmpty()) throw 'ValidationError'

    const newUser = await service.updateUser(userReq.id, {
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
  const { id } = req.user as PayloadType
  const { oldPassword, newPassword } = req.body
  const errors = validationResult(req)

  try {
    if (!errors.isEmpty()) throw 'ValidationError'
    const newUser = await service.updatePassword(id, {
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
  const { email } = req.body.email

  try {
    if (!errors.isEmpty()) throw 'ValidationError'
    const msg = await service.forgetPassword(req.body.email)
    console.log(msg)

    res.json(msg)
  } catch (err) {
    next(service.errorHandler(err, errors))
  }
}

/************************************************
 * @ROUTE POST /v1/user/password/:resetToken    *
 * @DESC Recover User Password                  *
 * @ACCESS Private                              *
 ************************************************/

export const recoverPassword = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { password } = req.body
  const { resetToken } = req.params
  const errors = validationResult(req)

  try {
    if (!errors.isEmpty()) throw 'ValidationError'
    await service.recoverPassword(resetToken, password)
    res.status(200).json({ msg: 'Password changed successfully!' })
  } catch (err) {
    next(service.errorHandler(err, errors))
  }
}
