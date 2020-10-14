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
      type: mongoose.Schema.Types.ObjectId,
      ref: 'book',
    }
  ],
  
})

const Author = mongoose.model<AuthorDocument>('author', AuthorSchema)

export default Author
