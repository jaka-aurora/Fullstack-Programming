const express = require('express');
const fs = require('fs');
const app = express();
const port = 3000;

let counter = 0;

app.get('/', (request, response) => {
    counter++;
    console.log('Request counter values is', counter)
    response.send(`Request counter values is ${counter}`)
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`)
});

process.on('SIGINT', () => {
    const currentDate = new Date().toLocaleString();
    const content = `${currentDate}: ${counter}`
    fs.writeFileSync('requestCounter.txt', content);
    process.exit();
});