import { Result, ValidationError } from 'express-validator'

export type ErrorObject = {
  value?: string
  msg: string
  param: string
  location?: string
}

export const stringifyError = (error: ErrorObject[]): string => {
  const messages = error.map((obj: any) => obj.msg)
  const stringifiedMessage = messages.join(', ')
  console.log(stringifiedMessage)
  return stringifiedMessage
}
