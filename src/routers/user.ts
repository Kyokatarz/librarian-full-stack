import express from 'express'
import mongoose from 'mongoose'

import { signUpValidator } from '../middlewares/validators'
import User from '../models/User'

import { createUser } from '../controllers/user'

const router = express.Router()

router.post('/signUp', signUpValidator, createUser)

router.post('/signIn')
export default router
