import React, { FormEvent } from 'react'
import { Form } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'

import { Book } from '../../types/bookTypes'
import { RootState } from '../../types/rootState'

import './SearchBar.scss'

type SearchBarProps = {
  search: string
  onSearchChangeHandler: any
  select: string
  onSelectChangeHandler: any
}

const SearchBar: React.FC<SearchBarProps> = ({
  search,
  onSearchChangeHandler,
  select,
  onSelectChangeHandler,
}) => {
  const dispatch = useDispatch()
  const allBooks = useSelector<RootState, Book[]>((state) => state.books)
  const submitHandler = (event: FormEvent<HTMLInputElement>) => {
    event.preventDefault()
  }

  return (
    <Form className="SearchBar" onSubmit={submitHandler}>
      <Form.Group>
        <Form.Control
          type="text"
          placeholder="Search something..."
          value={search}
          onChange={onSearchChangeHandler}
        ></Form.Control>
      </Form.Group>
      <Form.Group controlId="SearchForm.ControlSelect1">
        <Form.Label className="SearchBar__Label" aria-hidden={false}>
          Search type
        </Form.Label>
        <Form.Control
          as="select"
          value={select}
          onChange={onSelectChangeHandler}
        >
          <option value="title">Title</option>
          <option value="isbn">ISBN</option>
        </Form.Control>
      </Form.Group>
    </Form>
  )
}

export default SearchBar
