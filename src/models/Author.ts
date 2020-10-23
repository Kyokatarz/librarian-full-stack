import mongoose, { Document } from 'mongoose'

export type AuthorDocument = Document & {
  name: string
  writtenBooks: { _id: string }[]
}
const AuthorSchema = new mongoose.Schema({
  name: { type: String, required: true },
  writtenBooks: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'book',
    },
  ],
})

const Author = mongoose.model<AuthorDocument>('author', AuthorSchema)

export default Author
