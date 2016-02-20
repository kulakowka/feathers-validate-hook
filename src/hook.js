'use strict'

module.exports = function validateHook (options) {
  return function (hook) {
    console.log('validateHook')
  }
}
