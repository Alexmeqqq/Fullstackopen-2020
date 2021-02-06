const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const Blog = require('../models/index')
const api = supertest(app)
const helper = require('./test_helper')


test('blogs are returned as json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

test('id is defined correctly', async () => {
    const response = await api.get('/api/blogs')
    expect(response.body[0].id).toBeDefined()
    
})

test('creating a new blog', async () => {
  const newBlog = {
    "title":"fullmetal",
    "author":"japan",
    "url":"http://alchemist.com",
    "likes":"6"
  }

  await api.post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const response = await api.get('/api/blogs')
  const contents = response.body.map(x => x.title)
  expect(contents).toContain('fullmetal')  
})


afterAll(() => {
  mongoose.connection.close()
})