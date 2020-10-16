import mongoose, { Document } from 'mongoose'

import { BookDocument } from './Book'

export type BorrowedBook = BookDocument & {
  date: { type: Date; required: true }
}
export type UserDocument = Document & {
  googleId: string
  imageUrl: string
  username: string
  password: string
  email: string
  lastName: string
  firstName: string
  borrowedBooks: any
  isAdmin: Boolean
}

const UserSchema = new mongoose.Schema({
  googleId: String,
  imageUrl: {
    type: String,
    default: 'https://via.placeholder.com/40x40'
  },
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
      type: mongoose.Schema.Types.ObjectId,
      ref: 'book',
    }
  ],
  isAdmin: { type: Boolean, default: false }, //Changable only through db
})

const User = mongoose.model<UserDocument>('user', UserSchema)

export default User
