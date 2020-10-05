require('express-async-errors')
const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/user')

usersRouter.get('/', async (request, response) => {
  const users = await User.find({}).populate('blogs')
  response.json(users.map(u => u.toJSON()))
  //response.json(users)
})

usersRouter.post('/', async (request, response) => {
  const body = request.body
  if (!body.password||!body.username){
    return response.status(206).json({ error: 'Username or Password missing' })
  }
  if (body.password.length < 3){
    return response.status(412).json({ error:'Password too short, required password length > 2' })
  }
  const saltRounds = 10
  const passwordHash = await bcrypt.hash(body.password, saltRounds)

  const user = new User({
    username: body.username,
    name: body.name,
    passwordHash
  })


  const savedUser = await user.save()
  response.status(201).json(savedUser)
})

/*usersRouter.delete('/:id', async (request, response) => {
  await User.findByIdAndRemove(request.params.id)
  response.status(204).end()
})*/

module.exports = usersRouter