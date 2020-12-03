import React, { FormEvent, useContext } from 'react'
import { Form } from 'react-bootstrap'

import { LanguageContext } from '../../context/langContext'
import { languages } from '../../languages/languages'
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
  const submitHandler = (event: FormEvent<HTMLInputElement>) => {
    event.preventDefault()
  }
  const { language } = useContext(LanguageContext)
  return (
    <div className="SearchBarContainer">
      <Form className="SearchBar" onSubmit={submitHandler}>
        <Form.Group>
          <Form.Control
            className="SearchBar__Control"
            type="text"
            placeholder={languages[language].inputPlaceholder.search}
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
            <option value="title">
              {languages[language].inputLabels.title}
            </option>
            <option value="isbn">ISBN</option>
            <option value="author">
              {languages[language].inputLabels.author}
            </option>
          </Form.Control>
        </Form.Group>
      </Form>
    </div>
  )
}

export default SearchBar
