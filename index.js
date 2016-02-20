'use strict'

const validateField = require('./src/validateField')
require('colors')

function modify (v) {
  return 'modified ' + v
}

function modifyAsync (v) {
  return Promise.resolve('modified ' + v)
}

const data = {
  field: 'test'
}
const options = {
  // 1. В самом начале - если значение не приехало или приехала пустая строка
  // и при этом параметр value указан - то мы заменяем эначения поля и переходим к следующему
  value: 'Force value',
  value: modifySync,
  value: modifyAsync,

  // 3. Затем мы проводим модификации значения поля к нужному виду
  // по умолчанию никаких модификаций не проводится
  // Модификации производятся над значениями которые были приведены к нужному типу в первом пункте.
  between: 'test' || ['<a>', '</a>'],
  camelize: true,
  capitalize: true,
  chompLeft: 'foo',
  chompRight: 'bar',
  collapseWhitespace: true,
  dasherize: true,
  decodeHTMLEntities: true,
  escapeHTML: true,
  ensureLeft: '/',
  ensureRight: '/',
  humanize: true,
  latinise: true,
  left: 2,  // -2
  repeat: 5,
  replaceAll: [' ', '_'],
  right: 2,  // -2
  slugify: true,
  strip: [' ', '_', '-'],
  stripLeft: true || 'a-z' || 'w.' || ['a-z', 'w.'],
  stripRight: true || 'a-z' || 'w.' || ['a-z', 'w.'],
  stripPunctuation: true,
  stripTags: true || 'p' || ['p', 'b', 'script'],
  template: {name: 'JP', 'date-year': 2013}, // "Hello {{name}}! How are you doing during the year of {{date-year}}?"
  times: 5,
  titleCase: true,
  toFloat: true || 2,
  toInt: true,
  toInteger: true,
  toString: true,
  trim: true,
  trimLeft: true,
  trimRight: true,
  truncate: 3,
  underscore: true,
  unescapeHTML: true,

  // 4. Затем мы производим валидацию значения поля по различным признакам
  // по умолчанию никаких валидаций не производится
  isAlphaNumeric: true,  
  isEmpty: true,         
  isArray: true,         
  isContains: 'one',     
  isEndsWith: 'jon',     

  // 5. Затем, если поле не приехало или приехало пустое мы устанавливаем значение по умолчанию (если указано)
  defaultValue: 'admin@gmail.com'
}

let validateResult = validateField(data.field, options)

validateResult.then(value => {
  console.log('валидное и модифицированное поле:'.green, value.blue)
})

validateResult.catch(err => {
  console.log('ошибка валидации поля:'.red, err)
})
