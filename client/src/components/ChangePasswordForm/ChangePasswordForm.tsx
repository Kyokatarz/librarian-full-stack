import React, { ChangeEvent, FormEvent, useContext, useState } from 'react'
import { Form } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'

import { changeUserPassword } from '../../redux/actions/user'
import { RootState } from '../../types/rootState'
import FormInputGroup from '../FormInputGroup'
import FormSubmitButton from '../FormSubmitButton'
import { languages } from '../../languages/languages'
import { LanguageContext } from '../../context/langContext'

const ChangePasswordForm = () => {
  const dispatch = useDispatch()
  const token = useSelector<RootState, string>((state) => state.user.token)

  const disabled = useSelector<RootState, boolean>(
    (state) => state.user.userInfo.isGoogleUser
  )
  const [oldPassword, setOldPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [passwordMatch, setPasswordMatch] = useState(true)

  const { language } = useContext(LanguageContext)

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
        label={languages[language].inputLabels.oldPassword}
        type="password"
        value={oldPassword}
        placeholder={languages[language].inputPlaceholder.oldPassword}
        onChangeHandler={(event: ChangeEvent<any>) =>
          setOldPassword(event.target.value)
        }
        readOnly={disabled}
      />
      <FormInputGroup
        label={languages[language].inputLabels.newPassword}
        type="password"
        value={newPassword}
        placeholder={languages[language].inputPlaceholder.newPassword}
        onChangeHandler={onNewPasswordChange}
        readOnly={disabled}
      />
      <FormInputGroup
        label={languages[language].inputLabels.confirmPassword}
        type="password"
        value={confirmPassword}
        placeholder={languages[language].inputPlaceholder.confirmNewPassword}
        onChangeHandler={onConfirmPasswordChange}
        readOnly={disabled}
      />
      <FormSubmitButton
        disabled={disabled}
        text={languages[language].actions.changePassword}
        onClick={handleSubmit}
      />
      {disabled && (
        <Form.Text className="text-danger">
          {languages[language].misc.cannotChangeGooglePassword}
        </Form.Text>
      )}
    </Form>
  )
}

export default ChangePasswordForm
