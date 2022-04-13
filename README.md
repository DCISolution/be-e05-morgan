# Using morgan

morgan logs requests made by a client to the server. By default requests are logged to process.stdout, otherwise known as the console.

The simplest usage is given in `simple.js`:

```javascript
const app = require('express')();
const morgan = require('morgan')
const app = express()
app.use(morgan('dev'))

app.get('/', (request, response) => {
  response.send("Hello world!")
})

app.listen(3002, () => {
  console.log(`Listening on port 3002`)
});

// Listening on port 3002
// GET / 200 3.562 ms - 12
// GET / 304 1.283 ms - -
```

The 'dev' token will display the following details in the Terminal pane:

`:method :url :status :response-time ms - :res[content-length]`

For example, a call to [http://localhost:3001/random]() might return "42" (2 characters), in which case morgan would log:

`GET /random 200 1.403 ms - 2`

## Custom usage

This project demonstrates how to:
* Create a custom `etags` token
* How to create a custom function for morgan
* How to stream the log to an access.log file rather than to the Terminal. (See `log/access.log` for sample output.)

## Entity Tags

This project also shows how Entity Tags (etags) are used and why the status of a response may be 304 (Not Modified), rather than 200, when the same content is sent a second and subsequent times.

Read more about how `etag`s are used to tell the browser to use content that it has already cached, to save bandwidth: [MDN](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/ETag) | [Wikipedia](https://en.wikipedia.org/wiki/HTTP_ETag).

## /favicon.ico 404 

A browser will typically request a favicon.ico to display in the page's tab. If a 404 (Not Found) status is returned, the browser will not request it again. Sometimes it is preferable to send a 204 (No Content) status. Code for this is also given, but commented out, as the browser will continue to ask for the favicon, and this pollutes the access.log.

---

Full details on using morgan [here](https://www.npmjs.com/package/morgan).