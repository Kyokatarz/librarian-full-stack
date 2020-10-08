import { NextFunction, Request, Response } from 'express'
import passport from 'passport'
import passportFacebook from 'passport-facebook'
import passportLocal from 'passport-local'
import { Strategy as GoogleStrategy } from 'passport-google-oauth20'

import User, { UserDocument } from '../models/User'

const LocalStrategy = passportLocal.Strategy
const FacebookStrategy = passportFacebook.Strategy

const GOOGLE_CLIENT_ID =
  '966391822521-16klvao4ikgokq93vhvs0h6i58encvgk.apps.googleusercontent.com'
const GOOGLE_CLIENT_SECRET = 'nPA3n8V_PX_RyV8ut1NRjqCf'

//passport.use(
const strategy = new GoogleStrategy(
  {
    clientID: GOOGLE_CLIENT_ID,
    clientSecret: GOOGLE_CLIENT_SECRET,
    callbackURL: '/api/v1/auth/google/callback',
  },
  async function (accessToken, refreshToken, profile, cb) {
    cb(undefined, profile)
  }
)

export default strategy
//)
