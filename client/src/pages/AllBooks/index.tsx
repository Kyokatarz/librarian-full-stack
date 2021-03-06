import './AllBooksPage.scss'

import React, {
  ChangeEvent,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react'
import { useSelector } from 'react-redux'
import _ from 'lodash'

import { LanguageContext } from '../../context/langContext'
import { languages } from '../../languages/languages'
import { Book } from '../../types/bookTypes'
import { RootState } from '../../types/rootState'
import CustomButton from '../../components/CustomButton'
import BookContainer from '../../components/BookContainer'
import BookInfoModal from '../../components/BookInfoModal'
import FilteredBooksEmpty from '../../components/FilteredBooksEmpty'
import NewAuthorModal from '../../components/NewAuthorModal.tsx'
import NewBookModal from '../../components/NewBookModal'
import SearchBar from '../../components/SearchBar'

const AllBooksPage = () => {
  const { language } = useContext(LanguageContext)

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
          <CustomButton
            label={'+ ' + languages[language].actions.addBook}
            onClick={() => setShowNewBookModal(true)}
          />
        )}
        {isAdmin && (
          <CustomButton
            onClick={() => setShowNewAuthorModal(true)}
            label={'+ ' + languages[language].actions.addAuthor}
          />
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
