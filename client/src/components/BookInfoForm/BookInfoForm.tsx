import React, { ChangeEvent, useState } from 'react'
import { Form } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { requestBookUpdate } from '../../redux/actions/book'

import { Book } from '../../types/bookTypes'
import { RootState } from '../../types/rootState'
import DeleteBookButton from '../DeleteBookButton'
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
      <Form.Group>
        <Form.Label>ISBN</Form.Label>
        <Form.Control
          readOnly={!isAdmin}
          value={isbn}
          onChange={(event) => setIsbn(event.target.value)}
        ></Form.Control>
      </Form.Group>
      <Form.Group>
        <Form.Label>Title</Form.Label>
        <Form.Control
          readOnly={!isAdmin}
          value={title}
          onChange={(event) => setTitle(event.target.value)}
        />
      </Form.Group>
      <Form.Group>
        <Form.Label>Description</Form.Label>
        <Form.Control
          readOnly={!isAdmin}
          value={description}
          onChange={(event) => setDescription(event.target.value)}
        />
      </Form.Group>
      <Form.Group>
        <Form.Label>Publisher</Form.Label>
        <Form.Control
          readOnly={!isAdmin}
          value={publisher}
          onChange={(event) => setPublisher(event.target.value)}
        />
      </Form.Group>
      <Form.Group>
        <Form.Label>Author</Form.Label>
        {author?.map((authorObj, index) => (
          <Form.Control
            readOnly={!isAdmin}
            value={authorObj.name}
            onChange={(event) => authorChangeHandler(event, index)}
            key={authorObj._id}
          ></Form.Control>
        ))}
        {!bookInModal.author && <Form.Text>No Author</Form.Text>}
        {isAdmin && (
          <FormSubmitButton text="Update Info" onClick={onUpdateClickHandler} />
        )}
        {isAdmin && <DeleteBookButton bookId={bookInModal._id!} />}
      </Form.Group>
    </Form>
  )
}

export default React.memo(BookInfoForm)
