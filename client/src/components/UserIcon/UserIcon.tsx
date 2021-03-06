import React from 'react'
import { Button, Dropdown, DropdownButton } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

import { clearStorageAndLogOut } from '../../redux/actions/user'
import { RootState } from '../../types/rootState'
import { User } from '../../types/userTypes'
import { LanguageContext } from '../../context/langContext'
import { languages } from '../../languages/languages'

import './UserIcon.scss'

const UserIcon = () => {
  const user = useSelector<RootState, User>((state) => state.user)
  const dispatch = useDispatch()
  const { language } = React.useContext(LanguageContext)
  const { username } = user.userInfo
  const trimmedUsername =
    username.length >= 8 ? username.slice(0, 7) + '...' : username
  const signOutClickHandler = (event: any) => {
    event.preventDefault()
    dispatch(clearStorageAndLogOut())
  }

  return (
    <div className="UserIcon">
      <DropdownButton
        title={
          <div className="UserIcon__UserImage">
            <img src={user.userInfo.imageUrl} alt="User" />
          </div>
        }
        alignRight={true}
      >
        <Dropdown.Item disabled as="li">
          {languages[language].user.signInAs} {trimmedUsername}
        </Dropdown.Item>
        <Dropdown.Item as="li">
          <Link to="/user/info">
            <Button block variant="info">
              {languages[language].user.info}
            </Button>
          </Link>
        </Dropdown.Item>
        <Dropdown.Item as="li">
          <Link to="/user/books">
            <Button block variant="info">
              {languages[language].user.books}
            </Button>
          </Link>
        </Dropdown.Item>
        <Dropdown.Item as="li" onClick={signOutClickHandler}>
          <Button block variant="danger">
            {languages[language].user.signOut}
          </Button>
        </Dropdown.Item>
      </DropdownButton>
    </div>
  )
}

export default UserIcon
