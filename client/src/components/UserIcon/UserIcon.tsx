import React, { MouseEvent, useEffect } from 'react'
import { Button, Dropdown, DropdownButton, NavDropdown } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { clearStorageAndLogOut } from '../../redux/actions/user'

import { RootState } from '../../types/rootState'
import { User } from '../../types/userTypes'
import UserImage from '../UserImage/UserImage'

import './UserIcon.scss'

const UserIcon = () => {
  const user = useSelector<RootState, User>((state) => state.user)
  const dispatch = useDispatch()

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
        title={<UserImage imageUrl={user.userInfo.imageUrl} />}
        alignRight={true}
      >
        <Dropdown.Item disabled as="li">
          Signed in as {trimmedUsername}
        </Dropdown.Item>
        <Dropdown.Item as="li">
          <Link to="/user/info">
            <Button block variant="info">
              Account Info
            </Button>
          </Link>
        </Dropdown.Item>
        <Dropdown.Item as="li">
          <Link to="/user/books">
            <Button block variant="info">
              Your books
            </Button>
          </Link>
        </Dropdown.Item>
        <Dropdown.Item as="li" onClick={signOutClickHandler}>
          <Button block variant="danger">
            Sign Out
          </Button>
        </Dropdown.Item>
      </DropdownButton>
    </div>
  )
}

export default UserIcon
