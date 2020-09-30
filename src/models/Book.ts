import mongoose from 'mongoose'

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
  author: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: ['available', 'borrowed'],
    required: true,
  },
})

const Book = mongoose.model('book', BookSchema)

export default Book
