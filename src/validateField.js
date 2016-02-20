'use strict'

var S = require('string')

module.exports = function validateField (value, options) {
  // default options
  Object.assign(options, {})

  // replace field value
  if (options.value) {
    if (options.value instanceof Function) {
      let result = options.value(value)      
      if (result instanceof Promise) return result
      return Promise.resolve(result)
    }
    return Promise.resolve(options.value)
  }

  // modifying to the specified format
  if (options.between) {
    let between = options.between
    if (Array.isArray(between)) {
      return Promise.resolve(S(value).between(...between).s)  
    }
    return Promise.resolve(S(value).between(between).s)
  }

  if (options.camelize) {
    return Promise.resolve(S(value).camelize().s)
  }

  if (options.capitalize) {
    return Promise.resolve(S(value).capitalize().s)
  }

  if (options.chompLeft) {
    return Promise.resolve(S(value).chompLeft(options.chompLeft).s)
  }

  if (options.chompRight) {
    return Promise.resolve(S(value).chompRight(options.chompRight).s)
  }

  if (options.collapseWhitespace) {
    return Promise.resolve(S(value).collapseWhitespace().s)
  }

  if (options.dasherize) {
    return Promise.resolve(S(value).dasherize().s)
  }

  if (options.decodeHTMLEntities) {
    return Promise.resolve(S(value).decodeHTMLEntities().s)
  }

  if (options.escapeHTML) {
    return Promise.resolve(S(value).escapeHTML().s)
  }

  if (options.ensureLeft) {
    return Promise.resolve(S(value).ensureLeft(options.ensureLeft).s)
  }



  

  

  
  
  

  

  return Promise.resolve(value)
}
