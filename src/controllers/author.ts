import { NextFunction, Request, Response } from 'express'
import { validationResult } from 'express-validator'

import { PayloadType } from '../middlewares/auth'
import * as service from '../services/author'

/*======================+
 |@ROUTE GET v1/author  |
 |@DESC GET ALL AUTHOR  |
 |@ACCESS Public        |
 +======================*/
export const getAllAuthor = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const authors = await service.getAllAuthors()
    res.status(200).json(authors)
  } catch (err) {
    next(service.errorHandler(err))
  }
}

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
    if (!errors.isEmpty()) throw 'ValidationError'
    const newAuthor = await service.addAuthor(userReq.id, req.body)
    res.status(200).json(newAuthor)
  } catch (err) {
    next(service.errorHandler(err, errors))
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
  const { authorId } = req.params
  const userReq = req.user as PayloadType
  try {
    const author = await service.updateAuthor(userReq.id, authorId, req.body)
    res.status(200).json(author)
  } catch (err) {
    next(service.errorHandler(err, errors))
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
    next(service.errorHandler(err))
  }
}

/*==================================+
 |@ROUTE GET v1/author/:authorId    |
 |@DESC Get an author               |
 |@ACCESS Public                    |
 +==================================*/
export const getAuthor = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { authorId } = req.params
  try {
    const author = await service.getAuthor(authorId)
    res.status(200).json(author)
  } catch (err) {
    next(service.errorHandler(err))
  }
}
