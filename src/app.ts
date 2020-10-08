import bluebird from 'bluebird'
import bodyParser from 'body-parser'
import compression from 'compression'
import express from 'express'
import lusca from 'lusca'
import mongoose from 'mongoose'

import apiErrorHandler from './middlewares/apiErrorHandler'
import authorRouter from './routers/author'
import bookRouter from './routers/book'
import userRouter from './routers/user'
import authRouter from './routers/auth'
import { MONGODB_URI } from './util/secrets'
import passport from 'passport'
import strategy from './config/passport'

const app = express()
const mongoUrl = MONGODB_URI

mongoose.Promise = bluebird
async function connectDb() {
  try {
    await mongoose.connect(mongoUrl, {
      useNewUrlParser: true,
      useCreateIndex: true,
      useUnifiedTopology: true,
      useFindAndModify: true,
    })
  } catch (err) {
    console.log(
      'MongoDB connection error. Please make sure MongoDB is running. ' + err
    )
    process.exit(1)
  }
}

connectDb()

// Express configuration
app.set('port', process.env.PORT || 3000)

// Use common 3rd-party middlewares
app.use(compression())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(lusca.xframe('SAMEORIGIN'))
app.use(lusca.xssProtection(true))
app.use(passport.initialize())
passport.use(strategy)
// Use routers
app.use('/api/v1/user', userRouter)
app.use('/api/v1/book', bookRouter)
app.use('/api/v1/author', authorRouter)
app.use('/api/v1/auth', authRouter)
// Custom API error handler
app.use(apiErrorHandler)

export default app
