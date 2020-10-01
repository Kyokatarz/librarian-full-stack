import { Request, Response, NextFunction } from 'express'
import { validationResult } from 'express-validator'

import Book, { BookDocument } from '../models/Book'
import {
  BadRequestError,
  InternalServerError,
  NotFoundError,
  UnauthorizedError,
} from '../helpers/apiError'
import { stringifyError } from '../util/stringifyError'
import User, { BorrowedBook, UserDocument } from '../models/User'
import { Document } from 'mongoose'
import { PayloadType } from '../middlewares/auth'
//TODO: Get book with pagnition, filtering by author...

/*===================+
 |@ROUTE GET v1/book |
 |@DESC Get all books|
 |@ACCESS Public     |
 +===================*/

export const getAllBooks = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const book = await Book.find()
    res.status(200).json(book)
  } catch (err) {
    next(new InternalServerError(err))
  }
}

/*=========================+
 |@ROUTE GET v1/book/:isbn |
 |@DESC Get books by isbn  |
 |@ACCESS Public           |
 +=========================*/
export const getBookByIsbn = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { isbn } = req.params
  try {
    const book = await Book.find({ isbn })
    if (!book) throw 'BookNotFound'
    res.status(200).json(book)
  } catch (err) {
    if (err === 'BookNotFound')
      next(new NotFoundError('No book found with this ISBN', err))
    next(new InternalServerError(err))
  }
}

/*=======================================+
 |@ROUTE PATCH v1/book/:bookId/checkout/ |
 |@DESC Check out a book by its ID       |
 |@ACCESS Private                        |
 +=======================================*/
export const checkoutBook = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { bookId } = req.params

  const userReq: PayloadType = req.user as PayloadType //This is from jwt

  try {
    const book = await Book.findById(bookId)
    if (!book) throw 'BookNotFound'
    if (book?.status === 'borrowed') {
      res.status(200).json({ msg: 'This book has already been borrowed!' })
      return
    }
    const updatedBook = await Book.findOneAndUpdate(
      { _id: bookId, status: 'available' },
      { status: 'borrowed' },
      { new: true }
    )

    const user = await User.findById(userReq.id)

    //Building book => user:
    const { isbn, title, description, publisher, author, status } = updatedBook!

    user?.borrowedBooks?.unshift({
      isbn,
      title,
      description,
      publisher,
      author,
      status,
      _id: bookId,
      date: new Date(),
    })

    await user?.save()
    res.status(200).json(user)
  } catch (err) {
    if (err === 'BookNotFound' || err.kind === 'ObjectId')
      next(new NotFoundError('No book found with this ID', err))
    next(new InternalServerError(err))
  }
}

/*=======================================+
 |@ROUTE PATCH v1/book/:bookId/checkin/  |
 |@DESC Check in a book by its ID        |
 |@ACCESS Private                        |
 +=======================================*/
export const checkinBook = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { bookId } = req.params
  const userReq: PayloadType = req.user as PayloadType //This is from jwt
  try {
    const book = await Book.findById(bookId)
    if (!book) throw 'BookNotFound'

    const updatedBook = await Book.findOneAndUpdate(
      { _id: bookId, status: 'borrowed' },
      { status: 'available' },
      { new: true }
    )
    if (!updatedBook) {
      //How can you return an already returned book?
      res.status(200).json({ msg: 'How did you get this book? :suspicious:' })
      return
    }

    const user = await User.findById(userReq.id)

    const deleteIndex: number = user?.borrowedBooks
      .map((obj: any) => obj.id)
      .indexOf(bookId)

    user?.borrowedBooks.splice(deleteIndex, 1)

    await user?.save()
    res.status(200).json({ user })
  } catch (err) {
    if (err === 'BookNotFound' || err.kind === 'ObjectId')
      next(new NotFoundError('No book found with this ID', err))
    next(new InternalServerError(err))
  }
}

/*=========================================+
 |               //!ADMIN ONLY             |
 +=========================================*/
//TODO: Add admin authorization

/*===================+
 |@ROUTE POST v1/book|
 |@DESC Get all books|
 |@ACCESS private    |
 +===================*/
export const adminAddBook = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const userReq = req.user as PayloadType
  const errors = validationResult(req)
  const { isbn, title, description, publisher, author, status } = req.body

  try {
    const user = await User.findById(userReq.id)
    if (!user?.isAdmin) throw 'NotAnAdmin'
    if (!errors.isEmpty()) throw 'ValidationError'
    const newBook = new Book({
      isbn,
      title,
      description,
      publisher,
      author,
      status,
    })

    await newBook.save()
    res.status(200).json(newBook)
  } catch (err) {
    if (err === 'ValidationError')
      next(
        new BadRequestError(
          'Request Validation Failed: ' + stringifyError(errors.array()),
          err
        )
      )
    if (err === 'NotAnAdmin')
      next(new UnauthorizedError('You have no right to do this! SHAME!'))
    next(new InternalServerError(err))
  }
}

/*===========================+
 |@ROUTE PUT v1/book/:bookId |
 |@DESC Update book by id    |
 |@ACCESS private            |
 +===========================*/
export const adminUpdateBook = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const userReq = req.user as PayloadType
  const errors = validationResult(req)
  const { bookId } = req.params
  const { isbn, title, description, publisher, author, status } = req.body
  try {
    const user = await User.findById(userReq.id)
    if (!user?.isAdmin) throw 'NotAnAdmin'
    if (!errors.isEmpty()) throw 'ValidationError'

    //Build a new info object
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
    res.status(200).json(newBook)
  } catch (err) {
    if (err.kind === 'ObjectId' || err == 'BookNotFound') {
      next(new NotFoundError('No book found with this Id', err))
    }
    if (err === 'ValidationError')
      next(
        new BadRequestError(
          'Bad request: ' + stringifyError(errors.array()),
          err
        )
      )
    if (err === 'NotAnAdmin')
      next(new UnauthorizedError('You have no right to do this! SHAME!'))
    next(new InternalServerError(err))
  }
}

/*==============================+
 |@ROUTE DELETE v1/book/:bookId |
 |@DESC Delete book by id       |
 |@ACCESS private               |
 +==============================*/

export const deleteBook = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { bookId } = req.params
  const userReq = req.user as PayloadType
  try {
    const user = await User.findById(userReq.id)
    if (!user?.isAdmin) throw 'NotAnAdmin'
    const book = await Book.findByIdAndDelete(bookId)
    if (!book) throw 'BookNotFound'
    res.status(200).json(book)
  } catch (err) {
    if (err === 'BookNotFound')
      next(new NotFoundError('Book with this ID not found '))
    if (err === 'NotAnAdmin')
      next(new UnauthorizedError('You have no right to do this! SHAME!'))
    next(new InternalServerError(err))
  }
}
