import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'

import SearchBar from '../SearchBar'
import BookContainer from '../BookContainer'
import BookInfoModal from '../BookInfoModal'
import { RootState } from '../../types/rootState'
import AddNewBookButton from '../AddNewBookButton'
import NewBookModal from '../NewBookModal'
import './AllBooksPage.scss'
import { toast } from 'react-toastify'
import { Button } from 'react-bootstrap'

const AllBooksPage = () => {
  const isAdmin = useSelector<RootState, boolean>(
    (state) => state.user.userInfo.isAdmin
  )
  const [showNewBookModal, setShowNewBookModal] = useState(false)

  const onClickHandler = () => toast('🦄 Wow so easy!')
  useEffect(() => {
    console.log('AllBooksPage rendered!')
  })

  return (
    <div className="AllBooksPage">
      <SearchBar />
      {isAdmin && (
        <AddNewBookButton onClick={() => setShowNewBookModal(true)} />
      )}
      <BookContainer inBorrowedBooks={false} />
      <BookInfoModal />
      <NewBookModal
        show={showNewBookModal}
        closeHandler={() => setShowNewBookModal(false)}
      />
    </div>
  )
}

export default React.memo(AllBooksPage)
