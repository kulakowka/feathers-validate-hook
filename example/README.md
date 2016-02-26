# example

```bash
git clone git@github.com:kulakowka/feathers-virtual-attribute-hook.git
cd feathers-virtual-attribute-hook
npm install
cd example
npm install
npm start
```

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
