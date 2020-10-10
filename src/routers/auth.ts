import express, { NextFunction, Request, Response } from 'express'
import passport from 'passport'
import jwt from 'jsonwebtoken'
import { UserDocument } from '../models/User';
import { TokenType } from '../middlewares/auth';
import { BadRequestError, UnauthorizedError } from '../helpers/apiError';

const router = express.Router()

type jwtToken = {
  token: string
}

router.post('/google',
  passport.authenticate('google-id-token', {session: false}),
  function (req, res, next) {
    // do something with req.user
    
    if(!req.user){
      next(new UnauthorizedError('Unauthorized'))
    }
    
    res.status(200).send({token: (req.user as jwtToken).token})
    
  }
);

export default router
