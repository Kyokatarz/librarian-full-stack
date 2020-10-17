import React from 'react'
import { FcInfo } from 'react-icons/fc'
import { useDispatch, useSelector } from 'react-redux'

import { showModal } from '../../redux/actions/bookModal'
import { Book } from '../../types/bookTypes'
import { RootState } from '../../types/rootState'

type InfoIconProps = {
  _id: string
}

const InfoIcon: React.FC<InfoIconProps> = ({ _id }) => {
  const books = useSelector<RootState, Book[]>((state) => state.books)
  const dispatch = useDispatch()

  const showInfoModal = () => {
    const book = books.find((bookObj) => bookObj._id === _id)
    if (!book) return
    dispatch(showModal(book))
  }

  return <FcInfo onClick={showInfoModal} />
}

export default InfoIcon
