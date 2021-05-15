import React, { ChangeEvent, FormEvent, useContext, useState } from 'react'
import { Form } from 'react-bootstrap'
import { useDispatch } from 'react-redux'
import axios from 'axios'
import { toast } from 'react-toastify'

import { url } from '../../App'
import FormInputGroup from '../FormInputGroup'
import { clearUI, setErrorMsg, setLoading } from '../../redux/actions'
import CustomButton from '../CustomButton'
import { LanguageContext } from '../../context/langContext'
import { languages } from '../../languages/languages'

const ForgetPasswordForm = () => {
  const { language } = useContext(LanguageContext)
  const [email, setEmail] = useState('')
  const dispatch = useDispatch()

  const submitHandler = async (event: FormEvent) => {
    try {
      event.preventDefault()
      dispatch(setLoading())
      const resp = await axios.post(url + '/api/v1/user/password', {
        email: email,
      })
      if (resp.status === 200) {
        dispatch(clearUI())
        console.log(resp)
        toast.info(resp.data.msg, { autoClose: 6000 })
      }
    } catch (err) {
      dispatch(setErrorMsg(err.response?.data?.message || 'Unknown Error'))
    }
  }
  return (
    <Form onSubmit={submitHandler}>
      <FormInputGroup
        label="Email"
        value={email}
        onChangeHandler={(event: ChangeEvent<any>) =>
          setEmail(event.target.value)
        }
        type="text"
        placeholder={languages[language].inputPlaceholder.email}
      />
      <CustomButton
        label={languages[language].actions.confirm}
        onClick={submitHandler}
      />
    </Form>
  )
}

export default ForgetPasswordForm
