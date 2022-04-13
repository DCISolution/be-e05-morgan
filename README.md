# An almost simple server in Express.js

This project will allow you to practise writing middleware for requests in Express.js

## What you will be doing

This project will allow you to practise using:

> Express.js

This project assumes you've already had experience with:

> JavaScript APIs (Math, Date)

## Tasks

## Task 1 - Getting ready

1. Initialise npm into your project
   `npm init -y`
2. Install the express.js npm package
   `npm i express`
3. Create a file for your server (`server.js`)

# Task 2 - Setting up your server

Use the snippet **starter code** to initialise your `server.js` file

# Task 3 - Add a GET request to '/hello'

Using the snippet **GET request middleware**, write some middleware that will respond to the path `/hello`

This middleware should return a `response` with a message of greetings.

# Task 4 - Add a GET request to '/time'

Using the snippet **GET request middleware**, write some middleware that will respond to the path `/time`

This middleware should return a `response` with the current time and date

> Research:
>
> [Date Object [en]](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date)
>
> [Date Object [de]](https://developer.mozilla.org/de/docs/Web/JavaScript/Reference/Global_Objects/Date)

# Task 5 - Add a GET request to '/random'

Using the snippet **GET request middleware**, write some middleware that will respond to the path `/random`

This middleware should return a `response` with the random number

> Research:
>
> [Math.random() [en]](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random)
>
> [Math.random() [de]](https://developer.mozilla.org/de/docs/Web/JavaScript/Reference/Global_Objects/Math/random)

# Task 6 - Add a GET request to '/isNumber'

Using the snippet **GET request middleware with parameters**, write some middleware that will respond to the path `/isNumber`

> Hint: Parameters can be added to a path with a `:` symbol, for example, to add the parameter `name` we would write `/:name/`

This middleware should receive one parameter `value`

This middleware should check that the parameter `value` can be converted to a number

If it can be converted to a number, then send a `response` with the message:
> "This is a number"

If it can not be converted to a number, then send a `response` with the message:
> "This is not a number"

> Hint: You can use both the Math function `Number()` and the `isNaN()` function to see if the value can be converted to a number or not

> Research:
>
> [Number() [english]](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number)
>
> [Number() [deutsch]](https://developer.mozilla.org/de/docs/Web/JavaScript/Reference/Global_Objects/Number)
>
> [isNaN() [english]](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/isNaN)
>
> [isNaN() [deutsch]](https://developer.mozilla.org/de/docs/Web/JavaScript/Reference/Global_Objects/isNaN)