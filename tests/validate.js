/* global describe, it */

'use strict'

var assert = require('assert')
var chai = require('chai')
var chaiAsPromised = require('chai-as-promised')
chai.use(chaiAsPromised)
chai.should()

var validateHook = require('../lib/validate')

describe('validateHook()', function () {

  it('should be valid object', done => {
      let result = validateHook({hello: {required: true}})
      
      console.log('result', result)

      // assert.equal(result)
      done()
  })
})
