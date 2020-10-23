import './SearchBar.scss'

import React, { FormEvent } from 'react'
import { Form } from 'react-bootstrap'

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
  const submitHandler = (event: FormEvent<HTMLInputElement>) => {
    event.preventDefault()
  }

  return (
    <div className="SearchBarContainer">
      <Form className="SearchBar" onSubmit={submitHandler}>
        <Form.Group>
          <Form.Control
            className="SearchBar__Control"
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
            className="SearchBar__Control"
          >
            <option value="title">Title</option>
            <option value="isbn">ISBN</option>
            <option value="author">Author</option>
          </Form.Control>
        </Form.Group>
      </Form>
    </div>
  )
}

export default SearchBar
