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