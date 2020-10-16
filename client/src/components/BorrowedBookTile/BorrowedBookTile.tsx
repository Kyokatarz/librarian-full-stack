import React, { useEffect } from 'react'
import { Button, Card } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'

import { changeBookStatus, requestCheckin } from '../../redux/actions/book'
import { Author } from '../../types/authorTypes'
import { Book } from '../../types/bookTypes'
import { RootState } from '../../types/rootState'
import { User } from '../../types/userTypes'

type BorrowedBookTileType = {
  _id: string
  isbn: string
  title: string
  description?: string
  publisher?: string
  author?: Author[]
  status: 'available' | 'borrowed'
}

const BorrowedBookTile: React.FC<BorrowedBookTileType> = ({
  _id,
  isbn,
  title,
  description,
  publisher,
  author,
}) => {
  const dispatch = useDispatch()
  const user = useSelector<RootState, User>((state) => state.user)

  const onClickHandler = () => {
    const book = user.userInfo.borrowedBooks.find(
      (bookObj) => bookObj._id === _id
    )
    if (!book) return
    if (book.status === 'available') dispatch(requestCheckin(user.token, _id))
  }
  return (
    <div>
      <Card className="BorrowedBookTile">
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
          <Button onClick={onClickHandler}>Return book</Button>
        </Card.Body>
      </Card>
    </div>
  )
}

export default React.memo(BorrowedBookTile)
