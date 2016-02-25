'use strict'

const validator = require('is-my-json-valid')

// var _errors = require('feathers-errors')

module.exports = function validateHook (schema, options) {

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

    let error = new Error('Invalid parameters')
    error.errors = validate.errors

    if (!valid) throw error //new _errors.BadRequest()
  }
}