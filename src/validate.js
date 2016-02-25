'use strict'

const S = require('string')
const validators = require('./validators') 

module.exports = function validate(value, options) {
  
  let _value = S(value)

  // Validators
  for (let option in options) {
    if (validators.hasOwnProperty(option)) {
      let validator = validators[option]
      let settings = options[option]

      // this condition for {option: false}
      if (!(typeof settings === 'boolean' && settings === false)) {
        return validator(_value, settings)
      }
    }
  }

  return _value.s
}