import { Request, Response, NextFunction } from 'express'
import { validationResult } from 'express-validator'

import { stringifyError } from '../util/stringifyError'
import { BadRequestError, InternalServerError } from '../helpers/apiError'
import User from '../models/User'
import { emitWarning } from 'process'

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
    if (user) throw 'IdenticationDuplicated'

    const newUser = new User({
      email,
      password,
      username,
      lastName,
      firstName,
    })

    await newUser.save()
    res.status(200).json(newUser)
  } catch (err) {
    if (err === 'ValidationError') {
      let errorString: string = stringifyError(errors.array())
      next(
        new BadRequestError('Request Validation Failed: ' + errorString, err)
      )
    } else if (err === 'IdenticationDuplicated') {
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
