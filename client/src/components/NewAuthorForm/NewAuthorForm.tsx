import React, { ChangeEvent, FormEvent, useState } from 'react'
import { Form } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'

import { requestNewAuthor } from '../../redux/actions'
import { RootState } from '../../types/rootState'
import FormInputGroup from '../FormInputGroup'
import FormSubmitButton from '../FormSubmitButton'

const NewAuthorForm = () => {
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
        label="Author Name"
        value={authorName}
        onChangeHandler={(event: ChangeEvent<any>) =>
          setAuthorName(event.target.value)
        }
        type="text"
        placeholder="Enter author name..."
        required
      />

      <FormSubmitButton text="Add author" />
    </Form>
  )
}

export default NewAuthorForm
