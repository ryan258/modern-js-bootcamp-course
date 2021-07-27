//! ///// NEAT TOOL /// http://latentflip.com/loupe /// FOR PLAYING W/ CALL STACK and you can see things taking place in your console!

//! ////////////
//! The Call Stack
// - it's like a book mark that keeps track of where you are
//! - last thing in => is the first thing out

//! ////////////
//! Debugging in Chrome
// - in the Sources tab, click a number to add a break point
//   - the reload
//   - pay mind to the call stack
//   - click down arrow to move through the code process

//! ////////////
//! JS is Single Threaded
// - at any given point in time, that single JS thread is running at most one line of JS code
// - so we use call backs that the browser puts on our call stack when the time comes

/*console.log('i happen first')
alert('i am happening!') // this stops the thread, blocks the interpreter from moving on to the next line
console.log('i happen second')
*/

// - somethings just take time, like making a call to an API
//! but we have a way around this!

//! ////////////
//! How Async Callbacks Actually Work
//? how does JS remember to keep track of the timer while it moves on if it's single threaded?
//! - the trick is that the browser does the work! (JS is not the same as browser, which is usually written in C++)
//   - JS is not setting a time, or sending the request to the API
//   - browsers have web api's that can handle certain task in the background
//     - so JS will just pass time consuming things off to the browser
//       - like 'please remind me when 3 seconds have passed, when your done, give me the callback function back'
//     - meanwhile the JS doesn't get hung up and keeps on chugging, unblocked
//!     - when the 3 seconds is up (AND THE CALLSTACK IS EMPTY!!!!!!!)
//!       - browser takes the callback function and puts it on the call stack
//!     - ^^^ +++ When the call stack is EMPTY! +++ ^^^

/*console.log('i happen first')
setTimeout(() => {
  // "Times up JS run this callback now." - Love, Browser
  console.log('I print after 3 seconds (third)')
}, 3000)
console.log('i happen second')
*/

//! ////////////
//! Callback Hell
// - callbacks aren't perfect, they can get messy quickly.
//!- promises allow us to skip all this ugliness and makes things so much easier to read.

// const btn = document.getElementById('cbHellBtn')

/* setTimeout(() => {
  btn.style.transform = `translateX(100px)`
  setTimeout(() => {
    btn.style.transform = `translateX(200px)`
    setTimeout(() => {
      btn.style.transform = `translateX(300px)`
      setTimeout(() => {
        btn.style.transform = `translateX(200px)`
        setTimeout(() => {
          btn.style.transform = `translateX(100px)`
          setTimeout(() => {
            btn.style.transform = `translateX(0px)`
          }, 1000)
        }, 1000)
      }, 1000)
    }, 1000)
  }, 1000)
}, 1000)
*/

// ok the above is bad... maybe we can try a function

/*const moveX = (el, amount, delay, onSuccess, onFailure) => {
  // logic to move the width of the screen
  const bodyBoundary = document.body.clientWidth
  const elRight = el.getBoundingClientRect().right

  const currLeft = el.getBoundingClientRect().left

  if (elRight + amount > bodyBoundary) {
    console.log('done! 👻 cannot go through walls...')
    onFailure()
  } else {
    setTimeout(() => {
      el.style.transform = `translateX(${amount + currLeft}px)`
      onSuccess()
    }, delay)
  }
}
*/

// moveX(btn, 100, 1000, () => moveX(btn, 100, 1000, () => moveX(btn, 100, 1000, () => moveX(btn, 100, 1000, () => moveX(btn, 100, 1000, () => moveX(btn, 1200, 1000))))))

/*moveX(
  btn,
  100,
  1000,
  () => {
    // success
    moveX(
      btn,
      400,
      1000,
      () => {
        // success
        moveX(
          btn,
          700,
          1000,
          () => {
            console.log("there's screen left?!")
          },
          () => {
            console.log('?@#!@$?! my toe!')
          }
        )
      },
      () => {
        // fail
        console.log('cannot move further!!!')
      }
    )
  },
  () => {
    // fail
    console.log('cannot move further...')
  }
)

console.log(document.body.clientWidth)
*/

//!- promises allow us to skip all this ugliness and makes things so much easier to read.

