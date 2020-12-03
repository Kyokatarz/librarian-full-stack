import _ from 'lodash'
import React, { useCallback, useEffect, useState } from 'react'

import { Book } from '../../types/bookTypes'
import BookTile from '../BookTile'
import PaginationBar from '../PaginationBar'

import './BookContainer.scss'

type BookContainerProps = {
  inBorrowedBooks: boolean
  content: Book[]
}
const BookContainer: React.FC<BookContainerProps> = ({
  inBorrowedBooks,
  content,
}) => {
  const [page, setPage] = useState(0)
  const [booksToDisplay, setBooksToDisplay] = useState<Book[]>([])
  const bookChunks: Book[][] = _.chunk(content, 8)
  //Divide the array into multiple smaller arrays with size = 8

  const switchPage = useCallback(
    (pageNumber: number) => {
      setPage(pageNumber)
    },
    [page]
  )

  const booksInPage = booksToDisplay?.map((item) => (
    <BookTile
      isbn={item.isbn}
      _id={item._id}
      title={item.title}
      description={item.description}
      publisher={item.publisher}
      status={item.status}
      author={item.author}
      key={item._id}
      imageUrl={item.imageUrl}
      inBorrowedBooks={inBorrowedBooks}
    />
  ))

  useEffect(() => {
    if (content) setBooksToDisplay(bookChunks[page])
  }, [content])

  return (
    <div className="BookContainer">
      <div className="BookDisplayContainer">{booksInPage}</div>
      <PaginationBar
        page={page}
        setPage={switchPage}
        size={bookChunks.length}
      />
    </div>
  )
}

export default React.memo(BookContainer)
