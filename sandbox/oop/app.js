//! ///// NEAT TOOL ///

//! //////////////////////////////////////////////////////////////////
//! What are Prototypes? -- They're like a TEMPLATE OBJECT
//! BDT: Having a single object contain common props and methods that other copies, objects, can look up to find their common properties
//- .prototype - is the actual object
//- __proto__  - is a reference
//? https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Objects/Object_prototypes
//- Prototypes are the mechanism by which JavaScript objects inherit features from one another
//  - all the inherent functions of a data type are defined on, and available via the __proto__
//    - which are shared from the original Array prototype that contains all the methods
//  - each array has a REFERENCE to the PROTOTYPE that has all the METHODS via __PROTO__
//    - console.dir(body)
//  - Objects that typically contain a bunch of methods
//    - that can create multiple objects that share the same prototype so they all have access to the same methods, w/o having to have their own copy

//! even though strings are primitives, they get intermediate object wrappers that contain all the string methods, via string prototype
//!!!!! THE FOLLOWING IS NOT A GOOD IDEA, DON'T USE THIS PATTERN !!!!!!

/*// we can add our own method
String.prototype.beep = () => {
  alert('bEEp!')
}

console.log(String.prototype) // we'll find beep

const robot = 'Bender'
robot.beep() // alert box beeps...

// you can also add on a new property
String.prototype.makeNoise = function () {
  // console.log(this)
  // console.log(this.toUpperCase())
  return `${this.toUpperCase()}!!!!!`
}

// 'boop'.makeNoise() // clgs a String{"boop"} w/ each letter in an index
// to after .toUpperCase()
// BOOP

'blip bloop flop'.makeNoise() // "BLIP BLOOP FLOP!!!!!"

//! we can also override methods, replacing the existing .pop()
Array.prototype.pop = function () {
  return 'pop!'
}
*/

//! //////////////////////////////////////////////////////////////////
//! An Intro to OOP
//- It all has to do w/ organizing our code, designing an structuring our applications by breaking things up into distinct patterns of objects.
//- the idea of having repeatable recipe for other objects to be created based off of is central to everything in this OOP section
//- we've seen this before in making xhr requests - new XMLHttpRequest() // new obj w/ props and methods already baked in
//! - console.dir(document.querySelector('h1)) - proto is HTMLHeadingElement

//! //////////////////////////////////////////////////////////////////
//! Factory Functions - building up an object (not really the preferred way, see next approach)
//- we pass in some values and the factory makes us an object and returns it at the end so you can use it
// - makes a function which would automatically have hex() and rgb() methods
//   and stores the r, g, and b values as properties on the object

/*function hex(r, g, b) {
  return '#' + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1)
}
hex(255, 100, 25) // "#ff6419" // which is rgb(255, 100, 25)
function rgb(r, g, b) {
  return `rgb(${r}, ${g}, ${b})`
}
rgb(255, 100, 25) // "#ff6419"
*/

/*function makeColor(r, g, b) {
  const color = {}

  color.r = r
  color.g = g
  color.b = b

  color.rgb = function () {
    console.log(this)
    const { r, g, b } = this
    return `rgb(${r}, ${g}, ${b})`
  }

  color.hex = function () {
    const { r, g, b } = this
    return '#' + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1) // converts to base16 at some point
  }

  return color
}

const firstColor = makeColor(35, 255, 150)
// you can also change a value
// firstColor.r = 255
// "this" will look at the object for its args
console.log('.rgb:', firstColor.rgb())
console.log('.hex:', firstColor.hex())
*/

//! //////////////////////////////////////////////////////////////////
//! Constructor Functions - better, more efficient than the factory approach
//- https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/new
//? Why is the factory pattern not commonly used?
// - Every time you make a new color object and each unique copy is added to each color object.
//   - so each color object has a unique rgb and hex function, and this can lead to perf issues
//!- there's no reason for each object to have a unique copy of the function itself
// - capital letter for a function name indicates its a constructor function that create objects

//! How new works in creating an object
//  1) Creates a blank, plain JavaScript object.
//  2) Adds a property to the new object (__proto__)
//     that links to the constructor function's prototype object
//     - Note: Properties/objects added to the construction function prototype are therefore
//       accessible to all instances created from the constructor function (using new).
//  3) Binds the newly created object instance as the this context
//     (i.e. all references to this in the constructor function now refer to the object created in the first step).
//  4) Returns this if the function doesn't return an object.

// so it adds all the this business BTS
//! remember that you don't want to use arrow functions for these because of the 'this'
/*function Color(r, g, b) {
  this.r = r
  this.g = g
  this.b = b
}
// and we can also add methods to the prototype by defining it on the prototype
Color.prototype.rgb = function () {
  // console.log(this)
  const { r, g, b } = this
  return `rgb(${r}, ${g}, ${b})`
}
Color.prototype.hex = function () {
  // console.log(this)
  const { r, g, b } = this
  return '#' + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1)
}
Color.prototype.rgba = function (a = 1.0) {
  const { r, g, b } = this
  return `rgba(${r}, ${g}, ${b}, ${a})`
}

// and this will refer to the NEW object that is created for us, while being referenced to the original method on the prototype instead of the instance

const color1 = new Color(255, 40, 100)
console.log('Color #1:', color1.rgb()) // Color object -> [[prototype]] -> rgb: fn
color1.rgb()
const color2 = new Color(0, 0, 0)
console.log('Color #2:', color2.hex())
color2.hex()
const color3 = new Color(40, 255, 60)
console.log('Color #3:', color2.hex())
document.body.style.backgroundColor = color3.rgba()

// color1.hex === color2.hex // true
*/

