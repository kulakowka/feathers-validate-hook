'use strict'

const S = require('string')
const transform = require('./transform')
const validate = require('./validate')
module.exports = function validateField (value, options) {
  // default options
  Object.assign(options, {})

  // 1. START setValue
  if (typeof options.setValue !== 'undefined') {
    if (options.setValue instanceof Function) {
      let result = options.setValue(value)      
      if (result instanceof Promise) return result
      return Promise.resolve(result)
    }
    return Promise.resolve(options.setValue)
    // 1. THE END
  }

  // 2. START transforms
  let _value = transform(value, options)
  
  console.log('_value', _value)
  // return Promise.resolve(_value)
  // 2. THE END
  
  // 3. START validations
  _value = validate(_value, options)
  
  return Promise.resolve(_value)
  // 3. THE END
  
  
  
}
