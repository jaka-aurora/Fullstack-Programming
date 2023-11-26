const fs = require('fs');
var fileName = './ex3.txt';

function add(numbers) {
    let sum = 0;
    for(let i=0; i < numbers.length; i++) {
        sum += numbers[i];
    }
    return sum;
}

fs.readFile(fileName, (error, data) => { 
    if (error) {
        console.error('Error reading the file:', error);
        return;
    }

    const content = data.toString();

    console.log("Reading file and calculating sum...");
    
    const numbers = content.split(',').map(num => parseInt(num.trim()));
    const sum = add(numbers);

    console.log('Sum is', sum);
})