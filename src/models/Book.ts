import mongoose, { Document } from 'mongoose'

export type BookDocument = Document & {
  isbn: string
  title: string
  description: string
  publisher: string
  author: {
    id: mongoose.Schema.Types.ObjectId
  }
  status: 'available' | 'borrowed'
}

const BookSchema = new mongoose.Schema({
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
  author: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'author',
    },
  ],
  status: {
    type: String,
    enum: ['available', 'borrowed'],
    required: true,
  },
})

const Book = mongoose.model<BookDocument>('book', BookSchema)

export default Book
