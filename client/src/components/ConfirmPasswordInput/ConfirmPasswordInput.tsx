import React from 'react'
import { Form } from 'react-bootstrap'

type ConfirmPasswordInputProps = {
  confirmPassword: string
  setConfirmPassword: any
  passwordMatch?: boolean
  setPasswordMatch?: any
}

const ConfirmPasswordInput: React.FC<ConfirmPasswordInputProps> = ({
  confirmPassword,
  setConfirmPassword,
  passwordMatch,
  setPasswordMatch,
}) => {
  return (
    <Form.Group>
      <Form.Label>Confirm Password*</Form.Label>
      <Form.Control
        type="password"
        placeholder="Confirm Password"
        required
        onChange={(event) => {
          if (!passwordMatch) setPasswordMatch(true)
          setConfirmPassword(event.target.value)
        }}
        value={confirmPassword}
      ></Form.Control>
    </Form.Group>
  )
}

export default ConfirmPasswordInput
