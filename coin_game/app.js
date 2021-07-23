// to make a performant game you would want to use canvas in the browser

// a function to tell if 2 objects are overlapping
function isTouching(a, b) {
  const aRect = a.getBoundingClientRect()
  const bRect = b.getBoundingClientRect()

  return !(
    aRect.top + aRect.height < bRect.top || //
    aRect.top > bRect.top + bRect.height ||
    aRect.left + aRect.width < bRect.left ||
    aRect.left > bRect.left + bRect.width
  )
}

const score = document.querySelector('#score span')
const avatar = document.querySelector('#player')
const coin = document.querySelector('#coin')

let currentScore = 0
score.innerText = currentScore

const scorePoint = () => {
  currentScore++
  score.innerText = currentScore
}

window.addEventListener('keyup', (e) => {
  if (e.key === 'ArrowDown' || e.key === 'Down') {
    moveVertical(avatar, 50)
  } else if (e.key === 'ArrowUp' || e.key === 'Up') {
    moveVertical(avatar, -50)
  } else if (e.key === 'ArrowRight' || e.key === 'Right') {
    moveHorizontal(avatar, 50)
    avatar.style.transform = 'scale(1, 1)'
  } else if (e.key === 'ArrowLeft' || e.key === 'Left') {
    moveHorizontal(avatar, -50)
    avatar.style.transform = 'scale(-1, 1)'
  }
  if (isTouching(avatar, coin)) {
    moveCoin()
    scorePoint()
  }
})

const moveVertical = (element, amount) => {
  const currentTop = extractPos(element.style.top)
  element.style.top = `${currentTop + amount}px`
}
const moveHorizontal = (element, amount) => {
  const currentLeft = extractPos(element.style.left)
  element.style.left = `${currentLeft + amount}px`
}

const extractPos = (pos) => {
  if (!pos) return 100
  return parseInt(pos.slice(0, -2))
}

const moveCoin = () => {
  const x = Math.floor(Math.random() * window.innerWidth)
  const y = Math.floor(Math.random() * window.innerHeight)
  coin.style.top = `${y}px`
  coin.style.left = `${x}px`
}

moveCoin()
