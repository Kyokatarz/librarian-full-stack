import React from 'react'
import { useSelector } from 'react-redux'

import { RootState } from '../../types/rootState'
import { User } from '../../types/userTypes'

import './UserImage.scss'

type UserImageProps = {
  imageUrl: string
}

const UserImage: React.FC<UserImageProps> = ({ imageUrl }) => {
  return (
    <div className="UserImage">
      <img src={imageUrl} />
    </div>
  )
}

export default UserImage
