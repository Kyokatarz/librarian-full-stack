import React from 'react'
import { useSelector } from 'react-redux'

import { Book } from '../../types/bookTypes'
import { RootState } from '../../types/rootState'
import BookContainer from '../BookContainer'
import BookInfoModal from '../BookInfoModal'
import EmptyPage from '../EmptyPage'

import './BorrowedBooksPage.scss'

const BorrowedBooksPage: React.FC = () => {
  const borrowedBooks = useSelector<RootState, Book[]>(
    (state) => state.user.userInfo.borrowedBooks
  )
  return (
    <div className="BorrowedBooksPage">
      {borrowedBooks.length === 0 ? (
        <EmptyPage />
      ) : (
        <BookContainer inBorrowedBooks content={borrowedBooks} />
      )}
      <BookInfoModal />
    </div>
  )
}

export default React.memo(BorrowedBooksPage)
