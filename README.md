## feathers-virtual-attribute-hook

[![npm package](https://nodei.co/npm/feathers-virtual-attribute-hook.png?downloads=true&downloadRank=true&stars=true)](https://nodei.co/npm/feathers-virtual-attribute-hook/)

[![NPM version](http://img.shields.io/npm/v/feathers-virtual-attribute-hook.svg)](https://www.npmjs.org/package/feathers-virtual-attribute-hook)
[![Dependency Status](https://david-dm.org/kulakowka/feathers-virtual-attribute-hook.svg)](https://david-dm.org/kulakowka/feathers-virtual-attribute-hook)


This is experiment. **Work in progress!**

Feathers hook for add virtual attributes to your service response.

```javascript
const validateHook = require('feathers-virtual-attribute-hook')

app.service('/messages').after({
  find: [ 
    addVirtualAttribute({
      webUrl: (message) => `http://example.com/messages/${message.id}`
    })
  ],
  get: [ 
    addVirtualAttribute({
      webUrl: (message) => `http://example.com/messages/${message.id}`
    })
  ]
})
```

## Example

Look [example folder](https://github.com/kulakowka/feathers-virtual-attribute-hook/tree/master/example) for more information.

Test request:
```
curl -H "Accept: application/json" http://localhost:3030/messages
```

Server response example:
```
[
  {
    "id": 1,
    "text": "A message with ID: 1!",
    "webUrl": "http://example.com/messages/1"
  },
  {
    "id": 2,
    "text": "A message with ID: 2!",
    "webUrl": "http://example.com/messages/2"
  },
  {
    "id": 3,
    "text": "A message with ID: 3!",
    "webUrl": "http://example.com/messages/3"
  }
]
```


Test request:
```
curl -H "Accept: application/json" http://localhost:3030/messages/1
```

Server response example:
```
{
  "id": "1",
  "text": "A new message with ID: 1!",
  "webUrl": "http://example.com/messages/1"
}
```
