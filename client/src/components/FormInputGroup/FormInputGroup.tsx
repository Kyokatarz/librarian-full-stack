import React from 'react'
import { Form } from 'react-bootstrap'

import './FormInputGroup.scss'

type FormInputGroupProps = {
  label: string
  value: string
  onChangeHandler: any
  type: string
  placeholder: string
  readOnly?: boolean
  required?: boolean
  as?: any
}

const FormInputGroup: React.FC<FormInputGroupProps> = ({
  label,
  value,
  onChangeHandler,
  type,
  placeholder,
  readOnly,
  required,
  as,
}) => {
  return (
    <Form.Group className="FormInputGroup">
      <Form.Label className="FormInputGroup__Label">{label}</Form.Label>
      <Form.Control
        className="FormInputGroup__Control"
        as={as}
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
