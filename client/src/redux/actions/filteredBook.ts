import { Book, SET_FILTERED_BOOKS } from "../../types/bookTypes"

export const setFilteredBooks = (books: Book[]) => {
  return {
    type: SET_FILTERED_BOOKS,
    payload: books
  }
}
