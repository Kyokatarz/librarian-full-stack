import { NextFunction, Request, Response } from 'express'
import { validationResult } from 'express-validator'

import { PayloadType } from '../middlewares/auth'
import { BookDocument } from '../models/Book'
import * as service from '../services/book'

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
    const book = await service.getAllBooks()
    res.status(200).json(book)
  } catch (err) {
    next(service.errorHandler(err))
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
    const book = await service.getBookByIsbn(isbn)
    res.status(200).json(book)
  } catch (err) {
    next(service.errorHandler(err))
  }
}

/*============================================================+
 |@ROUTE PATCH v1/book/:bookId/checkout/                      |
 |@DESC Check out a book by its ID, return the borrowing user |
 |@ACCESS Private                                             |
 +============================================================*/
export const checkoutBook = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { bookId } = req.params
  const userReq = req.user as PayloadType //This is from jwt

  try {
    const result = await service.checkoutBook(userReq.id, bookId)
    if (result === null) return res.status(209).json({ msg: 'Book already borrowed!' })
    res.status(200).json(result)
  } catch (err) {
    console.log(err);
    next(service.errorHandler(err))
  }
}

/*============================================================+
 |@ROUTE PATCH v1/book/:bookId/checkin/                      |
 |@DESC Check in a book by its ID, return the returning user |
 |@ACCESS Private                                             |
 +============================================================*/
export const checkinBook = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { bookId } = req.params
  const userReq: PayloadType = req.user as PayloadType //This is from jwt
  try {
    const result = await service.checkinBook(userReq.id, bookId)
    if (result === null) return res.status(209).json({ msg: 'Book already checked in' })
    res.status(200).json(result)
  } catch (err) {
    console.log(err);
    next(service.errorHandler(err))
  }
}

/*=========================================+
 |               //!ADMIN ONLY             |
 +=========================================*/
/*====================+
 |@ROUTE POST v1/book |
 |@DESC Add a new book|
 |@ACCESS private     |
 +====================*/
export const adminAddBook = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const userReq = req.user as PayloadType
  const errors = validationResult(req)

  try {
    if (!errors.isEmpty()) throw 'ValidationError'
    const newBook = await service.addNewBook(
      userReq.id,
      req.body as any
    )
    res.status(200).json(newBook)
  } catch (err) {
    console.log(err)
    next(service.errorHandler(err, errors))
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
  const errors = validationResult(req)
  const userReq = req.user as PayloadType
  const { bookId } = req.params

  try {
    if (!errors.isEmpty()) throw 'ValidationError'
    const newBook = await service.updateBook(
      userReq.id,
      bookId,
      req.body as any
    )
    res.status(200).json(newBook)
  } catch (err) {
    next(service.errorHandler(err, errors))
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
    const book = await service.deleteBook(userReq.id, bookId)
    res.status(200).json(book)
  } catch (err) {
    next(service.errorHandler(err))
  }
}
