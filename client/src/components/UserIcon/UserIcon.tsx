import React, { MouseEvent, useEffect } from 'react'
import { Button, Dropdown, NavDropdown } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { clearStorageAndLogOut } from '../../redux/actions/user'

import { RootState } from '../../types/rootState'
import { User } from '../../types/userTypes'
import UserImage from '../UserImage/UserImage'

import './UserIcon.scss'

const UserIcon = () => {
  const user = useSelector<RootState, User>((state) => state.user)
  const dispatch = useDispatch()

  const { username } = user.userInfo
  useEffect(() => {
    try {
    } catch (err) {}
  })

  const signOutClickHandler = (event: MouseEvent) => {
    event.preventDefault()
    dispatch(clearStorageAndLogOut())
  }

  return (
    <div className="User-icon">
      <NavDropdown id="NavDropdown" title={<UserImage />}>
        <Dropdown.Item disabled>Signed in as {username}</Dropdown.Item>
        <Dropdown.Item>
          <Button block variant="info">
            Your Info
          </Button>
        </Dropdown.Item>
        <Dropdown.Item onClick={signOutClickHandler}>
          <Button block variant="danger">
            Sign Out
          </Button>
        </Dropdown.Item>
      </NavDropdown>
    </div>
  )
}

export default UserIcon
