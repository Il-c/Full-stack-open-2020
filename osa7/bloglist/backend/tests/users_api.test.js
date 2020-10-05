
const User = require('../models/user')
const bcrypt = require('bcrypt')
const testHelper = require('../utils/blog_test_helper')
const mongoose = require('mongoose')
const app = require('../app')
const supertest = require('supertest')
//const jwt = require('jsonwebtoken')

const api = supertest(app)



beforeEach(async () => {
  await User.deleteMany({})
  const passwordHash = await bcrypt.hash('sekret', 10)
  const user = new User({ username: 'root', passwordHash })
  await user.save()

})

describe('Test adding', () => {

  test('1 user to database', async () => {
    const testUser = {
      username: 'Test',
      password: 'Salasana',
      name:'Tester'
    }
    await api
      .post('/api/users')
      .send(testUser)
      .expect(201)
      .expect('Content-Type', /application\/json/)
    const newUserslist = await testHelper.usersInDb()
    expect(newUserslist).toHaveLength(2)
    const users = newUserslist.map(user => user.name)
    expect(users).toContain('Tester')
  })
  test('user with too short password to database', async () => {
    const testUser = {
      username: 'tooshortpassword',
      password: 'Sa',
      name:'tooshortpassword'
    }
    await api
      .post('/api/users')
      .send(testUser)
      .expect(412)
      .expect('Content-Type', /application\/json/)
    const newUserslist = await testHelper.usersInDb()
    expect(newUserslist).toHaveLength(1)
    const users = newUserslist.map(user => user.name)
    expect(users).not.toContain('Passwordtester')
  })
  test('user with too short username to database', async () => {
    const testUser = {
      username: 'Te',
      password: 'Sadfsd',
      name:'Passwordtester'
    }
    await api
      .post('/api/users')
      .send(testUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)
    const newUserslist = await testHelper.usersInDb()
    expect(newUserslist).toHaveLength(1)
    const users = newUserslist.map(user => user.name)
    expect(users).not.toContain('Te')
  })
  test('user with missing username to database', async () => {
    const testUser = {
      username: '',
      password: 'Sadfsd',
      name:'missingusername'
    }
    await api
      .post('/api/users')
      .send(testUser)
      .expect(206)
      .expect('Content-Type', /application\/json/)
    const newUserslist = await testHelper.usersInDb()
    expect(newUserslist).toHaveLength(1)
    const users = newUserslist.map(user => user.name)
    expect(users).not.toContain('missingusername')
  })
  test('user with missing password to database', async () => {
    const testUser = {
      username: 'missingpassword',
      password: '',
      name:'missingpassword'
    }
    await api
      .post('/api/users')
      .send(testUser)
      .expect(206)
      .expect('Content-Type', /application\/json/)
    const newUserslist = await testHelper.usersInDb()
    expect(newUserslist).toHaveLength(1)
    const users = newUserslist.map(user => user.name)
    expect(users).not.toContain('missingpassword')
  })
  test('user with non-unique username to database', async () => {
    const testUser = {
      username: 'root',
      password: 'Sa',
      name:'Passwordtester'
    }
    await api
      .post('/api/users')
      .send(testUser)
      .expect(412)
      .expect('Content-Type', /application\/json/)
    const newUserslist = await testHelper.usersInDb()
    expect(newUserslist).toHaveLength(1)
    const users = newUserslist.map(user => user.name)
    expect(users).not.toContain('root')
  })
})

afterAll(() => {
  mongoose.connection.close()
})