import React, { useContext } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { Book } from '../../types/bookTypes'
import { RootState } from '../../types/rootState'
import BookContainer from '../../components/BookContainer'
import EmptyPage from '../../components/EmptyPage'

import './BorrowedBooksPage.scss'
import { LanguageContext } from '../../context/langContext'
import { closeModal } from '../../redux/actions/bookModal'
import { Modal } from 'react-bootstrap'
import BookInfoForm from '../../components/BookInfoModal/components/BookInfoForm'
import { languages } from '../../languages/languages'

const BorrowedBooksPage: React.FC = () => {
  const borrowedBooks = useSelector<RootState, Book[]>(
    (state) => state.user.userInfo.borrowedBooks
  )
  const show = useSelector<RootState, boolean>((state) => state.bookModal.show)
  const dispatch = useDispatch()
  const { language } = useContext(LanguageContext)
  const closeHandler = () => dispatch(closeModal())
  return (
    <div className="BorrowedBooksPage">
      {borrowedBooks.length === 0 ? (
        <EmptyPage />
      ) : (
        <BookContainer inBorrowedBooks content={borrowedBooks} />
      )}

      <Modal
        show={show}
        scrollable
        onHide={closeHandler}
        className="BookInfoModal"
      >
        <Modal.Header closeButton>
          {languages[language].modalsText.bookInfo}
        </Modal.Header>
        <Modal.Body>
          <BookInfoForm />
        </Modal.Body>
      </Modal>
    </div>
  )
}

export default React.memo(BorrowedBooksPage)
