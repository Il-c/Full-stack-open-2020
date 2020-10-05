require('express-async-errors')
const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const jwt = require('jsonwebtoken')



blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user')
  response.json(blogs)
})

blogsRouter.post('/', async (request, response) => {

  const decodedToken = jwt.verify(request.token, process.env.SECRET)
  if (!request.token || !decodedToken.id){
    return response.status(401).json({ error: 'token missing or ivalid' })
  }
  const blog = new Blog(request.body)
  const user=await User.findById(decodedToken.id )
  blog.user = user._id
  const savedBlog = await blog.save()
  user.blogs = user.blogs.concat(blog._id)
  const res = await user.save()
  console.log(res)
  response.status(201).json(savedBlog)
})

blogsRouter.post('/:id/comments', async (request, response) => {
  const decodedToken = jwt.verify(request.token, process.env.SECRET)
  if (!request.token || !decodedToken.id){
    return response.status(401).json({ error: 'token missing or ivalid' })
  }
  const blog = await Blog.findById(request.params.id)
  blog.comments = blog.comments.concat(request.body.comment)
  const savedBlog = await blog.save()
  response.status(201).json(savedBlog)
})

blogsRouter.delete('/:id', async (request, response) => {
  const decodedToken = jwt.verify(request.token, process.env.SECRET)
  if (!request.token || !decodedToken.id){
    return response.status(401).json({ error: 'token missing or ivalid' })
  }
  const blog = await Blog.findById(request.params.id)
  if (!blog){
    response.status(401).json({ error: 'invalid user' })
  }
  if ( blog.user.toString() === decodedToken.id.toString() ) {
    await Blog.findByIdAndRemove(request.params.id)
    response.status(204).end()
  } else {
    response.status(401).json({ error: 'invalid user' })
  }

})
blogsRouter.put('/:id', async (request, response) => {
  const newBlog = new Blog(request.body)
  const updatedBlog = {
    title: newBlog.title,
    author: newBlog.author,
    url: newBlog.url,
    likes: newBlog.likes
  }
  const result = await Blog.findByIdAndUpdate(request.params.id, updatedBlog,{ new:true })
  response.json(result)
})


module.exports = blogsRouter