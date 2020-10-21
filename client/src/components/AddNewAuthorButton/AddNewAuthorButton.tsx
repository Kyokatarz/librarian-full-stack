import React from 'react'
import { Button } from 'react-bootstrap'

type AddNewAuthorButtonProps = {
  onClick: () => void
}

const AddNewAuthorButton: React.FC<AddNewAuthorButtonProps> = ({ onClick }) => {
  return <Button onClick={onClick}> + New Author </Button>
}

export default AddNewAuthorButton
