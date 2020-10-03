import { Result, ValidationError } from 'express-validator'
import mongoose from 'mongoose'

import {
  NotFoundError,
  BadRequestError,
  InternalServerError,
  UnauthorizedError,
} from '../helpers/apiError'
import Book, { BookDocument } from '../models/Book'
import User, { UserDocument } from '../models/User'
import stringifyError from '../util/stringifyError'

/*=============+
 |Get all books|
 +=============*/
export const getAllBooks = async (): Promise<BookDocument[]> => {
  const books = await Book.find()
  return books
}

/*=================+
 |Get books by Isbn|
 +=================*/
export const getBookByIsbn = async (isbn: string): Promise<BookDocument[]> => {
  const book = await Book.find({ isbn })
  if (!book) throw 'BookNotFound'
  return book
}

/*======================+
 |Check out a book by Id|
 +======================*/
export const checkoutBook = async (
  userId: string,
  bookId: string
): Promise<UserDocument | null> => {
  const book = await Book.findById(bookId)
  if (!book) throw 'BookNotFound'
  if (book.status === 'borrowed') {
    return null
  }

  book.status = 'borrowed'
  await book.save()

  //Building book => user:
  const user = await User.findById(userId)
  if (!user) throw 'UserNotFound'
  const { isbn, title, description, publisher, author, status } = book

  user.borrowedBooks.unshift({
    _id: bookId,
    date: new Date(),
    isbn,
    title,
    description,
    publisher,
    author,
    status,
  })

  return user.save()
}

/*=====================+
 |Check in a book by Id|
 +=====================*/

export const checkinBook = async (
  userId: string,
  bookId: string
): Promise<UserDocument | null> => {
  const book = await Book.findById(bookId)
  if (!book) throw 'BookNotFound'

  if (book.status === 'available') return null
  book.status = 'available'
  await book.save()
  console.log(book)
  const user = await User.findById(userId)
  if (!user) throw 'UserNotFound'

  const filteredBooks = user.borrowedBooks.filter(
    (book: BookDocument) => book.id !== bookId
  )

  user.borrowedBooks = filteredBooks
  return user.save()
}

/*============+
 |Add new book|
 +============*/
export const addNewBook = async (
  userId: string,
  bookObj: Partial<BookDocument>
): Promise<BookDocument> => {
  const user = await User.findById(userId)
  if (!user) throw 'UserNotFound'
  if (!user.isAdmin) throw 'NotAnAdmin'

  const { isbn, title, description, publisher, author, status } = bookObj
  const newBook = new Book({
    isbn,
    title,
    description,
    publisher,
    author,
    status,
  })
  return await newBook.save()
}

/*================+
 |Update book info|
 +================*/
export const updateBook = async (
  userId: string,
  bookId: string,
  bookObj: Partial<BookDocument>
): Promise<BookDocument> => {
  const user = await User.findById(userId)
  if (!user) throw 'UserNotFound'
  if (!user.isAdmin) throw 'NotAnAdmin'

  //Build a new info object
  const { isbn, title, description, publisher, author, status } = bookObj
  let newInfo: any = {}
  if (isbn) newInfo.isbn = isbn
  if (title) newInfo.title = title
  if (description) newInfo.description = description
  if (publisher) newInfo.publisher = publisher
  if (author) newInfo.author = author
  if (status) newInfo.status = status

  const newBook = await Book.findByIdAndUpdate(bookId, newInfo, {
    new: true,
  })
  if (!newBook) throw 'BookNotFound'
  return newBook
}

/*===========+
 |Delete book|
 +===========*/
export const deleteBook = async (
  userId: string,
  bookId: string
): Promise<BookDocument> => {
  const user = await User.findById(userId)
  if (!user) throw 'UserNotFound'
  if (!user.isAdmin) throw 'NotAnAdmin'
  const book = await Book.findByIdAndDelete(bookId)
  if (!book) throw 'BookNotFound'
  return book
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
    case 'NotAnAdmin':
      return new UnauthorizedError('You have no right to do this! SHAME!')
    case 'BookNotFound':
      console.log('Here')
      return new NotFoundError('No book found', err)
    case 'UserNotFound':
      return new NotFoundError('No user found', err)
    default:
      return new InternalServerError(err)
  }
}
