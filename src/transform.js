'use strict'

const S = require('string')
const transformers = require('./transformers')

module.exports = function transform(value, options) {
  
  let _value = null

  for (let option in options) {
    if (options.hasOwnProperty(option)) {
      let transformer = transformers[option]
      if (transformer) {
        if (!_value) _value = S(value)
        _value = transformers[option](_value, options[option])
      }
    }
  }

  return _value
}