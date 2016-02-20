'use strict'

const S = require('string')
const transformers = require('./transformers')

module.exports = function transform(value, options) {
  
  let _value = S(value)

  for (let option in options) {
    if (transformers.hasOwnProperty(option)) {
      let transformer = transformers[option]
      let settings = options[option]

      if (!(typeof settings === 'boolean' && settings === false)) {
        _value = transformers[option](_value, settings)
      }
      
    }
  }

  return _value.s
}