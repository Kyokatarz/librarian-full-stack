import React, { useContext } from 'react'
import { Modal } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'

import { LanguageContext } from '../../context/langContext'
import { languages } from '../../languages/languages'
import { closeModal } from '../../redux/actions/bookModal'
import { RootState } from '../../types/rootState'
import BookInfoForm from './components/BookInfoForm'

import './BookInfoModal.scss'

const BookInfoModal: React.FC = () => {
  const show = useSelector<RootState, boolean>((state) => state.bookModal.show)
  const dispatch = useDispatch()
  const { language } = useContext(LanguageContext)
  const closeHandler = () => dispatch(closeModal())
  return (
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
  )
}

export default React.memo(BookInfoModal)
