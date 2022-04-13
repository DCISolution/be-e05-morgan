
const express = require('express');

// Logging all access requests to the server
const morgan = require('morgan')

const fs = require('fs');
const path = require('path');

const logPath = path.join(__dirname, 'log', 'access.log');

if (!fs.existsSync(logPath)) {
  fs.mkdirSync(path.dirname(logPath), {recursive: true});
}

// flags: "a" = Open file for appending.
//              The file is created if it does not exist.
const logStream = fs.createWriteStream(logPath, {flags:'a'});

// Create a custom `etags` token.
// An `etag` (Entity Tag) header is sent by the server in
// response to every request. The browser can store the etag
// and resend it as an `if-none-match` header when it makes the
// same request again. The server can then choose to return a
// 304 status (Not Modified), to avoid sending the content
// again. This tells the browser to use the content that it had
// already cached. 
morgan.token('etags', (req, res) => {
  const incoming = req.headers['if-none-match'] || "∅"
  const outgoing = res.getHeaders()['etag'] || "∅"

  if (incoming === outgoing) {
    return `both=${incoming}`
  }

  return `${incoming}<>${outgoing}`
})

const morganFunction = (tokens, req, res) => {
  // tokens:
  // [Function: morgan] {
  //   req:             [Function: getRequestToken],
  //   res:             [Function: getResponseHeader]

  //   compile:         [Function: compile],
  //   date:            [Function: getDateToken],
  //   default:         [Getter/Setter],
  //   dev:             [Function: developmentFormatLine],
  //   format:          [Function: format],
  //   method:          [Function: getMethodToken],
  //   referrer:        [Function: getReferrerToken],
  //   status:          [Function: getStatusToken],
  //   token:           [Function: token],
  //   url:             [Function: getUrlToken],

  //   'http-version':  [Function: getHttpVersionToken],
  //   'remote-addr':   [Function: getip],
  //   'remote-user':   [Function: getRemoteUserToken],
  //   'response-time': [Function: getResponseTimeToken],
  //   'total-time':    [Function: getTotalTimeToken],
  //   'user-agent':    [Function: getUserAgentToken],

  //   combined:        ':remote-addr - :remote-user [:date[clf]] ":method :url HTTP/:http-version" :status :res[content-length] ":referrer" ":user-agent"',
  //   common:          ':remote-addr - :remote-user [:date[clf]] ":method :url HTTP/:http-version" :status :res[content-length]',
  //   short:           ':remote-addr :remote-user :method :url HTTP/:http-version :status :res[content-length] - :response-time ms',
  //   tiny:            ':method :url :status :res[content-length] - :response-time ms',
  // }

  // Return a string
  return [
    tokens.method(req, res),
    tokens.url(req, res),
    tokens['response-time'](req, res)+'ms',

    // If the incoming 'if-none-match' request header is
    // identical to the etag that is calculated for the content
    // that would be sent (see tokens.etags below) then:
    // 1. Status will be set to 304 (Not Modified), not 200
    tokens.status(req, res),
    // 2. No content will be sent so Content-Length will be
    //    undefined.
    tokens.res(req, res, 'Content-Length') || "∅",
    // 3. The browser will know to use content that it cached 
    //    with the same etag earlier
    tokens.etags(req, res)
  ].join(' ')
}

const morganOptions = {
  skip: (request, response) => response.statusCode < 0, // 400
  immediate: false, // set to true to log on request
  stream: logStream // process.stdout // <<< default
}

// Initializing the Express app
const app = express();
app.use(morgan(morganFunction, morganOptions))
app.use(morgan('dev'))

// Alternatives:
// app.use(morgan('tiny'))
// app.use(morgan('dev'))
// app.use(morgan('short'))
// + more. See https://www.npmjs.com/package/morgan

// Use default value for PORT
const PORT = process.env.PORT || 3001
// Or define the PORT in the command line:
// PORT=3003 npm start

app.get('/hello', (request, response) => {
  // Alter the length of the response to see a different
  // content-length logged with a status of 200. Subsequent
  // queries will have no content-length and a status of 304.
  response.send("Hello world!")
})

app.get('/time', (request, response) => {
  const dateTime = Date()
  response.send(dateTime)
})

app.get('/random', (request, response) => {
  const random =Math.ceil(Math.random() * 20)
  // Half the time, the number will be 1 character, half the
  // time it will be 2 characters. There will be a 5% chance
  // that two consecutive numbers will be indentical, and so
  // a status of 304 will be logged.
  //
  // GET /random 200 0.274 ms - 1
  // GET /random 304 0.351 ms - - <<< 1/20 chance of same number
  // GET /random 200 0.233 ms - 1

  // Convert the random number to a string before sending it
  // so that it will not be interpreted as a status number.
  response.send("" + random)
})

app.get('/isNumber/:value', (request, response) => {
  const { value } = request.params
  const isNumber = !isNaN(value)
  const message = `${value} is ${isNumber ? "" : "not "}a number`

  response.send(message)
})

// app.get('/favicon.ico', (request, response) => (
//   response.status(204).end()
// ))

app.listen(PORT, () => {
   console.log(`The server is listening on port ${PORT}`)
});