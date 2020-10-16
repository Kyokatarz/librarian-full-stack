import React from 'react'

import BorrowedBooksContainer from '../BorrowedBooksContainer'

const BorrowedBooksPage: React.FC = () => {
  return (
    <div className="BorrowedBooksPage">
      <BorrowedBooksContainer />
    </div>
  )
}

export default React.memo(BorrowedBooksPage)
