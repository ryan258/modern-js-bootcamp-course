//! /////////////////
//! Key Events:
// - keypress - there must be a character
// - keyup
// - keydown - counts shift and more than character keys too

//- making a capital B
// Key Down: Shift
// Key Down: B
// Key Press: B
// Key Up: B
// Key Up: Shift

const input = document.getElementById('username')

input.addEventListener('keypress', function (e) {
  console.log('Key Press:', e.key)
})
input.addEventListener('keyup', function (e) {
  console.log('Key Up:', e.key)
})
input.addEventListener('keydown', function (e) {
  console.log('Key Down:', e.key)
})

//! /////////////////
//! The Event Object
/*document.body.addEventListener('keypress', (e) => {
  console.log(e)
})
*/
//! ///////////////////////
//! Events on Multiple Elements
// - best way is to use a loop!

/*const colors = ['red', 'orange', 'yellow', 'green', 'blue', 'purple', 'indigo', 'violet']

const printColor = function () {
  const colorHeader = document.querySelector('#colorHeader')
  // 'this' will refer to the object that's calling it
  // console.log(`clicked a ${this.style.backgroundColor} box!`)
  colorHeader.style.backgroundColor = this.style.backgroundColor
  colorHeader.textContent = this.style.backgroundColor
}

const container = document.querySelector('#boxes')

for (let color of colors) {
  console.log(color)
  const box = document.createElement('div')
  box.classList.add('box')
  box.style.backgroundColor = color
  container.appendChild(box)
  // Todo 1 - Add event listener
  box.addEventListener('click', printColor)
}

document.body.appendChild(container)
*/

//! ///////////////////////
//! Impossible Button Demo
/*const impossibleButton = document.getElementById('impossibleButton')

impossibleButton.addEventListener('mouseover', () => {
  // console.log('boo!')
  const randomHeight = Math.floor(Math.random() * window.innerHeight)
  const randomWidth = Math.floor(Math.random() * window.innerWidth)

  impossibleButton.style.left = `${randomWidth}px`
  impossibleButton.style.top = `${randomHeight}px`
})

impossibleButton.addEventListener('click', () => {
  impossibleButton.innerText = "🤗 I'm alive! 🤗"
  document.body.style.backgroundColor = 'rgba(0,255,0,.2)'
})*/

//! ///////////////////////
//! Clicker Button

/* const clickerBtn = document.getElementById('clicker')

// the name you pass it is essentially the lowercase name without the 'on-'
clickerBtn.addEventListener('click', () => {
  alert('beep')
})
*/
