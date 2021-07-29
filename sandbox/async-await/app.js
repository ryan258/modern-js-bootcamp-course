//! ///// NEAT TOOL ///

//! //////////////////////////////////////////////////////////////////
//! Quick Over View of Async Functions
//- It's just syntactic sugar for promises.
//  (it doesn't give us anything new)
//- axios.get() will return a pending promise
//- we need to use .then() for code that relies on the value being returned
//! by the end of the section we'll be doing the following w/o .then() but w/ async & await instead

//! Promises/.then() Approach
/*function getData() {
  const data = axios.get('https://swapi.dev/api/planets/').then((data) => {
    console.log(data) // we get the data
  })
  console.log(data) // promise pending
}

getData()*/

//! //////////////////////////////////////////////////////////////////
//! The Async Keyword - "A nice way to return a promise"
//! Always goes in front of the function
//- Async functions always return a promise
//! if the function returns a value, the promise will be resolved with that value
//- if the function throws an error, the promise will be rejected with that error
//  raise a rejection
//  trigger a catch

/*async function greet() {
  return 'hello!'
}

greet() // returns a promise (<fulfilled>: "hello")
greet().then((val) => console.log('promise resolved with', val)) // promise resolved with hello!

//! return a promise that is not resolved
async function add(x, y) {
  if (typeof x !== 'number' || typeof y !== 'number') {
    throw 'x and y must be numbers'
  }
  return x + y
}

add(1, 'q') // gets a rejected promise
add('e', 'r')
  .then((val) => console.log('promise RESOLVED with', val))
  .catch((err) => {
    console.log('promise REJECTED with', err)
  })

//! Doing this the old way
function addOld(x, y) {
  //! async spares us from having to write new Promise, reject(throw)/resolve(return)
  return new Promise((resolve, reject) => {
    if (typeof x !== 'number' || typeof y !== 'number') {
      reject('x and y must be numbers')
    }
    resolve(x + y)
  })
}

// addOld('e', 'r')
addOld(1, 2) // promise RESOLVED with 3
  .then((val) => console.log('promise RESOLVED with', val))
  .catch((err) => {
    console.log('promise REJECTED with', err)
  })
  */

//! //////////////////////////////////////////////////////////////////
//! The Await keyword - no need to nest things w/ callbacks
//! await will pause execution of the function, and wait for the promise to be resolved (won't need a .then())
//- can only be used inside of an async function

//! old way w/ .then()
/*function getPlanets() {
  return axios.get('https://swapi.dev/api/planets/')
}

getPlanets().then(({ data }) => {
  console.log(data)
})
*/

//! cool way w/ async/await
/*async function getPlanets() {
  const res = await axios.get('https://swapi.dev/api/planets/')
  // await pauses the execution until the promise is resolved
  console.log(res.data) // then this executes and logs the data
}

getPlanets()
*/

//! //////////////////////////////////////////////////////////////////
//! Error Handling in Async Functions
//- option 1 - chain on a .catch()
//- option 2 - add a try catch block in the async function

//! option 1 - chain on a .catch() - catches multiple potential errors
//? here you can have multiple functions that are returning promises and .then()s and the callback in .catch() will run for any of them if the promise is rejected
/*async function getPlanets() {
  const res = await axios.get('https://swapi.dev/api/planetsss/')
  // await pauses the execution until the promise is resolved
  console.log(res.data) // then this executes and logs the data
}

getPlanets().catch((err) => {
  console.log('In catch:', err)
})
*/

//! option 2 - add a try catch block in the async function
//? this will catch any errors within this single async function

/*async function getPlanets() {
  try {
    const res = await axios.get('https://swapi.dev/api/planets/')
    // await pauses the execution until the promise is resolved
    console.log(res.data) // then this executes and logs the data
  } catch (error) {
    console.log('try/catch error:', error)
  }
}

getPlanets()
*/
//! //////////////////////////////////////////////////////////////////
//! Multiple Awaits
//- spares us all the .then()s and unnecessary callbacks

/*const btn = document.getElementById('aaBtn')
const moveX = (el, amount, delay) => {
  return new Promise((resolve, reject) => {
    // logic to move the width of the screen
    setTimeout(() => {
      const bodyBoundary = document.body.clientWidth
      const elRight = el.getBoundingClientRect().right
      const currLeft = el.getBoundingClientRect().left

      if (elRight + amount > bodyBoundary) {
        // console.log('done! 👻 cannot go through walls...')
        reject({ bodyBoundary, elRight, amount }) // things to send to the catch error
      } else {
        el.style.transform = `translateX(${amount + currLeft}px)`
        resolve()
      }
    }, delay)
  })
}

async function animateRight(el, amt) {
  // since moveX returns a promise we can await it
  await moveX(el, amt, 1000)
  await moveX(el, amt, 1000)
  await moveX(el, amt, 1000)
  await moveX(el, amt, 1000)
  await moveX(el, amt, 1000)
  await moveX(el, amt, 1000)
  await moveX(el, amt, 1000)
}

animateRight(btn, 100).catch((err) => {
  console.log('looks like we hit a wall Jim', err)
  animateRight(btn, -100)
})
*/

