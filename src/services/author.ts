import { Result, ValidationError } from 'express-validator'

import {
  BadRequestError,
  InternalServerError,
  NotFoundError,
  UnauthorizedError,
} from '../helpers/apiError'
import Author, { AuthorDocument } from '../models/Author'
import Book from '../models/Book'
import User from '../models/User'
import stringifyError from '../util/stringifyError'

export const addAuthor = async (
  userId: string,
  authorObj: Partial<AuthorDocument>
): Promise<AuthorDocument> => {
  const user = await User.findById(userId)
  if(!user) throw 'UserNotFound'
  if (!user.isAdmin) throw 'NotAnAdmin'

  const { name, writtenBooks } = authorObj
  const author = await Author.findOne({ name })
  if (author) throw 'IdentificationDuplicated'

  const allBooks = await Book.find()
  const allBooksId = allBooks.map(book => book.id)
  const allBooksAuthor = allBooks.map(book => book.author)


  const newAuthor = new Author({
    name,
    writtenBooks: [],
  })

  return await newAuthor.save()
}

export const updateAuthor = async (
  userId: string,
  authorId: string,
  authorObj: Partial<AuthorDocument>
) => {
  const { name, writtenBooks } = authorObj
  const user = await User.findById(userId)
  if (!user?.isAdmin) throw 'NotAnAdmin'

  const newInfo: any = {}
  if (name) newInfo.name = name
  if (writtenBooks) newInfo.books = writtenBooks
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

export const getAuthor = async(authorId: string) => {
console.log('authorId :', authorId);
  
  const author = await Author.findById(authorId).populate('writtenBooks')
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
  console.log(err.message)
  if (err.kind === 'ObjectId') return new NotFoundError('ID Invalid')
  switch (err) {
    case 'ValidationError':
      return new BadRequestError(
        'Bad Request: ' + stringifyError(validationErrors!.array())
      )
    case 'IdentificationDuplicated':
      return new BadRequestError('Author already existed', err)
    case 'BookHasAuthor':
      return new BadRequestError('The book(s) given already has an author. Use update book instead.')
    case 'NotAnAdmin':
      return new UnauthorizedError('You have no right to do this! SHAME!')
    case 'AuthorNotFound':
      return new NotFoundError('No author found', err)
    default:
      return new InternalServerError(err)
  }
}
