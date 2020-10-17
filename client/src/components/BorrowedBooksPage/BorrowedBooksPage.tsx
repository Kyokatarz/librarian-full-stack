import React from 'react'

import BookContainer from '../BookContainer'

const BorrowedBooksPage: React.FC = () => {
  return (
    <div className="BorrowedBooksPage">
      <BookContainer inBorrowedBooks />
    </div>
  )
}

export default React.memo(BorrowedBooksPage)
