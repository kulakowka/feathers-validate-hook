'use strict'

const validator = require('is-my-json-valid')

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
    const validate = validator(schema, options)
    const valid = validate(hook.data)

    let data = hook.data
    data.errors = validate.errors

    if (!valid) throw new errors.BadRequest('Validation failed', data)
  }
}
