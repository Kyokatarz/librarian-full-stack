import { Author } from './authorTypes'
import { BookModal } from './bookModalTypes'
import { Book } from './bookTypes'
import { UI } from './uiTypes'
import { User } from './userTypes'

export type RootState = {
  user: User
  books: Book[]
  filteredBooks: Book[]
  ui: UI
  bookModal: BookModal
  authors: Author[]
}
