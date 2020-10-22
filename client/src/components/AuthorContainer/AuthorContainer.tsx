import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'

import { Author } from '../../types/authorTypes'
import { RootState } from '../../types/rootState'
import AuthorTile from '../AuthorTile'
import './AuthorContainer.scss'

const AuthorContainer = () => {
  const authors = useSelector<RootState, Author[]>((state) => state.authors)

  useEffect(() => {})
  return (
    <div className="AuthorContainer">
      {authors.map((author) => (
        <AuthorTile _id={author._id} name={author.name} key={author._id} />
      ))}
    </div>
  )
}

export default AuthorContainer
