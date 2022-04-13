# Snippets

Small pieces of code to help you with this assignment

##### starter code
```javascript
const express = require('express');
const app = express();

app.listen(3001, () => {
   console.log("The server is listening... 🐒")
});
```

##### GET request middleware
```javascript
// replace "/" with your own path
app.get('/path', (request, response) => {
});
```

##### GET request middleware with parameters
```javascript
// replace "/path" with your own path
// replace ":param1" with your own param
// add as many params as you need
app.get('/path/:param1', (request, response) => {
    const params = request.params;
});
```
