import { create } from 'lodash'
import request from 'supertest'
import jwt from 'jsonwebtoken'

import * as dbHelper from '../db-helper'
import { JWT_SECRET } from '../../src/util/secrets'
import app from '../../src/app'
import { UserDocument } from '../../src/models/User'
import { TokenType } from '../../src/middlewares/auth'

const randomUserId = 'swagSavage4-20Six09'

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

  it('should create a user', async () => {
    const res = await createUser()
    expect(res.status).toBe(200)
    expect(res.body).toHaveProperty('token')
  })

  it('should not create a user with wrong info', async () => {
    const res = await request(app)
      .post('/api/v1/user/signUp')
      .send({ firstName: 'Donald', lastName: 'Jump' })
    expect(res.status).toBe(400)
  })

  it('should sign the user in and return JWT token', async () => {
    const res = await createUser()
    expect(res.status).toBe(200)

    const res1 = await request(app)
      .post('/api/v1/user/signIn')
      .send({ username: 'DonaldJump', password: 'WeShallBuildAWall' })
    expect(res1.status).toBe(200)
    expect(res1.body).toHaveProperty('token')
  })

  it('should not sign a non-existing user', async () => {
    const res1 = await request(app)
      .post('/api/v1/user/signIn')
      .send({ username: 'Hillary', password: 'testtest' })
    expect(res1.status).toBe(400)
  })

  it('should update user info', async () => {
    const res = await createUser()
    expect(res.status).toBe(200)

    const token = res.body.token
    const decodedPayload = jwt.verify(token, JWT_SECRET) as TokenType

    const res1 = await request(app)
      .patch(`/api/v1/user/${decodedPayload.user.id}`)
      .send({ lastName: 'Duck' })
    console.log(res1.body)
    expect(res1.status).toBe(200)
    expect(res1.body.firstName).toBe('Donald')
    expect(res1.body.lastName).toBe('Duck')
  })

  it('should not update user with wrong user id', async () => {
    const res = await request(app)
      .patch(`/api/v1/user/${randomUserId}`)
      .send({ lastName: 'Duck' })
    expect(res.status).toBe(404)
  })

  it('should send a recovery email', async () => {
    const res = await request(app)
      .post('/api/v1/user/password')
      .send({ email: 'americaGreatAgain@email.com' })
    expect(res.status).toBe(200)
  })
})
