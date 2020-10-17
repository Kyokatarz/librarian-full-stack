import React, { useEffect } from 'react'

import SearchBar from '../SearchBar'
import BookContainer from '../BookContainer'
import BookInfoModal from '../BookInfoModal'
import './AllBooksPage.scss'

const AllBooksPage = () => {
  useEffect(() => {
    console.log('AllBooksPage rendered!')
  })

  return (
    <div className="AllBooksPage">
      <SearchBar />
      <BookContainer inBorrowedBooks={false} />
      <BookInfoModal />
    </div>
  )
}

export default React.memo(AllBooksPage)