//! //////////////////////////////////////////////////////////////////
//! JS Classes - Syntactical Sugar - a better way to build
//- center everything in a single class statement, no free floating Color.prototype.whatevers = to worry about

/*class Color {
  // constructor runs immediately whenever a new color is created
  constructor(r, g, b, name) {
    // console.log('Inside Constructor:', r, g, b)
    // set values to the new object
    this.r = r
    this.g = g
    this.b = b
    this.name = name
  }

  greet() {
    console.log(this.name)
    return `Hello from ${this.name}`
  }
  innerRGB() {
    const { r, g, b } = this
    return `${r}, ${g}, ${b}`
  }

  rgb() {
    return `rgb(${this.innerRGB()})`
  }
  rgba(a = 1.0) {
    return `rgba(${this.innerRGB()}, ${a})`
  }
  hex() {
    // console.log(this)
    const { r, g, b } = this
    return '#' + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1)
  }
}

// and this will refer to the NEW object that is created for us, while being referenced to the original method on the prototype instead of the instance

const c1 = new Color(255, 67, 89, 'Tomato')
console.log('c1:', c1.rgb()) // Color object -> [[prototype]] -> rgb: fn
c1.rgb()
c1.greet()
const c2 = new Color(0, 0, 0)
console.log('c2:', c2.hex())
c2.hex()
const c3 = new Color(40, 255, 60)
console.log('c3:', c3.hex())
document.body.style.backgroundColor = c3.rgba()
*/

//! //////////////////////////////////////////////////////////////////
//! More Practice w/ Classes
/*class Color {
  // constructor runs immediately whenever a new color is created
  constructor(r, g, b, name) {
    // console.log('Inside Constructor:', r, g, b)
    // set values to the new object
    this.r = r
    this.g = g
    this.b = b
    this.name = name
    // we can call a method from the constructor and have it call automatically and will tag on its own new h,s,l properties
    this.calcHSL()
  }

  greet() {
    console.log(this.name)
    return `Hello from ${this.name}`
  }
  innerRGB() {
    const { r, g, b } = this
    return `${r}, ${g}, ${b}`
  }

  rgb() {
    return `rgb(${this.innerRGB()})`
  }
  rgba(a = 1.0) {
    return `rgba(${this.innerRGB()}, ${a})`
  }
  hex() {
    // console.log(this)
    const { r, g, b } = this
    return '#' + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1)
  }
  hsl() {
    const { h, s, l } = this
    return `hsl(${h}, ${s}%, ${l}%)`
  }
  fullySaturated() {
    const { h, l } = this
    return `hsl(${h}, 100%, ${l}%)`
  }
  opposite() {
    const { h, s, l } = this
    const newHue = (h + 180) % 360
    return `hsl(${newHue}, ${s}%, ${l}%)`
  }
  calcHSL() {
    let { r, g, b } = this

    // make r g b fractions of 1
    r /= 255
    g /= 255
    b /= 255

    // find greatest and smallest channel values
    let cmin = Math.min(r, g, b),
      cmax = Math.max(r, g, b),
      delta = cmax - cmin,
      h = 0,
      s = 0,
      l = 0

    if (delta == 0) h = 0
    else if (cmax == r)
      // red is max
      h = ((g - b) / delta) % 6
    else if (cmax == g)
      // green is max
      h = (b - r) / delta + 2
    // blue is max
    else h = (r - g) / delta + 4

    h = Math.round(h * 60)
    //Make negative hues positive behind 360'
    if (h < 0) h += 360
    //calc lightness
    l = (cmax + cmin) / 2
    // calc saturation
    s = delta == 0 ? 0 : delta / (1 - Math.abs(2 * l - 1))

    // multiply s and l by 100
    s = +(s * 100).toFixed(1)
    l = +(l * 100).toFixed(1)

    this.h = h
    this.s = s
    this.l = l
  }
}

const white = new Color(255, 255, 255, 'white')
const red = new Color(255, 0, 0, 'red')
*/

//! //////////////////////////////////////////////////////////////////
//! Extends, Super, and Subclasses(inheritance - sharing functionality between classes)
//- We extend the functionality from the parent through the child classes.
//- you can override methods on child classes by declaring the same name as the one from parent
//! super() - sometimes you want to rely on the exact same constructor from your superclass, but you wanted to add assitional info

class Pet {
  constructor(name, age) {
    this.name = name
    this.age = age
  }

  eat() {
    return `${this.name} is eating!`
  }

  meow() {
    return 'MeoW'
  }
}

class Cat extends Pet {
  // constructor(name, age) {
  //   this.name = name
  //   this.age = age
  // }

  //! using super
  constructor(name, age, livesLeft = 9) {
    super(name, age) //! brings in the parent properties, so you don't have to manually duplicate all the same stuff again
    this.livesLeft = livesLeft // add the new prop
  }

  // eat() {
  //   return `${this.name} is eating!`
  // }

  meow() {
    return 'MeoW'
  }
}

class Dog extends Pet {
  // constructor(name, age) {
  //   this.name = name
  //   this.age = age
  // }

  // eat() {
  //   return `${this.name} is eating!`
  // }

  woof() {
    return 'w00f!'
  }
  // override parent method
  eat() {
    return `${this.name} loves kibbles and bits!`
  }
}
