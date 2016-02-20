/* global describe, it */

// 'use strict'

var chai = require('chai')
var chaiAsPromised = require('chai-as-promised')
chai.use(chaiAsPromised)
chai.should()

// var assert = require('assert')
var validateField = require('./src/validateField')

function modifySync (v) {
  return 'modified sync ' + v
}

function modifyAsync (v) {
  return Promise.resolve('modified async ' + v)
}

function modifyUndefined (v) {
  return (typeof v === 'undefined') ? 'modified undefined' : ('modified ' + v)
}

describe('validateField()', function () {

  // test replace field value

  it('should return forced value from options when the field value is not present', function () {
    return Promise.all([
      validateField('', {value: 'value1'}).should.become('value1'),
      validateField('   ', {value: 'value2'}).should.become('value2'),
      validateField(undefined, {value: 'value3'}).should.become('value3'),
      validateField('test', {value: 'value4'}).should.become('value4')
    ])
  })

  it('should return modified value from function in option.value, when the field value is not present', function () {
    return Promise.all([
      validateField('test', {value: modifySync}).should.become('modified sync test'),
      validateField('test', {value: modifyAsync}).should.become('modified async test'),
      validateField('test', {value: modifyUndefined}).should.become('modified test'),
      validateField(undefined, {value: modifyUndefined}).should.become('modified undefined')
    ])
  })

  // test modifying to the specified format
  
  it('should extracts a value string between left and right strings', function () {
    return Promise.all([
      validateField('<a>foo</a>', {between: ['<a>','</a>']}).should.become('foo'),
      validateField('<a>foo</a></a>', {between: ['<a>','</a>']}).should.become('foo'),
      validateField('<a><a>foo</a></a>', {between: ['<a>','</a>']}).should.become('<a>foo'),
      validateField('<a>foo', {between: ['<a>','</a>']}).should.become(''),
      validateField('Some strings } are very {weird}, dont you think?', {between: ['{','}']}).should.become('weird'),
      validateField('This is a test string', {between: 'test'}).should.become(' string'),
      validateField('This is a test string', {between: ['','test']}).should.become('This is a ')
    ])
  })

  it('should remove any underscores or dashes and convert a value string into camel casing', function () {
    return Promise.all([
      validateField('data_rate', {camelize: true}).should.become('dataRate'),
      validateField('background-color', {camelize: true}).should.become('backgroundColor'),
      validateField('-moz-something', {camelize: true}).should.become('MozSomething'),
      validateField('_car_speed_', {camelize: true}).should.become('CarSpeed'),
      validateField('yes_we_can', {camelize: true}).should.become('yesWeCan')      
    ])
  })

  it('should capitalizes the first character of a value string', function () {
    return Promise.all([
      validateField('jon', {capitalize: true}).should.become('Jon'),
      validateField('JP', {capitalize: true}).should.become('Jp')
    ])
  })

  it('should removes prefix from start of value string', function () {
    return Promise.all([
      validateField('foobar', {chompLeft: 'foo'}).should.become('bar'),
      validateField('foobar', {chompLeft: 'bar'}).should.become('foobar')
    ])
  })

  it('should removes suffix from end of value string', function () {
    return Promise.all([
      validateField('foobar', {chompRight: 'bar'}).should.become('foo'),
      validateField('foobar', {chompRight: 'foo'}).should.become('foobar')
    ])
  })

  it('should converts all adjacent whitespace characters from value string to a single space', function () {
    return Promise.all([
      validateField('  String   \t libraries are   \n\n\t fun\n!  ', {collapseWhitespace: true}).should.become('String libraries are fun !')
    ])
  })

  it('should returns a converted camel cased value string into a string delimited by dashes', function () {
    return Promise.all([
      validateField('dataRate', {dasherize: true}).should.become('data-rate'),
      validateField('CarSpeed', {dasherize: true}).should.become('-car-speed'),
      validateField('yesWeCan', {dasherize: true}).should.become('yes-we-can'),
      validateField('backgroundColor', {dasherize: true}).should.become('background-color')
    ])
  })

  it('should decode value string with HTML entities into their string representation', function () {
    return Promise.all([
      validateField('Ken Thompson &amp; Dennis Ritchie', {decodeHTMLEntities: true}).should.become('Ken Thompson & Dennis Ritchie'),
      validateField('3 &lt; 4', {decodeHTMLEntities: true}).should.become('3 < 4')
    ])
  })

  it('should escapes value string with html into escaped string', function () {
    return Promise.all([
      validateField('<div>hi</div>', {escapeHTML: true}).should.become('&lt;div&gt;hi&lt;/div&gt;')
    ])
  })

  

  




})
