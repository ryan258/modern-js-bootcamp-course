//! SHORTHAND SYNTAX
/*const getStats = (arr) => {
  const max = Math.max(...arr)
  const min = Math.min(...arr)
  const sum = arr.reduce((sum, item) => sum + item)
  const avg = sum / arr.length
  // so we want to return an object that contains all these steps
  // return {
  //   max: max,
  //   // ...
  // }
  //! but we can just use the shorthand syntax! - just doesn't work in IE
  return { max, min, sum, avg }
}

const reviews = [4.5, 5.0, 3.44, 2.8, 3.5, 4.0, 3.5]

const stats = getStats(reviews)

console.log(stats)
*/

//! COMPUTED PROPERTIES
// - just an oimprovement for the object literal syntax
// - add a property w/ a dynamic key
// --- it's pretty common you'll want to have a dynamic key in an object

// const role = 'host'
// const person = 'The Manny'
// const role2 = 'director'
// const person2 = 'Orson'

// old way
/*const team = {}
team[role] = person
console.log(team) // {host: "The Manny"}
team[role2] = person2
console.log(team) // {host: "The Manny", director: "Orson"}
*/

// the new way w/ computed properties!

/*const user = 'Ike'
const userRoles = {
  [user]: 'Admin',
  [person2]: role2,
  [1 + 6 + 9]: 'sixteen'
}
console.log(userRoles) // {16: "sixteen", Ike: "Admin", Orson: "director"}

// create a function that returns an object w/ a new key, value in it
//! old way
// const addProp = (obj, k, v) => {
//   const objCopy = { ...obj }
//   objCopy[k] = v
//   return objCopy
// }

//! new way
const addProp = (obj, k, v) => {
  return {
    ...obj,
    [k]: v
  }
}

console.log(addProp(userRoles, 'búfalo', 'supervisor')) // {16: "sixteen", Ike: "Admin", Orson: "director", búfalo: "supervisor"}
*/

//! ////////////
//! Adding methods to objects
// - we can add a function to a variable
// - but when we add a function to an object it becomes a method
// - it's a nice way of grouping functions together in a container
//   think Math in Math.random()

/*// exp: .toUpperCase() is a method!
'hello'.toUpperCase() // HELLO

// there are multiple ways to add a method
const add = function (x, y) {
  return x + y
}

const math = {
  numbers: [1, 2, 3, 4, 5],
  add, // the object property shorthand way
  multiply: function (x, y) {
    return x * y
  }
}

console.log(math.numbers) // [1, 2, 3, 4, 5]

// w/o using ()'s you're only referencing the method, not executing it

// both are calling the same function that is in memory, just in different ways when we're using the shorthanded add
math.add(3, 4)
add(3, 4)

math.multiply(4, 5)
*/

//! ////////////
//! Method Shorthand Syntax

/*const auth = {
  username: 'MannyBot',
  login() {
    console.log('logged in!')
  },
  logout() {
    console.log('logged out!')
  }
}*/

//! ////////////
//! Intro to the 'this' keyword
// - this is a reference to the current execution scope
//!  it will give you an object back!
//   - (depending on the scope and rules, that object changes)
//     - it tends to be a shapeshifter

//!! global scope
//!  - it could be a reference to the global scope (like alert() or variables declared w/ var (let and const aren't))

/*function sayHi() {
  // this becomes a method on the Window object, aka global scope
  console.log('hi!')
  console.log(this) // Window object, the browser's global scope
}

// same works for a function expression
const greet = function () {
  console.log(this)
}

console.log(greet()) // logs out the Window object
*/

//!! object scope / the current execution scope
//! ///////////////////////
//! Using 'this' in methods
// - and that makes methods like their own self-contained little worlds

