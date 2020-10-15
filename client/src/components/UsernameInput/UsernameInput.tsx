import React from 'react'
import { Form } from 'react-bootstrap'

type UsernameInputProps = {
  username: string
  setUsername: any
}

const UsernameInput: React.FC<UsernameInputProps> = ({
  username,
  setUsername,
}) => {
  return (
    <Form.Group>
      <Form.Label>Username*</Form.Label>
      <Form.Control
        type="text"
        placeholder="Username"
        required
        onChange={(event) => setUsername(event.target.value)}
        value={username}
      ></Form.Control>
    </Form.Group>
  )
}

export default React.memo(UsernameInput)
