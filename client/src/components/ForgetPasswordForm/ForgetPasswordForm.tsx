import React, { ChangeEvent, FormEvent, useState } from 'react'
import { Form } from 'react-bootstrap'
import { useDispatch } from 'react-redux'
import axios from 'axios'
import { toast } from 'react-toastify'

import FormInputGroup from '../FormInputGroup'
import FormSubmitButton from '../FormSubmitButton'
import { clearUI, setErrorMsg, setLoading } from '../../redux/actions'

const ForgetPasswordForm = () => {
  const [email, setEmail] = useState('')
  const dispatch = useDispatch()

  const submitHandler = async (event: FormEvent) => {
    try {
      event.preventDefault()
      dispatch(setLoading())
      const resp = await axios.post('/api/v1/user/password', {
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
        placeholder="Enter your account email..."
      />
      <FormSubmitButton text="Confirm" onClick={submitHandler} />
    </Form>
  )
}

export default ForgetPasswordForm
