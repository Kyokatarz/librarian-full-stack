import { Request, Response, NextFunction } from 'express'
import { validationResult } from 'express-validator'
import { BadRequestError } from '../helpers/apiError'
import { stringifyError } from '../util/stringifyError'

import Author from '../models/Author'

/*=========================================+
 |              //!ADMIN ONLY              |
 +=========================================*/
/*======================+
 |@ROUTE POST v1/author |
 |@DESC Add new author  |
 |@ACCESS Public        |
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
    const author = Author.find({ name })
    if (!author) throw 'IdentificationDuplicated'

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
