const fitbitData = {
  totalSteps: 308727,
  totalMiles: 211.7,
  avgCalorieBurn: 5755,
  workoutsThisWeek: '5 of 7',
  avgGoodSleep: '2:13'
}

console.log(fitbitData.totalSteps) // 308727

// keys are converted to strings
const numbers = {
  100: 'one hundred',
  20: 'twenty',
  '42 scadoo': 'a phrase'
}

// the [20] will be converted into a string
console.log(numbers[20]) // 'twenty'
console.log(numbers['20']) // 'twenty'
console.log(numbers['42 scadoo']) // 'a phrase'

let nums = [1, 2, 3]
let mystery = [1, 2, 3]
// they may look the same, but are completely different in JS's mind
// - they are stored in completely different areas of memory, thus making them different no matter what
console.log(nums === mystery) // false
console.log(nums == mystery) // false

let moreNums = nums
console.log(nums === moreNums) // true
// bc it's being referenced, they are pointing to the same area of memory

//! so everytime you type [] or {} it's referring to a new place in memory
console.log({} === {}) // false

//! /////////////
//! Destructuring Objects -
// - in an array we would unpack based on position, with objects we unpack based on key/name of the property
//

const boss = {
  first: 'William',
  last: 'Brown',
  country: 'Argentina',
  title: 'Captain of the Argentine Navy'
}

// grab the properties you want
// - it'll find the property based off of the name and take the value and store it in that as a variable

// const { first, last } = boss
// console.log(first)
// console.log(last)

// meanwhile the original object is still unchanged
console.log(boss)

// we can give them new names
const { country: nation, title: honor } = boss
console.log(nation) // Argentina
console.log(honor) // Captain...

// we can also use the rest operator to collect everything else in a new variable

const { first, last, ...other } = boss
console.log(first)
console.log(last)
console.log(other) // {country: "Argentina", title: "Captain of the Argentine Navy"}

//! ///////////
//! Grab nest objects from arrays
// - not recommend that you go crazy with these nested destructures
//   -

const arrayOfCritters = [
  {
    first: 'Bufalo',
    last: 'Grunt',
    country: 'USA'
  },
  {
    first: 'Ike',
    last: 'The Coke Bear',
    country: 'Canada'
  },
  {
    first: 'Manny',
    last: 'de las Llaves',
    country: 'USA'
  }
]

// get canada
const [{ first: firstName }, { country }] = arrayOfCritters
console.log(country) //  Canada
console.log(firstName) // Bufalo

// - not recommend that you go crazy with these nested destructures

//! instead try a simpler, readable approach

const [, secondFavorite] = arrayOfCritters
// then from inside the second object
const { country: countryNation } = secondFavorite
console.log(countryNation) // Canada
