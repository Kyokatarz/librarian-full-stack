import React from 'react'
import { Card } from 'react-bootstrap'

type BookTileType = {
  id: string
  isbn: string
  title: string
  description?: string
  publisher?: string
  authorName?: string
  status: 'available' | 'borrowed'
}

const BookBlock: React.FC<BookTileType> = ({
  id,
  isbn,
  title,
  description,
  publisher,
  authorName,
  status,
}) => {
  return (
    <div>
      <Card style={{ width: '18rem' }}>
        <Card.Title>{title}</Card.Title>
        <Card.Body>
          <Card.Text>{isbn}</Card.Text>
          <Card.Text>{description}</Card.Text>
          <Card.Text>{publisher}</Card.Text>
          <Card.Text>{authorName}</Card.Text>
          <Card.Text>{status}</Card.Text>
        </Card.Body>
      </Card>
    </div>
  )
}

export default BookBlock
