import React, { ChangeEvent, FormEvent, useEffect, useState } from 'react'
import { Form } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'

import { updateUserData } from '../../redux/actions/user'
import { RootState } from '../../types/rootState'
import { User } from '../../types/userTypes'
import FormInputGroup from '../FormInputGroup'
import FormSubmitButton from '../FormSubmitButton'

const UserInfoForm = () => {
  const user = useSelector<RootState, User>((state) => state.user)
  const dispatch = useDispatch()
  const { firstName, lastName, email } = user.userInfo

  const [inputFN, setInputFN] = useState<string>(firstName)
  const [inputLN, setInputLN] = useState(lastName)
  const [inputEmail, setInputEmail] = useState(email)
  const [newChanges, setNewChanges] = useState(false)

  const submitHandler = (event: FormEvent) => {
    event.preventDefault()
    dispatch(
      updateUserData(user.token, {
        firstName: inputFN,
        lastName: inputLN,
        email: inputEmail,
      })
    )
  }
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
    <Form onSubmit={submitHandler}>
      <FormInputGroup
        value={inputFN}
        label="First Name"
        onChangeHandler={(event: ChangeEvent<any>) =>
          setInputFN(event.target.value)
        }
        type="text"
        placeholder="Enter your First Name..."
      />
      <FormInputGroup
        value={inputLN}
        label="Last Name"
        onChangeHandler={(event: ChangeEvent<any>) =>
          setInputLN(event.target.value)
        }
        type="text"
        placeholder="Enter your Last Name..."
      />
      <FormInputGroup
        value={inputEmail}
        label="Email"
        onChangeHandler={(event: ChangeEvent<any>) =>
          setInputEmail(event.target.value)
        }
        type="text"
        placeholder="Enter your Email..."
      />
      <FormSubmitButton text="Update Info" disabled={!newChanges} />
    </Form>
  )
}

export default React.memo(UserInfoForm)
