import React, { useCallback, useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import _ from 'lodash'

import { Book } from '../../types/bookTypes'
import { RootState } from '../../types/rootState'
import PaginationBar from '../PaginationBar'
import BorrowedBookTile from '../BorrowedBookTile'
import { User } from '../../types/userTypes'

const BorrowedBookContainer = () => {
  const books = useSelector<RootState, Book[]>((state) => state.books)
  const user = useSelector<RootState, User>((state) => state.user)
  const [page, setPage] = useState(0)
  const [booksToDisplay, setBooksToDisplay] = useState<Book[]>([])

  const bookChunks: Book[][] = _.chunk(user.userInfo.borrowedBooks, 9) //Divide the array into multiple smaller arrays with size = 9
  const switchPage = useCallback(
    (pageNumber: number) => {
      console.log('page', page)
      setPage(pageNumber)
    },
    [page]
  )

  const booksInPage = booksToDisplay?.map((item) => (
    <BorrowedBookTile
      isbn={item.isbn}
      _id={item._id}
      title={item.title}
      description={item.description}
      publisher={item.publisher}
      author={item.author}
      status={item.status}
      key={item._id}
    />
  ))

  useEffect(() => {
    if (user.userInfo.borrowedBooks) setBooksToDisplay(bookChunks[page])
  }, [user, page])

  useEffect(() => {
    console.log(booksToDisplay)
  })

  return (
    <div className="BorrowedBookContainer">
      <div className="BorrowedBookDisplayContainer">{booksInPage}</div>
      <PaginationBar
        page={page}
        setPage={switchPage}
        size={bookChunks.length}
      />
    </div>
  )
}

export default React.memo(BorrowedBookContainer)
