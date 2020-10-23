import React, { useEffect } from 'react'
import { Button, Card } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify'

import {
  changeBookStatus,
  requestCheckin,
  requestCheckout,
} from '../../redux/actions/book'
import { Author } from '../../types/authorTypes'
import { Book } from '../../types/bookTypes'
import { RootState } from '../../types/rootState'
import { User } from '../../types/userTypes'
import InfoIcon from '../InfoIcon'

import './BookTile.scss'

type BookTileType = {
  _id: string
  isbn: string
  title: string
  description?: string
  publisher?: string
  author?: Partial<Author>
  status: 'available' | 'borrowed'
  inBorrowedBooks: boolean
  imageUrl?: string
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
  imageUrl,
}) => {
  const dispatch = useDispatch()
  const books = useSelector<RootState, Book[]>((state) => state.books)
  const user = useSelector<RootState, User>((state) => state.user)

  const onClickHandler = () => {
    if (!user.isLoggedIn) return toast.error('You are not logged in')
    const book = books.find((bookObj) => bookObj._id === _id)
    if (!book) return
    if (book.status === 'available') dispatch(requestCheckout(user.token, book))
    if (book.status === 'borrowed') dispatch(requestCheckin(user.token, _id))
    dispatch(changeBookStatus(_id))
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
      break
    default:
      break
  }

  useEffect(() => {
    console.log()
  })

  return (
    <div>
      <Card className="BookTile">
        <Card.Img
          className="BookTile__Img"
          variant="top"
          src={imageUrl || 'https://via.placeholder.com/300x200'}
        />
        <Card.Title className="BookTile__Title">
          {title}{' '}
          <span className="BookTile__Title__Icon">
            <InfoIcon _id={_id} />
          </span>
        </Card.Title>
        <Card.Subtitle className="BookTile__Subtitle">
          {author ? author.name : 'No Author'}
        </Card.Subtitle>
        <Card.Body>
          <Card.Text>
            <span>ISBN:</span> {isbn}
          </Card.Text>
          <Card.Text>
            <span>Description: </span>
            {description!.length > 100
              ? description?.slice(0, 100) + '...'
              : description}
          </Card.Text>
          <Card.Text>
            <span>Publisher: </span>
            {publisher}
          </Card.Text>
        </Card.Body>
        {button}
      </Card>
    </div>
  )
}

export default React.memo(BookTile)
