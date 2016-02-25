/* global describe, it */

'use strict'

var chai = require('chai')
var chaiAsPromised = require('chai-as-promised')
chai.use(chaiAsPromised)
chai.should()

var validateField = require('./src/validateField')

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

  // transformation
  
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

  it('should takes a string and interpolates the values. Defaults to {{ and }} for Mustache compatible templates', function () {
    var str = "Hello {{name}}! How are you doing during the year of {{date-year}}?"
    var template = {name: 'JP', 'date-year': 2013}
    return Promise.all([
      validateField(str, {template}).should.become('Hello JP! How are you doing during the year of 2013?')
    ])
  })

  it('should returns a string with the first letter of each word uppercased, including hyphenated words', function () {
    return Promise.all([
      validateField('Like ice in the sunshine', {titleCase: true}).should.become('Like Ice In The Sunshine'),
      validateField('data_rate', {titleCase: true}).should.become('Data_Rate'),
      validateField('background-color', {titleCase: true}).should.become('Background-Color'),
      validateField('-moz-something', {titleCase: true}).should.become('-Moz-Something'),
      validateField('_car_speed_', {titleCase: true}).should.become('_Car_Speed_'),
      validateField('yes_we_can', {titleCase: true}).should.become('Yes_We_Can'),
      validateField('   capitalize dash-CamelCase_underscore trim  ', {humanize: true, titleCase: true}).should.become('Capitalize Dash Camel Case Underscore Trim')      
    ])
  })

  it('should return the string with leading and trailing whitespace removed. Reverts to native trim() if it exists', function () {
    return Promise.all([
      validateField('hello ', {trim: true}).should.become('hello'),
      validateField(' hello ', {trim: true}).should.become('hello'),
      validateField('\nhello', {trim: true}).should.become('hello'),
      validateField('\nhello\r\n', {trim: true}).should.become('hello'),
      validateField('\thello\t', {trim: true}).should.become('hello')
    ])
  })

  it('should return the string with leading whitespace removed', function () {
    return Promise.all([
      validateField('  How are you?', {trimLeft: true}).should.become('How are you?')
    ])
  })
  
  it('should return the string with trailing whitespace removed', function () {
    return Promise.all([
      validateField('How are you?      ', {trimRight: true}).should.become('How are you?')
    ])
  })

  it('should truncates the string, accounting for word placement and character count', function () {
    return Promise.all([
      validateField('this is some long text', {truncate: 3}).should.become('...'),
      validateField('this is some long text', {truncate: 7}).should.become('this is...'),
      validateField('this is some long text', {truncate: 11}).should.become('this is...'),
      validateField('this is some long text', {truncate: 12}).should.become('this is some...'),
      validateField('this is some long text', {truncate: [14, ' read more']}).should.become('this is some read more')
    ])
  })

  it('should returns converted camel cased string into a string delimited by underscores', function () {
    return Promise.all([
      validateField('dataRate', {underscore: true}).should.become('data_rate'),
      validateField('CarSpeed', {underscore: true}).should.become('car_speed'),
      validateField('yesWeCan', {underscore: true}).should.become('yes_we_can')
    ])
  })

  it('should returns unescaped string from html value string', function () {
    return Promise.all([
      validateField('&lt;div&gt;hi&lt;/div&gt;', {unescapeHTML: true}).should.become('<div>hi</div>')
    ])
  })
  
  // typecast
  
  it('should convert a a logical truth string to boolean', function () {
    return Promise.all([
      validateField('true', {toBoolean: true}).should.become(true),
      validateField('false', {toBoolean: true}).should.become(false),
      validateField('hello', {toBoolean: true}).should.become(false),
      validateField(true, {toBoolean: true}).should.become(true),
      validateField('on', {toBoolean: true}).should.become(true),
      validateField('yes', {toBoolean: true}).should.become(true),
      validateField('TRUE', {toBoolean: true}).should.become(true),
      validateField('TrUe', {toBoolean: true}).should.become(true),
      validateField('YES', {toBoolean: true}).should.become(true),
      validateField('ON', {toBoolean: true}).should.become(true),
      validateField('', {toBoolean: true}).should.become(false),
      validateField(undefined, {toBoolean: true}).should.become(false),
      validateField('undefined', {toBoolean: true}).should.become(false),
      validateField(null, {toBoolean: true}).should.become(false),
      validateField(false, {toBoolean: true}).should.become(false),
      validateField({}, {toBoolean: true}).should.become(false),
      validateField(1, {toBoolean: true}).should.become(true),
      validateField(-1, {toBoolean: true}).should.become(false),
      validateField(0, {toBoolean: true}).should.become(false)
    ])
  })

  it('should return the float value, wraps parseFloat', function () {
    return Promise.all([
      validateField('5', {toFloat: true}).should.become(5),
      validateField('5.3', {toFloat: true}).should.become(5.3),
      validateField(5.3, {toFloat: true}).should.become(5.3),
      validateField('-10', {toFloat: true}).should.become(-10),
      validateField('55.3 adfafaf', {toFloat: true}).should.become(55.3),
      validateField('afff 44', {toFloat: true}).should.become(NaN),
      validateField('3.45522222333232', {toFloat: 2}).should.become(3.46),
    ])
  })

  it('should return the number value in integer form. Wrapper for parseInt(). Can also parse hex values', function () {
    return Promise.all([
      validateField('5', {toInteger: true}).should.become(5),
      validateField('5.3', {toInteger: true}).should.become(5),
      validateField(5.3, {toInteger: true}).should.become(5),
      validateField('-10', {toInteger: true}).should.become(-10),
      validateField('55.3 adfafaf', {toInteger: true}).should.become(55),
      validateField('afff 44', {toInteger: true}).should.become(NaN),
      validateField('0xff', {toInteger: 2}).should.become(255)  
    ])
  })

  it('should return the string representation of an value string', function () {
    return Promise.all([
      validateField(5, {toString: true}).should.become('5')
    ])
  })

  // validations
  
  it('should return true if the string contains only letters', function () {
    return Promise.all([
      validateField('afaf', {isAlpha: true}).should.become(true)
    ])
  })  

  // template
  // it('should ', function () {
  //   return Promise.all([
  //     validateField('test', {titleCase: true}).should.become('test'),
  //   ])
  // })

})

// Helpers

function modifySync (v) {
  return 'modified sync ' + v
}

function modifyAsync (v) {
  return Promise.resolve('modified async ' + v)
}

function modifyUndefined (v) {
  return (typeof v === 'undefined') ? 'modified undefined' : ('modified ' + v)
}
