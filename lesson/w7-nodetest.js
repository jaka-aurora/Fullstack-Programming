const readLine = require('readline');
const fs = require('fs');

var file = './ex3.txt';

const file = fs.readFile('ex3.txt', (error, data) => { })
 
console.log("Reading file and caluclating sum...")
console.log(file)

for (let i=0; i <= file; i++) {
    const nums = parseInt(file.slice[i])
    console.log(nums)
}


// const readLine = require('readline');
// const f = require('fs');
// var file = './demo.txt';
//var rl = readLine.createInterface({
//    input : f.createReadStream(file),
//    output : process.stdout,
//    terminal: false
//});
//rl.on('line', function (text) {
// console.log(text);
//});