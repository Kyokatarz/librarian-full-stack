import React, {
  ChangeEvent,
  RefObject,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react'
import { useSelector } from 'react-redux'

import SearchBar from '../SearchBar'
import BookContainer from '../BookContainer'
import BookInfoModal from '../BookInfoModal'
import { RootState } from '../../types/rootState'
import AddNewBookButton from '../AddNewBookButton'
import NewBookModal from '../NewBookModal'
import { Book } from '../../types/bookTypes'
import NewAuthorModal from '../NewAuthorModal.tsx'
import AddNewAuthorButton from '../AddNewAuthorButton'
import './AllBooksPage.scss'
import filteredBooksEmpty from '../FilteredBooksEmpty'
import FilteredBooksEmpty from '../FilteredBooksEmpty'

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

  console.log(filteredBooks.length)
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
      {isAdmin && (
        <AddNewAuthorButton onClick={() => setShowNewAuthorModal(true)} />
      )}
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
