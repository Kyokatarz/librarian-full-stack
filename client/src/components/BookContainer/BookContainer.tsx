import React, { useCallback, useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import _ from 'lodash'

import BookTile from '../BookTile'
import { Book } from '../../types/bookTypes'
import { RootState } from '../../types/rootState'

import './BookContainer.scss'
import PaginationBar from '../PaginationBar'

const BookContainer = () => {
  const books = useSelector<RootState, Book[]>((state) => state.books)
  const [page, setPage] = useState(0)
  const [booksToDisplay, setBooksToDisplay] = useState<Book[]>([])
  const bookChunks: Book[][] = _.chunk(books, 9)
  //Divide the array into multiple smaller arrays with size = 9

  const switchPage = useCallback(
    (pageNumber: number) => {
      console.log('page', page)
      setPage(pageNumber)
    },
    [page]
  )

  const booksInPage = booksToDisplay?.map((item) => (
    <BookTile
      isbn={item.isbn}
      id={item._id}
      title={item.title}
      description={item.description}
      publisher={item.publisher}
      status={item.status}
      authorName={item.author.name}
      key={item._id}
    />
  ))

  useEffect(() => {
    if (books) setBooksToDisplay(bookChunks[page])
  }, [books, page])

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
