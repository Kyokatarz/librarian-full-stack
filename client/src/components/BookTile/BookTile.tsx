import React from 'react'
import { Button, Card } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { changeBookStatus } from '../../redux/actions/book'

import { RootState } from '../../types/rootState'
import { User } from '../../types/userTypes'

type BookTileType = {
  id: string
  isbn: string
  title: string
  description?: string
  publisher?: string
  authorName?: string
  status: 'available' | 'borrowed'
}

const BookTile: React.FC<BookTileType> = ({
  id,
  isbn,
  title,
  description,
  publisher,
  authorName,
  status,
}) => {
  const dispatch = useDispatch()
  const user = useSelector<RootState, User>((state) => state.user)

  const onClickHandler = () => {
    dispatch(changeBookStatus(id))
  }

  const borrowButton =
    status === 'available' ? (
      <Button onClick={onClickHandler}>Borrow</Button>
    ) : (
      <Button onClick={onClickHandler} variant="danger">
        Return
      </Button>
    )

  return (
    <div>
      <Card className="BookTile">
        <Card.Title>{title}</Card.Title>
        <Card.Body>
          <Card.Text>{id}</Card.Text>
          <Card.Text>{isbn}</Card.Text>
          <Card.Text>{description}</Card.Text>
          <Card.Text>{publisher}</Card.Text>
          <Card.Text>{authorName}</Card.Text>
          {borrowButton}
        </Card.Body>
      </Card>
    </div>
  )
}

export default React.memo(BookTile)
