const path = require('path')

if (process.argv.length <= 3 || isNaN(process.argv[2]) || isNaN(process.argv[3])) {
  console.log(`Usage: ${path.basename(__filename)} INT_NUMBER_ONE INT_NUMBER_TWO`)
  process.exit(-1)
}

const first  = process.argv[2]
const second = process.argv[3]
const sum    = parseInt(first) + parseInt(second)
console.log(`Sum is ${sum}.`)