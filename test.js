/* global describe, it */

'use strict'

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
      validateField('', {setValue: 'value1'}).should.become('value1'),
      validateField('   ', {setValue: 'value2'}).should.become('value2'),
      validateField(undefined, {setValue: 'value3'}).should.become('value3'),
      validateField('test', {setValue: 'value4'}).should.become('value4'),
      validateField('test', {setValue: false}).should.become(false)
    ])
  })

  it('should return modified value from function in option.value, when the field value is not present', function () {
    return Promise.all([
      validateField('test', {setValue: modifySync}).should.become('modified sync test'),
      validateField('test', {setValue: modifyAsync}).should.become('modified async test'),
      validateField('test', {setValue: modifyUndefined}).should.become('modified test'),
      validateField(undefined, {setValue: modifyUndefined}).should.become('modified undefined')
    ])
  })

  // complex transformation test with many options
  it('should transform with two or more options', function () {
    let options = {
      humanize: true, 
      collapseWhitespace: true,
      camelize: true,
      capitalize: false
    }
    return Promise.all([
      validateField('the_humanize           string_method', options).should.become('TheHumanizeStringMethod'),
    ])
  })
  
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
      validateField('foobar', {chompLeft: 'bar'}).should.become('foobar'),
      validateField('foobar', {chompLeft: false}).should.become('foobar')
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
      validateField('yesWeCan', {dasherize: false}).should.become('yesWeCan'),
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

  it('should ensures value string starts with prefix', function () {
    return Promise.all([
      validateField('subdir', {ensureLeft: '/'}).should.become('/subdir'),
      validateField('/subdir', {ensureLeft: '/'}).should.become('/subdir')
    ])
  })

  it('should ensures value string ends with suffix', function () {
    return Promise.all([
      validateField('dir', {ensureRight: '/'}).should.become('dir/'),
      validateField('dir/', {ensureRight: '/'}).should.become('dir/')
    ])
  })

  it('should transform the value string into a human friendly form', function () {
    return Promise.all([
      validateField('the_humanize_string_method', {humanize: true}).should.become('The humanize string method'),
      validateField('ThehumanizeStringMethod', {humanize: true}).should.become('Thehumanize string method'),
      validateField('the humanize string method', {humanize: true}).should.become('The humanize string method'),
      validateField('the humanize_id string method_id', {humanize: true}).should.become('The humanize id string method'),
      validateField('the  humanize string method  ', {humanize: true}).should.become('The humanize string method'),
      validateField('   capitalize dash-CamelCase_underscore trim  ', {humanize: true}).should.become('Capitalize dash camel case underscore trim')
    ])
  })

  it('should remove accents from Latin characters', function () {
    return Promise.all([
      validateField('crème brûlée', {latinise: true}).should.become('creme brulee')
    ])
  })

  it('should return the substring denoted by n positive left-most characters', function () {
    return Promise.all([
      validateField('My name is JP', {left: 2}).should.become('My'),
      validateField('Hi', {left: 0}).should.become(''),
      validateField('Hi', {left: false}).should.become('Hi'),
      validateField('My name is JP', {left: -2}).should.become('JP')
    ])
  })

  it('should return a string repeated n times', function () {
    return Promise.all([
      validateField(' ', {repeat: 5}).should.become('     '),
      validateField('*', {repeat: 3}).should.become('***')
    ])
  })

  it('should return the new string with all occurrences of ss replaced with newstr', function () {
    return Promise.all([
      validateField(' does IT work? ', {replaceAll: [' ', '_']}).should.become('_does_IT_work?_'),
      validateField('Yes it does!', {replaceAll: [' ', '']}).should.become('Yesitdoes!')
    ])
  })

  it('should return the substring denoted by n positive right-most characters', function () {
    return Promise.all([
      validateField('My name is JP', {right: -2}).should.become('My'),
      validateField('Hi', {left: 0}).should.become(''),
      validateField('My name is JP', {right: 2}).should.become('JP')
    ])
  })

  it('should convert the value into a valid url slug', function () {
    return Promise.all([
      validateField('Global Thermonuclear Warfare', {slugify: true}).should.become('global-thermonuclear-warfare'),
      validateField('Crème brûlée', {slugify: true}).should.become('creme-brulee'),
      validateField('Россия большая страна', {slugify: true}).should.become('rossiya-bolshaya-strana')
    ])
  })

  it('should return a new string with all occurrences of [string1],[string2],... removed', function () {
    return Promise.all([
      validateField(' 1 2 3--__--4 5 6-7__8__9--0', {strip: [' ', '_', '-']}).should.become('1234567890'),
      validateField('can words also be stripped out?', {strip: ['words', 'also', 'be']}).should.become('can    stripped out?')      
    ])
  })

  it('should returns a new string in which all chars have been stripped from the beginning of the string (default whitespace characters)', function () {
    return Promise.all([
      validateField('  hello ', {stripLeft: true}).should.become('hello '),
      validateField('not transform me', {stripLeft: false}).should.become('not transform me'),
      validateField('abcz', {stripLeft: 'a-z'}).should.become('bcz'),
      validateField('www.example.com', {stripLeft: 'w.'}).should.become('example.com')
    ])
  })

  it('should returns a new string in which all chars have been stripped from the end of the string (default whitespace characters)', function () {
    return Promise.all([
      validateField('  hello ', {stripRight: true}).should.become('  hello'),
      validateField('not transform me', {stripRight: false}).should.become('not transform me'),
      validateField('abcz', {stripRight: 'a-z'}).should.become('abc')
    ])
  })

  it('should strip all of the punctuation', function () {
    return Promise.all([
      validateField('My, st[ring] *full* of %punct)', {stripPunctuation: true}).should.become('My string full of punct')
    ])
  })

  it('should strip all of the HTML tags or tags specified by the parameters', function () {
    return Promise.all([
      validateField('<p>just <b>some</b> text</p>', {stripTags: true}).should.become('just some text'),
      validateField('<p>just <b>some</b> text</p>', {stripTags: 'b'}).should.become('<p>just some text</p>'),
      validateField('<p>just <b>some</b> <i>text</i> with <img src="http://.."/></p>', {stripTags: ['b', 'img']}).should.become('<p>just some <i>text</i> with </p>'),
    ])
  })




  

})
