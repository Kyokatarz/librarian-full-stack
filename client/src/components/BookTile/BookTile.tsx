import React from 'react'
import { Button, Card } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { FcInfo } from 'react-icons/fc'

import {
  changeBookStatus,
  requestCheckin,
  requestCheckout,
} from '../../redux/actions/book'
import { Author } from '../../types/authorTypes'
import { Book } from '../../types/bookTypes'
import { RootState } from '../../types/rootState'
import { User } from '../../types/userTypes'

import './BookTile.scss'
import BookInfoModal from '../BookInfoModal'
import { showModal } from '../../redux/actions/bookModal'

type BookTileType = {
  _id: string
  isbn: string
  title: string
  description?: string
  publisher?: string
  author?: Author[]
  status: 'available' | 'borrowed'
  inBorrowedBooks: boolean
}

const BookTile: React.FC<BookTileType> = ({
  _id,
  isbn,
  title,
  description,
  publisher,
  author,
  status,
  inBorrowedBooks,
}) => {
  const dispatch = useDispatch()
  const books = useSelector<RootState, Book[]>((state) => state.books)
  const user = useSelector<RootState, User>((state) => state.user)

  const onClickHandler = () => {
    if (!user.isLoggedIn) return //TODO: Add action here
    const book = books.find((bookObj) => bookObj._id === _id)
    if (!book) return
    if (book.status === 'available') dispatch(requestCheckout(user.token, book))
    if (book.status === 'borrowed') dispatch(requestCheckin(user.token, _id))
    dispatch(changeBookStatus(_id))
  }
  const showInfoModal = () => {
    const book = books.find((bookObj) => bookObj._id === _id)
    if (!book) return
    dispatch(showModal(book))
  }
  let button
  switch (inBorrowedBooks) {
    case false:
      switch (status) {
        case 'available':
          button = <Button onClick={onClickHandler}>Borrow</Button>
          break
        case 'borrowed':
          button = (
            <Button variant="danger" disabled>
              Unavailable
            </Button>
          )
          break
      }
      break
    case true:
      button = <Button onClick={onClickHandler}>Return Book</Button>
    default:
      break
  }

  return (
    <div>
      <Card className="BookTile">
        <Card.Title className="BookTile__Title">
          {title}{' '}
          <FcInfo className="BookTile__Title__Icon" onClick={showInfoModal} />
        </Card.Title>
        <Card.Body>
          <Card.Text>{_id}</Card.Text>
          <Card.Text>{isbn}</Card.Text>
          <Card.Text>{description}</Card.Text>
          <Card.Text>{publisher}</Card.Text>
          {author &&
            author.map((authorObj) => (
              <Card.Text key={authorObj._id}>{authorObj.name}</Card.Text>
            ))}
          {button}
        </Card.Body>
      </Card>
    </div>
  )
}

export default React.memo(BookTile)
