const fs = require('fs') //filesystem so we can find function to communicate tot he filesystem

fs.readFile('input.txt', (error, data) => { //this command doesn't kill the node event
    if (error) console.error(error)
    else console.log(data.toString())
 })
 
 console.log("Program ended")