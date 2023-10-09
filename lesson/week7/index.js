const express = require('express') 

// create express app
const app = express()

// define port
const port = 3000

// Use JSON parser
app.use(express.json())

// REST API - http://localhost:3000/


// define endpoint
app.get('/', (request, response) => {
    response.send('Hello from server side!')
  })

app.get('/testing', (request, response) => {
response.send('Hello from testing side!')
})

// define some data with JSON format
let person = {'name':'Kirsi Kernel'}

app.get('/person', (request, response) => { // the end of url can be any string. not even the variable name, it's just an endpoint name
  response.json(person)
})

app.post('/person', (request, response) => {
    // get request body with JSON
    const body = request.body
    console.log(body.name)
    console.log(body.age)
    console.log(body.email)
    response.send('POST HTTP received!')
  })
  

// start web-server and listen port 3000
app.listen(port, () => {
    console.log('Example app listening on port 3000')
  })