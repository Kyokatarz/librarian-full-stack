import React, { ChangeEvent, FormEvent, useContext, useState } from 'react'
import { Form } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { LanguageContext } from '../../context/langContext'
import { languages } from '../../languages/languages'

import { requestNewAuthor } from '../../redux/actions'
import { RootState } from '../../types/rootState'
import CustomButton from '../CustomButton'
import FormInputGroup from '../FormInputGroup'

const NewAuthorForm = () => {
  const { language } = useContext(LanguageContext)
  const [authorName, setAuthorName] = useState('')
  const token = useSelector<RootState, string>((state) => state.user.token)
  const dispatch = useDispatch()
  const submitHandler = (event: FormEvent<HTMLInputElement>) => {
    event.preventDefault()
    dispatch(requestNewAuthor(token, authorName))
  }
  return (
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
  )
}

export default NewAuthorForm
