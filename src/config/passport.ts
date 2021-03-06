/* eslint-disable @typescript-eslint/camelcase */
//@ts-ignore
import GoogleTokenStrategy from 'passport-google-id-token'
import bcrypt from 'bcrypt'
import crypto from 'crypto'
import jwt from 'jsonwebtoken'
import passportFacebook from 'passport-facebook'
import passportLocal from 'passport-local'
import { InternalServerError } from '../helpers/apiError'
import User from '../models/User'
import { JWT_SECRET } from '../util/secrets'

const LocalStrategy = passportLocal.Strategy
const FacebookStrategy = passportFacebook.Strategy

const GOOGLE_CLIENT_ID =
  '966391822521-16klvao4ikgokq93vhvs0h6i58encvgk.apps.googleusercontent.com'

export default new GoogleTokenStrategy(
  {
    clientID: GOOGLE_CLIENT_ID,
  },

  async function (parsedToken: any, googleId: string, done: any) {
    const { payload } = parsedToken
    const { email, picture, family_name, given_name } = payload
    console.log(given_name)
    try {
      console.log(payload)
      const user = await User.findOne({ email })
      if (user) {
        const jwtPayload = {
          user: {
            id: user.id,
          },
        }
        const token = jwt.sign(jwtPayload, JWT_SECRET) // If user exists, send user
        return done(undefined, { token })
      }

      const isAdmin = email === 'giang.tran@integrify.io'
      const salt = await bcrypt.genSalt()
      const randomString = crypto.randomBytes(16).toString('hex')
      const hashedPassword = await bcrypt.hash(randomString, salt)

      const newUser = new User({
        imageUrl: picture,
        username: email,
        password: hashedPassword,
        email,
        firstName: given_name,
        lastName: family_name,
        isAdmin,
        isGoogleUser: true,
      })
      await newUser.save()
      const jwtPayload = {
        user: {
          id: newUser.id,
        },
      }
      const token = jwt.sign(jwtPayload, JWT_SECRET) //TODO: add expiry time
      done(undefined, { token })
    } catch (err) {
      done(new InternalServerError(err))
    }
  }
)
//)
