import { Author, AuthorActions } from '../../types/authorTypes'

const initState: Author[] = []

export default function authorReducer(
  state: Author[] = initState,
  action: AuthorActions
) {
  switch (action.type) {
  case 'ADD_AUTHOR':
    return [...action.payload]

  case 'DELETE_AUTHOR':
    return [...state].filter((author) => author._id !== action.payload)

  default:
    return state
  }
}
