import React, { ChangeEvent, FormEvent, useState } from 'react'
import { Form } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { changeUserPassword } from '../../redux/actions/user'

import { RootState } from '../../types/rootState'
import FormInputGroup from '../FormInputGroup'
import FormSubmitButton from '../FormSubmitButton'

const ChangePasswordForm = () => {
  const dispatch = useDispatch()
  const token = useSelector<RootState, string>((state) => state.user.token)

  const username = useSelector<RootState, string>(
    (state) => state.user.userInfo.username
  )
  const disabled = useSelector<RootState, boolean>(
    (state) => state.user.userInfo.isGoogleUser
  )
  const [oldPassword, setOldPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [passwordMatch, setPasswordMatch] = useState(true)
  const onNewPasswordChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (!passwordMatch) setPasswordMatch(true)
    setNewPassword(event.target.value)
  }

  const onConfirmPasswordChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (!passwordMatch) setPasswordMatch(true)
    setConfirmPassword(event.target.value)
  }

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault()
    if (newPassword !== confirmPassword) {
      setPasswordMatch(false)
      return
    }
    dispatch(changeUserPassword(token, { oldPassword, newPassword }))
  }

  return (
    <Form onSubmit={handleSubmit}>
      <FormInputGroup
        label="Old password"
        type="password"
        value={oldPassword}
        placeholder="Enter your old password..."
        onChangeHandler={(event: ChangeEvent<any>) =>
          setOldPassword(event.target.value)
        }
        readOnly={disabled}
      />
      <FormInputGroup
        label="New password"
        type="password"
        value={newPassword}
        placeholder="Enter your new password..."
        onChangeHandler={onNewPasswordChange}
        readOnly={disabled}
      />
      <FormInputGroup
        label="Comfirm password"
        type="password"
        value={confirmPassword}
        placeholder="Confirm your new password..."
        onChangeHandler={onConfirmPasswordChange}
        readOnly={disabled}
      />
      <FormSubmitButton
        disabled={disabled}
        text="Change Password"
        onClick={handleSubmit}
      />
      {disabled && (
        <Form.Text className="text-danger">
          Your account is logged in with Google, hence we can't change your
          password.
        </Form.Text>
      )}
    </Form>
  )
}

export default ChangePasswordForm
