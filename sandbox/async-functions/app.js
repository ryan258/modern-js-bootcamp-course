//! ///// NEAT TOOL ///

//! //////////////////////////////////////////////////////////////////
//! Intro to AJAX
// - in chrome dev tools see what's happening in Network -> XHR
// - JS makes a call BTS to the server to update the page w/o having to do a page refresh

//! //////////////////////////////////////////////////////////////////
//! JSON & XML
// - https://en.wikipedia.org/wiki/XML
//   - XML is tag based, very HTML like syntax
// - JSON a format for sending data, XML was just the old way
//   - https://jsonformatter.curiousconcept.com/
//   - it is not exactly javascript, it just really looks like it, + the quotes around keys thing
//     - can be used via multiple languages - it'll just parse it in its own way
//   - it can't store complicated things, like functions, just Data
//   - when calling an API it will usually respond back w/ JSON data for us to use

//! //////////////////////////////////////////////////////////////////
//! XMLHttpRequests: The Basics
//-- https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest
// - XHR = XML HTTP Requests
// - original way of sending requests via JS - used to be the only way
// - can send for any sort of data from an API
// - clunky syntax
//   - doesn't support promises
//   - so we end up w/ a lot a callbacks and nested requests
// - part of the response will be this.responseText

//! Example Request
/*function reqListener () {
  console.log(this.responseText);
}

var oReq = new XMLHttpRequest();
oReq.addEventListener("load", reqListener);
oReq.open("GET", "http://www.example.org/example.txt");
oReq.send();
*/

/*//! Request to SWAPI
//! 1.) Make req obj
const firstReq = new XMLHttpRequest()
//! 2.) Load data and get access to .responseText -- a string
firstReq.addEventListener('load', function () {
  console.log('It worked! 😱')
  // console.log(firstReq.responseText)
  //! 3.) Parse data into a JSON object that our JS can work with
  const data = JSON.parse(this.responseText)
  console.log(data)
  //! 4.) Now we can go manipulate things w/ JS
  for (let planet of data.results) {
    console.log(planet.name)
  }
})
firstReq.addEventListener('error', () => {
  console.log('ERROR! ')
})
firstReq.open('GET', 'https://swapi.dev/api/planets')
firstReq.send() // this takes time so the browser handles it and JS marches on
console.log('Request sent') // appears before 'It worked' in the load event listener
*/

//! //////////////////////////////////////////////////////////////////
//! XMLHttpRequests: A Better Way to Fetch
// - where things get really annoying is making requests dependent on each other
// - We'll make a request for a planet, then look at its residents, and make requests for them
//   - so for starters we'll have to write our code inside the callback

/*//! Request to SWAPI
const firstReq = new XMLHttpRequest()
firstReq.addEventListener('load', function () {
  console.log('First request for PLANET worked! 😱')

  const data = JSON.parse(this.responseText)
  //! 1.) Single out the data we want to request
  //! a single planet
  console.log(data.results[0])
  //! 2.) Get the thing inside it with the things
  // console.log(data.results[0].films[0])
  const filmUrl = data.results[0].films[0]
  //! 3.) Make a film request
  const filmReq = new XMLHttpRequest()
  filmReq.addEventListener('load', function () {
    console.log("Second request for planet's FILM worked! 😱")
    // console.log(this) // references the entire film request
    const filmData = JSON.parse(this.responseText)
    console.log(filmData)
  })
  filmReq.addEventListener('error', function (e) {
    console.log('filmReq Error', e)
  })
  //! 4.) Fire off a req for the related film
  filmReq.open('GET', filmUrl)
  filmReq.send()
  // console.log(data)
  // for (let planet of data.results) {
  //   console.log(planet.name)
  // }
})
firstReq.addEventListener('error', () => {
  console.log('ERROR! ')
})
firstReq.open('GET', 'https://swapi.dev/api/planets')
firstReq.send()
console.log('Request sent')
*/

//! //////////////////////////////////////////////////////////////////
//! A Better Way: Fetch!
//? The fetch() method takes one mandatory argument, the path to the resource you want to fetch. It returns a Promise that resolves to the Response to that request — as soon as the server responds with headers — even if the server response is an HTTP error status. You can also optionally pass in an init options object as the second argument
// - https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API
// - a newer way of making requests via JS
// - supports promises!
// - not supported in IE - the only problem...
//! how it works
//  - we pass an a url -- it runs and is pending
//    - the content returned will be a readableStream that needs to be parsed into something
//  - and that returns a promise
//    - which is either resolved or rejected
//      - if resolved, the value it responds w/ is a response object
//        w/ all the info about the response
//  - we have catch for when things go wrong and a reject occurs
//?    - The Promise returned from fetch() won’t reject on HTTP error status even if the response is an HTTP 404 or 500. Instead, it will resolve normally (with ok status set to false), and it will only reject on network failure or if anything prevented the request from completing.
//  - if you throw an error, it will trigger .catch()
//!  - axios comes in so we don't have to worry about the status code business

/*fetch('https://swapi.dev/api/planets')
  .then((res) => {
    //! this will run if it gets any sort of response, even a 404 or 500
    console.log(res) // oh it's byte data, a difference from XHRs
    // console.log(res.json()) // but this is an async operation and takes time and will need to resolve, so this responds w/ a PROMISE and we'll need another .then()
    if (!res.ok) {
      // console.log('ERROR!!! NOT STATUS 200', res.status)
      throw new Error(`Status code Error: ${res.status}`)
    } else {
      // only attempt parsing if status comes back 200
      res.json().then((data) => {
        console.log(data)
        // now we can do JS things to the data
        for (let planet of data.results) {
          console.log(planet.name)
        }
      })
    }
  })
  .catch((err) => {
    // will only run if something is wrong with the connection
    console.log('Something went wrong w/ fetch:', err)
  })
  */

