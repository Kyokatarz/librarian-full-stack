import React from 'react'
import { Button } from 'react-bootstrap'

type Variant = 'primary' | 'secondary' | 'danger'

type ButtonProps = {
  onClick?: (p: any) => void
  label: string
  variant?: Variant
  block?: boolean
  disabled?: boolean
  type?: string
  customClassName?: string
}

const CustomButton = ({
  onClick,
  label,
  variant = 'primary',
  block = false,
  disabled = false,
  type = '',
  customClassName,
}: ButtonProps) => {
  return (
    <Button
      onClick={onClick}
      variant={variant}
      block={block}
      disabled={disabled}
      type={type}
      className={customClassName}
    >
      {label}
    </Button>
  )
}

export default CustomButton