//! refactored usage
// moveX(btn, 200, 2000)
//   .then(() => moveX(btn, 100, 2000))
//   .then(() => moveX(btn, 100, 2000))
//   .then(() => moveX(btn, 100, 2000))
//   .then(() => {
//     console.log('here comes the final move!')
//     return moveX(btn, 200, 1000)
//   })
//   .catch((err) => console.log(err, 'or out of space, cannot move 🤬'))

//? Old way w/ regular promise syntax
//! refactored w/ .then()

/*const btn = document.getElementById('aaBtn')
const moveX = (el, amount, delay) => {
  return new Promise((resolve, reject) => {
    // logic to move the width of the screen
    setTimeout(() => {
      const bodyBoundary = document.body.clientWidth
      const elRight = el.getBoundingClientRect().right
      const currLeft = el.getBoundingClientRect().left

      if (elRight + amount > bodyBoundary) {
        // console.log('done! 👻 cannot go through walls...')
        reject({ bodyBoundary, elRight, amount }) // things to send to the catch error
      } else {
        el.style.transform = `translateX(${amount + currLeft}px)`
        resolve()
      }
    }, delay)
  })
}
//! refactored usage
moveX(btn, 200, 2000)
  .then(() => moveX(btn, 100, 2000))
  .then(() => moveX(btn, 100, 2000))
  .then(() => moveX(btn, 100, 2000))
  .then(() => {
    console.log('here comes the final move!')
    return moveX(btn, 200, 1000)
  })
  .catch((err) => console.log(err, 'or out of space, cannot move 🤬'))
*/
//! //////////////////////////////////////////////////////////////////
//! Parallel vs Sequential Requests
//! If you don't need then to happen in order, do them in parallel!
//- by default the await requests will happen in sequence
//  (one finishes completely before the next one starts)

//! Sequential requests
//! slightly slower to do it in sequence than it would be in parallel
/*async function getThreePokemon() {
  const charmander = await axios.get('https://pokeapi.co/api/v2/pokemon/4')
  const charmeleon = await axios.get('https://pokeapi.co/api/v2/pokemon/5')
  const charizard = await axios.get('https://pokeapi.co/api/v2/pokemon/6')
  console.log(charmander.data)
  console.log(charmeleon.data)
  console.log(charizard.data)
}

getThreePokemon()
*/

//! Parallel requests
//! good if you do not care what order they finish in, then it's better to do them in parallel
// - remove the awaits
/*async function getThreePokemon() {
  // we're not using await anymore when we send off the requests
  const charmanderPromise = axios.get('https://pokeapi.co/api/v2/pokemon/4')
  const charmeleonPromise = axios.get('https://pokeapi.co/api/v2/pokemon/5')
  const charizardPromise = axios.get('https://pokeapi.co/api/v2/pokemon/6')
  // now the requests are being sent off at roughly the same time
  // console.log(charmanderPromise) // contains a PENDING promise
  //! vvv Now they're not depending on one finishing before the next, to each their own
  const charmander = await charmanderPromise
  const charmeleon = await charmeleonPromise
  const charizard = await charizardPromise
  console.log(charmanderPromise) // contains a FULFILLED promise
  //! vvv and now we have access to all of them
  console.log(charmander.data)
  console.log(charmeleon.data)
  console.log(charizard.data)
}

getThreePokemon()

function changeBodyColor(color, delay) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      document.body.style.backgroundColor = color
      resolve()
    }, delay)
  })
}
*/

//! Cleaner example
//! - in sequence
/*async function lightShow() {
  await changeBodyColor('red', 1000)
  await changeBodyColor('green', 1000)
  await changeBodyColor('blue', 1000)
  await changeBodyColor('yellow', 1000)
}
*/
//! - in parallel - they'll all run roughly around the same time
/*async function lightShow() {
  const color1 = changeBodyColor('red', 1000)
  const color2 = changeBodyColor('green', 1000)
  const color3 = changeBodyColor('blue', 1000)
  const color4 = changeBodyColor('yellow', 1000)
  await color1
  await color2
  await color3
  await color4
}
*/

// lightShow()

//! //////////////////////////////////////////////////////////////////
//! Refactoring w/ Promise.all
//! A clean way to run multiple things in parallel and resolves when all the promises resolve.
//- Promise.all()
//  - excepts an array of promises
//  - returns an array of resolved promises

function printPokemon(arr) {
  arr.forEach((pokemon) => {
    console.log(pokemon.data.name)
  })
}

async function getThreePokemon() {
  // we're not using await anymore when we send off the requests
  const charmanderPromise = axios.get('https://pokeapi.co/api/v2/pokemon/4')
  const charmeleonPromise = axios.get('https://pokeapi.co/api/v2/pokemon/5')
  const charizardPromise = axios.get('https://pokeapi.co/api/v2/pokemon/6')
  // now the requests are being sent off at roughly the same time
  // console.log(charmanderPromise) // contains a PENDING promise
  //! vvv Now they're not depending on one finishing before the next, to each their own
  // const charmander = await charmanderPromise
  // const charmeleon = await charmeleonPromise
  // const charizard = await charizardPromise
  const results = await Promise.all([charmanderPromise, charmeleonPromise, charizardPromise])
  console.log(charmanderPromise) // contains a FULFILLED promise
  //! vvv and now we have access to all of them
  // console.log(charmander.data)
  // console.log(charmeleon.data)
  // console.log(charizard.data)
  console.log(results)
  printPokemon(results)
}

getThreePokemon()
