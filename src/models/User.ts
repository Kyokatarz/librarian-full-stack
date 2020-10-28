import mongoose, { Document } from 'mongoose'

import { BookDocument } from './Book'

export type BorrowedBook = BookDocument & {
  date: { type: Date; required: true };
}
export type UserDocument = Document & {
  imageUrl: string;
  username: string;
  password: string;
  email: string;
  lastName: string;
  firstName: string;
  borrowedBooks: any[];
  isGoogleUser: boolean;
  isAdmin: boolean;
  resetToken: {
    token: string;
    expirationDate: number;
  };
}

const UserSchema = new mongoose.Schema({
  imageUrl: {
    type: String,
    default: 'https://via.placeholder.com/40x40',
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
    },
  ],
  isAdmin: { type: Boolean, default: false }, //Changable only through db
  isGoogleUser: { type: Boolean, default: false },
  resetToken: {
    token: String,
    expirationDate: Number,
  },
})

const User = mongoose.model<UserDocument>('user', UserSchema)

export default User
