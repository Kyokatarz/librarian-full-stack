import React, { ChangeEvent, useState } from 'react'
import { Form } from 'react-bootstrap'
import FormInputGroup from '../FormInputGroup'

const ForgetPasswordForm = () => {
  const [email, setEmail] = useState('')

  return (
    <Form>
      <FormInputGroup
        label="Email"
        value="email"
        onChangeHandler={(event: ChangeEvent<any>) =>
          setEmail(event.target.value)
        }
        type="text"
        placeholder="Enter your account email"
      />
    </Form>
  )
}

export default ForgetPasswordForm
