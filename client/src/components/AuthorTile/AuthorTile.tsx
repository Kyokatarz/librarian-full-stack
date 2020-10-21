import React from 'react'
import { ImCross } from 'react-icons/im'
import { useDispatch, useSelector } from 'react-redux'
import { requestDeleteAuthor } from '../../redux/actions'

import { Book } from '../../types/bookTypes'
import { RootState } from '../../types/rootState'

type AuthorTileProps = {
  _id?: string
  name?: string
  writtenBooks?: Book[]
}

const AuthorTile: React.FC<AuthorTileProps> = ({ _id, name, writtenBooks }) => {
  const dispatch = useDispatch()
  const token = useSelector<RootState, string>((state) => state.user.token)
  const deleteAuthor = () => {
    dispatch(requestDeleteAuthor(token, _id!))
  }

  return (
    <div>
      <p>{_id}</p>
      <p>{name}</p>
      <ImCross onClick={deleteAuthor} />
    </div>
  )
}

export default AuthorTile
