import mongoose from 'mongoose'

const AuthorSchema = new mongoose.Schema({
  name: { type: String, required: true },
  books: [
    {
      book: {
        id: mongoose.Schema.Types.ObjectId,
        ref: 'books',
      },
    },
  ],
})

const Author = mongoose.model('author', AuthorSchema)

export default Author
