import './NewBookModal.scss'

import React, { ChangeEvent, useState } from 'react'
import { Form, Modal } from 'react-bootstrap'

import { useSelector, useDispatch } from 'react-redux'
import { addNewBook } from '../../redux/actions'
import { RootState } from '../../types/rootState'
import CustomButton from '../CustomButton'
import FormInputGroup from '../FormInputGroup'

type NewBookModalProps = {
  show: boolean
  closeHandler: () => void
}

const NewBookModal: React.FC<NewBookModalProps> = ({ show, closeHandler }) => {
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
    <Modal show={show} onHide={closeHandler} className="NewBookModal">
      <Modal.Header closeButton>
        <Modal.Title>Add a new book</Modal.Title>
      </Modal.Header>
      <Modal.Body>
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
          <CustomButton label="Add book" onClick={onSubmitHandler} />
        </Form>
      </Modal.Body>
    </Modal>
  )
}

export default React.memo(NewBookModal)
