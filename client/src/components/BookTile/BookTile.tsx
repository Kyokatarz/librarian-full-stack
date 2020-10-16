import React from 'react'
import { Button, Card } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'

import { changeBookStatus, requestCheckout } from '../../redux/actions/book'
import { Author } from '../../types/authorTypes'
import { Book } from '../../types/bookTypes'
import { RootState } from '../../types/rootState'
import { User } from '../../types/userTypes'

type BookTileType = {
  _id: string
  isbn: string
  title: string
  description?: string
  publisher?: string
  author?: Author[]
  status: 'available' | 'borrowed'
}

const BookTile: React.FC<BookTileType> = ({
  _id,
  isbn,
  title,
  description,
  publisher,
  author,
  status,
}) => {
  const dispatch = useDispatch()
  const books = useSelector<RootState, Book[]>((state) => state.books)
  const user = useSelector<RootState, User>((state) => state.user)

  const onClickHandler = () => {
    if (!user.isLoggedIn) return //TODO: Add action here
    const book = books.find((bookObj) => bookObj._id === _id)
    if (!book) return
    if (book.status === 'available') dispatch(requestCheckout(user.token, book))
    dispatch(changeBookStatus(_id))
  }

  const borrowButton =
    status === 'available' ? (
      <Button onClick={onClickHandler}>Borrow</Button>
    ) : (
      <Button onClick={onClickHandler} variant="danger" disabled>
        Unavailable
      </Button>
    )

  return (
    <div>
      <Card className="BookTile">
        <Card.Title>{title}</Card.Title>
        <Card.Body>
          <Card.Text>{_id}</Card.Text>
          <Card.Text>{isbn}</Card.Text>
          <Card.Text>{description}</Card.Text>
          <Card.Text>{publisher}</Card.Text>
          {author &&
            author.map((authorObj) => (
              <Card.Text key={authorObj._id}>{authorObj.name}</Card.Text>
            ))}
          {borrowButton}
        </Card.Body>
      </Card>
    </div>
  )
}

export default React.memo(BookTile)
