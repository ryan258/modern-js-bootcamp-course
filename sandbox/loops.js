const posts = [
  {
    title: 'Manny on the run!',
    link: 'https://manatee.org',
    username: 'manny'
  },
  {
    title: 'Manny on the lamb!',
    link: 'https://manatee.org',
    username: 'manny'
  },
  {
    title: 'Manny on the couch!',
    link: 'https://manatee.org',
    username: 'manny'
  },
  {
    title: 'Manny on the campaign trail!',
    link: 'https://manatee.org',
    username: 'manny'
  }
]
/*
for (let i = 0; i < posts.length; i++) {
  console.log(posts[i].title)
}
*/
// for (let i = 0; i < 10; i++) {
//   console.log(`beep #${i + 1}`)
// }

// for (let i = 1; i < 100; i++) {
//   console.log(i, 'squared is', i ** 2)
// }

// let str = 'cha'
// for (let i = 0; i < 3; i++) {
//   console.log('outer:', i)
//   for (let j = 0; j < str.length; j++) {
//     console.log('  Inner:', str[j])
//   }
// }

//! while loops
// though it is a better idea to not use a variable outside of a loop whenever possible
/* let j = 0
while (j <= 5) {
  console.log(j)
  j++
}*/
//! - good times to use a while loop
//--- when you don't know how many times it's going to run
//----- like game logic looping until game over
// while(stillAlive) {...}
/*const target = Math.floor(Math.random() * 10)
let guess = Math.floor(Math.random() * 10)
console.log('target:', target)
console.log('guess:', guess)

while (guess !== target) {
  guess = Math.floor(Math.random() * 10)
  console.log('target:', target)
  console.log('guess:', guess)
}*/

/* //! while w/ break
// while(stillAlive) {...}
const target = Math.floor(Math.random() * 10)
let guess = Math.floor(Math.random() * 10)

// not very explanitory
// something like while(!gameOver) {} would be better
while (true) {
  if (target === guess) break
  guess = Math.floor(Math.random() * 10)
  console.log(`target = ${target} and guess = ${guess}`)
}

console.log(`WINNER! target = ${target} and guess = ${guess}`)
*/

//! FOR OF LOOPS
// - works on anything that is iterable
// - not supported in IE!
for (let post of posts) {
  console.log(post.title)
}

for (let char of 'redrum') {
  console.log(char.toUpperCase())
}

//! FOR VS FOR OF
// - when to use one over the other
// - when you need an index and when you don't
// - otherwise for..of is the happy path

//! for of doesn't really work with objects (easily)
// - an object is not iterable

// but w/ for>>of we can list just the keys or just the values
// there's not much use of this outside of looping

//! Object.keys(obj)
// - will return an array of the KEYS
//! Object.values(obj)
// - will return an array of the VALUES

// then if we want both we can use the keys to access the values

/*
for (let movie of Object.keys(movieReviews)) {
  console.log(movie, movieReviews[movie]) // print out each key and value
}
*/

// - a lot of the time we'll want both, so we'll use the keys
// -- but if we want an average of the values we could use values

/*
const ratings = Object.values(movieReviews)
let total = 0
for (let r of ratings) {
  total += r
}

const avg = total / ratings.length
*/

//! FOR..IN
// - will loop over the keys in an object

const jeopardyWinnings = {
  regularPlay: 2522700,
  watsonChallenge: 300000,
  tournamentOfChampions: 500000,
  battleOfTheDecade: 100000
}

for (let prop in jeopardyWinnings) {
  console.log(prop)
  console.log(jeopardyWinnings[prop])
}
console.log('~~~~~~~~~~~~')
let total = 0
for (let prop in jeopardyWinnings) {
  total += jeopardyWinnings[prop]
  console.log(total)
}
console.log(`Total winnings: $${total}`)

// we can use for..in on an array bc arrays are objects, but it's pretty pointless because w/ arrays you're not using the keys for anything
// - and things can possibly change from browser to browser
