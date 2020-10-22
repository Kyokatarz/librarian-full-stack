import React from 'react'
import { Modal } from 'react-bootstrap'
import NewBookForm from '../NewBookForm/'

import './NewBookModal.scss'

type NewBookModalProps = {
  show: boolean
  closeHandler: () => void
}

const NewBookModal: React.FC<NewBookModalProps> = ({ show, closeHandler }) => {
  return (
    <Modal show={show} onHide={closeHandler} className="NewBookModal">
      <Modal.Header closeButton>
        <Modal.Title>Add a new book</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <NewBookForm />
      </Modal.Body>
    </Modal>
  )
}

export default React.memo(NewBookModal)
