import { Result, ValidationError } from 'express-validator'
import { Schema } from 'mongoose'

import {
  BadRequestError,
  InternalServerError,
  NotFoundError,
  UnauthorizedError,
} from '../helpers/apiError'
import Author from '../models/Author'
import Book, { BookDocument } from '../models/Book'
import User, { UserDocument } from '../models/User'
import stringifyError from '../util/stringifyError'

type BookPayloadType = {
  isbn: string,
  title: string,
  description: string,
  publisher: string,
  status: string,
  author: string,
}

/*=============+
 |Get all books|
 +=============*/
export const getAllBooks = async (): Promise<BookDocument[]> => {
  const books = await Book.find().populate('author', 'name')
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
  
  
  user.borrowedBooks = [...user.borrowedBooks, {_id: bookId}]
  await user.populate('borrowedBooks',).execPopulate()
  await user.populate('borrowedBooks.author', 'name').execPopulate()
  return await user.save()
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

  const user = await User.findById(userId)
  if (!user) throw 'UserNotFound'

  console.log('borrowedBooks', user.borrowedBooks);
  
  const filteredBooks = user.borrowedBooks.filter(
    (id: Schema.Types.ObjectId) => id.toString() !== bookId
  )
    console.log('filteredBooks:', filteredBooks)
  user.borrowedBooks = filteredBooks
  await user.populate('borrowedBooks').execPopulate()
  await user.populate('borrowedBooks.author', 'name').execPopulate()
  return user.save()
}

/*============+
 |Add new book|
 +============*/
export const addNewBook = async (
  userId: string,
  bookObj: Partial<BookPayloadType>
): Promise<BookDocument> => {
  
  const user = await User.findById(userId)
  if (!user) throw 'UserNotFound'
  if (!user.isAdmin) throw 'NotAnAdmin'

  let { isbn, title, description, publisher, author: authorName, status } = bookObj
  let author;

  const newBook = new Book({
    isbn,
    title,
    description,
    publisher,
    status,
    author
  })

  const authorExistsInDb = await Author.findOne({ name: authorName })
  if (authorExistsInDb) {
    newBook.author = {_id: authorExistsInDb._id}
    authorExistsInDb.writtenBooks.unshift({_id: newBook._id})
    await authorExistsInDb.save()

  } else {
    const newAuthor = new Author({
      name: authorName,
      writtenBooks: [{_id: newBook._id}]
    })
    await newAuthor.save()
    newBook.author = {_id: newAuthor._id}
  }


  
  await newBook.populate('author').execPopulate()

  return await newBook.save()
}

/*================+
 |Update book info|
 +================*/
 
export const updateBook = async (
  userId: string,
  bookId: string,
  bookObj: Partial<BookPayloadType>
): Promise<BookDocument> => {
  const user = await User.findById(userId)
  if (!user) throw 'UserNotFound'
  if (!user.isAdmin) throw 'NotAnAdmin'
  
  //Build a new info object
  const { isbn, title, description, publisher, author:authorName, status } = bookObj
  
  let newInfo: any = {}

  if (isbn) newInfo.isbn = isbn
  if (title) newInfo.title = title
  if (description) newInfo.description = description
  if (publisher) newInfo.publisher = publisher
  if (status) newInfo.status = status

  const book = await Book.findById(bookId)
  if(!book) throw 'BookNotFound'

  if (authorName){
    const authorExistsInDb = await Author.findOne({name: authorName})
    if (authorExistsInDb){
      authorExistsInDb.writtenBooks.unshift({_id: bookId})
      await authorExistsInDb.save()
      newInfo.author = {
       _id: authorExistsInDb._id
      }
    }

    if (!authorExistsInDb){
      const newAuthor = new Author({
        name: authorName,
        writtenBooks: [
          {
            _id: bookId
          }
        ]
      })
      await newAuthor.save()
      newInfo.author = {
        _id: newAuthor._id
      }
    }

    if(book.author) {
      const oldAuthor = await Author.findById(book.author)
      if (!oldAuthor) throw 'AuthorNotFound'

      const books = [...oldAuthor.writtenBooks]
      const newBooks = [...books].filter(bookObj => bookObj._id.toString() !== bookId.toString())

      oldAuthor.writtenBooks = newBooks
      await oldAuthor.save()
    } 
  } else {
    newInfo.author = {
      _id: book.author._id || null
    }
  }

  console.log('newInfo:', newInfo)
  const newBook = await Book.findByIdAndUpdate(bookId, newInfo, {
    new: true,
  })
  
  if (!newBook) throw 'BookNotFound'
  await newBook.populate('author','name').execPopulate()
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
  if (err.kind === 'ObjectId') {
    console.log(err);
    return new NotFoundError('ID Invalid')}
  switch (err) {
    case 'ValidationError':
      return new BadRequestError(
        'Bad Request: ' + stringifyError(validationErrors!.array())
      )
    case 'NotAnAdmin':
      return new UnauthorizedError('You have no right to do this! SHAME!')
    case 'UserNotFound':
      return new NotFoundError('User not found')
    case 'BookNotFound':
      return new NotFoundError('No book found', err)
    default:
      console.log(err);
      return new InternalServerError(err)
  }
}
