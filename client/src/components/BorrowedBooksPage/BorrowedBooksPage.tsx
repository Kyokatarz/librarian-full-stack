import React from 'react'

import BookContainer from '../BookContainer'
import BookInfoModal from '../BookInfoModal'

const BorrowedBooksPage: React.FC = () => {
  return (
    <div className="BorrowedBooksPage">
      <BookContainer inBorrowedBooks />
      <BookInfoModal />
    </div>
  )
}

export default React.memo(BorrowedBooksPage)