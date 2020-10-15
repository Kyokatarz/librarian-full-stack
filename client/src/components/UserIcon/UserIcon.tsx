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

  const signOutClickHandler = (event: any) => {
    event.preventDefault()
    dispatch(clearStorageAndLogOut())
  }

  return (
    <div className="UserIcon">
      <DropdownButton title={<UserImage />} alignRight={true}>
        <Dropdown.Item disabled as="li">
          Signed in as {username}
        </Dropdown.Item>
        <Dropdown.Item as="li">
          <Link to="/user/info">
            <Button block variant="info">
              Your Info
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
