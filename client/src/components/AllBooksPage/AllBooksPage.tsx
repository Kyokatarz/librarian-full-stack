import React, {
  ChangeEvent,
  RefObject,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react'
import { useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import { Button } from 'react-bootstrap'

import SearchBar from '../SearchBar'
import BookContainer from '../BookContainer'
import BookInfoModal from '../BookInfoModal'
import { RootState } from '../../types/rootState'
import AddNewBookButton from '../AddNewBookButton'
import NewBookModal from '../NewBookModal'
import './AllBooksPage.scss'
import { Book } from '../../types/bookTypes'
import { select } from 'redux-saga/effects'

const AllBooksPage = () => {
  const isAdmin = useSelector<RootState, boolean>(
    (state) => state.user.userInfo.isAdmin
  )
  const allBooks = useSelector<RootState, Book[]>((state) => state.books)
  const [showNewBookModal, setShowNewBookModal] = useState(false)
  const [filteredBooks, setFilteredBooks] = useState<Book[]>([])
  const [search, setSearch] = useState('')
  const [select, setSelect] = useState('title')

  const onSearchChangeHandler = useCallback(
    (event: ChangeEvent<any>) => {
      const searchValue = event.target.value
      setSearch(searchValue)
      const books = allBooks.filter((bookObj: any) =>
        bookObj[select].includes(searchValue)
      )
      setFilteredBooks([...books])
    },
    [search, select]
  )

  const onSelectChangeHandler = (event: ChangeEvent<any>) => {
    setSelect(event.target.value)
    setSearch('')
    setFilteredBooks(allBooks)
  }

  useEffect(() => {
    setFilteredBooks(allBooks)
    console.log('AllBooksPage rendered!')
  }, [allBooks])

  return (
    <div className="AllBooksPage">
      <SearchBar
        search={search}
        onSearchChangeHandler={onSearchChangeHandler}
        select={select}
        onSelectChangeHandler={onSelectChangeHandler}
      />
      {isAdmin && (
        <AddNewBookButton onClick={() => setShowNewBookModal(true)} />
      )}
      <BookContainer inBorrowedBooks={false} content={filteredBooks} />
      <BookInfoModal />
      <NewBookModal
        show={showNewBookModal}
        closeHandler={() => setShowNewBookModal(false)}
      />
    </div>
  )
}

export default React.memo(AllBooksPage)
