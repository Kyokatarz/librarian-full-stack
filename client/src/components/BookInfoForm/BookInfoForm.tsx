import React, { ChangeEvent, useContext, useEffect, useState } from 'react'
import { Form } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'

import { LanguageContext } from '../../context/langContext'
import { languages } from '../../languages/languages'
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
  const { language } = useContext(LanguageContext)
  const dispatch = useDispatch()

  const [title, setTitle] = useState(bookInModal.title)
  const [isbn, setIsbn] = useState(bookInModal.isbn)
  const [description, setDescription] = useState(bookInModal.description)
  const [publisher, setPublisher] = useState(bookInModal.publisher)
  const [authorName, setAuthorName] = useState(bookInModal.author?.name)
  const [imageUrl, setImageUrl] = useState(bookInModal.imageUrl)
  const [disabled, setDisabled] = useState(true)

  const onUpdateClickHandler = (event: any) => {
    event.preventDefault()
    dispatch(
      requestBookUpdate(token, {
        _id: bookInModal._id,
        isbn,
        title,
        description,
        publisher,
        author: { name: authorName },
      })
    )
  }

  useEffect(() => {
    if (
      title !== bookInModal.title ||
      isbn !== bookInModal.isbn ||
      description !== bookInModal.description ||
      publisher !== bookInModal.publisher ||
      authorName !== bookInModal.author?.name ||
      imageUrl !== bookInModal.imageUrl
    ) {
      setDisabled(false)
    } else setDisabled(true)
  }, [title, isbn, description, publisher, authorName, imageUrl, bookInModal])

  return (
    <Form className="BookInfoForm">
      <FormInputGroup
        value={imageUrl!}
        label={languages[language].inputLabels.imageUrl}
        onChangeHandler={(event: ChangeEvent<any>) =>
          setImageUrl(event.target.value)
        }
        type="text"
        placeholder={languages[language].inputPlaceholder.imageUrl}
        readOnly={!isAdmin}
      />
      <FormInputGroup
        value={isbn!}
        label="ISBN"
        onChangeHandler={(event: ChangeEvent<any>) =>
          setIsbn(event.target.value)
        }
        type="text"
        placeholder={languages[language].inputPlaceholder.isbn}
        readOnly={!isAdmin}
      />
      <FormInputGroup
        value={title!}
        label={languages[language].inputLabels.title}
        onChangeHandler={(event: ChangeEvent<any>) =>
          setTitle(event.target.value)
        }
        type="text"
        placeholder={languages[language].inputPlaceholder.title}
        readOnly={!isAdmin}
      />
      <FormInputGroup
        value={description!}
        label={languages[language].inputLabels.description}
        onChangeHandler={(event: ChangeEvent<any>) =>
          setDescription(event.target.value)
        }
        type="text"
        placeholder={languages[language].inputPlaceholder.description}
        readOnly={!isAdmin}
        as="textarea"
      />
      <FormInputGroup
        value={publisher!}
        label={languages[language].inputLabels.publisher}
        onChangeHandler={(event: ChangeEvent<any>) =>
          setPublisher(event.target.value)
        }
        type="text"
        placeholder={languages[language].inputPlaceholder.publisher}
        readOnly={!isAdmin}
      />

      <FormInputGroup
        value={authorName!}
        label={languages[language].inputLabels.author}
        onChangeHandler={(event: ChangeEvent<any>) =>
          setAuthorName(event.target.value)
        }
        type="text"
        placeholder={languages[language].inputPlaceholder.author}
        readOnly={!isAdmin}
      />

      {isAdmin && (
        <FormSubmitButton
          text={languages[language].buttonsText.updateInfo}
          onClick={onUpdateClickHandler}
          disabled={disabled}
        />
      )}
      {isAdmin && <DeleteBookButton bookId={bookInModal._id!} />}
    </Form>
  )
}

export default React.memo(BookInfoForm)
