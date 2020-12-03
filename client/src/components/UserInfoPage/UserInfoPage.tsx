import React, { useContext } from 'react'
import { Link } from 'react-router-dom'

import { LanguageContext } from '../../context/langContext'
import { languages } from '../../languages/languages'
import UserInfoForm from '../UserInfoForm'
import './UserInfoPage.scss'

const UserInfoPage = () => {
  const { language } = useContext(LanguageContext)
  return (
    <div className="UserInfoPage">
      <div className="UserInfoPage__Content">
        <UserInfoForm />
        <Link to="/user/changepassword" className="UserInfoPage__Bottom">
          {languages[language].actions.changePassword}
        </Link>
      </div>
    </div>
  )
}

export default UserInfoPage
