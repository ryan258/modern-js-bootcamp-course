//! we always want 'this' to result in an instance of the class

class Timer {
  constructor(durationInput, startButton, pauseButton) {
    // make them into variables so we can refer to them from other methods inside of our class
    this.durationInput = durationInput
    this.startButton = startButton
    this.pauseButton = pauseButton
    // so we can set up event handlers from our constructor
    this.startButton.addEventListener('click', this.start)
    // older projects will handle their this correction w/ .bind(this)
    //!- bind returns us a new function that we can call in the future, it doesn't run start right away
    // this.startButton.addEventListener('click', this.start.bind(this))
    this.pauseButton.addEventListener('click', this.pause)
  }

  // start() {
  // goal of tick methods is to start up the tick method and call it in so many intervals.
  start = () => {
    // console.log('time to start the timer! 🙌')
    // console.log(this) // this points at the button that was clicked
    this.tick()
    this.interval = setInterval(this.tick, 1000) // run the tick method every 1 second, but it won't start until the first delay passes, but we want the timer to start working right away. So we'll call this.tick manually right before
    // - when we call setInterval we get back an integerID that represents the running timer/running interval that will continue running the function again and again.
  }

  pause = () => {
    // if we need to stop the interval from running we can call another built in function called clearInterval(ID of the interval we want to stop)
    clearInterval(this.interval)
  }

  tick = () => {
    console.log('tick')
  }
}

const durationInput = document.getElementById('duration')
const startButton = document.getElementById('start')
const pauseButton = document.getElementById('pause')

const timer = new Timer(durationInput, startButton, pauseButton)
// when ^^^ this new Timer is made the event listener will be automatically set up for us
