import { Mongoose, Schema } from 'mongoose'
import request from 'supertest'

import app from '../../src/app'
import auth from '../../src/middlewares/auth'
import { AuthorDocument } from '../../src/models/Author'
import { BookDocument } from '../../src/models/Book'
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

describe('book service', () => {
  beforeEach(async () => {
    await dbHelper.connect()
  })

  afterEach(async () => {
    await dbHelper.clearDatabase()
  })

  afterAll(async () => {
    await dbHelper.closeDatabase()
  })
  it('should not check out a borrowed book', async () => {
    const admin = await createUser()
    expect(admin.status).toBe(200)
    const token = admin.body.token

    const book = await createBook({ status: 'borrowed' }, token)
    expect(book.status).toBe(200)
    const res = await request(app)
      .patch(`/api/v1/book/${book.body._id}/checkout`)
      .set({ 'x-auth-token': token, Accept: 'application/json' })
      .send()

    expect(res.status).toBe(209)
    expect(res.body.msg).toBe('Book already borrowed!')
  })

  it('should not let admin create a book with wrong info', async () => {
    const admin = await createUser()
    expect(admin.status).toBe(200)
    const token = admin.body.token

    const book = await createBook({ title: '' }, token)

    expect(book.status).toBe(400)
  })

  it('should not let non-admin update or delete or add a book', async () => {
    const user = await createUser({ isAdmin: false })
    expect(user.status).toBe(200)
    const token = user.body.token

    const admin = await createUser({
      username: 'Admin',
      email: 'admin@email.com',
    })
    expect(admin.status).toBe(200)
    const adminToken = admin.body.token

    // add a book as non admin
    const book = await createBook(undefined, token)
    expect(book.status).toBe(401)

    const realBook = await createBook(undefined, adminToken)
    expect(realBook.status).toBe(200)

    //Delete a realbook with non-admin:
    const res = await request(app)
      .delete(`/api/v1/book/${realBook.body._id}/`)
      .set({ 'x-auth-token': token, Accept: 'application/json' })
      .send()
    expect(res.status).toBe(401)

    //Update with non-admin
    const res1 = await request(app)
      .put(`/api/v1/book/${realBook.body._id}/`)
      .set({ 'x-auth-token': token, Accept: 'application/json' })
      .send({ title: 'new title' })
    expect(res1.status).toBe(401)
  })

  it('should not delete book with wrong id', async () => {
    const admin = await createUser()
    expect(admin.status).toBe(200)
    const token = admin.body.token

    const book = await createBook(undefined, token)
    expect(book.status).toBe(200)

    //Delete a random Id
    const res = await request(app)
      .delete(`/api/v1/book/${randomId}/`)
      .set({ 'x-auth-token': token, Accept: 'application/json' })
      .send()
    expect(res.status).toBe(404)

    //Delete a mongoDb mock Id
    const res1 = await request(app)
      .delete(`/api/v1/book/${mockMongoId}/`)
      .set({ 'x-auth-token': token, Accept: 'application/json' })
      .send()
    expect(res1.status).toBe(404)
  })

  it('should not update a book if wrong ID', async () => {
    const admin = await createUser()
    expect(admin.status).toBe(200)
    const token = admin.body.token

    const book = await createBook(undefined, token)
    expect(book.status).toBe(200)

    const res = await request(app)
      .put(`/api/v1/book/${mockMongoId}/`)
      .set({ 'x-auth-token': token, Accept: 'application/json' })
      .send({ title: 'new title' })
    expect(res.status).toBe(404)
    expect(res.body.title).not.toBe('new title')
  })
  it('can add extra property to book object', async () => {
    const admin = await createUser()
    expect(admin.status).toBe(200)
    const token = admin.body.token

    const author = await createAuthor(undefined, token)
    expect(author.status).toBe(200)

    const book = await createBook(
      {
        author: {
          id: author.body._id,
        },
        isbn: 'asdfasdf',
        title: 'new title',
        description: 'No description',
        publisher: 'new publisher',
        status: 'available',
      },
      token
    )
    expect(book.status).toBe(200)
  })
})
