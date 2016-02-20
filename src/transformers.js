'use strict'

module.exports = {
  between(value, settigns) {
    if (Array.isArray(settigns)) return value.between(...settigns)
    return value.between(settigns)
  },
  camelize(value) {
    return value.camelize()
  },
  capitalize(value) {
    return value.capitalize()
  },
  chompLeft(value, settings) {
   return value.chompLeft(settings) 
  },
  chompRight(value, settings) {
    return value.chompRight(settings)
  },
  collapseWhitespace(value) {
    return value.collapseWhitespace()
  },
  dasherize(value) {
    return value.dasherize()
  },
  decodeHTMLEntities(value) {
    return value.decodeHTMLEntities() 
  },
  escapeHTML(value) {
    return value.escapeHTML()
  },
  ensureLeft(value, settings) {
    return value.ensureLeft(settings)
  },
  ensureRight(value, settings) {
    return value.ensureRight(settings)
  },
  humanize(value) {
    return value.humanize()
  },
  latinise(value) {
    return value.latinise()
  },
  left(value, settings) {
    return value.left(settings)
  }
}
