import { NextFunction, Request, Response } from 'express'
import jwt from 'jsonwebtoken'

import { InternalServerError, UnauthorizedError } from '../helpers/apiError'
import { JWT_SECRET } from '../util/secrets'

export type TokenType = {
  user: {
    id: string;
  };
}

export type PayloadType = {
  id: string;
}

export default async (req: Request, res: Response, next: NextFunction) => {
  //Retrieve token:
  const token = req.header('x-auth-token')

  try {
    //No token = bye bye
    if (!token) throw 'NoToken'

    const decodedPayload = jwt.verify(token, JWT_SECRET) as TokenType
    req.user = decodedPayload.user // req.user now has user id
    next()
  } catch (err) {
    if (err === 'NoToken') next(new UnauthorizedError('No token found', err))
    if (err.name === 'JsonWebTokenError')
      next(new UnauthorizedError('Invalid token', err))
    next(new InternalServerError(err))
  }
}
