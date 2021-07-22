//! functions are crucial to JS's identity as a language

/*
function goToFunkyTown() {
  console.log('You are')
  console.log('going to')
  console.log('Funky Town!')
}

goToFunkyTown()
*/

//! generate die roll

function rollDie() {
  const randomNumber = Math.ceil(Math.random() * 6)
  console.log(randomNumber)
}

function throwDice() {
  rollDie()
  rollDie()
  rollDie()
}
/*
throwDice()
throwDice()
*/
//! arguments
function rollDieTimes(times = 1) {
  for (var i = 0; i < times; i++) {
    rollDie()
  }
}

// rollDieTimes(9)

//! return
// - functions usually need to return a value
const shout = 'hello'.toUpperCase()
// ^^ this returns HELLO
//    and stores it in the shout variable

// - you can only return 1 thing from a function
// -- or, when you return something, it should only be 1 value
// -- return (executed) stops the execution of the rest of the function

// -- a return won't just halt one code block, but the entire function

//! CHALLENGE 1: isValidPasswordFunction
// function isValidPassword(password, username) {
//   if (
//     password.length > 7 && //
//     password.indexOf(' ') === -1 && //
//     password.indexOf(username) === -1
//   ) {
//     //
//     console.log('beep')
//     return true
//   }
//   console.log('boop')
//   return false
// }

function isValidPassword(password, username) {
  if (password.length < 8) {
    return false
  }
  if (password.indexOf(' ') !== -1) {
    return false
  }
  if (password.indexOf(username) !== -1) {
    return false
  }
  return true
}

isValidPassword('somepassword', 'username')
isValidPassword('somepasswordusername', 'username')

//! CHALLENGE 2: GET AVG of an ARRAY of NUMBERS
function avg(arr) {
  let total = 0
  // for (let num in arr) {
  for (let num of arr) {
    // console.log(arr[num])
    total += num
  }
  return total / arr.length
}

console.log(avg([0, 100])) // 50
console.log(avg([0, 5, 10, 5, 0, 10])) // 5

//! CHALLENGE 3: PANGRAM
// - checks to see if every letter of the alphabet is used
// const alphabet = ['a', 'b', 'c']
// nah, loop over a string
function isPangram(text) {
  for (let char of 'abcdefghijklmnopqrstuvwxyz') {
    // console.log(char)
    if (text.toLowerCase().indexOf(char) === -1) {
      // return 'Not a Pangram'
      return false
    }
  }
  // return 'Is a pangram!!! :D'
  return true
}
/*
console.log(isPangram('The five boxing wizards jump quickly'))
console.log(isPangram('The five boxing wizards jump quick'))
*/

//! CHALLENGE 4: GET A RANDOM PLAYING CARD

function pick(arr) {
  // return random element from array
  const idx = Math.floor(Math.random() * arr.length)
  return arr[idx]
}

function getCard() {
  const cardValues = [2, 3, 4, 5, 6, 7, 8, 9, 10, 'J', 'Q', 'K', 'A']
  const cardSuits = ['clubs', 'spades', 'hearts', 'diamonds']

  return { value: pick(cardValues), suit: pick(cardSuits) }
}

getCard()

// const cardValues = [2, 3, 4, 5, 6, 7, 8, 9, 10, 'J', 'Q', 'K', 'A']
// const cardSuits = ['clubs', 'spades', 'hearts', 'diamonds']

// function getCard() {
//   const value = cardValues[Math.floor(Math.random() * cardValues.length)]
//   // console.log(value)
//   const suit = cardSuits[Math.floor(Math.random() * cardSuits.length)]
//   // console.log(suit)
//   const card = {
//     value,
//     suit
//   }
//   console.log(card)
// }

// getCard()

//! ////////
//! Default Params
function greet(name, greeting = 'Howdy') {
  console.log(`${greeting}, ${name}`)
}

greet('Manny')
greet('Manny', 'Hello')

//! ////////
//! Spread for Function Calls
// - not supported in IE
// - spread is all about expending iterables into a destination
// - allows an iterable to be expanded in places where 0 or more ... (depending on the context)
//   - ... args are expected (for function calls)
//   - ... elements are expected (for array literals)
//   - ... obj expression are expected (for obj)

