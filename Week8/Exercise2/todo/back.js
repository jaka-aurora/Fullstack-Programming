const express = require('express') 
const cors = require('cors')
const app = express()
const port = 3000

// cors - allow connection from different domains and ports
app.use(cors())

// convert json string to json object (from request)
app.use(express.json())

//Mongo here
const mongoose = require('mongoose')
const mongoDB = 'mongodb+srv://aa6111:WHgVmhfnVJ35t5F0@test.9rvlfjl.mongodb.net/test'
mongoose.set('strictQuery', false);
mongoose.connect(mongoDB, {useNewUrlParser: true, useUnifiedTopology: true})

const db = mongoose.connection
db.on('error', console.error.bind(console, 'connection error:'))
db.once('open', function() {
  console.log("Database test connected")
})

// App listen port 3000
app.listen(port, () => {
  console.log('App listening on port 3000')
})

// Mongoose Schema and Model
const todoSchema = new mongoose.Schema({
    text: { type: String, required: true } 
  })

const Todo = mongoose.model('Todo', todoSchema, 'todos')

// Routes
// Post
app.post('/todos', async (request, response) => {
  const { text } = request.body
  const todo = new Todo({
    text: text
  })
  const savedTodo = await todo.save()
  response.json(savedTodo)  
})

// Get
app.get('/todos', async (request, response) => {
  const todos = await Todo.find({})
  response.json(todos)
})

app.get('/todos/:id', async (request, response) => {
  const todo = await Todo.findById(request.params.id)
  if (todo) response.json(todo)
  else response.status(404).end()
  })

// Delete
app.delete('/todos/:id', async (request, response) => {
  const doc = await Todo.findById(request.params.id);
  if (doc) { 
    await doc.deleteOne()
    response.json(doc)
  }
  else response.status(404).end()
})

// Put
app.put('/todos/:id', async (request, response) => {
  console.log('PUT request body:', request.body);

  try {
      const updatedTodo = await Todo.findByIdAndUpdate(
        request.params.id,
        { text: request.body.text },
        { new: true }
      );

      if (updatedTodo) {
        response.json(updatedTodo);
      } else {
          response.status(404).end();
      }
  } catch (error) {
      console.error('Error updating todo:', error);
      response.status(500).send('Internal Server Error');
  }
});