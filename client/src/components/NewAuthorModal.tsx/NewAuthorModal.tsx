import React, { ChangeEvent, FormEvent, useContext, useState } from 'react'
import { Form, Modal } from 'react-bootstrap'
import { useSelector, useDispatch } from 'react-redux'
import { LanguageContext } from '../../context/langContext'
import { languages } from '../../languages/languages'
import { requestNewAuthor } from '../../redux/actions'
import { RootState } from '../../types/rootState'
import CustomButton from '../CustomButton'
import FormInputGroup from '../FormInputGroup'

import './NewAuthorModal.scss'

type NewAuthorModalProps = {
  show: boolean
  closeHandler: () => void
}

const NewAuthorModal: React.FC<NewAuthorModalProps> = ({
  show,
  closeHandler,
}) => {
  const { language } = useContext(LanguageContext)
  const [authorName, setAuthorName] = useState('')
  const token = useSelector<RootState, string>((state) => state.user.token)
  const dispatch = useDispatch()
  const submitHandler = (event: FormEvent<HTMLInputElement>) => {
    event.preventDefault()
    dispatch(requestNewAuthor(token, authorName))
  }
  return (
    <Modal show={show} onHide={closeHandler} className="NewAuthorModal">
      <Modal.Header closeButton>
        <Modal.Title>Add a new author </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={submitHandler}>
          <FormInputGroup
            label={languages[language].inputLabels.author}
            value={authorName}
            onChangeHandler={(event: ChangeEvent<any>) =>
              setAuthorName(event.target.value)
            }
            type="text"
            placeholder={languages[language].inputPlaceholder.author}
            required
          />

          <CustomButton label="Add author" type="submit" onClick={() => {}} />
        </Form>
      </Modal.Body>
    </Modal>
  )
}

export default NewAuthorModal
