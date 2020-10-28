import React from 'react'

import './UserImage.scss'

type UserImageProps = {
  imageUrl: string
}

const UserImage: React.FC<UserImageProps> = ({ imageUrl }) => {
  return (
    <div className="UserImage">
      <img src={imageUrl} alt="User" />
    </div>
  )
}

export default UserImage
