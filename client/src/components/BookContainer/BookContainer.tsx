import React from 'react'
import { useSelector } from 'react-redux'

import BookTile from '../BookTile'
import { Book } from '../../types/bookTypes'
import { RootState } from '../../types/rootState'

const BookContainer = () => {
  const books = useSelector<RootState, Book[]>((state) => state.books)

  return (
    <div className="BookContainer">
      {books.map((item) => (
        <BookTile
          isbn={item.isbn}
          id={item.id}
          title={item.title}
          description={item.description}
          publisher={item.publisher}
          status={item.status}
          authorName={item.author.name}
        />
      ))}
    </div>
  )
}

export default BookContainer
