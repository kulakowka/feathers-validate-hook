'use strict'

module.exports = {
  toBoolean(value) {
    return value.toBoolean()
  },
  toFloat(value, settings) {
    if (typeof settings === 'number') return value.toFloat(settings)
    return value.toFloat()
  },
  toInteger(value) {
    return value.toInt()
  },
  toString(value) {
    return value.toString()
  },
}

