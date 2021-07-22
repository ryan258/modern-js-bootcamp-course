let critters = ['Manny', 'Orson', 'Búfalo', 'Ralph', 'Otto']

console.log(critters.length) // 5
console.log(critters[1]) // 'Orson'
console.log(critters[critters.length - 1]) // 'Otto'

console.log(critters[3]) // 'Ralph'
critters[3] = 'Ike'
console.log(critters[3]) // 'Ike'

critters[critters.length] = 'Snowball' // adds 'Snowball' to the end of array
console.log(critters)
// but there's an easier way

//! ARRAY METHODS!
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array
critters.push('Garfield') // adds 'Garfield' to the end of array & returns a value of the new array length
//! .push MUTATES the array it's referencing
console.log(critters)
// array.pop() // takes a value from the end and returns it
const nextCritter = critters.pop()
console.log(nextCritter)

// array.shift() // removes items from front of array and returns it
// array.unshift(something) // adds an item to the front of array and returns the new length of the array

// includes() vs indexOf()
//! includes() is not available in IE!!!!

//! .reverse() mutates the array
//! .join('<sperator>') // reverse mutates the array as well
// - it will also turn nonstring values into strings

//! splice vs slice
// - slice makes a shallow copy and doesn't effect the original array
// - a negative number would count backwards
// - .slice() - passing it nothing - will make a copy of the entire array - a good quick way to do things in a non-destructive manner
let copy = critters.slice() // boom a copy

// splice(startIndex, [deleteCount], [whatever you want to insert])
// - you would use splice to grab something in the middle of an array, where pop or shift can't reach
// - but it is destructive

//! .sort()
console.log(critters.sort())
// - but it converts every value to a string, so we have to specify a better behavior - a compare function

//! /////////////
//! Destructuring  - short clean way to unpack..
// - values from an array ( specific values out of an array into variables )
// - properties from an object
// INTO DISTINCT VARIABLES
// - it's like spread where we can use it in different ways

const raceResults = ['Búfalo', 'Orson', 'Ike', 'That stupid bear...']

// const gold = raceResults[0]
// const silver = raceResults[1]
// const bronze = raceResults[2]

// uses order and is based on position
const [gold, silver, bronze] = raceResults
console.log(gold) // Búfalo
console.log(silver) // Orson

// we can also skip indexes
const [first, , , last] = raceResults
console.log(first)
console.log(last)

// we can use the rest operator ... to get the rest of the array
// - you can also add commas to skip items
const [winner, ...others] = raceResults
console.log(winner) // Bufalo
console.log(others) // ["Orson", "Ike", "That stupid bear..."]

//! ////////////////////////
//! Destructuring Parameters - if we put it in the ()s of a function definition
// - this will then extract, unpack, values from the arguments passed in
//   - so you're expecting an array to be passed in as an argument and it can contain a lot of stuff
//   - but you can name JUST the things you want to extract by their position
// - you'll see destructuting far more often w/ objects

const response = ['HTTP/1.1', '200 OK', 'application/json']

function parseResponse([protocol, statusCode, contentType]) {
  console.log(`Status: ${statusCode}`)
}

parseResponse(response) // Status: 200 OK
