'use strict'

const S = require('string')
const transformers = require('./transformers')

module.exports = function transform(value, options) {
  
  let _value = S(value)

  for (let option in options) {
    if (transformers.hasOwnProperty(option)) {
      let transformer = transformers[option]

      _value = transformers[option](_value, options[option])
    }
  }

  return _value.s
}