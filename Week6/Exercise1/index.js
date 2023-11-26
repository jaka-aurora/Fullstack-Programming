const express = require('express')
const app = express()
app.use(express.json())
const port = 3000

app.listen(port, () => {
  console.log('Example app listening on port 3000')
})

let users = 
[
  { 'id':'1', 'name':'Kirsi Kernel' },
  { 'id':'2', 'name':'Matti Mainio' },
]

app.get('/users', (request, response) => {
  response.json(users)
})

app.get('/users/:id', (request, response) => {
const { id } = request.params
const user = users.find(user => user.id === id)
if (user) response.json(user)
  else response.status(404).end()
})

app.delete('/users/:id', (request, response) => {
  const { id } = request.params
  users = users.filter(user => user.id !== id)
  response.status(204).end()
})

// update user data
app.put('/users/:id', (request, response) => {
  //const id = request.params.id
  const { id } = request.params
  // const name = request.query.name
  const { name } = request.query
  const user = users.find(user => user.id === id)
  if (user) {
    user.name = name
    response.status(200).json(user)
  } else {
    response.status(204).end()
  }
})

app.post('/users/', (request, response) => {
  const maxId = Math.max(...users.map(user => user.id), 0)
  const user = request.body
  user.id = (maxId+1).toString() 
  users = users.concat(user)
  response.json(user)
})