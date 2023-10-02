// calculator.js
const sum = (number1, number2) => {
    return number1 + number2
  }
  
  const subs = (number1, number2) => {
    return number1 - number2
  }
  
  const mult = (number1, number2) => {
    return number1 * number2
  }
  
  const div = (number1, number2) => {
    return number1 / number2
  }
  
  module.exports = { // The file contains a few functions that are defined with the exports keyword to be used from outside the calculator.js module, i.e. from another JavaScript file that uses the module.
    sum, subs, mult, div
  }