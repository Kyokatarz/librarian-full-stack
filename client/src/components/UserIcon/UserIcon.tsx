import React, { useEffect, useState } from 'react'
import {
  ButtonGroup,
  Dropdown,
  DropdownButton,
  NavDropdown,
} from 'react-bootstrap'
import { useSelector } from 'react-redux'
import jwt from 'jsonwebtoken'

import { RootState } from '../../types/rootState'
import { User } from '../../types/userTypes'
import UserImage from '../UserImage/UserImage'

import './UserIcon.scss'

const UserIcon = () => {
  const user = useSelector<RootState, User>((state) => state.user)
  const [username, setUsername] = useState('')
  useEffect(() => {
    try {
    } catch (err) {}
  })

  return (
    <div className="User-icon">
      <NavDropdown id="NavDropdown" title={<UserImage />}>
        <Dropdown.Item>Sign in as </Dropdown.Item>
        <Dropdown.Item>B</Dropdown.Item>
        <Dropdown.Item>C</Dropdown.Item>
      </NavDropdown>
    </div>
  )
}

export default UserIcon
