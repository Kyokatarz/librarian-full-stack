import { Request, Response, NextFunction } from 'express'
import { validationResult } from 'express-validator'
import { BadRequestError, InternalServerError } from '../helpers/apiError'
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
    const user = await User.find({ email })
    if (user) throw 'EmailDuplicated'

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
      next(new BadRequestError('Request Validation Failed', err))
    } else if (err === 'EmailDuplicated') {
      next(new BadRequestError('Email Existed', err))
    } else {
      next(new InternalServerError(err))
    }
  }
  //TODO: Continue writing here
}
