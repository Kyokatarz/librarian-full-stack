import mongoose, { Document } from 'mongoose'

import { BookDocument } from './Book'

export type AuthorDocument = Document & {
  name: string
  books: Partial<BookDocument>[]
}
const AuthorSchema = new mongoose.Schema({
  name: { type: String, required: true },
  books: [
    {
      _id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'books',
      },
    },
  ],
})

const Author = mongoose.model<AuthorDocument>('author', AuthorSchema)

export default Author
