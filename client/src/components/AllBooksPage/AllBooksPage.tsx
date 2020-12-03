import './AllBooksPage.scss'

import React, { ChangeEvent, useCallback, useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import _ from 'lodash'

import { Book } from '../../types/bookTypes'
import { RootState } from '../../types/rootState'
import AddNewAuthorButton from '../AddNewAuthorButton'
import AddNewBookButton from '../AddNewBookButton'
import BookContainer from '../BookContainer'
import BookInfoModal from '../BookInfoModal'
import FilteredBooksEmpty from '../FilteredBooksEmpty'
import NewAuthorModal from '../NewAuthorModal.tsx'
import NewBookModal from '../NewBookModal'
import SearchBar from '../SearchBar'

const AllBooksPage = () => {
  const isAdmin = useSelector<RootState, boolean>(
    (state) => state.user.userInfo.isAdmin
  )
  const allBooks = useSelector<RootState, Book[]>((state) => state.books)
  const [showNewBookModal, setShowNewBookModal] = useState(false)
  const [showNewAuthorModal, setShowNewAuthorModal] = useState(false)
  const [filteredBooks, setFilteredBooks] = useState<Book[]>([])
  const [search, setSearch] = useState('')
  const [select, setSelect] = useState('title')

  const onSearchChangeHandler = useCallback(
    (event: ChangeEvent<any>) => {
      const searchValue = event.target.value
      setSearch(searchValue)
      const books = allBooks.filter((bookObj: any) =>
        select !== 'author'
          ? bookObj[select].toLowerCase().includes(searchValue.toLowerCase())
          : bookObj[select].name.includes(searchValue)
      )
      setFilteredBooks(_.orderBy([...books], [select], 'asc'))
    },
    [select, allBooks]
  )

  const onSelectChangeHandler = (event: ChangeEvent<any>) => {
    setSelect(event.target.value)
    setSearch('')
    setFilteredBooks(allBooks)
  }

  useEffect(() => {
    setFilteredBooks(_.orderBy(allBooks, [select], 'asc'))
    console.log('AllBooksPage rendered!')
  }, [allBooks, select])

  return (
    <div className="AllBooksPage">
      <SearchBar
        search={search}
        onSearchChangeHandler={onSearchChangeHandler}
        select={select}
        onSelectChangeHandler={onSelectChangeHandler}
      />

      <div className="AllBooksPage__FunctionalityButton">
        {isAdmin && (
          <AddNewBookButton onClick={() => setShowNewBookModal(true)} />
        )}
        {isAdmin && (
          <AddNewAuthorButton onClick={() => setShowNewAuthorModal(true)} />
        )}
      </div>
      {filteredBooks.length === 0 ? (
        <FilteredBooksEmpty />
      ) : (
        <BookContainer inBorrowedBooks={false} content={filteredBooks} />
      )}
      <BookInfoModal />
      <NewBookModal
        show={showNewBookModal}
        closeHandler={() => setShowNewBookModal(false)}
      />
      <NewAuthorModal
        show={showNewAuthorModal}
        closeHandler={() => setShowNewAuthorModal(false)}
      />
    </div>
  )
}

export default React.memo(AllBooksPage)