// spread for function calls
const nums = [1, 2, 3, 40, 30]
console.log(Math.max(nums)) // NaN - it just sees a single array as the arg
console.log(Math.max(...nums)) // 40 - same as calling Math.max(1, 2, 3, 40, 30)

// strings are also iterables

//! ////////
//! Spread for Array Literals
// - just makes a copy of an array, unique references, not ===
//   - but does not go multiple levels deep
// - allows us to combine arrays
// - works like concat, doesn't change the originals
const nums1 = [1, 2, 3]
const nums2 = [1, 2, 3].reverse()
const superNums = [...nums1, ...nums2]
console.log(superNums) // [1, 2, 3, 3, 2, 1]

// 2 ways of doing the same thing
const letters = 'do you want a coke?'.split('')
console.log(letters)
const letters2 = [...'do you want a coke?']
console.log(letters2)

//! ////////
//! Spread for Object Literals
// - also good for cloning an object so you don't have the same reference
// - the only context where you can spread an object is into another object
//   - but you can spread an array/string into an object, it's keys will just come from the indexes

const canine = {
  family: 'canine',
  furry: true,
  legs: 'four'
}

const dog = {
  ...canine,
  legs: 4
}

console.log(dog) // { family: "canine", furry: true, legs: 4 }
// the last value overrides the prev ----------------------^ order matters

// we can also create array literals that also contain object literals where we use spread in different contexts - CONTEXT MATTERS

const randomArray = [...'beep', { ...dog }]
console.log(randomArray) // ['b','e','e','p', { family: "canine", furry: true, legs: 4 }]

//! ////////
//! REST operator - it's like to opposite of spread
// - instead of spreading data it actually collects things down into a single array
// - so it's used when we want to make functions that accept an unlimited/variable number of args

// Math.max(...rest) is a good example bc it receives any number of args
Math.max(1, 2, 3, 4, 5, 6, 7)

// OLD WAY
// so how to write code for a function that takes any number of arguments
// - arguments includes everything passed in
// - DOES NOT WORK W/ ARROW FUNCTIONS
// - in every function we have access to somethings called "arguments"
//   - it's a special name
//   - kinda looks like an array, but it's NOT A REAL ARRAY - doesn't have those array methods
//     - so, no .reduce()
//   - but it has indices and WE CAN LOOP OVER IT w/a FOR LOOP

function sumOldWay() {
  // console.log(arguments)
  const argsArray = [...arguments]
  // console.log(argsArray)
  return argsArray.reduce((total, curVal) => {
    return total + curVal
  })
}

console.log(sumOldWay(1, 2, 3)) // 6

// NEW WAY
// - all (remaining) args will be collected
// - is a REAL ARRAY!
// - you can use it in an arrow function!

// function sumNewWay(...nums) {
//   console.log(nums)
// }
// console.log(sumNewWay(11, 22, 33)) // [11, 22, 33]

function sumNewWay(...nums) {
  return nums.reduce((total, curVal) => {
    return total + curVal
  })
}

console.log(sumNewWay(11, 22, 33)) // 66

// we can also use REST to collect the remaining arguments (the ones that haven't been matched w/ a parameter)

function fullName(first, last, ...nameTitles) {
  let titles = []
  nameTitles.forEach((title) => {
    titles.push(title)
  })
  return `${first} ${last} ${titles.join(', ')}`
}

const manny = fullName('Manny', 'The Manatee', 'Critter', 'Esq.')

console.log(manny) // Manny The Manatee Critter, Esq.

// const multiply = (...nums) => {
//   return nums.reduce((total, curVal) => {
//     return total * curVal
//   })
// }

// andwe can shorten it to a double implicit return
const multiply = (...nums) => nums.reduce((total, curVal) => total * curVal)

console.log(multiply(1, 6, 5)) // 30

//! ////////////////////////
//! Destructuring Parameters - if we put it in the ()s of a function definition
// - this will then extract, unpack, values from the arguments passed in
//   - so you're expecting an object to be passed in as an argument and it can contain a lot of stuff
//   - but you can name JUST the things you want to extract by their property names and use them
// - you'll see destructuting far more often w/ objects than arrays

const theManny = {
  first: 'Manny',
  last: 'del Mar',
  country: 'USA',
  title: 'with Flippers'
}

function print({ first, country }) {
  console.log(`${first} from ${country}`)
}

print(theManny) // Manny from USA
