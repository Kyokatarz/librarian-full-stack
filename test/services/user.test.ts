import request from 'supertest'
import jwt from 'jsonwebtoken'

import app from '../../src/app'
import { TokenType } from '../../src/middlewares/auth'
import { UserDocument } from '../../src/models/User'
import * as service from '../../src/services/user'
import { JWT_SECRET } from '../../src/util/secrets'
import * as dbHelper from '../db-helper'
import { create } from 'lodash'

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

/*==========+
 |TEST SUITE|
 +==========*/
describe('user services', () => {
  beforeEach(async () => {
    await dbHelper.connect()
  })

  afterEach(async () => {
    await dbHelper.clearDatabase()
  })

  afterAll(async () => {
    await dbHelper.closeDatabase()
  })

  it('should create a user and return JWT', async () => {
    const user = await service.create(userObj)
    expect(user).toHaveProperty('username', userObj.username)
    expect(user).toHaveProperty('email', userObj.email)
    expect(user).not.toHaveProperty('password', userObj.password)
  })

  it('should not create a user with duplicated info', async () => {
    try {
      await service.create(userObj)
      await service.create(userObj)
    } catch (err) {
      expect(err).toBe('IdentificationDuplicated')
    }
  })

  it('should update user info', async () => {
    const user = await service.create(userObj)

    const updatedUser = await service.updateUser(user.id, {
      lastName: 'LastName',
      firstName: 'FirstName',
    })

    expect(updatedUser).toHaveProperty('lastName', 'LastName')
    expect(updatedUser).toHaveProperty('firstName', 'FirstName')
  })

  it('should update user password', async () => {
    const user = await service.create(userObj)

    const updatedUser = await service.updatePassword(user.id, {
      oldPassword: 'WeShallBuildAWall',
      newPassword: 'NewPassword',
    })

    expect(updatedUser.password).not.toBe('WeShallBuildAWall')
  })

  it('should not update user password with wrong password', async () => {
    try {
      const user = await service.create(userObj)
      await service.updatePassword(user.id, {
        oldPassword: 'WRONGPASSWORD',
        newPassword: 'NewPassword',
      })
    } catch (err) {
      expect(err).toBe('ChangingPasswordError')
    }
  })
})
