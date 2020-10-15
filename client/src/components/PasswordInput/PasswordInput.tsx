import React from 'react'
import { Form } from 'react-bootstrap'

type PasswordInputProps = {
  password: string
  onChangeHandler: any
}

const PasswordInput: React.FC<PasswordInputProps> = ({
  password,
  onChangeHandler,
}) => {
  return (
    <Form.Group>
      <Form.Label>Password*</Form.Label>
      <Form.Control
        type="password"
        placeholder="Password"
        required
        onChange={onChangeHandler}
        value={password}
      ></Form.Control>
    </Form.Group>
  )
}

export default PasswordInput
