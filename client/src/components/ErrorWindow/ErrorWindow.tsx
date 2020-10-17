import React from 'react'
import { Button, Modal } from 'react-bootstrap'
import { useDispatch } from 'react-redux'

import { clearUI } from '../../redux/actions'

type ErrorWindowProps = {
  errMsg: string
}
const ErrorWindow: React.FC<ErrorWindowProps> = ({ errMsg }) => {
  const dispatch = useDispatch()
  const closeHandler = () => {
    dispatch(clearUI())
  }
  return (
    <Modal show={!!errMsg} onHide={closeHandler}>
      <Modal.Header>
        <Modal.Title className="text-danger">Something went wrong</Modal.Title>
      </Modal.Header>
      <Modal.Body>Something went terribly wrong - {errMsg}</Modal.Body>
      <Modal.Footer>
        <Button onClick={closeHandler}>Okay</Button>
      </Modal.Footer>
    </Modal>
  )
}

export default React.memo(ErrorWindow)
