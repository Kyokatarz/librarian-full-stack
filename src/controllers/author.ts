import { Request, Response, NextFunction } from 'express'
import { validationResult } from 'express-validator'
import {
  BadRequestError,
  InternalServerError,
  NotFoundError,
} from '../helpers/apiError'
import { stringifyError } from '../util/stringifyError'

import Author from '../models/Author'

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
  try {
    if (!errors.isEmpty()) throw 'ValidationError'
    const { name, books } = req.body
    const author = await Author.findOne({ name })
    if (author) throw 'IdentificationDuplicated'

    const newAuthor = new Author({
      name,
      books,
    })

    await newAuthor.save()
    res.status(200).json(newAuthor)
  } catch (err) {
    if (err === 'ValidationError')
      next(
        new BadRequestError(
          'Request Validation Failed: ' + stringifyError(errors.array()),
          err
        )
      )
    if (err === 'IdentificationDuplicated')
      next(new BadRequestError('Author already existed', err))
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

  try {
    if (!errors.isEmpty()) throw 'ValidationError'
    if (name) newInfo.name = name
    if (books) newInfo.books = books
    const author = await Author.findByIdAndUpdate(authorId, newInfo, {
      new: true,
    })

    if (!author) throw 'AuthorNotFound'
    res.status(200).json(author)
  } catch (err) {
    if (err === 'ValidationError')
      next(
        new BadRequestError(
          'Request Validation Failed: ' + stringifyError(errors.array()),
          err
        )
      )
    if (err === 'AuthorNotFound' || err.kind === 'ObjectId')
      next(new NotFoundError('No author found with this Id', err))
    throw next(new InternalServerError(err))
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
  const { authorId } = req.params
  try {
    const author = await Author.findByIdAndDelete(authorId)
    if (!author) throw 'AuthorNotFound'
    res.status(200).json(author)
  } catch (err) {
    if (err === 'AuthorNotFound' || err.kind === 'ObjectId')
      next(new NotFoundError('No author found with this Id', err))
    next(new InternalServerError(err))
  }
}
