import './UserInfoPage.scss'

import React from 'react'
import { Link } from 'react-router-dom'

import UserInfoForm from '../UserInfoForm'

const UserInfoPage = () => {
  return (
    <div className="UserInfoPage">
      <div className="UserInfoPage__Content">
        <UserInfoForm />
        <Link to="/user/changepassword" className="UserInfoPage__Bottom">
          Change password
        </Link>
      </div>
    </div>
  )
}

export default UserInfoPage
