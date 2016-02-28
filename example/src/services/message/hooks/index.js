'use strict';

const globalHooks = require('../../../hooks');
const validateHook = require('../../../../../lib/validate')

const schema = {
  text: {
    required: true,
    type: 'string'
  }
}

exports.before = {
  all: [],
  find: [],
  get: [],
  create: [
    validateHook(schema)
  ],
  update: [],
  patch: [],
  remove: []
};

exports.after = {
  all: [],
  find: [],
  get: [],
  create: [],
  update: [],
  patch: [],
  remove: []
};
