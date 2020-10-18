import React from 'react'
import { Button } from 'react-bootstrap'

type AddNewBookButtonProps = {
  onClick: () => void
}

const AddNewBookButton: React.FC<AddNewBookButtonProps> = ({ onClick }) => {
  return <Button onClick={onClick}> + </Button>
}

export default AddNewBookButton
