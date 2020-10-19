import React, { ChangeEvent, useEffect, useRef, useState } from 'react'
import { Form } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'

import { setFilteredBooks } from '../../redux/actions/filteredBook'
import { Author } from '../../types/authorTypes'
import { Book } from '../../types/bookTypes'
import { RootState } from '../../types/rootState'

import './SearchBar.scss'

const SearchBar = () => {
  const dispatch = useDispatch()
  const [searchValue, setSearchValue] = useState('')
  const [selectValue, setSelectValue] = useState('title')

  const inputRef = useRef() as any

  const allBooks = useSelector<RootState, Book[]>((state) => state.books)

  const onChangeHandler = (event: ChangeEvent<any>) => {
    setSearchValue(event.target.value)
    let filteredBooks = allBooks.filter((bookObj: any) =>
      bookObj[selectValue].includes(inputRef.current.value)
    )

    dispatch(setFilteredBooks(filteredBooks))
  }

  useEffect(() => {
    console.log(
      allBooks
        .filter((bookObj: any) => bookObj.author.length > 0)
        .filter(
          (bookObj: any) =>
            !!bookObj.author.find(
              (author: any) => author.name === inputRef.current.value
            )
        )
    )
  })

  return (
    <Form className="SearchBar">
      <Form.Group>
        <Form.Control
          type="text"
          placeholder="Search something..."
          value={searchValue}
          onChange={onChangeHandler}
          ref={inputRef}
        ></Form.Control>
      </Form.Group>
      <Form.Group controlId="SearchForm.ControlSelect1">
        <Form.Label className="SearchBar__Label" aria-hidden={false}>
          Search type
        </Form.Label>
        <Form.Control
          as="select"
          value={selectValue}
          onChange={(event: ChangeEvent<any>) =>
            setSelectValue(event.target.value)
          }
        >
          <option value="title">Title</option>
          <option value="isbn">ISBN</option>
        </Form.Control>
      </Form.Group>
    </Form>
  )
}

export default SearchBar
