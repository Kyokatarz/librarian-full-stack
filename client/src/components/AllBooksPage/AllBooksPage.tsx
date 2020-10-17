import React, { useEffect } from 'react'
import SearchBar from '../SearchBar'

import './AllBooksPage.scss'
import BookContainer from '../BookContainer'

const AllBooksPage = () => {
  useEffect(() => {
    console.log('AllBooksPage rendered!')
  })

  return (
    <div className="AllBooksPage">
      <SearchBar />
      <BookContainer inBorrowedBooks={false} />
    </div>
  )
}

export default React.memo(AllBooksPage)
