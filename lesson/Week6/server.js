const http = require('http')
const hostname = '127.0.0.1'
const port = 3000

const server = http.createServer((req, res) => { // request and response - the server can receive input and return response
  res.statusCode = 200 //code means it is ok
  res.setHeader('Content-Type', 'text/html') // informing that we are sending text from the backend
  res.write('<h1>Hello World!</h1>') // doesn't matter that we give style, if the text/plain is pput as content type
  res.end()
})

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`)
})