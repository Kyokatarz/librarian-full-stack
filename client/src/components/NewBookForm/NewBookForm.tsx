import React, { ChangeEvent, useState } from 'react'
import { Form } from 'react-bootstrap'
import { useSelector, useDispatch } from 'react-redux'

import { addNewBook, requestBookUpdate } from '../../redux/actions/book'
import { RootState } from '../../types/rootState'
import FormInputGroup from '../FormInputGroup'
import FormSubmitButton from '../FormSubmitButton'

const NewBookForm = () => {
  const token = useSelector<RootState, string>((state) => state.user.token)
  const dispatch = useDispatch()

  const [title, setTitle] = useState('')
  const [isbn, setIsbn] = useState('')
  const [description, setDescription] = useState('')
  const [publisher, setPublisher] = useState('')
  const [authorName, setAuthorName] = useState('')
  const [imageUrl, setImageUrl] = useState('')

  const onSubmitHandler = (event: any) => {
    event.preventDefault()

    dispatch(
      addNewBook(token, {
        title,
        isbn,
        description,
        publisher,
        author: { name: authorName },
        status: 'available',
        imageUrl,
      })
    )
  }

  return (
    <Form className="NewBookForm" onSubmit={onSubmitHandler}>
      <FormInputGroup
        value={imageUrl}
        label="Image URL"
        onChangeHandler={(event: ChangeEvent<any>) =>
          setImageUrl(event.target.value)
        }
        type="text"
        placeholder="Enter book cover image url..."
      />
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
        value={authorName}
        type="text"
        label="Author Name"
        onChangeHandler={(event: ChangeEvent<any>) =>
          setAuthorName(event.target.value)
        }
        placeholder="Leave blank if don't know"
      />
      <FormSubmitButton text="Add book" onClick={onSubmitHandler} />
    </Form>
  )
}

export default NewBookForm
