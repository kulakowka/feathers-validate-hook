'use strict'

const validator = require('is-my-json-valid')

// var _errors = require('feathers-errors')

module.exports = function validateHook (schema, options, errors) {

  schema = Object.assign({
    required: true,
    type: 'object',
    properties: {}
  }, schema)

  options = Object.assign({
    verbose: true,
    greedy: true
  }, options)

  return (hook) => {
    const validate = validator(schema, options)
    const valid = validate(hook.data)

    // let error = new Error()
    // error.name = 'BadRequest'
    // error.code = 400
    // error.message = 'Invalid parameters'
    // error.className = 'bad-request'
    // error.errors = validate.errors
    // error.data = hook.data
    
    // console.log(error)
    
    let data = hook.data
    data.errors = validate.errors

    if (!valid) throw new errors.BadRequest('Validation failed', data)
  }
}