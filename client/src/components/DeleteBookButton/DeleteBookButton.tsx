import React from 'react'
import { Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'

import { requestDeleteBook } from '../../redux/actions/book'
import { closeModal } from '../../redux/actions/bookModal'
import { RootState } from '../../types/rootState'

type DeleteBookButtonProps = {
  bookId: string
}

const DeleteBookButton: React.FC<DeleteBookButtonProps> = ({ bookId }) => {
  const token = useSelector<RootState, string>((state) => state.user.token)
  const dispatch = useDispatch()

  const deleteButtonHandler = () => {
    dispatch(requestDeleteBook(token, bookId))
    dispatch(closeModal())
  }
  return (
    <Button variant="danger" block onClick={deleteButtonHandler}>
      Delete book
    </Button>
  )
}

export default DeleteBookButton
