import { Request, Response, NextFunction } from 'express'
import { validationResult } from 'express-validator'

import Book from '../models/Book'
import {
  BadRequestError,
  InternalServerError,
  NotFoundError,
} from '../helpers/apiError'
import { stringifyError } from '../util/stringifyError'

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
    const book = await Book.findOne({ isbn })
    if (!book) throw 'BookNotFound'
    res.status(200).json(book)
  } catch (err) {
    if (err === 'BookNotFound')
      next(new NotFoundError('No book found with this ISBN', err))
    next(new InternalServerError(err))
  }
}

/*=====================================+
 |@ROUTE PATCH v1/book/:isbn/checkout/ |
 |@DESC Check out a book by its ISBN   |
 |@ACCESS Public                       |
 +=====================================*/
export const checkoutBook = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { isbn } = req.params

  try {
    const book = await Book.findOne({ isbn })
    if (!book) throw 'BookNotFound'

    const updatedBook = await Book.findOneAndUpdate(
      { isbn, status: 'available' },
      { status: 'borrowed' },
      { new: true }
    )
    if (!updatedBook) {
      res
        .status(200)
        .json({ msg: 'Book(s) with this ISBN is currently not available' })
      return
    }
    res.status(200).json(updatedBook)
  } catch (err) {
    if (err === 'BookNotFound')
      next(new NotFoundError('No book found with this ISBN', err))
    next(new InternalServerError(err))
  }
}

/*=====================================+
 |@ROUTE PATCH v1/book/:isbn/checkin/  |
 |@DESC Check in a book by its ISBN    |
 |@ACCESS Public                       |
 +=====================================*/
export const checkinBook = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { isbn } = req.params

  try {
    const book = await Book.findOne({ isbn })
    if (!book) throw 'BookNotFound'

    const updatedBook = await Book.findOneAndUpdate(
      { isbn, status: 'borrowed' },
      { status: 'available' },
      { new: true }
    )
    if (!updatedBook) {
      res.status(200).json({ msg: 'How did you get this book? :suspicious:' })
      return
    }
    res.status(200).json(updatedBook)
  } catch (err) {
    if (err === 'BookNotFound')
      next(new NotFoundError('No book found with this ISBN', err))
    next(new InternalServerError(err))
  }
}

/*=========================================+
 |                 ADMIN ONLY              |
 +=========================================*/
//TODO: Add admin authorization

/*===================+
 |@ROUTE GET v1/book |
 |@DESC Get all books|
 |@ACCESS Public     |
 +===================*/
export const adminAddBook = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const errors = validationResult(req)
  const { isbn, title, description, publisher, author, status } = req.body

  try {
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
    next(new InternalServerError(err))
  }
}

/*=========================+
 |@ROUTE PUT v1/book/:isbn |
 |@DESC Update book by ISBN|
 |@ACCESS Public           |
 +=========================*/
export const adminUpdateBook = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const errors = validationResult(req)
  const { isbn, title, description, publisher, author, status } = req.body
  try {
    if (!errors.isEmpty()) throw 'ValidationError'
    let newInfo: any = {}
    if (isbn) newInfo.isbn = isbn
  } catch (err) {}
}
