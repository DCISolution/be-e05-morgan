
const express = require('express');
const app = express();

// Use default value for PORT
const PORT = process.env.PORT || 3001
// Or define the PORT in the command line:
// PORT=3003 npm start

app.get('/hello', (request, response) => {
  response.send("Hello")
})

app.get('/time', (request, response) => {
  const dateTime = Date()
  response.send(dateTime)
})

app.get('/random', (request, response) => {
  const max = 100
  const random = Math.ceil(Math.random() * max)
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

app.listen(PORT, () => {
   console.log(`The server is listening on port ${PORT}`)
});