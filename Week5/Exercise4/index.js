const http = require('http');
const fs = require('fs');

const port = 3000;
let counter = 0;

const server = http.createServer((request, response) => {
    if (request.url == '/') {
        counter++;
        console.log('Request counter values is', counter);
        response.statusCode = 200;
        response.setHeader('Content-Type', 'text/plain');
        response.write(`Request counter value is ${counter}`);
        response.end();
    }
    else {
        response.statusCode = 404;
        response.setHeader('Content-Type', 'text/plain');
        response.end('Not Found')
    }
});

server.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`)
});

process.on('SIGINT', () => {
    const currentDate = new Date().toLocaleString();
    const content = `${currentDate}: ${counter}`
    fs.writeFileSync('requestCounter.txt', content);
    process.exit();
});