const critter = {
  first: 'The',
  last: 'Manny',
  nickName: 'he who waves flippers vigorously',
  fullName() {
    console.log(this) // logs out this method's parent object instance (critter) - THE OBJECT ITSELF - THE INSTANCE!
    // {first: "The", last: "Manny", nickName: "he who waves flippers vigorously", fullName: ƒ}
    console.log(this.last)
    console.log(`${this.first} ${this.last} AKA ${this.nickName.toUpperCase()}`)
    // can also be a good case for destructuring
    const { first, last, nickName } = this
    // console.log(`${first} ${last} AKA ${nickName.toUpperCase()}`)
    return `${first} ${last} AKA ${nickName.toUpperCase()}`
  },
  printBio() {
    console.log(this)
    const fullName = this.fullName()
    console.log(`${fullName} doesn't mess around :: waves flippers ::`)
  },
  laugh: () => {
    console.log(this) // points to the window
    console.log(`${this.nickName} laughs...`) // undefined laughs
  }
}

critter.fullName() // The Manny AKA HE WHO WAVES FLIPPERS VIGOROUSLY
critter.printBio() // The Manny AKA HE WHO WAVES FLIPPERS VIGOROUSLY doesn't mess around :: waves flippers ::

//! ///////////////
//! THIS: Invocation Context
// - invocation context - means the value will change depending on how the function is actually executed, not just where you write it
//!   - so this in the critter object above doesn't guarantee that it'll reference that object!
//      it depends on how you're calling it
//! SO THINK OF IT AS: IF THERE IS SOMETHING TO THE LEFT AND THEN A DOT AND THEN YOU ARE EXECUTING THE FUNCTION -- 'this' will be set to that thing to the left
// --- if there is nothing to the left, it will be set to the global execution scope, the Window object
// --- so generally when you call a method you're going to be using the dot syntax

// ----- in addition there are 3 special methods
// - called
// - apply
// - bind
// ----- but these will come up later with classes and prototypes

//! finally ARROW FUNCTIONS - (see laugh method on critter)
// - arrow functions don't get their own version of 'this'
// - reason: if you only use regular traditional functions, sometimes you'll run into issues

// calling it like critter.printBio() will make the this in .printBio() point to the critter object
//! here's an example of how we can change the value of this

// 1 reference the function
const printBio = critter.printBio
// so now the new printBio is pointing to the printBio in the object
critter.printBio() // this is referencing the critter object
// 2 call the function vv
// printBio() //! it is referencing the window
// TypeError: this.fullName is not a function

//! demonstrating arrow function methods
critter.laugh() // undefined laughs

//! ///////////////
//! Annoyomatic Demo - Why do arrow functions not get their own 'this'!?
//                   - and how can that sometimes be useful?
// - so they can be useful when you don't want a new this, usually working within a method
// - but they suck as methods

const annoyer = {
  phrases: ['literally', 'cray cray', 'YOLO', 'Totes!', 'as if'],
  pickPhrase() {
    const { phrases } = this
    const idx = Math.floor(Math.random() * phrases.length)
    return phrases[idx]
  },
  start() {
    // console.log(this.pickPhrase()) // random phrase
    // console.log(this) // current object
    // inside a method we can call this
    //! first attempt - doesn't work
    /*setInterval(function () { // this function is being run by setInterval, hence a different 'this'
      console.log(this.pickPhrase()) // TypeError: this.pickPhrase is not a fn
      console.log(this) // Window object
      // but for this function we don't want it to have its own this
      console.log('beepbeepbeep')
    }, 3000)*/
    //! second attempt - the old way
    // - with call, bind, apply there are other ways of getting this to work
    /*const that = this
    setInterval(function () {
      console.log(that.pickPhrase())
      console.log(that)
      console.log('beepbeepbeep')
    }, 3000)*/
    //! third attempt - the new way via arrow functions
    // vvv you can also add things to this!
    this.timerId = setInterval(() => {
      console.log(this.pickPhrase())
      // console.log(this)
      // console.log('beepbeepbeep')
    }, 3000)
  },
  //!!! also when it comes to setInterval it's best practice to something from repeating indefinitely
  // - so we can save the return value from setInterval() and then we can call clearInterval(timer) to stop and clean it up
  stop() {
    clearInterval(this.timerId)
    console.log('thank goodness it is over! 🥳')
  }
}

// annoyer.start()
// annoyer.stop()
