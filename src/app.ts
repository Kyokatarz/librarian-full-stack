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
import { MONGODB_URI } from './util/secrets'

const app = express()
const mongoUrl = MONGODB_URI

mongoose.Promise = bluebird
mongoose
  .connect(mongoUrl, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: true,
  })
  .then(() => {
    console.log('Connected to database!')
    /** ready to use. The `mongoose.connect()` promise resolves to undefined. */
  })
  .catch((err: Error) => {
    console.log(
      'MongoDB connection error. Please make sure MongoDB is running. ' + err
    )
    process.exit(1)
  })

// Express configuration
app.set('port', process.env.PORT || 3000)

// Use common 3rd-party middlewares
app.use(compression())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(lusca.xframe('SAMEORIGIN'))
app.use(lusca.xssProtection(true))

// Use routers
app.use('/api/v1/user', userRouter)
app.use('/api/v1/book', bookRouter)
app.use('/api/v1/author', authorRouter)

// Custom API error handler
app.use(apiErrorHandler)

export default app
