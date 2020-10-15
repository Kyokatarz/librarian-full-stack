import React, { useEffect, useState } from 'react'
import { Form } from 'react-bootstrap'
import { useSelector } from 'react-redux'

import { RootState } from '../../types/rootState'
import { User } from '../../types/userTypes'
import EmailInput from '../EmailInput'
import FirstNameInput from '../FirstNameInput'
import FormSubmitButton from '../FormSubmitButton'
import LastNameInput from '../LastNameInput'

const UserInfoForm = () => {
  const user = useSelector<RootState, User>((state) => state.user)
  const { firstName, lastName, email } = user.userInfo

  const [inputFN, setInputFN] = useState<string>(firstName)
  const [inputLN, setInputLN] = useState(lastName)
  const [inputEmail, setInputEmail] = useState(email)
  const [newChanges, setNewChanges] = useState(false)

  useEffect(() => {
    if (inputLN !== lastName || inputFN !== firstName || inputEmail !== email) {
      setNewChanges(true)
    } else setNewChanges(false)
  }, [inputFN, inputLN, inputEmail])

  useEffect(() => {
    setInputFN(firstName)
    setInputLN(lastName)
    setInputEmail(email)
  }, [firstName, lastName, email])

  useEffect(() => {
    console.log('Info form rendered!')
  })
  return (
    <Form>
      <FirstNameInput inputFN={inputFN} setInputFN={setInputFN} />
      <LastNameInput inputLN={inputLN} setInputLN={setInputLN} />
      <EmailInput inputEmail={inputEmail} setInputEmail={setInputEmail} />
      <FormSubmitButton text="Update Info" disabled={!newChanges} />
    </Form>
  )
}

export default React.memo(UserInfoForm)