//! ////////////
//! Introducing Promises! - a value that you will have, in time...
//  - an object representing the eventual completion or failure of an async operation
//  - we attach callbacks to these promises

// 1.) Create a Promise
//     - promises will always have 2 params that take functions
//       - resolve -
//       - reject
// before a promise resolves or is rejected it is //! pending!
// - not fulfilled nor broken
// 2.) Every Promise has a //! .then()
// - which will run if our promise resolves
// 3.) Finally at the end of a promise we have //! .catch()
// - this will run if the promise is rejected

/*const willGetYouADog = new Promise((resolve, reject) => {
  const rand = Math.random()
  if (rand < 0.5) {
    resolve()
  } else {
    reject()
  }
})

willGetYouADog.then(() => {
  console.log('yay a dog!')
})

willGetYouADog.catch(() => {
  console.log('no dog 😱')
})
*/

//! but these logs will happen instantly so we don't really need to use Promises, let's step this up to need promises.

//! //////////////////////////////////////////////////////////////////
//! Returning Promises w/ Functions

/* //! make a function that returns a promise (instead of assigning a promise to a variable)
const makeDogPromise = () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const rand = Math.random()

      if (rand < 0.5) {
        resolve()
      } else {
        reject()
      }
    }, 5000)
  })
}

//! by chaining only one or the other will run (resolve, rejected)
makeDogPromise()
  .then(() => {
    console.log('yay a dog!')
  })
  .catch(() => {
    console.log('no dog 😱')
  })
*/

//! //////////////////////////////////////////////////////////////////
//! Resolving / Rejecting w/ Values
// - you can reject/resolve w/ a value (bc you most often, want to)
//!  - then you will have access to that value in your callback

/*const fakeReq = (url) => {
  return new Promise((resolve, reject) => {
    // "executor function"
    setTimeout(() => {
      const pages = {
        '/users': [
          { id: 1, username: 'Ike' },
          { id: 2, username: 'Orson' }
        ],
        '/about': 'this is the about page'
      }
      //! check to see if 'url' exists
      const data = pages[url]
      if (data) {
        resolve({ status: 200, data })
      }

      reject({ status: 404 })
    }, 3000)
  })
}
//! pass data - if the parameter doesn't a url it'll catch the error 'reject'
fakeReq('/users')
  .then((res) => {
    console.log('req worked!')
    console.log(res.data)
  })
  .catch((res) => {
    console.log('bleh... req failed')
    console.log(res.status)
  })
*/

//! //////////////////////////////////////////////////////////////////
//! The Delights of Promise Chaining
//  - make a second follow up request using info from the first!
//    it's a pretty common pattern to have teasers that lead to more info.
//  - We need a call to happen AFTER the first call finishes

// - In this eample we'll use the first call to get something and use a part of that to get the other thing.
//!   - So we'll get the top post of a specific user.

//? 0.) The Data
/* const pages = {
  '/users': [
    { id: 1, username: 'Ike' },
    { id: 2, username: 'Orson' }
  ],
  '/users/1': {
    id: 1,
    username: 'Ike',
    upvotes: 360,
    city: 'Lisbon',
    topPostId: 454321
  },
  '/users/2': {
    id: 2,
    username: 'Orson',
    upvotes: 571,
    city: 'Buenos Aires'
  },
  '/posts/454321': {
    id: 454321,
    title: 'Do You Want a Coke?'
  },
  '/about': 'this is the about page'
}
*/

/*//? 1.) Make a Promise function
const fakeReq = (url) => {
  return new Promise((resolve, reject) => {
    // "executor function"
    setTimeout(() => {
      //! check to see if 'url' exists
      const data = pages[url]

      if (data) {
        resolve({ status: 200, data })
      }

      reject({ status: 404 })
    }, 2000)
  })
}
*/

//? 2.) Chain off of the promise data to do multiple things (ie requests) in order.
//! Less than optimal way to use .then() - nesting... callback hell...
// - the catch won't catch errors in anything but top-level 'then'
/* fakeReq('/users')
.then((res) => {
  // console.log(res.data[0].id)
  const id = res.data[0].id
  // we'll set up another call to happen after the first one finishes
  fakeReq(`/users/${id}`).then((res) => {
    console.log('user obj', res) // log out Ike obj
    const topPostId = res.data.topPostId
    fakeReq(`/posts/${topPostId}`).then((res) => {
      console.log('users top post obj', res) // log out Ike's topPost obj
    })
  })
})
.catch((err) => {
  console.log('OMG an Error:', err)
})
*/

