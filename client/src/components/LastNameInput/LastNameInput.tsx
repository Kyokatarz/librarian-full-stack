import React, { useEffect } from 'react'
import { FormGroup, Form } from 'react-bootstrap'

type LastNameInput = {
  inputLN: string
  setInputLN: any
}

const LastNameInput: React.FC<LastNameInput> = ({ inputLN, setInputLN }) => {
  useEffect(() => {
    console.log('Lastname rendered')
  })
  return (
    <FormGroup>
      <Form.Label>First Name</Form.Label>
      <Form.Control
        type="text"
        placeholder="Your First Name..."
        value={inputLN}
        onChange={(event) => setInputLN(event.target.value)}
      ></Form.Control>
    </FormGroup>
  )
}

export default React.memo(LastNameInput)