// //! XHR Approach (pre fetch)
// const firstReq = new XMLHttpRequest()
// firstReq.addEventListener('load', function () {
//   console.log('First request for PLANET worked! 😱')

//   const data = JSON.parse(this.responseText)
//   //! 1.) Single out the data we want to request
//   //! a single planet
//   console.log(data.results[0])
//   //! 2.) Get the thing inside it with the things
//   // console.log(data.results[0].films[0])
//   const filmUrl = data.results[0].films[0]
//   //! 3.) Make a film request
//   const filmReq = new XMLHttpRequest()
//   filmReq.addEventListener('load', function () {
//     console.log("Second request for planet's FILM worked! 😱")
//     // console.log(this) // references the entire film request
//     const filmData = JSON.parse(this.responseText)
//     console.log(filmData)
//   })
//   filmReq.addEventListener('error', function (e) {
//     console.log('filmReq Error', e)
//   })
//   //! 4.) Fire off a req for the related film
//   filmReq.open('GET', filmUrl)
//   filmReq.send()
//   // console.log(data)
//   // for (let planet of data.results) {
//   //   console.log(planet.name)
//   // }
// })
// firstReq.addEventListener('error', () => {
//   console.log('ERROR! ')
// })
// firstReq.open('GET', '')
// firstReq.send()
// console.log('Request sent')

//! //////////////////////////////////////////////////////////////////
//! Chaining Fetch Requests
// - the main selling point of fetch
// - w/ promises we can keep everything on 1 level, or we can nest them

/*fetch('https://swapi.dev/api/planets')
  .then((res) => {
    //! this will run if it gets any sort of response, even a 404 or 500
    // console.log(res) // oh it's byte data, a difference from XHRs
    // console.log(res.json()) // but this is an async operation and takes time and will need to resolve, so this responds w/ a PROMISE and we'll need another .then() -- as long as we RETURN from the previous .then()
    if (!res.ok) {
      // console.log('ERROR!!! NOT STATUS 200', res.status)
      throw new Error(`Status code Error: ${res.status}`)
    } else {
      // only attempt parsing if status comes back 200
      return res.json()
    }
  })
  .then((data) => {
    //! FETCHED ALL THE PLANETS
    // console.log(data)
    // now we can do JS things to the data
    // for (let planet of data.results) {
    //   console.log(planet)
    //   console.log(planet.name)
    // }
    // console.log(data.results[0].films[0])
    const filmURL = data.results[0].films[0]
    //! fire off another fetch for that film
    return fetch(filmURL)
  })
  .then((res) => {
    if (!res.ok) {
      throw new Error(`Status code Error: ${res.status}`)
    } else {
      return res.json()
    }
  })
  .then((data) => {
    //! FETCHED FIRST FILM OF FIRST PLANET
    console.log(data) // the movie details!
    console.log(data.title)
  })
  .catch((err) => {
    // will only run if something is wrong with the connection
    console.log('Something went wrong w/ fetch:', err)
  })
  */

//! //////////////////////////////////////////////////////////////////
//! Refactoring Fetch Chains
// - in order for .then() to work it needs to be following returned promises
// - Promise.resolve(data) - creates a resolved promise for you to pass along to the next .then()

/*const checkStatusAndParse = (res) => {
  if (!res.ok) {
    throw new Error(`Status code Error: ${res.status}`)
  } else {
    return res.json() // returning a promise is key!
  }
}

const printPlanets = (data) => {
  console.log('Loaded 10 more planets')
  for (let planet of data.results) {
    console.log(planet.name)
  }
  return Promise.resolve(data.next)
}

const fetchNextPlanets = (url = 'https://swapi.dev/api/planets') => {
  // const nextURL = url
  // return fetch(nextURL)
  return fetch(url)
}

fetchNextPlanets()
  .then(checkStatusAndParse)
  .then(printPlanets)
  .then(fetchNextPlanets)
  .then(checkStatusAndParse)
  .then(printPlanets)
  .catch((err) => {
    // will only run if something is wrong with the connection
    console.log('Something went wrong w/ fetch:', err)
  })
  */

//! //////////////////////////////////////////////////////////////////
//! An Even Better Way: Axios
// - most popular HTTP request library
// - https://github.com/axios/axios
// - https://axios-http.com/
// - it uses fetch BTS so it's not giving us anything we can't already do

// 1) DON'T HAVE TO PARSE JSON - there's a data prop that's already been parsed for us
// 2) DON'T HAVE TO MANUALLY THROW ERRORS also we don't have to worry about handling status codes

// - then it's pretty much the same

/*const res = axios
  .get('https://swapi.dev/api/planets/')
  .then((res) => {
    // there's a data prop that's already been parsed for us, saving us a promise
    console.log(res.data)
  })
  .catch((err) => {
    // 404 will trigger an error and a catch by default
    console.log('CATCH fired!')
    console.log(err)
  })
  */

//! //////////////////////////////////////////////////////////////////
//! Sequential Axios Requests
// - using Axios to use multiple chained requests
// - we basically don't have to check for a status code and parse

const fetchNextPlanets = (url = 'https://swapi.dev/api/planets/') => {
  return axios.get(url)
}

const printPlanets = ({ data }) => {
  console.log(data)
  for (let planet of data.results) {
    console.log(planet.name)
  }
  // return axios.get(data.next)
  return Promise.resolve(data.next)
}

fetchNextPlanets()
  .then(printPlanets)
  .then(fetchNextPlanets)
  .then(printPlanets)
  .then(fetchNextPlanets)
  .then(printPlanets)
  .then(fetchNextPlanets)
  .then(printPlanets)
  .catch((err) => {
    console.log('CATCH fired:', err)
  })
