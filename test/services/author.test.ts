import request from 'supertest'

import app from '../../src/app'
import { AuthorDocument } from '../../src/models/Author'
import { UserDocument } from '../../src/models/User'
import * as dbHelper from '../db-helper'

const randomId = '!@#!$#adsdwasdacxzs'
const mockMongoId = '5f74ab9ea37c5c08d828d83d'

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

  return await request(app).post('/api/v1/user/signUp').send(newUser)
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

describe('author services', () => {
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

  it('should not let admin create a new author with same name', async () => {
    const adminRes = await createUser()
    expect(adminRes.status).toBe(200)
    const token = adminRes.body.token

    const authorRes = await createAuthor(undefined, token)
    const authorRes1 = await createAuthor(undefined, token)
    expect(authorRes1.status).toBe(400)
  })

  it('should not let non-admin create a new author', async () => {
    const adminRes = await createUser({ isAdmin: false })
    expect(adminRes.status).toBe(200)
    const token = adminRes.body.token

    const authorRes = await createAuthor(undefined, token)
    expect(authorRes.status).toBe(401)
  })

  it('should not create author with wrong info', async () => {
    const adminRes = await createUser()
    expect(adminRes.status).toBe(200)
    const token = adminRes.body.token

    const authorRes = await createAuthor({ name: '' }, token)
    expect(authorRes.status).toBe(400)
  })

  it('should not update or delete author with wrong ID', async () => {
    const adminRes = await createUser()
    expect(adminRes.status).toBe(200)
    const token = adminRes.body.token

    const authorRes = await createAuthor(undefined, token)
    expect(authorRes.status).toBe(200)

    //Delete a total random Id
    const res = await request(app)
      .delete(`/api/v1/author/${randomId}`)
      .set({ 'x-auth-token': token, Accept: 'application/json' })
    expect(res.status).toBe(404)

    //Delete a mock up Id
    const res0 = await request(app)
      .delete(`/api/v1/author/${mockMongoId}`)
      .set({ 'x-auth-token': token, Accept: 'application/json' })
    expect(res0.status).toBe(404)

    //Delete the real one first time
    const res1 = await request(app)
      .delete(`/api/v1/author/${authorRes.body._id}`)
      .set({ 'x-auth-token': token, Accept: 'application/json' })

    expect(res1.status).toBe(200)

    //Delete second time should fail
    const res2 = await request(app)
      .delete(`/api/v1/author/${authorRes.body.id}`)
      .set({ 'x-auth-token': token, Accept: 'application/json' })
    expect(res2.status).toBe(404)
  })
})
