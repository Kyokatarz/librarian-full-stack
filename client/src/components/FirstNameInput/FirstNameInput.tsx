import React, { useEffect } from 'react'
import { FormGroup, Form } from 'react-bootstrap'

type FirstNameInput = {
  inputFN: string
  setInputFN: any
}

const FirstNameInput: React.FC<FirstNameInput> = ({ inputFN, setInputFN }) => {
  useEffect(() => {
    console.log('FirstName rendered')
  })
  return (
    <FormGroup>
      <Form.Label>First Name</Form.Label>
      <Form.Control
        type="text"
        placeholder="Your First Name..."
        value={inputFN}
        onChange={(event) => setInputFN(event.target.value)}
      ></Form.Control>
    </FormGroup>
  )
}

export default React.memo(FirstNameInput)
