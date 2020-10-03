import request from 'supertest'

import app from '../../src/app'
import { AuthorDocument } from '../../src/models/Author'
import { UserDocument } from '../../src/models/User'
import * as dbHelper from '../db-helper'

async function createUser(override?: Partial<UserDocument>) {
  let newUser: Partial<UserDocument> = {
    username: 'DonaldJump',
    password: 'WeShallBuildAWall',
    email: 'americaGreatAgain@email.com',
    firstName: 'Donald',
    lastName: 'Jump',
    isAdmin: true,
  }

  if (override) {
    newUser = { ...newUser, ...override }
  }

  return request(app).post('/api/v1/user/signUp').send(newUser)
}

async function createAuthor(
  override?: Partial<AuthorDocument>,
  userToken?: string
) {
  let newAuthor = {
    name: 'Dan White',
  }

  if (override) newAuthor = { ...newAuthor, ...override }
  if (userToken)
    return await request(app)
      .post('/api/v1/author')
      .set({ 'x-auth-token': userToken, Accept: 'application/json' })
      .send(newAuthor)
  return await request(app).post('/api/v1/author').send(newAuthor)
}

describe('author controller', () => {
  beforeEach(async () => {
    await dbHelper.connect()
  })

  afterEach(async () => {
    await dbHelper.clearDatabase()
  })

  afterAll(async () => {
    await dbHelper.closeDatabase()
  })

  it('should let admin create a new author', async () => {
    const adminRes = await createUser()
    expect(adminRes.status).toBe(200)
    const token = adminRes.body.token

    const authorRes = await createAuthor(undefined, token)
    expect(authorRes.status).toBe(200)
    expect(authorRes.body).toHaveProperty('name')
  })

  it('should let admin update an author', async () => {
    const adminRes = await createUser()
    expect(adminRes.status).toBe(200)
    const token = adminRes.body.token

    const authorRes = await createAuthor(undefined, token)
    expect(authorRes.status).toBe(200)
    expect(authorRes.body).toHaveProperty('name')

    const res = await request(app)
      .put(`/api/v1/author/${authorRes.body._id}`)
      .set({ 'x-auth-token': token, Accept: 'application/json' })
      .send({ name: 'New Author' })

    expect(res.status).toBe(200)
    expect(res.body.name).toBe('New Author')
  })

  it('should let admin delete an author', async () => {
    const adminRes = await createUser()
    expect(adminRes.status).toBe(200)
    const token = adminRes.body.token

    const authorRes = await createAuthor(undefined, token)
    expect(authorRes.status).toBe(200)
    expect(authorRes.body).toHaveProperty('name')

    const res = await request(app)
      .delete(`/api/v1/author/${authorRes.body._id}`)
      .set({ 'x-auth-token': token, Accept: 'application/json' })
      .send()
    expect(res.status).toBe(200)
    expect(res.body._id).toBe(authorRes.body._id)
  })
})
