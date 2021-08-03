const durationInput = document.getElementById('duration')
const startButton = document.getElementById('start')
const pauseButton = document.getElementById('pause')

const timer = new Timer(durationInput, startButton, pauseButton, {
  //! the events we want to emit
  onStart() {
    console.log('timer started')
  },
  onTick() {
    console.log('tick!')
  },
  onComplete() {
    console.log('times up!')
  }
})
// when ^^^ this new Timer is made the event listener will be automatically set up for us
