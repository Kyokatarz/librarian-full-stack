import React from 'react'
import { Button, Modal } from 'react-bootstrap'
import { AiFillWarning } from 'react-icons/ai'
import { useDispatch } from 'react-redux'

import { clearUI } from '../../redux/actions'

import './ErrorWindow.scss'

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
      <Modal.Body>
        <span>
          <AiFillWarning />
        </span>
        <span>Something went terribly wrong - {errMsg}</span>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={closeHandler}>Okay</Button>
      </Modal.Footer>
    </Modal>
  )
}

export default React.memo(ErrorWindow)
