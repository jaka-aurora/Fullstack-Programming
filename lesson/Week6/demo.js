// demo.js
const calculator = require('./calculator')

let number1 = 10
let number2 = 2

console.log(`${number1} + ${number2} = ${calculator.sum(number1,number2)}`)
console.log(`${number1} - ${number2} = ${calculator.subs(number1,number2)}`)
console.log(`${number1} * ${number2} = ${calculator.mult(number1,number2)}`)
console.log(`${number1} / ${number2} = ${calculator.div(number1,number2)}`)