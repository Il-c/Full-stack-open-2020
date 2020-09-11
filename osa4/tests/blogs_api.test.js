const Blog = require('../models/blog')
const testHelper = require('../utils/blog_test_helper')
const mongoose = require('mongoose')
const app = require('../app')
const supertest = require('supertest')
const jwt = require('jsonwebtoken')

const api = supertest(app)

const getUserToken = async () => {
  const users = await testHelper.usersInDb()
  const userForToken = {
    username: users[0].username,
    id: users[0].id
  }
  return jwt.sign(userForToken, process.env.SECRET)
}

beforeEach(async () => {
  await Blog.deleteMany({})
  await Blog.insertMany(testHelper.initialBlogs)
})

test('All notes are returned', async () => {
  const allBlogs = await api.get('/api/blogs')
  expect(allBlogs.body).toHaveLength(testHelper.initialBlogs.length)
})

test('correct id field name', async () => {
  const allBlogs = await api.get('/api/blogs')
  const blog = allBlogs.body[0]
  expect(blog.id).toBeDefined()
})
describe('Test adding', () => {
  test('1 blog to database', async () => {

    const token = await getUserToken()
    const testBlog = {
      title: 'Test',
      author: 'Tester',
      url: 'Testurl',
      likes: 333,
      user:'ert'
    }
    await api
      .post('/api/blogs')
      .set('Authorization', 'bearer ' + token)
      .send(testBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)
    const newBlogslist = await testHelper.blogsInDb()
    expect(newBlogslist).toHaveLength(testHelper.initialBlogs.length+1)
    const titles = newBlogslist.map(blog => blog.title)
    expect(titles).toContain('Test')
  })
  test('1 blog to database without token', async () => {

    const testBlog = {
      title: 'Test',
      author: 'Tester',
      url: 'Testurl',
      likes: 333,
      user:'ert'
    }
    await api
      .post('/api/blogs')
      .send(testBlog)
      .expect(401)
      .expect('Content-Type', /application\/json/)
    const newBlogslist = await testHelper.blogsInDb()
    expect(newBlogslist).toHaveLength(testHelper.initialBlogs.length)
    const titles = newBlogslist.map(blog => blog.title)
    expect(titles).not.toContain('Test')
  })
  test('blog without likes field', async () => {
    const token = await getUserToken()
    const testBlog = {
      title: 'withoutlikes',
      author: 'without likes',
      url: 'withoutlikes',
    }
    await api
      .post('/api/blogs')
      .send(testBlog)
      .set('Authorization', 'bearer ' + token)
    const newBlogslist = await testHelper.blogsInDb()
    const addedBlog = newBlogslist.find(blog => blog.title === 'withoutlikes')
    expect(addedBlog.likes).toBe(0)
  })
  test('blog with missing title and url', async () => {
    const token = await getUserToken()
    const testBlog = {
      author: 'Tester',
    }
    await api
      .post('/api/blogs')
      .send(testBlog)
      .set('Authorization', 'bearer ' + token)
      .expect(400)
  })
})
describe('Test deleting', () => {
  test('blog from database', async () => {
    const token = await getUserToken()

    const testBlog = {
      title: 'delete',
      author: 'delete',
      url: 'delete',
    }
    await api
      .post('/api/blogs')
      .send(testBlog)
      .set('Authorization', 'bearer ' + token)

    const allBlogs = await api.get('/api/blogs')
    const idToRemove = allBlogs.body.find(blog => blog.title==='delete').id
    await api
      .delete(`/api/blogs/${idToRemove}`)
      .set('Authorization', 'bearer ' + token)
      .expect(204)
    const newBlogslist = await testHelper.blogsInDb()
    expect(newBlogslist).toHaveLength(testHelper.initialBlogs.length)
    const titles = newBlogslist.map(blog => blog.title)
    expect(titles).not.toContain('Test')

  })
})
describe('Test updating', () => {
  test('blog in database', async () => {
    const allBlogs = await api.get('/api/blogs')
    const blogToUpdate = allBlogs.body.find(blog => blog.title==='First class tests')
    blogToUpdate.likes = 15
    const idToUpdate = blogToUpdate.id
    await api
      .put(`/api/blogs/${idToUpdate}`)
      .send(blogToUpdate)
      .expect(200)
    const newBlogslist = await testHelper.blogsInDb()
    expect(newBlogslist).toHaveLength(testHelper.initialBlogs.length)
    const likes = newBlogslist.map(blog => blog.likes)
    expect(likes).toContain(15)

  })
})


afterAll(() => {
  mongoose.connection.close()
})