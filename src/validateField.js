'use strict'

const S = require('string')
const transform = require('./transform')

module.exports = function validateField (value, options) {
  // default options
  Object.assign(options, {})

  // 1. START replace field value
  if (typeof options.value !== 'undefined') {
    if (options.value instanceof Function) {
      let result = options.value(value)      
      if (result instanceof Promise) return result
      return Promise.resolve(result)
    }
    return Promise.resolve(options.value)
    // 1. THE END
  }

  // 2. START transform value to the specified format
  let _value = transform(value, options)
  
  return Promise.resolve(_value.s)
  // 2. THE END
  
}
