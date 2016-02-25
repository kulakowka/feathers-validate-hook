### Require hook

```javascript
const validateHook = require('feathers-validate-hook')

app.service('/users').before({
  create: [ 
    validateHook({ /* schema */ },{ /* options */ })
  ]
})
```