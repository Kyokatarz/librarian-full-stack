import React, { useEffect } from 'react'
import { FormGroup, Form } from 'react-bootstrap'

type EmailInput = {
  inputEmail: string
  setInputEmail: any
}

const EmailInput: React.FC<EmailInput> = ({ inputEmail, setInputEmail }) => {
  useEffect(() => {
    console.log('Email rendered')
  })
  return (
    <FormGroup>
      <Form.Label>Email</Form.Label>
      <Form.Control
        type="email"
        placeholder="Your Email Address..."
        value={inputEmail}
        onChange={(event) => setInputEmail(event.target.value)}
      ></Form.Control>
    </FormGroup>
  )
}

export default React.memo(EmailInput)
