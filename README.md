### Require hook

```javascript
const hooks = require('feathers-validate-hook')

app.service('/users').before({
  create: [ 
    hooks.validate({ /* schema */ },{ /* options */ }),
    hooks.transform()
  ]
})
```

```javascript
const validate = require('feathers-validate-hook').validate
const transform = require('feathers-validate-hook').transform
```

```javascript
const validate = require('feathers-validate-hook/lib/validate')
const transform = require('feathers-validate-hook/lib/transform')
```


