import { ValidationError } from 'express-validator'

export type ErrorObject = {
  value?: string
  msg: string
  param: string
  location?: string
}

export default (error: ValidationError[]): string => {
  const messages = error.map((obj: any) => obj.msg)
  const stringifiedMessage = messages.join(', ')
  return stringifiedMessage
}
