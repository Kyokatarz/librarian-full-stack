import mongoose, { Document } from 'mongoose'

export type BookDocument = Document & {
  isbn: string;
  title: string;
  description: string;
  publisher: string;
  author: {
    _id: mongoose.Schema.Types.ObjectId;
  };
  status: 'available' | 'borrowed';
  imageUrl: string;
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
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'author',
  },

  status: {
    type: String,
    enum: ['available', 'borrowed'],
    required: true,
  },
  imageUrl: {
    type: String,
    default: 'https://via.placeholder.com/300x200',
  },
})

const Book = mongoose.model<BookDocument>('book', BookSchema)

export default Book
