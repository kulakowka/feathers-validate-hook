/* global describe, it */

'use strict'

var assert = require('assert')
var validateHook = require('./lib/validate')

let schema = {
  required: true,
  type: 'object',
  properties: {
    title: {
      required: true,
      type: 'string'
    },
    slug: {
      required: true,
      type: 'string'
    }
  }
}

let options = {

}

let hook = {
  data: {
    title: 'test'
  }
}

const validate = validateHook(schema, options)
const result = validate(hook)






