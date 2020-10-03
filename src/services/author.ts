import { Result, ValidationError } from 'express-validator'

import {
  NotFoundError,
  BadRequestError,
  InternalServerError,
  UnauthorizedError,
} from '../helpers/apiError'
import Author, { AuthorDocument } from '../models/Author'
import Book, { BookDocument } from '../models/Book'
import User, { UserDocument } from '../models/User'
import stringifyError from '../util/stringifyError'

export const addAuthor = async (
  userId: string,
  authorObj: Partial<AuthorDocument>
): Promise<AuthorDocument> => {
  const user = await User.findById(userId)
  if (!user?.isAdmin) throw 'NotAnAdmin'

  const { name, books } = authorObj

  const author = await Author.findOne({ name })
  if (author) throw 'IdentificationDuplicated'

  const newAuthor = new Author({
    name,
    books,
  })

  return await newAuthor.save()
}

export const updateAuthor = async (
  userId: string,
  authorId: string,
  authorObj: Partial<AuthorDocument>
) => {
  const { name, books } = authorObj
  const user = await User.findById(userId)
  if (!user?.isAdmin) throw 'NotAnAdmin'

  const newInfo: any = {}
  if (name) newInfo.name = name
  if (books) newInfo.books = books
  const author = await Author.findByIdAndUpdate(authorId, newInfo, {
    new: true,
  })

  if (!author) throw 'AuthorNotFound'
  return author
}

export const deleteAuthor = async (userId: string, authorId: string) => {
  const user = await User.findById(userId)
  if (!user?.isAdmin) throw 'NotAnAdmin'

  const author = await Author.findByIdAndDelete(authorId)
  if (!author) throw 'AuthorNotFound'

  return author
}
/*=============+
 |Error Handler|
 +=============*/
export const errorHandler = (
  err: any,
  validationErrors?: Result<ValidationError>
) => {
  if (err.kind === 'ObjectId') return new NotFoundError('ID Invalid')
  switch (err) {
    case 'ValidationError':
      return new BadRequestError(
        'Bad Request: ' + stringifyError(validationErrors!.array())
      )
    case 'IdentificationDuplicated':
      return new BadRequestError('Author already existed', err)
    case 'NotAnAdmin':
      return new UnauthorizedError('You have no right to do this! SHAME!')
    case 'AuthorNotFound':
      return new NotFoundError('No author found', err)
    default:
      return new InternalServerError(err)
  }
}
