import './AllAuthorPage.scss'

import React from 'react'

import AuthorTile from '../../components/AuthorTile'
import { useSelector } from 'react-redux'
import { Author } from '../../types/authorTypes'
import { RootState } from '../../types/rootState'

const AllAuthorPage = () => {
  const authors = useSelector<RootState, Author[]>((state) => state.authors)

  return (
    <div className="AllAuthorPage">
      <div className="AuthorContainer">
        {authors.map((author) => (
          <AuthorTile _id={author._id} name={author.name} key={author._id} />
        ))}
      </div>
    </div>
  )
}

export default AllAuthorPage
