import mongoose, { Document } from 'mongoose'

import { BookDocument } from './Book'

export type AuthorDocument = Document & {
  name: string
  writtenBooks: Partial<BookDocument>[]
}
const AuthorSchema = new mongoose.Schema({
  name: { type: String, required: true },
  writtenBooks: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'book',
    }
  ],
  
})

const Author = mongoose.model<AuthorDocument>('author', AuthorSchema)

export default Author
