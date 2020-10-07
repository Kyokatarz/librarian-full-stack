import jwt from 'jsonwebtoken'
import request from 'supertest'

import app from '../../src/app'
import { TokenType } from '../../src/middlewares/auth'
import { UserDocument } from '../../src/models/User'
import * as service from '../../src/services/user'
import { JWT_SECRET } from '../../src/util/secrets'
import * as dbHelper from '../db-helper'

const randomId = '!@#!$#adsdwasdacxzs'
const mockMongoId = '5f74ab9ea37c5c08d828d83d'

const userObj = {
  username: 'DonaldJump',
  password: 'WeShallBuildAWall',
  email: 'americaGreatAgain@email.com',
  firstName: 'Donald',
  lastName: 'Jump',
  isAdmin: false,
}

async function createUser(override?: Partial<UserDocument>) {
  let newUser: Partial<UserDocument> = {
    username: 'DonaldJump',
    password: 'WeShallBuildAWall',
    email: 'americaGreatAgain@email.com',
    firstName: 'Donald',
    lastName: 'Jump',
    isAdmin: false,
  }

  if (override) {
    newUser = { ...newUser, ...override }
  }

  return await request(app).post('/api/v1/user/signUp').send(newUser)
}

describe('user controller', () => {
  beforeEach(async () => {
    await dbHelper.connect()
  })

  afterEach(async () => {
    await dbHelper.clearDatabase()
  })

  afterAll(async () => {
    await dbHelper.closeDatabase()
  })

  it('should sign up a user', async () => {
    const user = await createUser()
    expect(user.status).toBe(200)
    expect(user.body).toHaveProperty('token')
  })

  it('should sign the user in and return JWT token', async () => {
    const user = await createUser()
    expect(user.status).toBe(200)

    const res = await request(app)
      .post('/api/v1/user/signIn')
      .send({ username: 'DonaldJump', password: 'WeShallBuildAWall' })

    expect(res.status).toBe(200)
    expect(res.body).toHaveProperty('token')
  })

  it('should not sign a non-existing user', async () => {
    const res1 = await request(app)
      .post('/api/v1/user/signIn')
      .send({ username: 'Hillary', password: 'testtest' })
    expect(res1.status).toBe(400)
  })

  it('should send a recovery email', async () => {
    const res = await request(app)
      .post('/api/v1/user/password')
      .send({ email: 'americaGreatAgain@email.com' })
    expect(res.status).toBe(200)
  })
})
