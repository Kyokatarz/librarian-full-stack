import React, {
  ChangeEvent,
  FormEvent,
  useContext,
  useEffect,
  useState,
} from 'react'
import { Form } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'

import { LanguageContext } from '../../context/langContext'
import { languages } from '../../languages/languages'
import { updateUserData } from '../../redux/actions/user'
import { RootState } from '../../types/rootState'
import { User } from '../../types/userTypes'
import CustomButton from '../CustomButton'
import FormInputGroup from '../FormInputGroup'

const UserInfoForm = () => {
  const user = useSelector<RootState, User>((state) => state.user)
  const dispatch = useDispatch()
  const { firstName, lastName, email } = user.userInfo

  const [inputFN, setInputFN] = useState<string>(firstName)
  const [inputLN, setInputLN] = useState(lastName)
  const [inputEmail, setInputEmail] = useState(email)
  const [newChanges, setNewChanges] = useState(false)

  const { language } = useContext(LanguageContext)

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
        label={languages[language].inputLabels.firstName}
        onChangeHandler={(event: ChangeEvent<any>) =>
          setInputFN(event.target.value)
        }
        type="text"
        placeholder={languages[language].inputPlaceholder.firstName}
      />
      <FormInputGroup
        value={inputLN}
        label={languages[language].inputLabels.lastName}
        onChangeHandler={(event: ChangeEvent<any>) =>
          setInputLN(event.target.value)
        }
        type="text"
        placeholder={languages[language].inputPlaceholder.lastName}
      />
      <FormInputGroup
        value={inputEmail}
        label="Email"
        onChangeHandler={(event: ChangeEvent<any>) =>
          setInputEmail(event.target.value)
        }
        type="text"
        placeholder={languages[language].inputPlaceholder.email}
      />
      <CustomButton
        label={languages[language].buttonsText.updateInfo}
        disabled={!newChanges}
      />
    </Form>
  )
}

export default React.memo(UserInfoForm)
