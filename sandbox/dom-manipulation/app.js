// query/selectors return objects

const h1 = document.querySelector('h1')
console.log(h1)
console.log(h1.innerText)

const ul = document.querySelector('ul')
console.log(ul.innerText) // gets all the text inside, ignoring tags, ie <li>

const body = document.body.innerText
console.log(body) // gets all the text from the web page

// we can change things by assigning new values
// - even though we'd want to typically do this in response to an event

//! innerText - just the text, no formatting, no tags, no hidden text
// - usually you always want to use innerText

h1.innerText = 'Manny was here!'
console.log(h1)
// ul.innerText = 'I AM A BIG UL!' // replace all the <li>'s w/ that innerText

//! textContent - the text, formatting, AND script text - and hidden things
// - but textContent is faster than innerText as it doesn't have to calculate what to show and not show
h1.textContent = 'Orson was here!'
// h1.innerText += '<b>?</b>' // interprets all text no tag

//! innerHTML - get all the text and html inside an element
// - can use it to update the inside of an element
//   as it will parse the string to figure out the elements
//   - and it will create new DOM objects in the process
// - so this takes more time than innerText bc if its HTML parsing to DOM
const form = document.querySelector('#form')
console.log(form)
console.log(form.innerHTML) // all inner content as a single string

console.log(ul.innerText)
console.log(ul.innerHTML)
// - can use it to update the inside of an element
// form.innerHTML = '<h1>beep</h1>'

h1.innerText += ' 👻'

//! value, src, href, ...

const inputs = document.querySelectorAll('input')
console.log(inputs) // a NodeList of the 5 input elements
console.log(inputs[4].value) // Log Hamster In
// the checkbox - has the property "checked"
console.log(inputs[2].checked) // false
// get a value
console.log(inputs[0].value) // Scrapper
// set a value
inputs[0].value = 'Scooty'
console.log(inputs[0].value) // Scooty
// reset a form element
inputs[0].value = ''
// slider
console.log(inputs[3].value) // 300

console.log(inputs[1].placeholder) // Password
inputs[1].placeholder = 'Please enter password'
console.log(inputs[1].placeholder) // Please enter password

const a = document.querySelector('a')
console.log(a)
// a.href = 'http://drupal.org'

// and you can do the same w/ src...

//! getAttribute & setAttribute
// - some attributes don't have their own special methods so we use these
// - if attribute you're looking for doesn't exist it will return null
const range = document.querySelector('input[type="range"]')
console.log(range)
// pass in the name of the attribute you want the value for
console.log(range.getAttribute('step')) // 50

range.setAttribute('min', '-100')

//! find parent/children/sibling methods
// -

const firstLI = document.querySelector('li')
console.log(firstLI)
// .parentElement
console.log(firstLI.parentElement) // gets the <ul> obj
console.log(firstLI.parentElement.parentElement) // gets the <body>
// .children
const theUL = document.querySelector('ul')
console.log(theUL.children) // HTML Collection of the 3 li's
console.log(theUL.children[0]) // get the first <li> obj
console.log(theUL.children[0].innerText) // thing #1
// .nextElementSibling
console.log(firstLI.nextElementSibling) // we get the 2nd li
const thirdLI = firstLI.nextElementSibling.nextElementSibling
console.log(thirdLI) // we get the 3rd li
// .previousElementSibling
console.log(thirdLI.previousElementSibling)
console.log(thirdLI.previousElementSibling.previousElementSibling)

//! changing multiple elements
// - Step 1: Select
// - Step 2: Loop
// iterate over an object and then call whatever method or change wtev prop

/*const allLisInList2 = document.querySelectorAll('li')

for (let i = 0; i < allLisInList2.length; i++) {
  // console.log(allLisInList2[i].innerText)
  allLisInList2[i].innerText = `beep #${i}`
}

for (let li of allLisInList2) {
  li.innerHTML = 'beep.... <b>beep?</b>'
}
*/

