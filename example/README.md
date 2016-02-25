# example

```bash
git clone git@github.com:kulakowka/feathers-validate-hook.git
cd feathers-validate-hook
npm install
cd example
npm install
npm start
```

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
