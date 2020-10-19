import React, { ChangeEvent, useState } from 'react'
import { Form } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { requestBookUpdate } from '../../redux/actions/book'

import { Book } from '../../types/bookTypes'
import { RootState } from '../../types/rootState'
import DeleteBookButton from '../DeleteBookButton'
import FormInputGroup from '../FormInputGroup'
import FormSubmitButton from '../FormSubmitButton'
import './BookInfoForm.scss'

const BookInfoForm = () => {
  const bookInModal = useSelector<RootState, Partial<Book>>(
    (state) => state.bookModal.book
  )
  const isAdmin = useSelector<RootState, boolean>(
    (state) => state.user.userInfo.isAdmin
  )
  const token = useSelector<RootState, string>((state) => state.user.token)
  const dispatch = useDispatch()

  const [title, setTitle] = useState(bookInModal.title)
  const [isbn, setIsbn] = useState(bookInModal.isbn)
  const [description, setDescription] = useState(bookInModal.description)
  const [publisher, setPublisher] = useState(bookInModal.publisher)
  const [author, setAuthor] = useState(bookInModal.author)

  const authorChangeHandler = (event: ChangeEvent<any>, index: number) => {
    //Cuz it's more complicated
    const tempArray = [...bookInModal.author!]
    tempArray[index].name = event.target.value
    setAuthor(tempArray)
  }

  const onUpdateClickHandler = (event: any) => {
    event.preventDefault()
    console.log({
      _id: bookInModal._id,
      isbn,
      title,
      description,
      publisher,
      author,
    })
    dispatch(
      requestBookUpdate(token, {
        _id: bookInModal._id,
        isbn,
        title,
        description,
        publisher,
        author,
      })
    )
  }

  return (
    <Form className="BookInfoForm">
      <FormInputGroup
        value={isbn!}
        label="ISBN"
        onChangeHandler={(event: ChangeEvent<any>) =>
          setIsbn(event.target.value)
        }
        type="text"
        placeholder="Enter ISBN..."
        readOnly={!isAdmin}
      />
      <FormInputGroup
        value={title!}
        label="Title"
        onChangeHandler={(event: ChangeEvent<any>) =>
          setTitle(event.target.value)
        }
        type="text"
        placeholder="Enter title..."
        readOnly={!isAdmin}
      />
      <FormInputGroup
        value={description!}
        label="Description"
        onChangeHandler={(event: ChangeEvent<any>) =>
          setDescription(event.target.value)
        }
        type="text"
        placeholder="Enter description..."
        readOnly={!isAdmin}
      />
      <FormInputGroup
        value={publisher!}
        label="Publisher"
        onChangeHandler={(event: ChangeEvent<any>) =>
          setPublisher(event.target.value)
        }
        type="text"
        placeholder="Enter publisher..."
        readOnly={!isAdmin}
      />
      <Form.Group>
        <Form.Label>Author</Form.Label>
        {author?.map((authorObj, index) => (
          <Form.Control
            readOnly={!isAdmin}
            value={authorObj.name}
            onChange={(event) => authorChangeHandler(event, index)}
            key={authorObj._id}
            placeholder={`Author ${index}`}
          />
        ))}
        {bookInModal.author!.length > 0 && <Form.Text>No Author</Form.Text>}
        {isAdmin && (
          <FormSubmitButton text="Update Info" onClick={onUpdateClickHandler} />
        )}
        {isAdmin && <DeleteBookButton bookId={bookInModal._id!} />}
      </Form.Group>
    </Form>
  )
}

export default React.memo(BookInfoForm)
