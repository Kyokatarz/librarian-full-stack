import { Request, Response, NextFunction } from 'express'
import { validationResult } from 'express-validator'
import {
  BadRequestError,
  InternalServerError,
  NotFoundError,
  UnauthorizedError,
} from '../helpers/apiError'
import stringifyError from '../util/stringifyError'

import Author from '../models/Author'
import { PayloadType } from '../middlewares/auth'
import User from '../models/User'
import * as service from '../services/author'
import { errorHandler } from '../services/user'

/*=========================================+
 |              //!ADMIN ONLY              |
 +=========================================*/
/*======================+
 |@ROUTE POST v1/author |
 |@DESC Add new author  |
 |@ACCESS Private       |
 +======================*/
export const adminAddAuthor = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const errors = validationResult(req)
  const userReq = req.user as PayloadType
  try {
    const newAuthor = await service.addAuthor(userReq.id, req.body)
    res.status(200).json(newAuthor)
  } catch (err) {
    next(errorHandler(err, errors))
  }
}

/*===============================+
 |@ROUTE PUT v1/author/:authorId |
 |@DESC Update author info       |
 |@ACCESS Private                |
 +===============================*/
export const adminUpdateAuthor = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const errors = validationResult(req)
  const { name, books } = req.body
  const { authorId } = req.params
  const newInfo: any = {}
  const userReq = req.user as PayloadType
  try {
    const author = await service.updateAuthor(userReq.id, authorId, req.body)
    res.status(200).json(author)
  } catch (err) {
    next(errorHandler(err, errors))
  }
}

/*==================================+
 |@ROUTE DELETE v1/author/:authorId |
 |@DESC Delete an author            |
 |@ACCESS Private                   |
 +==================================*/

export const adminDeleteAuthor = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const userReq = req.user as PayloadType
  const { authorId } = req.params
  try {
    const author = await service.deleteAuthor(userReq.id, authorId)
    res.status(200).json(author)
  } catch (err) {
    next(errorHandler(err))
  }
}
