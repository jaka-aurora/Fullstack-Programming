const express = require('express')
const app = express()
app.use(express.json())
const port = 3000

const mongoose = require('mongoose')

const mongoDB = 'mongodb+srv://aa6111:value@test.value.mongodb.net/test'

mongoose.connect(mongoDB, {useNewUrlParser: true, useUnifiedTopology: true})
const db = mongoose.connection

db.on('error', console.error.bind(console, 'connection error:'))
db.once('open', function() {
  console.log("Database test connected")
})

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  age: { type: Number, min: 0 },
  email: String
})

const User = mongoose.model('User', userSchema, 'users')

app.listen(port, () => {
  console.log('Listening on port 3000')
})

app.get('/users', async (request, response) => {
  const user = await User.find ({})
  response.json(user)
})

app.get('/users/:id', async (request, response) => {
  const user = await User.findById(request.params.id)
  if (user) response.json(user)
  else response.status(404).end()
})

app.delete('/users/:id', async (request, response) => {
  const deleteUser = await User.findOneAndDelete({ _id: request.params.id })
    if (deleteUser)
        response.json(deleteUser)
    else response.status(404).end()
})

app.put('/users/:id', (request, response) => {
  const { id } = request.params
  const { name } = request.query
  const user = users.find(user => user.id === id)
  if (user) {
    user.name = name
    response.status(200).json(user)
  } else {
    response.status(204).end()
  }
})

app.post('/users/', async (request, response) => {
  const { name } = request.body
  const user = new User ({
    name: name
  })
  const savedUser = await user.save()
  response.json(savedUser)
})