//! Altering Styles
// - we can use style to change properties and they'll be effected on the page, but we can't read existing styles unless those properties are defined inline
console.log(h1.style) // see all the style props we can alter that's empty

h1.style.color = 'red'
const p = document.querySelector('p')
p.style.color = 'white'
p.style.backgroundColor = 'black'

/*// looping multiple style elements
const colors = ['red', 'orange', 'yellow', 'green', 'blue', 'purple', 'black', 'gold']

allLisInList2.forEach((li, i) => {
  const color = colors[i]
  li.style.color = color
})

// for (let i = 0; i < allLisInList2.length; i++) {
//   li.style.color = colors[i]
// }
*/

//! getComputedStyle - get the final calculated styles
// key/value pairs w/ ALL current values (including hover and other states)!
const li = document.querySelector('li')
// console.log(li)
const liStyles = getComputedStyle(li)
// console.log(liStyles)

//! manipulating classes - a much better way to manipulate multiple styles at once

const todosList = document.querySelector('#todos')
console.log(todosList)
const todo = document.querySelector('.todo')
// todo.setAttribute('class', 'done') // overrides (replaces) all the classes
// .classList - holds our classes and has methods to use w/it
console.log(todo.classList) // DOMTokenList of classes

todo.classList.remove('done')
todo.classList.remove('done')
todo.classList.remove('done')
todo.classList.add('done')
todo.classList.toggle('done')
todo.classList.toggle('done')
todo.classList.toggle('done')

//! creating elements
// - Step 1: Make new element
// - Step 2: Fill in the blanks

const newH1 = document.createElement('h1') // we've created a new obj
console.dir(newH1)
newH1.innerText = "I'm the title now!"
newH1.classList.add('special')
console.log(newH1) // we see the dom node
// now we need to put it into the DOM some how...

// appendChild(thingToAppend) - we put on a parent we want to append a child into - it will append to the end of the children
const section = document.querySelector('section')
section.appendChild(newH1)

// let's make an img
const newImg = document.createElement('img') // an HTMLImageElement
newImg.src = 'https://images.unsplash.com/photo-1583900985737-6d0495555783?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTB8fGJpa2luaXxlbnwwfHwwfHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60'
newImg.style.maxWidth = '100%'

console.log(newImg)

document.body.appendChild(newImg)

// make a video link
const newLink = document.createElement('a')
newLink.innerText = 'Calabria'
newLink.href = 'https://www.youtube.com/watch?v=APtj3EvhfWA'

p.appendChild(newLink)

//! Append, Preprend, & insertBefore

const parentUL = document.querySelector('.parentUL')
console.log(parentUL)

const newLI = document.createElement('li')
newLI.innerText = '@--/---'

// appendChild - appends as the last child of a parent element
// parentUL.appendChild(newLI)
// prependChild - prepends as the first child of a parent element
// parentUL.prependChild(newLI)

const firstCoolLI = document.querySelector('.parentUL li')

// insert an li at the top of the list
// - insertBefore(thingToInsert, beforeThisElement)
console.log(firstCoolLI)
// parentUL.insertBefore(newLI, firstCoolLI)

const lastCoolLI = document.querySelector('.parentUL li.lastLI')
parentUL.insertBefore(newLI, lastCoolLI)

const iTag = document.createElement('i')
iTag.innerHTML = 'I am the i tag of your dreams!'

const theFirstPTag = document.querySelector('p')
theFirstPTag.insertAdjacentElement('beforebegin', iTag)

// vv with these we can insert multiple elements at once
// append
// firstCoolLI.append(iTag, firstCoolLI)
// prepend
// firstCoolLI.prepend(iTag, firstCoolLI)

//! removeChild & remove
// ul.removeChild(thingToRemove)
// - this also returns the removed element incase you want to put it in a variable

// remove
// - doesn't need the parent node
const h1x = document.querySelector('h1')
h1x.remove() // goodbye h1
