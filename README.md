## feathers-validate-hook

[![npm package](https://nodei.co/npm/feathers-validate-hook.png?downloads=true&downloadRank=true&stars=true)](https://nodei.co/npm/feathers-validate-hook/)

[![NPM version](http://img.shields.io/npm/v/feathers-validate-hook.svg)](https://www.npmjs.org/package/feathers-validate-hook)
[![Dependency Status](https://david-dm.org/kulakowka/feathers-validate-hook.svg)](https://david-dm.org/kulakowka/feathers-validate-hook)


This is experiment. **Work in progress!**

Feathers hook for validate json-schema with [is-my-json-valid](https://www.npmjs.com/package/is-my-json-valid)

```javascript
const validateHook = require('feathers-validate-hook')

// Define schema 
const schema = {
  // Required attribute 'text' with type 'string'
  text: {
    required: true,
    type: 'string'
  }
}

// Default options for is-my-json-valid validator
const options = {
  verbose: true,
  greedy: true
}

app.service('/messages').before({
  create: [ 
    validateHook(schema, options)
  ]
})
```

## Example

Look [example folder](https://github.com/kulakowka/feathers-validate-hook/tree/master/example) for more information.

Test request:
```
curl -H "Accept: application/json" -X POST http://localhost:3030/messages
```

Server response example:
```
{
  "name": "BadRequest",
  "message": "Validation failed",
  "code": 400,
  "className": "bad-request",
  "data": {},
  "errors": [
    {
      "field": "data.text",
      "message": "is required",
      "type": "string"
    }
  ]
}
```