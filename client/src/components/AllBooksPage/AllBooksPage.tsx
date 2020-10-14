import React, { useEffect } from 'react'
import SearchBar from '../SearchBar'

import './AllBooksPage.scss'
import { useDispatch, useSelector } from 'react-redux'
import { Book } from '../../types/bookTypes'
import { RootState } from '../../types/rootState'
import { getAllBooks } from '../../redux/actions/book'
import BookContainer from '../BookContainer'

const AllBooksPage = () => {
  const books = useSelector<RootState, Book[]>((state) => state.books)
  const dispatch = useDispatch()

  useEffect(() => {
    console.log('AllBooksPage rendered!')
    console.log(books)
    if (books.length === 0) {
      dispatch(getAllBooks())
    }
  })

  return (
    <div className="AllBooksPage">
      <SearchBar />
      <BookContainer />
    </div>
  )
}

export default React.memo(AllBooksPage)
