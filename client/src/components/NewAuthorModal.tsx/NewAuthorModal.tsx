import React from 'react'
import { Modal } from 'react-bootstrap'

import NewAuthorForm from '../NewAuthorForm'

type NewAuthorModalProps = {
  show: boolean
  closeHandler: () => void
}

const NewAuthorModal: React.FC<NewAuthorModalProps> = ({
  show,
  closeHandler,
}) => {
  return (
    <Modal show={show} onHide={closeHandler}>
      <Modal.Header closeButton>
        <Modal.Title>Add a new author </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <NewAuthorForm />
      </Modal.Body>
    </Modal>
  )
}

export default NewAuthorModal
