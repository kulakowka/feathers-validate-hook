'use strict'

const S = require('string')
const transformers = require('./transformers')
const typecasters = require('./typecasters')
 

module.exports = function transform(value, options) {
  
  let _value = S(value)

  // String transformers
  for (let option in options) {
    if (transformers.hasOwnProperty(option)) {
      let transformer = transformers[option]
      let settings = options[option]

      // this condition for {option: false}
      if (!(typeof settings === 'boolean' && settings === false)) {
        _value = transformers[option](_value, settings)
      }
      
    }
  }

  // Typecasters
  for (let option in options) {
    if (typecasters.hasOwnProperty(option)) {
      let typecaster = typecasters[option]
      let settings = options[option]

      // this condition for {option: false}
      if (!(typeof settings === 'boolean' && settings === false)) {
        return typecasters[option](_value, settings)
      }
    }
  }

  return _value.s
}