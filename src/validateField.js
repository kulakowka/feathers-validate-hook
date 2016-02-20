'use strict'

const S = require('string')
const transform = require('./transform')

module.exports = function validateField (value, options) {
  // default options
  Object.assign(options, {})

  // 1. START replace field value
  if (typeof options.setValue !== 'undefined') {
    if (options.setValue instanceof Function) {
      let result = options.setValue(value)      
      if (result instanceof Promise) return result
      return Promise.resolve(result)
    }
    return Promise.resolve(options.setValue)
    // 1. THE END
  }

  // 2. START transform value to the specified format
  let _value = transform(value, options)
  
  return Promise.resolve(_value)
  // 2. THE END
  
}
