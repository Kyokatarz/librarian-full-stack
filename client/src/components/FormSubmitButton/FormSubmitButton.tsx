import React from 'react'
import { Button } from 'react-bootstrap'

type ButtonProps = {
  text: String
  disabled?: boolean
  onClick?: any
}
const FormSubmitButton: React.FC<ButtonProps> = ({
  text,
  disabled,
  onClick,
}) => {
  return (
    <Button type="Submit" onClick={onClick} disabled={disabled} block>
      {text}
    </Button>
  )
}

export default React.memo(FormSubmitButton)
