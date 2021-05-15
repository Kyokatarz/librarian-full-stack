import axios from 'axios'
import React, { ChangeEvent, FormEvent, useContext, useState } from 'react'
import { useDispatch } from 'react-redux'
import { toast } from 'react-toastify'

import { LanguageContext } from '../../context/langContext'
import { setLoading, clearUI, setErrorMsg } from '../../redux/actions'
import { url } from '../../App'
import { Form } from 'react-bootstrap'
import CustomButton from '../../components/CustomButton'
import FormInputGroup from '../../components/FormInputGroup'
import { languages } from '../../languages/languages'

const ForgetPasswordPage = () => {
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
    <div className="ForgetPasswordPage">
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
    </div>
  )
}

export default ForgetPasswordPage
