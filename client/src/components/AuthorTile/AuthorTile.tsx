import React from 'react'
import { ImCross } from 'react-icons/im'
import { useDispatch, useSelector } from 'react-redux'

import { requestDeleteAuthor } from '../../redux/actions'
import { Book } from '../../types/bookTypes'
import { RootState } from '../../types/rootState'

import './AuthorTile.scss'

type AuthorTileProps = {
  _id?: string
  name?: string
  writtenBooks?: Book[]
}

const AuthorTile: React.FC<AuthorTileProps> = ({ _id, name, writtenBooks }) => {
  const dispatch = useDispatch()
  const token = useSelector<RootState, string>((state) => state.user.token)
  const isAdmin = useSelector<RootState, boolean>(
    (state) => state.user.userInfo.isAdmin
  )
  const deleteAuthor = () => {
    dispatch(requestDeleteAuthor(token, _id!))
  }

  return (
    <div className="AuthorTile">
      <div>{name}</div>
      <div>{_id}</div>
      {isAdmin && (
        <ImCross onClick={deleteAuthor} className="AuthorTile__Icon" />
      )}
    </div>
  )
}

export default AuthorTile
