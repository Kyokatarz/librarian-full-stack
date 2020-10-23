import { NextFunction, Request, Response } from 'express'
import logger from '../util/logger'

import ApiError from '../helpers/apiError'

export default function (
  error: ApiError,
  req: Request,
  res: Response,
  next: NextFunction
) {
  if (error.source) {
    logger.error(error.source)
  }

  res.status(error.statusCode).json({
    status: 'error',
    statusCode: error.statusCode,
    message: error.message,
  })
}
