import React, { ChangeEvent, useState } from 'react'
import { Form } from 'react-bootstrap'
import { useSelector, useDispatch } from 'react-redux'

import { addNewBook, requestBookUpdate } from '../../redux/actions/book'
import { Book } from '../../types/bookTypes'
import { RootState } from '../../types/rootState'
import DeleteBookButton from '../DeleteBookButton'
import FormInputGroup from '../FormInputGroup'
import FormSubmitButton from '../FormSubmitButton'

const NewBookForm = () => {
  const token = useSelector<RootState, string>((state) => state.user.token)
  const dispatch = useDispatch()

  const [title, setTitle] = useState('')
  const [isbn, setIsbn] = useState('')
  const [description, setDescription] = useState('')
  const [publisher, setPublisher] = useState('')
  const [author, setAuthor] = useState('')

  const onSubmitHandler = (event: any) => {
    event.preventDefault()
    const authorObj = author
      .split(',')
      .map((string) => string.trim())
      .map((string) => ({ _id: string }))
    dispatch(
      addNewBook(token, {
        title,
        isbn,
        description,
        publisher,
        author: author ? authorObj : [],
        status: 'available',
      })
    )
  }

  return (
    <Form className="NewBookForm" onSubmit={onSubmitHandler}>
      <FormInputGroup
        value={isbn!}
        label="ISBN"
        onChangeHandler={(event: ChangeEvent<any>) =>
          setIsbn(event.target.value)
        }
        type="text"
        placeholder="Enter ISBN..."
      />
      <FormInputGroup
        value={title!}
        label="Title"
        onChangeHandler={(event: ChangeEvent<any>) =>
          setTitle(event.target.value)
        }
        type="text"
        placeholder="Enter title..."
      />
      <FormInputGroup
        value={description!}
        label="Description"
        onChangeHandler={(event: ChangeEvent<any>) =>
          setDescription(event.target.value)
        }
        type="text"
        placeholder="Enter description..."
      />
      <FormInputGroup
        value={publisher!}
        label="Publisher"
        onChangeHandler={(event: ChangeEvent<any>) =>
          setPublisher(event.target.value)
        }
        type="text"
        placeholder="Enter publisher..."
      />
      <FormInputGroup
        value={author}
        type="text"
        label="Author IDs"
        onChangeHandler={(event: ChangeEvent<any>) =>
          setAuthor(event.target.value)
        }
        placeholder="Leave blank if don't know"
      />
      <FormSubmitButton text="Add book" onClick={onSubmitHandler} />
    </Form>
  )
}

export default NewBookForm
