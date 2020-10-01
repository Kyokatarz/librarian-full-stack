import mongoose, { Document } from 'mongoose'

import { BookDocument } from './Book'

export type BorrowedBook = BookDocument & {
  date: { type: Date; required: true }
}
export type UserDocument = Document & {
  username: string
  password: string
  email: string
  lastName: string
  fisrtName: string
  borrowedBooks: any
  isAdmin: Boolean
}

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  lastName: { type: String, default: '' },
  firstName: { type: String, default: '' },
  borrowedBooks: [
    {
      _id: { type: mongoose.Schema.Types.ObjectId, required: true },
      date: { type: Date, required: true },
      isbn: {
        type: String,
        default: '',
      },
      title: {
        type: String,
        required: true,
      },
      description: {
        type: String,
        default: '',
      },
      publisher: {
        type: String,
        default: '',
      },
      author: {
        id: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'authors',
        },
      },
      status: {
        type: String,
        enum: ['available', 'borrowed'],
        required: true,
      },
    },
  ],
  isAdmin: { type: Boolean, default: false }, //Changable only through db
})

const User = mongoose.model<UserDocument>('user', UserSchema)

export default User
