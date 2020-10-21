import React from 'react'
import { Form } from 'react-bootstrap'

type FormInputGroupProps = {
  label: string
  value: string
  onChangeHandler: any
  type: string
  placeholder: string
  readOnly?: boolean
  required?: boolean
}

const FormInputGroup: React.FC<FormInputGroupProps> = ({
  label,
  value,
  onChangeHandler,
  type,
  placeholder,
  readOnly,
  required,
}) => {
  return (
    <Form.Group>
      <Form.Label>{label}</Form.Label>
      <Form.Control
        type={type}
        value={value}
        onChange={onChangeHandler}
        placeholder={placeholder}
        readOnly={readOnly}
        required={required}
      ></Form.Control>
    </Form.Group>
  )
}

export default FormInputGroup
