'use strict'

const S = require('string')
const transform = require('./transform')

module.exports = function validateField (value, options) {
  // default options
  Object.assign(options, {})

  // replace field value
  if (is(options.value)) {
    if (options.value instanceof Function) {
      let result = options.value(value)      
      if (result instanceof Promise) return result
      return Promise.resolve(result)
    }
    return Promise.resolve(options.value)
  }

  // transform value to the specified format
  let _value = transform(value, options)
  
  return Promise.resolve(_value.s)
  
}


/*
is('true')      true
is('false')     false
is('hello')     false
is(true)        true
is('on')        true
is('yes')       true
is('TRUE')      true
is('TrUe')      true
is('YES')       true
is('ON')        true
is('')          false
is(undefined)   false
is('undefined') false
is(null)        false
is(false)       false
is({})          false
is(1)           true
is(-1)          false
is(0)           false
 */
function is (value) {
  return S(value).toBoolean()
}
