// let, const, var are all function scoped
// let, const are also block scoped - {}

// lexical scope - if a variable isn't in the current scope it will look to its parent and it doesn't work the other way around

// function expressions are the ones stored in a variable
// - you can still give the function itself a name, but not often useful
const square = function (num) {
  return num * num
}
// square(7) // 49
// console.dir(square) // shows an object full of function details

// higher order functions - functions are objects!
// - we can store functions in an array

function laugh() {
  console.log('mwahahaha')
}

function beep() {
  console.log('beep')
}

// vv functions accepting other functions as arguments
function callTwice(func) {
  func()
  func()
}

function repeatNTimes(action, num) {
  for (let i = 0; i < num; i++) {
    action()
  }
}

callTwice(laugh)
repeatNTimes(laugh, 5)

function pickOne(f1, f2) {
  let rand = Math.random()
  console.log(rand)
  rand < 0.5 ? f1() : f2()
}

pickOne(laugh, beep)

// vv functions that return functions
// - "function factories"
// -- the function itself returns another function

function multiplyBy(num) {
  // return a function expression - and this will be captured in a variable
  return function (x) {
    // console.log('hello!')
    return x * num // the num is taking advantage of lexical scope
  }
}

const triple = multiplyBy(3) // num = 3 and x = 5
triple(5) // 15

const double = multiplyBy(2)
double(4) // 8

function makeBetweenFunc(min, max) {
  //! PARAMETERS to CREATE THE NEW FUNCTION ^^
  return function (num) {
    //! PARAMETERS for USING the NEW FUNCTION ^^
    // return min <= num && num <= max ? console.log('in range') : console.log('not in range')
    return min <= num && num <= max
  }
}

const canDrink = makeBetweenFunc(21, 100)
canDrink(21) // true
canDrink(20) // false

const isChild = makeBetweenFunc(0, 18)
isChild(17) // true
isChild(42) // false

//////////////////////
//! CALLBACK FUNCTIONS
// - every time we pass a function to another function and it's executed in that function, it's a callback
// - super common in JS
// - we usually use anonymous functions when we can them, usually we just need a one time use function

setTimeout(() => {
  console.log('beep boop')
}, 2000)

setTimeout(function () {
  console.log('cha cha cha')
}, 4000)

const btn = document.querySelector('button')
btn.addEventListener('click', beep)

////////////
//! HOISTING
// - all variables are declared (without their defined values)
//   and moved to the top of the script
// - then it is assigned a value in it spot on the script

// so to avoid it
// - always declare/initialize your variables before you use them

// let & const
//! - don't hoist! - they're not hoisted

//! HOISTING - FUNCTIONS
// - you can call a function before you declare it
// - think of them as being put at the top of your file
// --

// but if we write our function using a function expression
// v we get an error - the variable gets hoisted, but the function value hasn't been defined yet
// - error applies to let, const, var
hoot()
let hoot = function () {
  console.log('hoot!')
}
