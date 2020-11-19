import React, { useContext } from 'react'
import { Button } from 'react-bootstrap'
import { LanguageContext } from '../../context/langContext'
import { languages } from '../../languages/languages'

type AddNewAuthorButtonProps = {
  onClick: () => void
}

const AddNewAuthorButton: React.FC<AddNewAuthorButtonProps> = ({ onClick }) => {
  const { language } = useContext(LanguageContext)
  return (
    <Button onClick={onClick}>
      {' '}
      + {languages[language].actions.addAuthor}{' '}
    </Button>
  )
}

export default AddNewAuthorButton
