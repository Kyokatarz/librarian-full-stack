import React, { ChangeEvent, FormEvent, useContext, useState } from 'react'
import { Form } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'

import CustomButton from '../../components/CustomButton'
import FormInputGroup from '../../components/FormInputGroup'
import { LanguageContext } from '../../context/langContext'
import { languages } from '../../languages/languages'
import { changeUserPassword } from '../../redux/actions'
import { RootState } from '../../types/rootState'

import './ChangePassword.scss'

const ChangePassword = () => {
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
    <div className="ChangePassword">
      <div className="ChangePassword__Content">
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
            placeholder={
              languages[language].inputPlaceholder.confirmNewPassword
            }
            onChangeHandler={onConfirmPasswordChange}
            readOnly={disabled}
          />
          <CustomButton
            disabled={disabled}
            label={languages[language].actions.changePassword}
            onClick={handleSubmit}
          />
          {disabled && (
            <Form.Text className="text-danger">
              {languages[language].misc.cannotChangeGooglePassword}
            </Form.Text>
          )}
        </Form>
      </div>
    </div>
  )
}

export default ChangePassword
