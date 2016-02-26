'use strict';

const globalHooks = require('../../../hooks');
const addVirtualAttribute = require('../../../../../lib/hook')

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
  create: [],
  update: [],
  patch: [],
  remove: []
};

exports.after = {
  all: [],
  find: [
    addVirtualAttribute({
      webUrl: (message) => `http://example.com/messages/${message.id}`
    })
  ],
  get: [
    addVirtualAttribute({
      webUrl: (message) => `http://example.com/messages/${message.id}`
    })
  ],
  create: [],
  update: [],
  patch: [],
  remove: []
};