//! The Optimal Way - Chaining .then() - writes in a much more linear way! 🥳
//  The .then() is put on the Promise and returns another Promise
//  - the next .then() will run after the previous one resolves
//  - what is returned in put in the res of the following .then()
//  Finally if at any part of the .then() chain errors out, it drops straight to the catch. It's like a catch-all.

/*fakeReq('/users')
  .then((res) => {
    console.log('initial res (/users):', res) // log out list of users
    const id = res.data[0].id // get the ID of the first user in the array
    return fakeReq(`/users/${id}`) // returns a promise, w/ first array user's data
  })
  // we'll set up another call to happen after the first one finishes
  .then((res) => {
    // res = the user's data
    console.log('user obj (/users/1):', res) // log out Ike obj
    const topPostId = res.data.topPostId // grab that user's topPostId
    return fakeReq(`/posts/${topPostId}`) // returns a promise w/ a complete res for topPost
  })
  // we'll set up another call to happen after the second one finishes
  .then((res) => {
    // res = the user's topPost
    console.log('users top post obj (posts/454321):', res) // log out Ike's topPost obj
  })
  // if at any part of the .then() chain errors out, it drops straight to the catch and the error message will point to the part of the chain where things went belly up.
  .catch((err) => {
    console.log('OMG an Error:', err)
  })
  */

//! ////////////
//! Callback Hell -> Refactored w/ Promises! 🤗
// - callbacks aren't perfect, they can get messy quickly.
//!- promises allow us to skip all this ugliness and makes things so much easier to read.

//! original
// const btn = document.getElementById('cbHellBtn')
// const moveX = (el, amount, delay, onSuccess, onFailure) => {
//   // logic to move the width of the screen
//   const bodyBoundary = document.body.clientWidth
//   const elRight = el.getBoundingClientRect().right

//   const currLeft = el.getBoundingClientRect().left

//   if (elRight + amount > bodyBoundary) {
//     console.log('done! 👻 cannot go through walls...')
//     onFailure()
//   } else {
//     setTimeout(() => {
//       el.style.transform = `translateX(${amount + currLeft}px)`
//       onSuccess()
//     }, delay)
//   }
// }

//! refacroted w/ .then()
const btn = document.getElementById('cbHellBtn')
const moveX = (el, amount, delay) => {
  return new Promise((resolve, reject) => {
    // logic to move the width of the screen
    setTimeout(() => {
      const bodyBoundary = document.body.clientWidth
      const elRight = el.getBoundingClientRect().right
      const currLeft = el.getBoundingClientRect().left

      if (elRight + amount > bodyBoundary) {
        // console.log('done! 👻 cannot go through walls...')
        reject({ bodyBoundary, elRight, amount }) // things to send to the catch error
      } else {
        el.style.transform = `translateX(${amount + currLeft}px)`
        resolve()
      }
    }, delay)
  })
}
//! refactored usage
moveX(btn, 200, 2000)
  .then(() => moveX(btn, 100, 2000))
  .then(() => moveX(btn, 100, 2000))
  .then(() => moveX(btn, 100, 2000))
  .then(() => {
    console.log('here comes the final move!')
    return moveX(btn, 200, 1000)
  })
  .catch((err) => console.log(err, 'or out of space, cannot move 🤬'))
//! vvv instead of the garbage below vvv
/*
moveX(
  btn,
  100,
  1000,
  () => {
    // success
    moveX(
      btn,
      400,
      1000,
      () => {
        // success
        moveX(
          btn,
          700,
          1000,
          () => {
            console.log("there's screen left?!")
          },
          () => {
            console.log('?@#!@$?! my toe!')
          }
        )
      },
      () => {
        // fail
        console.log('cannot move further!!!')
      }
    )
  },
  () => {
    // fail
    console.log('cannot move further...')
  }
)

console.log(document.body.clientWidth)

*/
