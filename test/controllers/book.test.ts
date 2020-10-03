import jwt from 'jsonwebtoken'
import request from 'supertest'

import app from '../../src/app'
import { TokenType } from '../../src/middlewares/auth'
import { BookDocument } from '../../src/models/Book'
import { UserDocument } from '../../src/models/User'
import { JWT_SECRET } from '../../src/util/secrets'
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

async function createBook(
  override?: Partial<BookDocument>,
  userToken?: string
) {
  let newBook: Partial<BookDocument> = {
    isbn: '123-124124-12-42',
    title: 'Game Megazine',
    description: 'All kind of cheats!',
    publisher: 'GamerNewspaper',
    status: 'available',
  }

  if (override) {
    newBook = { ...newBook, ...override }
  }

  if (!userToken) {
    return await request(app).post('/api/v1/book/').send(newBook)
  }

  return await request(app)
    .post('/api/v1/book/')
    .set({ 'x-auth-token': userToken, Accept: 'application/json' })
    .send(newBook)
}

describe('book controller', () => {
  beforeEach(async () => {
    await dbHelper.connect()
  })

  afterEach(async () => {
    await dbHelper.clearDatabase()
  })

  afterAll(async () => {
    await dbHelper.closeDatabase()
  })

  it('should create a book', async () => {
    const res = await createUser()
    expect(res.status).toBe(200)
    const res1 = await createBook(undefined, res.body.token)
    expect(res1.status).toBe(200)
    expect(res1.body).toHaveProperty('isbn')
  })

  it('should get all book', async () => {
    const adminRes = await createUser()
    expect(adminRes.status).toBe(200)

    const res1 = await createBook(undefined, adminRes.body.token)
    const res2 = await createBook(undefined, adminRes.body.token)
    const res3 = await createBook(undefined, adminRes.body.token)

    const allBooks = await request(app).get('/api/v1/book/')
    expect(allBooks.status).toBe(200)
    expect([res1.body, res2.body, res3.body]).toEqual(
      expect.arrayContaining(allBooks.body)
    )
  })

  it('should get a book by its isbn', async () => {
    const userRes = await createUser()
    expect(userRes.status).toBe(200)
    const bookRes = await createBook(undefined, userRes.body.token)
    expect(bookRes.status).toBe(200)
    console.log(bookRes.body.isbn)

    const isbnBookRes = await request(app).get(
      `/api/v1/book/${bookRes.body.isbn}`
    )
    console.log(bookRes.body)
    console.log(isbnBookRes.body)
    expect(isbnBookRes.status).toBe(200)
    expect(isbnBookRes.body[0].isbn).toBe(bookRes.body.isbn)
  })

  it('should check out a book by its ID', async () => {
    const userRes = await createUser()
    expect(userRes.status).toBe(200)
    const newBookRes = await createBook(
      { status: 'available' },
      userRes.body.token
    )
    expect(newBookRes.status).toBe(200)

    const checkedoutBookRes = await request(app)
      .patch(`/api/v1/book/${newBookRes.body._id}/checkout`)
      .set({ 'x-auth-token': userRes.body.token, Accept: 'application/json' })
      .send()

    expect(checkedoutBookRes.status).toBe(200)
    expect(checkedoutBookRes.body.borrowedBooks[0]['_id']).toBe(
      newBookRes.body._id
    )
  })

  it('should check in a book by its ID', async () => {
    const userRes = await createUser()
    expect(userRes.status).toBe(200)
    const token = userRes.body.token
    const newBookRes = await createBook({ status: 'available' }, token)
    expect(newBookRes.status).toBe(200)

    const userCheckedoutRes = await request(app)
      .patch(`/api/v1/book/${newBookRes.body._id}/checkout`)
      .set({ 'x-auth-token': token, Accept: 'application/json' })
      .send()

    expect(userCheckedoutRes.status).toBe(200)
    expect(userCheckedoutRes.body.borrowedBooks[0]['_id']).toBe(
      newBookRes.body._id
    )

    const userCheckedinRes = await request(app)
      .patch(`/api/v1/book/${newBookRes.body._id}/checkin`)
      .set({ 'x-auth-token': token, Accept: 'application/json' })
      .send()

    expect(userCheckedinRes.status).toBe(200)
    expect(userCheckedinRes.body.borrowedBooks.length).toBeLessThan(
      userCheckedoutRes.body.borrowedBooks.length
    )
  })

  it('should let admin update book info', async () => {
    const adminRes = await createUser()
    expect(adminRes.status).toBe(200)
    const token = adminRes.body.token
    const newBookRes = await createBook(
      { status: 'borrowed' },
      adminRes.body.token
    )
    expect(newBookRes.status).toBe(200)

    const res = await request(app)
      .put(`/api/v1/book/${newBookRes.body._id}/`)
      .set({ 'x-auth-token': token, Accept: 'application/json' })
      .send({ title: 'New Title' })
    expect(res.status).toBe(200)
    expect(res.body.title).toBe('New Title')
  })

  it('should let admin delete a book by its ID', async () => {
    const adminRes = await createUser()
    expect(adminRes.status).toBe(200)
    const token = adminRes.body.token

    const newBookRes = await createBook(undefined, token)
    expect(newBookRes.status).toBe(200)

    const res = await request(app)
      .delete(`/api/v1/book/${newBookRes.body._id}/`)
      .set({ 'x-auth-token': token, Accept: 'application/json' })
      .send()
    expect(res.status).toBe(200)

    const res1 = await request(app)
      .patch(`/api/v1/book/${newBookRes.body._id}/checkout`)
      .set({ 'x-auth-token': token, Accept: 'application/json' })
      .send()
    expect(res1.status).toBe(404)
  })
})
