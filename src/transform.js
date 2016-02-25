'use strict'

const S = require('string')
const transformers = require('./transformers')
const typecasters = require('./typecasters')
 

module.exports = function transform(value, options) {
  
  

  // String transformers
  for (let option in options) {
    if (transformers.hasOwnProperty(option)) {
      let transform = transformers[option]
      let settings = options[option]

      // this condition for {option: false}
      if (!(typeof settings === 'boolean' && settings === false)) {
        _value = transform(_value, settings)
      }
    }
  }

  // Typecasters
  for (let option in options) {
    if (typecasters.hasOwnProperty(option)) {
      let typecast = typecasters[option]
      let settings = options[option]

      // this condition for {option: false}
      if (!(typeof settings === 'boolean' && settings === false)) {
        return typecast(_value, settings)
      }
    }
  }

  return _value.s
}