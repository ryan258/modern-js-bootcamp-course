const durationInput = document.getElementById('duration')
const startButton = document.getElementById('start')
const pauseButton = document.getElementById('pause')
const circle = document.querySelector('circle')

// Calculate the parameter
const perimeter = circle.getAttribute('r') * 2 * Math.PI
circle.setAttribute('stroke-dasharray', perimeter)

// let currentOffset = 0
let duration

const timer = new Timer(durationInput, startButton, pauseButton, {
  //! the events we want to emit
  onStart(totalDuration) {
    console.log('timer started')
    duration = totalDuration
  },
  onTick(timeRemaining) {
    console.log('tick!')
    circle.setAttribute('stroke-dashoffset', (perimeter * timeRemaining) / duration - perimeter)
  },
  onComplete() {
    console.log('times up!')
  }
})
// when ^^^ this new Timer is made the event listener will be automatically set up for us
