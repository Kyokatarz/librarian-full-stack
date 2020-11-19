import React, { useContext } from 'react'
import { Button } from 'react-bootstrap'
import { LanguageContext } from '../../context/langContext'
import { languages } from '../../languages/languages'

type AddNewBookButtonProps = {
  onClick: () => void
}

const AddNewBookButton: React.FC<AddNewBookButtonProps> = ({ onClick }) => {
  const { language } = useContext(LanguageContext)
  return (
    <Button onClick={onClick}> + {languages[language].actions.addBook} </Button>
  )
}

export default AddNewBookButton
