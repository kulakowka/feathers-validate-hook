'use strict'

var validator = require('is-my-json-valid')

var errors = require('feathers-errors')

module.exports = function validateHook (schema, options) {
  schema = {
    required: true,
    type: 'object',
    properties: schema
  }

  options = Object.assign({
    verbose: true,
    greedy: true
  }, options)

  return (hook) => {
    var validate = validator(schema, options)
    var valid = validate(hook.data)

    let data = hook.data
    data.errors = validate.errors.map(errorsMap)

    if (!valid) throw new errors.BadRequest('Validation failed', data)
  }
}

function errorsMap (error) {
  error.path = error.field.replace(/^data\./, '')
  delete error.field
  return error
}
