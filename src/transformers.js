'use strict'

var slug = require('slug')

module.exports = {
  between(value, settings) {
    if (Array.isArray(settings)) return value.between(...settings)
    return value.between(settings)
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
  },
  repeat(value, settings) {
    return value.repeat(settings)
  },
  replaceAll(value, settings) {
    return value.replaceAll(...settings)
  },
  right(value, settings) {
    return value.right(settings)
  },
  slugify(value) {
    return value.setValue(slug(value.s).toLowerCase())
  },
  strip(value, settings) {
    return value.strip(...settings)
  },
  stripLeft(value, settings) {
    if (typeof settings !== 'string' && settings) return value.stripLeft()
    return value.stripLeft(settings)
  },
  stripRight(value, settings) {
    if (typeof settings !== 'string' && settings) return value.stripRight()
    return value.stripRight(settings)
  },
  stripPunctuation(value) {
    return value.stripPunctuation()
  },
  stripTags(value, settings) {
    if (Array.isArray(settings)) return value.stripTags(...settings)
    if (typeof settings === 'string') return value.stripTags(settings)
    return value.stripTags()
  },
  template(value, settings) {
    return value.template(settings)
  },
  titleCase(value) {
    return value.titleCase()
  },
  trim(value) {
    return value.trim()
  },
  trimLeft(value) {
    return value.trimLeft()
  },
  trimRight(value) {
    return value.trimRight()
  },
  truncate(value, settings) {
    if (Array.isArray(settings)) return value.truncate(...settings)
    return value.truncate(settings)
  },  
  underscore(value) {
    return value.underscore()
  },
  unescapeHTML(value) {
    return value.unescapeHTML()
  },
}
