//! rater limiter - apply any where we need to limit how often something should be invoked
const debounce = (func, delay = 1000) => {
  let timeoutId
  return (...args) => {
    // take all different args passed to the function
    // this will be called many times in a row
    if (timeoutId) {
      // first time this is called it will be undefined and skipped over
      // 2nd time, timeoutId will be defined and timeout cleared
      clearTimeout(timeoutId)
    }
    timeoutId = setTimeout(() => {
      // setTimeout returns a timer ID
      // then on further typing we set up a brand new one
      func.apply(null, args) // we'll apply our args - take the passed in args and apply them 1 by 1 to the original function
    }, delay) // in [delay] second call fetch data (default: 1000)
  }
}
